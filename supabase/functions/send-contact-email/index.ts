import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ContactAttachment {
  filename: string;
  contentBase64: string;
  contentType?: string;
}

interface ContactFormData {
  namn: string;
  email: string;
  telefon?: string;
  foretag?: string;
  meddelande: string;
  attachments?: ContactAttachment[];
}

// Server-side caps: the frontend limits uploads to 10 MB raw; allow a little
// headroom here, and stay far below Resend's 40 MB email limit.
const MAX_ATTACHMENTS = 10;
const MAX_TOTAL_BYTES = 15 * 1024 * 1024;

const sanitizeFilename = (name: string) =>
  String(name ?? "bilaga")
    .replace(/[/\\]/g, "_")
    .slice(0, 200) || "bilaga";

// Approximate decoded size of a base64 string without decoding it.
const base64Bytes = (b64: string) => Math.floor((b64.length * 3) / 4);

const escHtml = (s: string) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();
    console.log("Received contact form submission:", {
      ...formData,
      attachments: (formData.attachments ?? []).map((a) => a?.filename),
    });

    // Validate required fields
    if (!formData.namn || !formData.email || !formData.meddelande) {
      console.error("Missing required fields");
      throw new Error("Namn, email och meddelande krävs");
    }

    // Validate attachments
    const attachments = (formData.attachments ?? []).filter(
      (a) => a && typeof a.contentBase64 === "string" && a.contentBase64.length > 0,
    );
    if (attachments.length > MAX_ATTACHMENTS) {
      throw new Error("För många bifogade filer");
    }
    const totalBytes = attachments.reduce((sum, a) => sum + base64Bytes(a.contentBase64), 0);
    if (totalBytes > MAX_TOTAL_BYTES) {
      throw new Error("Bifogade filer är för stora");
    }

    const emailHtml = `
      <h1>Nytt kontaktmeddelande från Alloy Nordic</h1>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background-color: #f5f5f5;">Namn</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${escHtml(formData.namn)}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background-color: #f5f5f5;">E-post</td>
          <td style="padding: 10px; border: 1px solid #ddd;"><a href="mailto:${escHtml(formData.email)}">${escHtml(formData.email)}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background-color: #f5f5f5;">Telefon</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${formData.telefon ? escHtml(formData.telefon) : "Ej angiven"}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background-color: #f5f5f5;">Företag</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${formData.foretag ? escHtml(formData.foretag) : "Ej angivet"}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background-color: #f5f5f5;">Meddelande</td>
          <td style="padding: 10px; border: 1px solid #ddd; white-space: pre-wrap;">${escHtml(formData.meddelande)}</td>
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
      ...(attachments.length > 0 && {
        attachments: attachments.map((a) => ({
          filename: sanitizeFilename(a.filename),
          content: a.contentBase64,
        })),
      }),
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
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
