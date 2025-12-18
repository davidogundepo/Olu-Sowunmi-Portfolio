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
  // Handle CORS preflight requests
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

    // Email to the client
    const clientEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Olu Sowunmi <hello@olusowunmi.com>",
        to: [clientEmail],
        subject: "Meeting Request Confirmed - Olu Sowunmi",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; background-color: #0f1419; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <!-- Header -->
              <div style="text-align: center; margin-bottom: 40px;">
                <h1 style="color: #ffffff; font-size: 28px; margin: 0; font-weight: 700;">Meeting Request Received</h1>
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #d97706, #0d9488); margin: 16px auto;"></div>
              </div>
              
              <!-- Main Card -->
              <div style="background: linear-gradient(135deg, #1a2028 0%, #252d38 100%); border-radius: 16px; padding: 32px; border: 1px solid rgba(255,255,255,0.1);">
                <p style="color: #e5e5e5; font-size: 18px; margin: 0 0 24px 0;">
                  Dear ${clientName},
                </p>
                
                <p style="color: #a3a3a3; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                  Thank you for reaching out! Your meeting request with Olu Sowunmi has been received and is being reviewed.
                </p>
                
                <!-- Meeting Details Box -->
                <div style="background: rgba(217, 119, 6, 0.1); border-left: 4px solid #d97706; border-radius: 8px; padding: 20px; margin: 24px 0;">
                  <h3 style="color: #d97706; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 16px 0;">Meeting Details</h3>
                  <p style="color: #e5e5e5; margin: 8px 0;"><strong>Date:</strong> ${meetingDate}</p>
                  <p style="color: #e5e5e5; margin: 8px 0;"><strong>Time:</strong> ${meetingTime}</p>
                  <p style="color: #e5e5e5; margin: 8px 0;"><strong>Duration:</strong> ${duration}</p>
                  ${organization ? `<p style="color: #e5e5e5; margin: 8px 0;"><strong>Organisation:</strong> ${organization}</p>` : ''}
                </div>
                
                ${message ? `
                <div style="background: rgba(13, 148, 136, 0.1); border-left: 4px solid #0d9488; border-radius: 8px; padding: 20px; margin: 24px 0;">
                  <h3 style="color: #0d9488; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px 0;">Your Message</h3>
                  <p style="color: #a3a3a3; font-style: italic; margin: 0;">"${message}"</p>
                </div>
                ` : ''}
                
                <p style="color: #a3a3a3; font-size: 16px; line-height: 1.6; margin: 24px 0 0 0;">
                  Olu will confirm the meeting details and send a calendar invitation shortly. If you have any questions in the meantime, feel free to reply to this email.
                </p>
              </div>
              
              <!-- Footer -->
              <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1);">
                <p style="color: #737373; font-size: 14px; margin: 0;">
                  Looking forward to our conversation!
                </p>
                <p style="color: #d97706; font-size: 16px; font-weight: 600; margin: 8px 0 0 0;">
                  Olu Sowunmi
                </p>
                <p style="color: #737373; font-size: 12px; margin: 16px 0 0 0;">
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

    // Email to Olu and CC David
    const oluEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Olu Sowunmi Website <hello@olusowunmi.com>",
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
          <body style="margin: 0; padding: 0; background-color: #0f1419; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <!-- Header -->
              <div style="text-align: center; margin-bottom: 40px;">
                <h1 style="color: #ffffff; font-size: 28px; margin: 0; font-weight: 700;">New Meeting Request</h1>
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #d97706, #0d9488); margin: 16px auto;"></div>
              </div>
              
              <!-- Main Card -->
              <div style="background: linear-gradient(135deg, #1a2028 0%, #252d38 100%); border-radius: 16px; padding: 32px; border: 1px solid rgba(255,255,255,0.1);">
                <p style="color: #e5e5e5; font-size: 18px; margin: 0 0 24px 0;">
                  Hi Olu,
                </p>
                
                <p style="color: #a3a3a3; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                  You have received a new meeting request from your website.
                </p>
                
                <!-- Client Details Box -->
                <div style="background: rgba(217, 119, 6, 0.1); border-left: 4px solid #d97706; border-radius: 8px; padding: 20px; margin: 24px 0;">
                  <h3 style="color: #d97706; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 16px 0;">Client Details</h3>
                  <p style="color: #e5e5e5; margin: 8px 0;"><strong>Name:</strong> ${clientName}</p>
                  <p style="color: #e5e5e5; margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${clientEmail}" style="color: #0d9488;">${clientEmail}</a></p>
                  ${organization ? `<p style="color: #e5e5e5; margin: 8px 0;"><strong>Organisation:</strong> ${organization}</p>` : ''}
                </div>
                
                <!-- Meeting Details Box -->
                <div style="background: rgba(13, 148, 136, 0.1); border-left: 4px solid #0d9488; border-radius: 8px; padding: 20px; margin: 24px 0;">
                  <h3 style="color: #0d9488; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 16px 0;">Requested Meeting</h3>
                  <p style="color: #e5e5e5; margin: 8px 0;"><strong>Date:</strong> ${meetingDate}</p>
                  <p style="color: #e5e5e5; margin: 8px 0;"><strong>Time:</strong> ${meetingTime}</p>
                  <p style="color: #e5e5e5; margin: 8px 0;"><strong>Duration:</strong> ${duration}</p>
                </div>
                
                ${message ? `
                <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 20px; margin: 24px 0;">
                  <h3 style="color: #e5e5e5; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px 0;">Message from ${clientName}</h3>
                  <p style="color: #a3a3a3; font-style: italic; margin: 0; line-height: 1.6;">"${message}"</p>
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
              <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1);">
                <p style="color: #737373; font-size: 12px; margin: 0;">
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
