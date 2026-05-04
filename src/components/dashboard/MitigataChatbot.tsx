import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What does the ₹99 scan check?",
  "Is my data safe with Mitigata?",
  "How does insurance work?",
  "I think I'm being scammed right now",
];

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/mitigata-chat`;

const MitigataChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi, I'm Mitigata Assist. Ask me anything about your scan, the report, insurance, or staying safe online.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const userMsg: Msg = { role: "user", content: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: next }),
      });

      if (!resp.ok || !resp.body) {
        const errText = resp.status === 429
          ? "I'm getting a lot of questions right now. Try again in a few seconds."
          : resp.status === 402
            ? "AI credits are exhausted. Please add funds in workspace settings."
            : "Something went wrong. Please try again.";
        setMessages(prev => [...prev, { role: "assistant", content: errText }]);
        setLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let acc = "";
      let done = false;
      let started = false;

      while (!done) {
        const { value, done: d } = await reader.read();
        if (d) break;
        buffer += decoder.decode(value, { stream: true });

        let idx: number;
        while ((idx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(json);
            const delta = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (delta) {
              acc += delta;
              if (!started) {
                started = true;
                setMessages(prev => [...prev, { role: "assistant", content: acc }]);
              } else {
                setMessages(prev =>
                  prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: acc } : m)),
                );
              }
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (e) {
      console.error(e);
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "Connection error. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating launcher */}
      <motion.button
        onClick={() => setOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 18 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed bottom-24 right-5 lg:bottom-6 lg:right-6 z-40 h-14 w-14 rounded-full bg-foreground text-card shadow-2xl flex items-center justify-center transition-opacity ${open ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        aria-label="Open Mitigata Assist"
      >
        <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping opacity-40" />
        <MessageCircle className="h-6 w-6 relative z-10" strokeWidth={1.75} />
        <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-primary border-2 border-background" />
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/20 z-40 lg:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
              className="fixed z-50 bg-card border border-border shadow-2xl flex flex-col
                         inset-x-3 bottom-3 top-20 rounded-[20px]
                         lg:inset-auto lg:bottom-6 lg:right-6 lg:top-auto lg:w-[400px] lg:h-[600px]"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-foreground flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-primary" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="text-display text-sm leading-tight">Mitigata Assist</h3>
                    <p className="text-body text-[11px] flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Online
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="h-8 w-8 rounded-full hover:bg-secondary flex items-center justify-center transition-colors"
                  aria-label="Close"
                >
                  <X className="h-4 w-4 text-muted-foreground" strokeWidth={1.75} />
                </button>
              </div>

              {/* Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                        m.role === "user"
                          ? "bg-foreground text-card rounded-br-md"
                          : "bg-secondary text-foreground rounded-bl-md"
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
                {loading && messages[messages.length - 1]?.role === "user" && (
                  <div className="flex justify-start">
                    <div className="bg-secondary rounded-2xl rounded-bl-md px-4 py-3">
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                    </div>
                  </div>
                )}

                {messages.length <= 1 && !loading && (
                  <div className="pt-2 space-y-2">
                    <p className="text-caps text-[10px] px-1">Suggested</p>
                    {SUGGESTIONS.map(s => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="block w-full text-left text-xs px-3.5 py-2.5 rounded-xl bg-secondary/60 hover:bg-secondary text-foreground transition-colors border border-transparent hover:border-border"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="border-t border-border p-3">
                <form
                  onSubmit={e => { e.preventDefault(); send(input); }}
                  className="flex items-center gap-2 bg-secondary rounded-2xl pl-4 pr-1.5 py-1.5"
                >
                  <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Ask anything…"
                    disabled={loading}
                    className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground py-1.5"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!input.trim() || loading}
                    className="h-9 w-9 rounded-full bg-foreground hover:bg-foreground/90 text-card shrink-0 disabled:opacity-40"
                  >
                    {loading
                      ? <Loader2 className="h-4 w-4 animate-spin" />
                      : <Send className="h-4 w-4" strokeWidth={2} />}
                  </Button>
                </form>
                <p className="text-[10px] text-muted-foreground text-center mt-2">
                  AI replies. Don't share passwords or OTPs.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MitigataChatbot;
