import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ContactFormData {
  namn: string;
  email: string;
  telefon?: string;
  foretag?: string;
  meddelande: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();
    console.log("Received contact form submission:", formData);

    // Validate required fields
    if (!formData.namn || !formData.email || !formData.meddelande) {
      console.error("Missing required fields");
      throw new Error("Namn, email och meddelande krävs");
    }

    const emailHtml = `
      <h1>Nytt kontaktmeddelande från Alloy Nordic</h1>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background-color: #f5f5f5;">Namn</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${formData.namn}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background-color: #f5f5f5;">E-post</td>
          <td style="padding: 10px; border: 1px solid #ddd;"><a href="mailto:${formData.email}">${formData.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background-color: #f5f5f5;">Telefon</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${formData.telefon || "Ej angiven"}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background-color: #f5f5f5;">Företag</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${formData.foretag || "Ej angivet"}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background-color: #f5f5f5;">Meddelande</td>
          <td style="padding: 10px; border: 1px solid #ddd; white-space: pre-wrap;">${formData.meddelande}</td>
        </tr>
      </table>
      <p style="margin-top: 20px; color: #666; font-size: 12px;">
        Detta meddelande skickades via kontaktformuläret på alloynordic.se
      </p>
    `;

    console.log("Sending email to joel@alloynordic.se");
    
    const emailResponse = await resend.emails.send({
      from: "Alloy Nordic <noreply@alloynordic.se>",
      to: ["joel@alloynordic.se"],
      subject: `Nytt kontaktmeddelande från ${formData.namn}`,
      html: emailHtml,
      reply_to: formData.email,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
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
