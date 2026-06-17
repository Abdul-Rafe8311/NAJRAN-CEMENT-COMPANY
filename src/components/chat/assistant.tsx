"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What cement types do you offer?",
  "Tell me about your certifications",
  "What is your production capacity?",
  "How can I request a quote?",
];

function inline(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? (
      <strong key={i} className="font-semibold">{p.slice(2, -2)}</strong>
    ) : (
      <Fragment key={i}>{p}</Fragment>
    )
  );
}

function Markdown({ text }: { text: string }) {
  const lines = text.split("\n");
  const out: React.ReactNode[] = [];
  let bullets: string[] = [];
  const flush = () => {
    if (bullets.length) {
      out.push(
        <ul key={out.length} className="my-1.5 space-y-1">
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-kiln" />
              <span>{inline(b)}</span>
            </li>
          ))}
        </ul>
      );
      bullets = [];
    }
  };
  for (const ln of lines) {
    const t = ln.trim();
    if (t.startsWith("- ") || t.startsWith("* ")) bullets.push(t.slice(2));
    else {
      flush();
      if (t) out.push(<p key={out.length} className="my-1">{inline(t)}</p>);
    }
  }
  flush();
  return <>{out}</>;
}

export function Assistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || busy) return;
    const history = [...messages, { role: "user", content: q } as Message];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.ok || !res.body) throw new Error();
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
      if (!acc.trim()) throw new Error();
    } catch {
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = {
          role: "assistant",
          content: "Sorry — I'm having trouble responding right now. Please try again, or contact us at info@najrancement.com.",
        };
        return copy;
      });
    } finally {
      setBusy(false);
    }
  };

  const lastAssistantStreaming =
    busy && messages.length > 0 && messages[messages.length - 1].role === "assistant" && !messages[messages.length - 1].content;

  return (
    <>
      {/* Launcher */}
      <motion.button
        aria-label="Open AI assistant"
        onClick={() => setOpen((v) => !v)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.4, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-5 right-5 z-[140] grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-kiln to-ember text-white shadow-[0_12px_40px_-8px_rgba(255,122,45,0.6)]"
      >
        <span className="absolute inset-0 -z-10 hidden animate-ping rounded-full bg-kiln/30 lg:block" />
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.svg key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </motion.svg>
          ) : (
            <motion.svg key="c" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 3C7 3 3 6.6 3 11c0 2.3 1.1 4.4 2.9 5.8L5 21l4.4-1.7c.8.2 1.7.3 2.6.3 5 0 9-3.6 9-8s-4-8.6-9-8.6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              <circle cx="9" cy="11.5" r="1" fill="currentColor" />
              <circle cx="12" cy="11.5" r="1" fill="currentColor" />
              <circle cx="15" cy="11.5" r="1" fill="currentColor" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-5 z-[140] flex h-[68vh] max-h-[640px] w-[min(400px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-[22px] border border-line bg-white/85 shadow-[0_30px_80px_-20px_rgba(16,24,40,0.4)] backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="relative flex items-center justify-between border-b border-line bg-gradient-to-r from-[#0a1c36] to-[#1b3a6b] px-4 py-3.5 text-white">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-kiln to-ember font-display text-sm font-bold">N</span>
                <div>
                  <div className="text-sm font-semibold">Najran Cement Assistant</div>
                  <div className="flex items-center gap-1.5 text-[11px] text-white/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#5fd6a6]" /> Online · AI concierge
                  </div>
                </div>
              </div>
              {messages.length > 0 && (
                <button onClick={() => setMessages([])} title="Clear chat" className="rounded-lg px-2 py-1 text-xs text-white/70 transition-colors hover:bg-white/10 hover:text-white">
                  Clear
                </button>
              )}
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              {messages.length === 0 && (
                <div className="pt-2">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-kiln to-ember font-display text-base font-bold text-white">N</div>
                  <p className="mt-4 font-display text-lg font-semibold">Hello 👋</p>
                  <p className="mt-1 text-sm text-ash">
                    I'm the Najran Cement AI assistant. Ask me about our products, certifications, capacity, sustainability or how to get in touch.
                  </p>
                  <div className="mt-5 space-y-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="block w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-left text-sm text-bone transition-colors hover:border-kiln/50 hover:bg-coal"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <div key={i} className={cn("flex gap-2.5", m.role === "user" ? "justify-end" : "justify-start")}>
                  {m.role === "assistant" && (
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-kiln to-ember text-[11px] font-bold text-white">N</span>
                  )}
                  <div className={cn("group relative max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed", m.role === "user" ? "bg-gradient-to-br from-kiln to-ember text-white" : "border border-line bg-white text-bone")}>
                    {m.role === "assistant" && lastAssistantStreaming && i === messages.length - 1 ? (
                      <span className="flex gap-1 py-1">
                        {[0, 1, 2].map((d) => (
                          <motion.span key={d} className="h-1.5 w-1.5 rounded-full bg-muted" animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }} transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }} />
                        ))}
                      </span>
                    ) : (
                      <Markdown text={m.content} />
                    )}
                    {m.role === "assistant" && m.content && (
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(m.content);
                          setCopied(i);
                          setTimeout(() => setCopied(null), 1500);
                        }}
                        className="mt-1.5 text-[11px] text-muted opacity-0 transition-opacity hover:text-kiln group-hover:opacity-100"
                      >
                        {copied === i ? "Copied ✓" : "Copy"}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="border-t border-line bg-white/70 p-3"
            >
              <div className="flex items-end gap-2 rounded-2xl border border-line bg-white px-3 py-2 focus-within:border-kiln/50">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Najran Cement…"
                  className="flex-1 bg-transparent py-1 text-sm outline-none placeholder:text-muted"
                />
                <button
                  type="submit"
                  disabled={busy || !input.trim()}
                  aria-label="Send"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-kiln to-ember text-white transition-opacity disabled:opacity-40"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </div>
              <p className="mt-2 text-center text-[10px] text-muted">AI answers are grounded in Najran Cement's verified content.</p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
