"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRobot,
  FaPaperPlane,
  FaXmark,
  FaRegCommentDots,
} from "react-icons/fa6";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function AIChatAssistant() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! Welcome to LearnTech. I'm your AI Chat Assistant. Ask me anything about our courses or navigate around the site! How can I help you?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggestions that appear at the bottom
  const [suggestions, setSuggestions] = useState<string[]>([
    "Show all courses",
    "How do I add a course?",
    "Suggest a beginner course",
  ]);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Intercept Markdown Links and render as Next.js Navigation Links
  const renderMessageContent = (text: string) => {
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      const [fullMatch, linkText, url] = match;
      const matchIndex = match.index;

      // Text before the link
      if (matchIndex > lastIndex) {
        parts.push(text.substring(lastIndex, matchIndex));
      }

      // Link
      parts.push(
        <span
          key={matchIndex}
          onClick={() => {
            if (url.startsWith("/")) {
              router.push(url);
            } else {
              window.open(url, "_blank");
            }
          }}
          className="text-[#00ffaa] hover:text-[#00ffcc] font-black underline cursor-pointer hover:underline-offset-2 transition-all mx-1 inline-block"
        >
          {linkText}
        </span>
      );

      lastIndex = matchIndex + fullMatch.length;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  // Handle Form Submission
  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsgId = Date.now().toString();
    const newUserMessage: Message = {
      id: userMsgId,
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsTyping(true);

    const assistantMsgId = (Date.now() + 1).toString();
    
    // Add an empty assistant message first, which we will stream text into
    setMessages((prev) => [
      ...prev,
      { id: assistantMsgId, role: "assistant", content: "" },
    ]);

    try {
      const updatedMessages = [...messages, newUserMessage];
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) throw new Error("Failed to connect to chat stream");

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let streamedResponse = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          streamedResponse += chunk;

          // Update the last assistant message
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMsgId
                ? { ...msg, content: streamedResponse }
                : msg
            )
          );
        }
      }
    } catch (error) {
      console.error("Chat streaming error:", error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId
            ? {
                ...msg,
                content:
                  "I encountered an error trying to process your request. Please ensure the server is online and try again.",
              }
            : msg
        )
      );
    } finally {
      setIsTyping(false);
    }
  };

  // Handle Suggested Prompts Click
  const handleSuggestionClick = (prompt: string) => {
    handleSendMessage(prompt);
    
    // Update suggested prompts list dynamically
    if (prompt.toLowerCase().includes("course")) {
      setSuggestions([
        "Suggest a Backend course",
        "What is the cheapest course?",
        "Go to All Courses Page",
      ]);
    } else if (prompt.toLowerCase().includes("add")) {
      setSuggestions([
        "Where is Login Page?",
        "Manage existing courses",
        "Show course catalog",
      ]);
    } else {
      setSuggestions([
        "Show all courses",
        "How do I add a course?",
        "Suggest a beginner course",
      ]);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center justify-center w-14 h-14 bg-[#0d1326] border border-[#00ffaa]/50 rounded-full shadow-[0_0_20px_rgba(0,255,170,0.3)] text-[#00ffaa] cursor-pointer focus:outline-none overflow-hidden"
        >
          <div className="absolute inset-0 bg-radial-gradient from-[#00ffaa]/10 to-transparent animate-pulse" />
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <FaXmark size={22} />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                className="flex items-center justify-center"
              >
                <FaRegCommentDots size={22} className="animate-pulse" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-2rem)] h-[550px] z-50 bg-[#0c1322]/90 border border-white/10 rounded-[2rem] shadow-2xl flex flex-col backdrop-blur-xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#111827]/70 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-10 h-10 bg-[#00ffaa]/10 border border-[#00ffaa]/20 rounded-full text-[#00ffaa]">
                  <FaRobot size={18} />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-[#0c1322] animate-pulse" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-black tracking-wide leading-none">
                    LearnTech AI
                  </h4>
                  <span className="text-[10px] text-slate-400 font-bold">
                    Virtual Assistant
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <FaXmark size={18} />
              </button>
            </div>

            {/* Message History */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#00ffaa]/10 border border-[#00ffaa]/20 text-white rounded-tr-none"
                        : "bg-[#111827] border border-white/5 text-slate-300 rounded-tl-none"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">
                      {msg.content
                        ? renderMessageContent(msg.content)
                        : "..."}
                    </p>
                  </div>
                </div>
              ))}

              {/* Typing Bouncing Indicators */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#111827] border border-white/5 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#00ffaa] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-[#00ffaa] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-[#00ffaa] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions Prompts */}
            {!isTyping && suggestions.length > 0 && (
              <div className="px-6 py-2 flex flex-wrap gap-2 justify-start border-t border-white/5 bg-[#111827]/20">
                {suggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(sug)}
                    className="text-[10px] bg-[#0c1322] border border-white/10 text-[#00ffaa] hover:bg-[#00ffaa]/10 hover:border-[#00ffaa]/30 px-3 py-1.5 rounded-full font-bold cursor-pointer transition-all duration-300 active:scale-[0.98]"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-4 bg-[#111827]/40 border-t border-white/5 flex gap-2 items-center"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about courses, links, or info..."
                className="flex-1 bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white text-xs outline-none focus:border-[#00ffaa] transition-all"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="flex items-center justify-center w-10 h-10 bg-[#00ffaa] text-black hover:bg-[#00ffcc] disabled:bg-slate-700 disabled:text-slate-400 rounded-xl transition-all cursor-pointer shadow-lg active:scale-95"
              >
                <FaPaperPlane size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
