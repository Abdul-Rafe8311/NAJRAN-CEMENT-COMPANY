import { NextRequest } from "next/server";
import { buildContext } from "@/lib/knowledge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Msg = { role: "user" | "assistant" | "system"; content: string };

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

const SYSTEM = (context: string) => `You are the Najran Cement Company AI assistant — a professional, friendly enterprise concierge available 24/7.

Answer ONLY using the CONTEXT below, which is drawn from the company's verified content.

Rules:
- Only answer questions about Najran Cement Company (overview, history, products & cement types, certifications, sustainability, manufacturing capabilities, projects/activities, careers, contact, and investor information).
- If the answer is not present in the CONTEXT, reply EXACTLY: "I couldn't find verified information about that in the company's data."
- Never invent or guess facts, figures, names, dates or certifications that are not in the CONTEXT.
- Be concise and clear. Use markdown (short paragraphs, **bold**, and "- " bullet lists) where helpful.
- For quotes or contact requests, provide the phone and email from the CONTEXT.
- Politely decline unrelated questions and steer back to the company.

CONTEXT:
${context}`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return new Response("AI assistant is not configured (missing GROQ_API_KEY).", { status: 500 });
  }

  let messages: Msg[] = [];
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
  } catch {
    return new Response("Invalid request.", { status: 400 });
  }

  const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
  const { context, sources } = buildContext(lastUser, 6);

  // Keep recent history small for latency/cost.
  const history = messages.filter((m) => m.role !== "system").slice(-8);

  const payload = {
    model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
    temperature: 0.2,
    max_tokens: 700,
    stream: true,
    messages: [{ role: "system", content: SYSTEM(context) }, ...history],
  };

  const groqRes = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  if (!groqRes.ok || !groqRes.body) {
    const detail = await groqRes.text().catch(() => "");
    return new Response(`Upstream error: ${detail.slice(0, 200)}`, { status: 502 });
  }

  // Transform Groq SSE → plain token stream for the client.
  const reader = groqRes.body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";

  const stream = new ReadableStream({
    async pull(controller) {
      const { done, value } = await reader.read();
      if (done) {
        controller.close();
        return;
      }
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;
        const data = trimmed.slice(5).trim();
        if (data === "[DONE]") {
          controller.close();
          return;
        }
        try {
          const json = JSON.parse(data);
          const token = json.choices?.[0]?.delta?.content;
          if (token) controller.enqueue(encoder.encode(token));
        } catch {
          /* ignore keep-alive / partial */
        }
      }
    },
    cancel() {
      reader.cancel();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "x-sources": JSON.stringify(sources),
    },
  });
}
