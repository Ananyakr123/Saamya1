import { useEffect, useRef, useState } from "react";
import { queryAI, queryHuggingFace, generateChatReply, extractTopEmotion } from "../../firebase/huggingface";
import { saveResponse } from "../../firebase/firestore";

type ChatMessage = { role: "assistant" | "user"; content: string };

export default function AiChat({ userId }: { userId: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi, I’m Saamya. I’m here to listen and support you. What’s on your mind today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isSending) return;
    const userMsg: ChatMessage = { role: "user", content: trimmed };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setIsSending(true);
    try {
      const aiResult = await queryAI(trimmed, [...messages, userMsg]);
      const hf = typeof aiResult === 'string' ? undefined : aiResult;
      const prevTop = extractTopEmotion(
        // naive: look back for last assistant message to infer prior emotion from its text
        // we skip parsing – instead, carry state by recomputing top from last user input if any
        // Here we just use null placeholder; extend later if needed
        null
      )?.label || null;
      const reply = typeof aiResult === 'string'
        ? aiResult
        : generateChatReply(trimmed, hf, messages, prevTop);
      const botMsg: ChatMessage = { role: "assistant", content: reply };
      setMessages((m) => [...m, botMsg]);
      try {
        await saveResponse(userId, trimmed, reply);
      } catch {}
    } catch (err) {
      const botMsg: ChatMessage = {
        role: "assistant",
        content:
          "I’m sorry, I ran into a connection issue. Could we try that again in a moment?",
      };
      setMessages((m) => [...m, botMsg]);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[70vh] w-full max-w-2xl">
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto rounded-md border bg-white p-4 space-y-3"
      >
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={
              m.role === "user"
                ? "flex justify-end"
                : "flex justify-start"
            }
          >
            <div
              className={
                m.role === "user"
                  ? "max-w-[80%] rounded-2xl bg-blue-600 text-white px-4 py-2 whitespace-pre-wrap"
                  : "max-w-[80%] rounded-2xl bg-gray-100 text-gray-900 px-4 py-2 whitespace-pre-wrap"
              }
            >
              {m.content}
            </div>
          </div>
        ))}
        {isSending && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-2xl bg-gray-100 text-gray-900 px-4 py-2">
              Typing...
            </div>
          </div>
        )}
      </div>
      <div className="mt-3 flex items-end gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message…"
          className="flex-1 min-h-[48px] max-h-[140px] border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          disabled={isSending || !input.trim()}
          className="h-[48px] px-4 bg-blue-600 text-white rounded-md disabled:opacity-50"
        >
          Send
        </button>
      </div>
      <div className="mt-2 text-xs text-gray-500">
        Press Enter to send, Shift+Enter for a new line.
      </div>
    </div>
  );
}
