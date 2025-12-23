import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- PDF.js (client-side text extraction) ---
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;


const TABS = {
    CHAT: "Ask AI",
    PDF: "PDF Helper",
};

const ChatBotWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(TABS.CHAT);

    // --- Chat state ---
    const [chatMessages, setChatMessages] = useState([]);
    const [chatInput, setChatInput] = useState("");
    const [chatLoading, setChatLoading] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false);
    const [abortController, setAbortController] = useState(null);

    // --- PDF helper state ---
    const [pdfFile, setPdfFile] = useState(null);
    const [pdfText, setPdfText] = useState("");
    const [pdfLoading, setPdfLoading] = useState(false);
    const [pdfSummary, setPdfSummary] = useState("");
    const [pdfQuestion, setPdfQuestion] = useState("");
    const [pdfAnswer, setPdfAnswer] = useState("");
    const fileInputRef = useRef(null);
    const chatBotRef = useRef(null);

    // --- Puter ready flag (defensive) ---
    const [puterReady, setPuterReady] = useState(false);
    useEffect(() => {
        const t = setInterval(() => {
            if (window.puter?.ai?.chat) {
                setPuterReady(true);
                clearInterval(t);
                // console.log("✅ Puter.js ready");
            }
        }, 250);
        return () => clearInterval(t);
    }, []);

    // --- Click outside to close chatbot ---
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && chatBotRef.current && !chatBotRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isOpen]);

    // ========== Helpers ==========
    const safeReply = (res) =>
        // puter returns different shapes across versions; cover common ones
        res?.output ||
        res?.text ||
        res?.message ||
        res?.choices?.[0]?.message?.content ||
        (typeof res === "string" ? res : null) ||
        "⚠️ No response";

    const sendPrompt = async (prompt, { model = "gpt-4o-mini", stream = false } = {}) => {
        if (!puterReady) throw new Error("Puter not ready");
        // puter.ai.chat(promptString[, options])
        if (stream) {
            // streaming per Puter example: chat(prompt, { model, stream: true })
            return window.puter.ai.chat(prompt, { model, stream: true });
        }
        return window.puter.ai.chat({ model, prompt });
    };

    // ========== TAB 1: Ask AI ==========
    const stopResponse = () => {
        if (abortController) {
            abortController.abort();
            setAbortController(null);
        }
        setIsStreaming(false);
        setChatLoading(false);
        // Finalize any streaming message
        setChatMessages((prev) =>
            prev.map((m) => (m.sender === "bot_stream" ? { ...m, sender: "bot", text: m.text + "\n\n[Response stopped by user]" } : m))
        );
    };

    const handleChatSend = async () => {
        const text = chatInput.trim();
        if (!text) return;

        setChatMessages((m) => [...m, { sender: "user", text }]);
        setChatInput("");
        setChatLoading(true);
        setIsStreaming(true);

        const controller = new AbortController();
        setAbortController(controller);

        try {
            // Try streaming for nicer UX; gracefully fall back if not supported
            let streamed = false;
            try {
                const stream = await sendPrompt(text, { model: "gpt-4o-mini", stream: true });
                let acc = "";
                streamed = true;
                for await (const part of stream) {
                    if (controller.signal.aborted) break;
                    
                    const chunk =
                        part?.text ||
                        part?.delta?.content ||
                        part?.choices?.[0]?.delta?.content ||
                        "";
                    if (chunk) {
                        acc += chunk;
                        // live update the last bot bubble
                        setChatMessages((prev) => {
                            const out = [...prev];
                            const last = out[out.length - 1];
                            if (last?.sender === "bot_stream") {
                                out[out.length - 1] = { sender: "bot_stream", text: acc };
                            } else {
                                out.push({ sender: "bot_stream", text: acc });
                            }
                            return out;
                        });
                    }
                }
                // finalize stream bubble
                if (!controller.signal.aborted) {
                    setChatMessages((prev) =>
                        prev.map((m) => (m.sender === "bot_stream" ? { ...m, sender: "bot" } : m))
                    );
                }
            } catch (error) {
                if (error.name === 'AbortError' || controller.signal.aborted) {
                    return; // User stopped the response
                }
                // non-stream fallback
                const res = await sendPrompt(text, { model: "gpt-4o-mini", stream: false });
                const reply = safeReply(res);
                setChatMessages((m) => [...m, { sender: "bot", text: reply }]);
            }

            if (!streamed) {
                // already handled in fallback
            }
        } catch (err) {
            if (err.name === 'AbortError' || controller.signal.aborted) {
                return; // User stopped the response
            }
            console.error("Chat error:", err);
            setChatMessages((m) => [
                ...m,
                { sender: "bot", text: "⚠️ Could not reach AI. Please try again." },
            ]);
        } finally {
            setChatLoading(false);
            setIsStreaming(false);
            setAbortController(null);
        }
    };

    const handleChatKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleChatSend();
        }
    };

    // ========== TAB 2: PDF Helper ==========
    const onPickPDF = (e) => {
        const f = e.target.files?.[0];
        if (f && f.type === "application/pdf") {
            setPdfFile(f);
            setPdfSummary("");
            setPdfAnswer("");
            extractPdfText(f);
        } else {
            setPdfFile(null);
            setPdfText("");
        }
    };

    const extractPdfText = async (file) => {
        setPdfLoading(true);
        setPdfText("");
        try {
            const buf = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
            let text = "";
            for (let p = 1; p <= pdf.numPages; p++) {
                const page = await pdf.getPage(p);
                const content = await page.getTextContent();
                const strings = content.items.map((it) => it.str).join(" ");
                text += strings + "\n";
                // Optional: early stop if text is huge; keeps prompt short
                if (text.length > 60_000) break;
            }
            setPdfText(text.trim());
        } catch (err) {
            console.error("PDF parse error:", err);
            setPdfText("");
        } finally {
            setPdfLoading(false);
        }
    };

    const summarizePdf = async () => {
        if (!pdfText) return;
        setPdfSummary("");
        setPdfAnswer("");
        setPdfLoading(true);
        try {
            // concise, helpful bullets
            const prompt = `
You are a study assistant. Read the following PDF text and produce a short, useful summary:
- 5 to 8 bullet points
- highlight key terms, formulas, or steps
- include one "TL;DR" line at the end
TEXT:
${pdfText.slice(0, 60000)}
      `.trim();

            // Try streaming
            let acc = "";
            try {
                const stream = await sendPrompt(prompt, { model: "gpt-4o-mini", stream: true });
                for await (const part of stream) {
                    const chunk =
                        part?.text ||
                        part?.delta?.content ||
                        part?.choices?.[0]?.delta?.content ||
                        "";
                    if (chunk) {
                        acc += chunk;
                        setPdfSummary(acc);
                    }
                }
            } catch {
                const res = await sendPrompt(prompt, { model: "gpt-4o-mini", stream: false });
                acc = safeReply(res);
                setPdfSummary(acc);
            }
        } catch (e) {
            console.error(e);
            setPdfSummary("⚠️ Could not summarize this PDF.");
        } finally {
            setPdfLoading(false);
        }
    };

    const askAboutPdf = async () => {
        const q = pdfQuestion.trim();
        if (!q || !pdfText) return;
        setPdfAnswer("");
        setPdfLoading(true);
        try {
            const prompt = `
You answer ONLY from the provided PDF text. If the answer isn't there, say "Not found in the PDF".
Question: ${q}
PDF TEXT:
${pdfText.slice(0, 60000)}
      `.trim();

            // Try streaming
            let acc = "";
            try {
                const stream = await sendPrompt(prompt, { model: "gpt-4o-mini", stream: true });
                for await (const part of stream) {
                    const chunk =
                        part?.text ||
                        part?.delta?.content ||
                        part?.choices?.[0]?.delta?.content ||
                        "";
                    if (chunk) {
                        acc += chunk;
                        setPdfAnswer(acc);
                    }
                }
            } catch {
                const res = await sendPrompt(prompt, { model: "gpt-4o-mini", stream: false });
                const reply = safeReply(res);
                setPdfAnswer(reply);
            }
        } catch (e) {
            console.error(e);
            setPdfAnswer("⚠️ Could not answer from this PDF.");
        } finally {
            setPdfLoading(false);
        }
    };

    // ========== UI ==========
    const Bubble = ({ sender, children }) => (
        <div
            className={`p-2 rounded-lg max-w-[80%] text-sm ${sender === "user"
                ? "ml-auto bg-blue-600 text-white"
                : "mr-auto bg-gray-200 text-gray-900"
                }`}
        >
            {children}
        </div>
    );

    return (
        <div className="fixed bottom-6 right-6 z-60 flex items-end">
            <AnimatePresence mode="wait">
                {isOpen ? (
                    <motion.div
                        ref={chatBotRef}
                        key="chatbot-open"
                        initial={{ 
                            opacity: 0, 
                            scale: 0.8,
                            y: 20,
                            transformOrigin: "bottom right"
                        }}
                        animate={{ 
                            opacity: 1, 
                            scale: 1,
                            y: 0,
                            transformOrigin: "bottom right"
                        }}
                        exit={{ 
                            opacity: 0, 
                            scale: 0.8,
                            y: 20,
                            transformOrigin: "bottom right"
                        }}
                        transition={{ 
                            duration: 0.3,
                            ease: [0.4, 0, 0.2, 1],
                            scale: { type: "spring", stiffness: 300, damping: 30 }
                        }}
                        className="
            bg-white rounded-xl shadow-2xl border overflow-hidden flex flex-col
            w-full h-[70vh]        /* 📱 Mobile */
            sm:w-[90%] sm:max-w-[400px] sm:h-[70vh]  /* 📱 Tablet */
            lg:w-[340px] lg:h-[560px]  /* 💻 Desktop */
          "
                    >
                    {/* Header */}
                    <div className="bg-blue-400  
        dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
        transition-colors duration-700 text-white px-3 py-2 flex items-center justify-between">
                        <div className="font-semibold text-white dark:text-blue-700">CGCStudyHub Assistant</div>
                        <div className="flex items-center gap-2">
                            <span
                                className={`w-2 h-2 rounded-full ${puterReady ? "bg-green-400" : "bg-yellow-300"
                                    }`}
                                title={puterReady ? "Online" : "Loading AI..."}
                            />
                            <button
                                className="text-white/80 hover:text-white"
                                onClick={() => setIsOpen(false)}
                            >
                                ✕
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b">
                        {[TABS.CHAT, TABS.PDF].map((t) => (
                            <button
                                key={t}
                                onClick={() => setActiveTab(t)}
                                className={`flex-1 py-2 text-sm ${activeTab === t
                                    ? "border-b-2 border-blue-700 text-blue-700 font-semibold"
                                    : "text-gray-600 hover:text-blue-700"
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-3 bg-gray-400 space-y-3">
                        {activeTab === TABS.CHAT ? (
                            <>
                                {chatMessages.map((m, i) => (
                                    <Bubble key={i} sender={m.sender}>
                                        {m.text}
                                    </Bubble>
                                ))}
                                {chatLoading && <Bubble sender="bot">⏳ Thinking…</Bubble>}
                            </>
                        ) : (
                            <>
                                {/* PDF Picker */}
                                <div className="space-y-2">
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="application/pdf"
                                            onChange={onPickPDF}
                                            className="text-xs sm:text-sm rounded p-2 border border-gray-400 file:border-0 file:rounded file:px-2 file:py-1 file:bg-blue-600 file:text-white file:text-xs flex-1"
                                        />

                                        {pdfFile && (
                                            <button
                                                onClick={() => {
                                                    setPdfFile(null);
                                                    setPdfText("");
                                                    setPdfSummary("");
                                                    setPdfAnswer("");
                                                    if (fileInputRef.current) fileInputRef.current.value = "";
                                                }}
                                                className="text-xs px-3 py-2 border rounded bg-red-50 hover:bg-red-100 text-red-600 border-red-200 flex-shrink-0"
                                            >
                                                Clear
                                            </button>
                                        )}
                                    </div>
                                    
                                    {/* File name display for mobile */}
                                    {pdfFile && (
                                        <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded border">
                                            <span className="font-medium">File:</span> 
                                            <span className="break-all">{pdfFile.name}</span>
                                        </div>
                                    )}

                                    {pdfLoading && (
                                        <div className="text-xs text-gray-600">⏳ Processing PDF…</div>
                                    )}

                                    {pdfText && (
                                        <div className="text-[11px] text-gray-500">
                                            Extracted ~{Math.min(pdfText.length, 60000).toLocaleString()} chars
                                            {pdfText.length > 60000 ? " (truncated)" : ""}
                                        </div>
                                    )}

                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <button
                                            onClick={summarizePdf}
                                            disabled={!pdfText || pdfLoading || !puterReady}
                                            className="px-3 py-2 rounded bg-blue-600 text-white text-sm disabled:opacity-50 flex-1 sm:flex-none"
                                        >
                                            Summarize PDF
                                        </button>
                                        <button
                                            onClick={() => {
                                                setPdfSummary("");
                                                setPdfAnswer("");
                                            }}
                                            className="px-3 py-2 rounded border text-sm flex-1 sm:flex-none"
                                        >
                                            Clear Output
                                        </button>
                                    </div>

                                    {pdfSummary && (
                                        <div className="mt-2 p-2 bg-gray-100 rounded text-sm whitespace-pre-wrap">
                                            {pdfSummary}
                                        </div>
                                    )}

                                    {/* Ask about the PDF */}
                                    <div className="mt-3 space-y-2">
                                        <input
                                            value={pdfQuestion}
                                            onChange={(e) => setPdfQuestion(e.target.value)}
                                            placeholder="Ask a question about this PDF…"
                                            className="w-full border rounded p-2 text-sm"
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") askAboutPdf();
                                            }}
                                        />
                                        <button
                                            onClick={askAboutPdf}
                                            disabled={!pdfText || !pdfQuestion.trim() || pdfLoading || !puterReady}
                                            className="w-full sm:w-auto px-3 py-2 rounded bg-blue-600 text-white text-sm disabled:opacity-50"
                                        >
                                            Ask from PDF
                                        </button>

                                        {pdfAnswer && (
                                            <div className="p-2 bg-gray-100 rounded text-sm whitespace-pre-wrap">
                                                {pdfAnswer}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Footer input (for Chat tab) */}
                    {activeTab === TABS.CHAT && (
                        <div className="p-2 border-t flex gap-2">
                            <textarea
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                onKeyDown={handleChatKeyDown}
                                placeholder={puterReady ? "Type a message…" : "Loading AI…"}
                                className="flex-1 border rounded p-2 resize-none text-sm max-h-[120px] overflow-y-auto"
                                rows={1}
                                disabled={!puterReady || chatLoading}
                            />
                            {isStreaming ? (
                                <button
                                    onClick={stopResponse}
                                    className="bg-red-600 hover:bg-red-700 text-white px-3 rounded text-sm transition-colors"
                                    title="Stop response"
                                >
                                    ⏹️ Stop
                                </button>
                            ) : (
                                <button
                                    onClick={handleChatSend}
                                    disabled={!puterReady || chatLoading || !chatInput.trim()}
                                    className="bg-blue-600 text-white px-3 rounded text-sm disabled:opacity-50"
                                >
                                    Send
                                </button>
                            )}
                        </div>
                    )}
                    </motion.div>
                ) : (
                    <motion.button
                        key="chatbot-closed"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ 
                            duration: 0.2,
                            ease: [0.4, 0, 0.2, 1]
                        }}
                    onClick={() => setIsOpen(true)}
                    className="
    w-12 h-12 sm:w-16 sm:h-16 
    bg-white rounded-full flex items-center justify-center 
    shadow-lg transition transform hover:scale-110 
    hover:bg-blue-600
  "
                    title="Open Study Assistant"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="url(#grad1)"
                        className="w-6 h-6"
                    >
                        <defs>
                            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#2563eb" />   {/* blue */}
                                <stop offset="100%" stopColor="#60a5fa" /> {/* lighter blue */}
                            </linearGradient>
                        </defs>
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.5 8.5 0 018 8z" />
                    </svg>
                </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ChatBotWidget;
