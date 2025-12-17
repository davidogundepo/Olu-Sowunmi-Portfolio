import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingEmailRequest {
  clientName: string;
  clientEmail: string;
  organization?: string;
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

    console.log("Processing booking request:", { clientName, clientEmail, meetingDate, meetingTime });

    // Email to Olu (notification of new booking)
    const oluEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Meeting Booking</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0f1419;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #f97316 0%, #06b6d4 100%); border-radius: 16px 16px 0 0; padding: 40px; text-align: center;">
              <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.2); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                <span style="font-size: 40px;">📅</span>
              </div>
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">New Meeting Request!</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">Someone wants to connect with you</p>
            </div>
            
            <!-- Content -->
            <div style="background: #1a1f2e; padding: 40px; border-radius: 0 0 16px 16px;">
              <!-- Client Info -->
              <div style="background: #252b3b; border-radius: 12px; padding: 24px; margin-bottom: 24px; border-left: 4px solid #f97316;">
                <h3 style="color: #e2e8f0; margin: 0 0 16px; font-size: 18px;">👤 Client Details</h3>
                <p style="color: #94a3b8; margin: 8px 0;"><strong style="color: #e2e8f0;">Name:</strong> ${clientName}</p>
                <p style="color: #94a3b8; margin: 8px 0;"><strong style="color: #e2e8f0;">Email:</strong> ${clientEmail}</p>
                ${organization ? `<p style="color: #94a3b8; margin: 8px 0;"><strong style="color: #e2e8f0;">Organization:</strong> ${organization}</p>` : ''}
              </div>
              
              <!-- Meeting Details -->
              <div style="background: #252b3b; border-radius: 12px; padding: 24px; margin-bottom: 24px; border-left: 4px solid #06b6d4;">
                <h3 style="color: #e2e8f0; margin: 0 0 16px; font-size: 18px;">🗓️ Meeting Details</h3>
                <p style="color: #94a3b8; margin: 8px 0;"><strong style="color: #e2e8f0;">Date:</strong> ${meetingDate}</p>
                <p style="color: #94a3b8; margin: 8px 0;"><strong style="color: #e2e8f0;">Time:</strong> ${meetingTime}</p>
                <p style="color: #94a3b8; margin: 8px 0;"><strong style="color: #e2e8f0;">Duration:</strong> ${duration}</p>
              </div>
              
              <!-- Message -->
              <div style="background: #252b3b; border-radius: 12px; padding: 24px;">
                <h3 style="color: #e2e8f0; margin: 0 0 16px; font-size: 18px;">💬 Message</h3>
                <p style="color: #94a3b8; margin: 0; line-height: 1.6;">${message}</p>
              </div>
              
              <!-- Footer -->
              <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #374151;">
                <p style="color: #64748b; font-size: 14px; margin: 0;">
                  Reply directly to this email to respond to ${clientName}
                </p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Email to Client (confirmation)
    const clientEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Meeting Confirmed</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0f1419;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #f97316 0%, #06b6d4 100%); border-radius: 16px 16px 0 0; padding: 40px; text-align: center;">
              <div style="width: 100px; height: 100px; background: rgba(255,255,255,0.2); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px; position: relative;">
                <span style="font-size: 50px;">📅</span>
                <div style="position: absolute; bottom: -5px; right: -5px; background: #fff; border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: #22c55e; font-size: 24px;">✓</span>
                </div>
              </div>
              <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 700;">Your meeting is booked!</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 15px 0 0; font-size: 16px;">You and Olu will be receiving an invitation email shortly.</p>
            </div>
            
            <!-- Content -->
            <div style="background: #1a1f2e; padding: 40px; border-radius: 0 0 16px 16px;">
              <!-- Meeting Summary -->
              <div style="border-left: 4px solid #f97316; padding-left: 20px; margin-bottom: 32px;">
                <p style="color: #94a3b8; margin: 0 0 8px; font-size: 14px;">Meeting with</p>
                <div style="display: flex; align-items: center; gap: 12px;">
                  <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #f97316, #06b6d4); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                    <span style="color: white; font-weight: bold; font-size: 20px;">OS</span>
                  </div>
                  <div>
                    <h3 style="color: #e2e8f0; margin: 0; font-size: 18px; font-weight: 600;">Olu Sowunmi</h3>
                    <p style="color: #94a3b8; margin: 4px 0 0; font-size: 14px;">Talent Leader & Consultant</p>
                  </div>
                </div>
              </div>
              
              <!-- Meeting Details -->
              <div style="background: #252b3b; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                <div style="display: flex; align-items: center; margin-bottom: 16px;">
                  <span style="font-size: 20px; margin-right: 12px;">🗓️</span>
                  <span style="color: #e2e8f0; font-size: 16px; font-weight: 500;">${meetingDate}</span>
                </div>
                <div style="display: flex; align-items: center;">
                  <span style="font-size: 20px; margin-right: 12px;">⏰</span>
                  <span style="color: #e2e8f0; font-size: 16px; font-weight: 500;">${meetingTime} - ${duration}</span>
                </div>
              </div>
              
              <!-- What to Expect -->
              <div style="background: #252b3b; border-radius: 12px; padding: 24px;">
                <h3 style="color: #e2e8f0; margin: 0 0 16px; font-size: 16px; font-weight: 600;">What to expect</h3>
                <ul style="color: #94a3b8; margin: 0; padding-left: 20px; line-height: 1.8;">
                  <li>Olu will review your message and confirm the meeting</li>
                  <li>You'll receive a calendar invite with the meeting link</li>
                  <li>Prepare any questions or topics you'd like to discuss</li>
                </ul>
              </div>
              
              <!-- Footer -->
              <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #374151;">
                <p style="color: #64748b; font-size: 14px; margin: 0 0 8px;">
                  Thank you for reaching out, ${clientName}!
                </p>
                <p style="color: #64748b; font-size: 14px; margin: 0;">
                  If you have any questions, reply to this email.
                </p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email to Olu
    const oluEmailResponse = await resend.emails.send({
      from: "Meeting Booking <onboarding@resend.dev>",
      to: ["olu@redtechafrica.com"],
      replyTo: clientEmail,
      subject: `New Meeting Request from ${clientName} - ${meetingDate}`,
      html: oluEmailHtml,
    });

    console.log("Email sent to Olu:", oluEmailResponse);

    // Send confirmation email to client
    const clientEmailResponse = await resend.emails.send({
      from: "Olu Sowunmi <onboarding@resend.dev>",
      to: [clientEmail],
      subject: "Your meeting with Olu is booked! 🎉",
      html: clientEmailHtml,
    });

    console.log("Confirmation email sent to client:", clientEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        oluEmail: oluEmailResponse, 
        clientEmail: clientEmailResponse 
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
