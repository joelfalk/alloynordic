import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are Alloy Nordic's friendly AI assistant on alloynordic.se.

About Alloy Nordic:
- Swedish company sourcing high-quality metal parts from suppliers around the world.
- Tagline: "Kvalitet utan kompromiss" (Quality without compromise).
- Services: sourcing & supplier matching, on-site quality control & inspection, logistics & shipping, custom manufacturing.
- Materials: stainless steel (304/316), aluminum (6061/7075), titanium, brass, copper, tool steel.
- Manufacturing processes: CNC machining, casting (sand, investment, die), sintering & MIM, hot pressing.
- Process: consultation → supplier matching → quality control → delivery.
- Swedish contact person, responses within 24h on weekdays.
- Contact: joel@alloynordic.se

Guidelines:
- Reply in the same language the user writes (Swedish or English).
- Be concise, helpful and professional.
- For specific quotes or detailed project discussions, encourage the user to use the contact form or email joel@alloynordic.se.
- Never invent prices or delivery times.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages: rawMessages } = await req.json();
    if (!Array.isArray(rawMessages)) {
      return new Response(JSON.stringify({ error: "Invalid request" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const ALLOWED_ROLES = new Set(["user", "assistant"]);
    const messages = rawMessages
      .filter((m: any) => m && ALLOWED_ROLES.has(m.role) && typeof m.content === "string")
      .slice(-20)
      .map((m: any) => ({ role: m.role, content: String(m.content).slice(0, 2000) }));
    if (messages.length === 0) {
      return new Response(JSON.stringify({ error: "Invalid request" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(JSON.stringify({ error: "Service temporarily unavailable" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: "Service temporarily unavailable" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});