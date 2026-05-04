import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Msg = { role: "user" | "assistant"; content: string; quickReplies?: string[] };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/mitigata-chat`;

// Initial chips shown before any conversation
const STARTER_REPLIES = [
  "What does the ₹99 scan check?",
  "Is my data safe with Mitigata?",
  "How does cyber insurance work?",
  "I'm being scammed right now",
  "What is dark web monitoring?",
  "How is my risk score calculated?",
];

// Keyword-based follow-up suggestions for almost any reply
const pickQuickReplies = (text: string): string[] => {
  const t = text.toLowerCase();

  if (/scam|fraud|hack|stole|stolen|compromis|right now|urgent/.test(t)) {
    return [
      "Open Call Assistance",
      "How do I block my account?",
      "Will insurance cover my loss?",
    ];
  }
  if (/₹99|99|comprehensive|deeper scan|10.layer|unlock/.test(t)) {
    return [
      "What's inside the deeper scan?",
      "Is the ₹99 a one-time fee?",
      "How long does it take?",
      "Is my payment secure?",
    ];
  }
  if (/insurance|policy|claim|cover/.test(t)) {
    return [
      "What does insurance cover?",
      "How much does a policy cost?",
      "Can I add my family?",
      "How do I file a claim?",
    ];
  }
  if (/dark web|breach|leak|exposure|stealer|combo/.test(t)) {
    return [
      "Where was my data leaked?",
      "What should I do next?",
      "Can I remove my data?",
      "Run a deeper scan",
    ];
  }
  if (/aadhaar|pan|kyc|document|address/.test(t)) {
    return [
      "How do you mask my Aadhaar?",
      "Is my KYC data safe?",
      "What if my Aadhaar is leaked?",
    ];
  }
  if (/password|otp|login|account/.test(t)) {
    return [
      "How do I make a strong password?",
      "What is 2FA?",
      "My account was hacked",
    ];
  }
  if (/risk|score/.test(t)) {
    return [
      "How can I lower my score?",
      "What does each layer mean?",
      "Show recommendations",
    ];
  }
  if (/family|child|parent|spouse/.test(t)) {
    return [
      "How many family members are included?",
      "Add a family member",
      "Family insurance details",
    ];
  }
  if (/privacy|safe|store|data/.test(t)) {
    return [
      "Where is my data stored?",
      "Can I delete my data?",
      "Who can see my report?",
    ];
  }
  if (/recommend|fix|protect|next step|what should/.test(t)) {
    return [
      "Show recommendations",
      "Run deeper scan",
      "Get insurance",
    ];
  }
  // Generic fallback — always keep the chat moving
  return [
    "Tell me more",
    "What should I do next?",
    "Run deeper scan",
    "Talk to a human",
  ];
};

const MitigataChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi 👋 I'm Mitigata Assist. Pick a question below or type your own — I'm here to help.",
      quickReplies: STARTER_REPLIES,
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
    // Strip quickReplies from any previous assistant messages so chips don't pile up
    const cleaned = messages.map(m =>
      m.role === "assistant" ? { ...m, quickReplies: undefined } : m,
    );
    const next = [...cleaned, userMsg];
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
        body: JSON.stringify({ messages: next.map(({ role, content }) => ({ role, content })) }),
      });

      if (!resp.ok || !resp.body) {
        const errText = resp.status === 429
          ? "I'm getting a lot of questions right now. Try again in a few seconds."
          : resp.status === 402
            ? "AI credits are exhausted. Please add funds in workspace settings."
            : "Something went wrong. Please try again.";
        setMessages(prev => [
          ...prev,
          { role: "assistant", content: errText, quickReplies: ["Try again", "Talk to a human"] },
        ]);
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

      // After streaming completes, attach contextual quick replies
      if (acc) {
        const chips = pickQuickReplies(acc);
        setMessages(prev =>
          prev.map((m, i) => (i === prev.length - 1 ? { ...m, quickReplies: chips } : m)),
        );
      }
    } catch (e) {
      console.error(e);
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "Connection error. Please try again.",
          quickReplies: ["Try again", "Talk to a human"],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating launcher — lifted above StickyCTA bar */}
      <motion.button
        onClick={() => setOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 18 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed bottom-28 right-5 lg:bottom-20 lg:right-6 z-50 h-14 w-14 rounded-full bg-foreground text-card shadow-2xl flex items-center justify-center transition-opacity ${open ? "opacity-0 pointer-events-none" : "opacity-100"}`}
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
                         inset-x-3 bottom-20 top-20 rounded-[20px]
                         lg:inset-auto lg:bottom-20 lg:right-6 lg:top-auto lg:w-[400px] lg:h-[600px]"
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
                {messages.map((m, i) => {
                  const isLast = i === messages.length - 1;
                  return (
                    <div key={i} className="space-y-2">
                      <div className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
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

                      {/* Quick replies under the latest assistant message */}
                      {m.role === "assistant" && isLast && !loading && m.quickReplies && m.quickReplies.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25 }}
                          className="flex flex-wrap gap-1.5 pt-1"
                        >
                          {m.quickReplies.map(q => (
                            <button
                              key={q}
                              onClick={() => send(q)}
                              className="text-xs px-3 py-1.5 rounded-full bg-card border border-border hover:border-foreground/40 hover:bg-secondary/60 text-foreground transition-colors"
                            >
                              {q}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  );
                })}

                {loading && messages[messages.length - 1]?.role === "user" && (
                  <div className="flex justify-start">
                    <div className="bg-secondary rounded-2xl rounded-bl-md px-4 py-3">
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                    </div>
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
