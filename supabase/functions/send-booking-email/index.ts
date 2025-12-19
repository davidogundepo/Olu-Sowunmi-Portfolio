import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingEmailRequest {
  clientName: string;
  clientEmail: string;
  organization: string;
  message: string;
  meetingDate: string;
  meetingTime: string;
  duration: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      clientName, 
      clientEmail, 
      organization, 
      message, 
      meetingDate, 
      meetingTime, 
      duration 
    }: BookingEmailRequest = await req.json();

    console.log("Sending booking emails for:", clientName, clientEmail);

    // Email to the client - lighter, cleaner design
    const clientEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Olu Sowunmi <hello@olusowunmi.com>",
        to: [clientEmail],
        subject: "Your Meeting is Booked - Olu Sowunmi",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #1e40af 0%, #0d9488 100%); border-radius: 16px 16px 0 0; padding: 40px 32px; text-align: center;">
                <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                  <span style="font-size: 40px;">📅</span>
                </div>
                <h1 style="color: #ffffff; font-size: 28px; margin: 0 0 8px 0; font-weight: 700;">Your meeting is booked!</h1>
                <p style="color: rgba(255,255,255,0.9); font-size: 16px; margin: 0;">You will receive an invitation email shortly.</p>
              </div>
              
              <!-- Main Card -->
              <div style="background: #ffffff; border-radius: 0 0 16px 16px; padding: 32px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                <p style="color: #334155; font-size: 18px; margin: 0 0 24px 0;">
                  Dear ${clientName},
                </p>
                
                <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                  Thank you for booking a meeting with Olu Sowunmi. Your request has been received and confirmed.
                </p>
                
                <!-- Meeting Details Box -->
                <div style="background: #f1f5f9; border-left: 4px solid #0d9488; border-radius: 8px; padding: 20px; margin: 24px 0;">
                  <h3 style="color: #0d9488; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 16px 0;">Meeting Details</h3>
                  <p style="color: #334155; margin: 8px 0;"><strong>Date:</strong> ${meetingDate}</p>
                  <p style="color: #334155; margin: 8px 0;"><strong>Time:</strong> ${meetingTime} (GMT)</p>
                  <p style="color: #334155; margin: 8px 0;"><strong>Duration:</strong> ${duration}</p>
                  ${organization && organization !== 'Not specified' ? `<p style="color: #334155; margin: 8px 0;"><strong>Organisation:</strong> ${organization}</p>` : ''}
                </div>
                
                ${message && message !== 'No message provided' ? `
                <div style="background: #fef3c7; border-left: 4px solid #d97706; border-radius: 8px; padding: 20px; margin: 24px 0;">
                  <h3 style="color: #d97706; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px 0;">Your Message</h3>
                  <p style="color: #78716c; font-style: italic; margin: 0;">"${message}"</p>
                </div>
                ` : ''}
                
                <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 24px 0 0 0;">
                  A calendar invitation will be sent to you shortly. If you have any questions, feel free to reply to this email.
                </p>
              </div>
              
              <!-- Footer -->
              <div style="text-align: center; margin-top: 32px; padding-top: 24px;">
                <p style="color: #64748b; font-size: 14px; margin: 0;">
                  Looking forward to our conversation!
                </p>
                <p style="color: #0d9488; font-size: 16px; font-weight: 600; margin: 8px 0 0 0;">
                  Olu Sowunmi
                </p>
                <p style="color: #94a3b8; font-size: 12px; margin: 16px 0 0 0;">
                  olusowunmi.com
                </p>
              </div>
            </div>
          </body>
          </html>
        `,
      }),
    });

    const clientEmailData = await clientEmailResponse.json();
    console.log("Client email sent:", clientEmailData);

    // Email to Olu and CC David - cleaner design
    const oluEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Olu Sowunmi <hello@olusowunmi.com>",
        to: ["olu@redtechafrica.com"],
        cc: ["david.oludepo@gmail.com"],
        subject: `New Meeting Request from ${clientName}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <!-- Header -->
              <div style="text-align: center; margin-bottom: 32px;">
                <h1 style="color: #1e293b; font-size: 28px; margin: 0; font-weight: 700;">New Meeting Request</h1>
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #d97706, #0d9488); margin: 16px auto;"></div>
              </div>
              
              <!-- Main Card -->
              <div style="background: #ffffff; border-radius: 16px; padding: 32px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                <p style="color: #334155; font-size: 18px; margin: 0 0 24px 0;">
                  Hi Olu,
                </p>
                
                <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                  You have received a new meeting request from your website.
                </p>
                
                <!-- Client Details Box -->
                <div style="background: #fef3c7; border-left: 4px solid #d97706; border-radius: 8px; padding: 20px; margin: 24px 0;">
                  <h3 style="color: #d97706; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 16px 0;">Client Details</h3>
                  <p style="color: #334155; margin: 8px 0;"><strong>Name:</strong> ${clientName}</p>
                  <p style="color: #334155; margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${clientEmail}" style="color: #0d9488;">${clientEmail}</a></p>
                  ${organization && organization !== 'Not specified' ? `<p style="color: #334155; margin: 8px 0;"><strong>Organisation:</strong> ${organization}</p>` : ''}
                </div>
                
                <!-- Meeting Details Box -->
                <div style="background: #f0fdfa; border-left: 4px solid #0d9488; border-radius: 8px; padding: 20px; margin: 24px 0;">
                  <h3 style="color: #0d9488; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 16px 0;">Requested Meeting</h3>
                  <p style="color: #334155; margin: 8px 0;"><strong>Date:</strong> ${meetingDate}</p>
                  <p style="color: #334155; margin: 8px 0;"><strong>Time:</strong> ${meetingTime} (GMT)</p>
                  <p style="color: #334155; margin: 8px 0;"><strong>Duration:</strong> ${duration}</p>
                </div>
                
                ${message && message !== 'No message provided' ? `
                <div style="background: #f1f5f9; border-radius: 8px; padding: 20px; margin: 24px 0;">
                  <h3 style="color: #475569; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px 0;">Message from ${clientName}</h3>
                  <p style="color: #64748b; font-style: italic; margin: 0; line-height: 1.6;">"${message}"</p>
                </div>
                ` : ''}
                
                <!-- Action Button -->
                <div style="text-align: center; margin-top: 32px;">
                  <a href="mailto:${clientEmail}?subject=Re: Meeting Request - ${meetingDate}" style="display: inline-block; background: linear-gradient(90deg, #d97706, #0d9488); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                    Reply to ${clientName}
                  </a>
                </div>
              </div>
              
              <!-- Footer -->
              <div style="text-align: center; margin-top: 32px; padding-top: 24px;">
                <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                  This email was sent from olusowunmi.com booking form
                </p>
              </div>
            </div>
          </body>
          </html>
        `,
      }),
    });

    const oluEmailData = await oluEmailResponse.json();
    console.log("Olu notification email sent:", oluEmailData);

    return new Response(
      JSON.stringify({ 
        success: true, 
        clientEmail: clientEmailData,
        oluEmail: oluEmailData 
      }), 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-booking-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
