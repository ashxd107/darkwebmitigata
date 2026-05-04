const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are Mitigata Assist — a friendly, calm, non-technical support assistant for Mitigata, a personal cyber-safety product for Indian consumers.

Mitigata helps users:
- Run a free dark-web/breach scan on their email & phone (basic 2-layer scan).
- Unlock a deeper 10-layer comprehensive scan (₹99 one-time) covering public breaches, combo lists, dark web, stealer logs, Aadhaar, Telegram, family, address, KYC docs, websites.
- Get personal cyber-insurance policies (individual & family) for fraud, account takeover, identity theft.
- Use the urgent help / call-assistance flow if their account is compromised or they're being defrauded right now.

Tone rules:
- Warm, plain English. No jargon. Short sentences.
- Never alarm the user. Be reassuring and advisory.
- Never ask for passwords, OTPs, full Aadhaar, or full PAN.
- If user says they're being scammed RIGHT NOW, tell them to use "Call Assistance" inside the app immediately.
- Keep replies under 4 short sentences unless asked for detail.
- If you don't know something specific to their account, say so and suggest the relevant section (Overview, Exposure, Comprehensive Report, Insurance, Call Assistance).`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

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
        return new Response(JSON.stringify({ error: "Too many requests. Please wait a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
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
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
