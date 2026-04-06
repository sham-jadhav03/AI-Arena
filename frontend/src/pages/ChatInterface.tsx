import { useEffect, useRef } from 'react'
import { useChat } from '../hooks/useChat'
import MessageThread from '../components/MessageThread'
import Sidebar from '../components/Sidebar'

export default function ChatInterface() {
  const {
    history,
    input,
    loading,
    error,
    activeIndex,
    handleSend,
    handleInput,
    handleNewChat,
  } = useChat()

  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (activeIndex === null) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [history, activeIndex])

  // Wrap handleSend to add UI specific logic (resetting textarea height)
  const onSend = async () => {
    if (!input.trim() || loading) return
    await handleSend()
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
  }

  // Wrap handleNewChat to add UI specific logic (scrolling)
  const onNewChat = () => {
    handleNewChat()
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
  }

  // Which threads to display: all (normal view) or single (sidebar click)
  const displayedHistory = activeIndex !== null ? [history[activeIndex]] : history

  return (
    <div className="flex h-screen w-screen bg-[#f8f9fa] overflow-hidden font-[Inter,sans-serif]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <main className="flex flex-col flex-1 min-w-0 h-full">
        {/* Header */}
        <header className="shrink-0 h-14 flex items-center justify-between px-8 border-b border-[#edeeef] bg-[#f8f9fa]">
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-semibold text-[#191c1d] tracking-tight">
              {activeIndex !== null
                ? `Problem #${activeIndex + 1}`
                : 'Chat'}
            </h1>
            {activeIndex !== null && (
              <button
                onClick={onNewChat}
                className="text-[11px] text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                ← Back to all
              </button>
            )}
          </div>
          <span className="text-[11px] text-[#777587] tracking-widest uppercase">
            {history.length} {history.length === 1 ? 'conversation' : 'conversations'}
          </span>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-8 py-8 space-y-12">
            {/* Empty state */}
            {history.length === 0 && !loading && (
              <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-indigo-600 to-indigo-400 flex items-center justify-center shadow-[0_8px_24px_rgba(53,37,205,0.2)]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3L21 8.5V15.5L12 21L3 15.5V8.5L12 3Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="3" fill="white" />
                  </svg>
                </div>
                <div>
                  <p className="text-base font-semibold text-[#191c1d] tracking-tight">
                    Welcome to AI Arena
                  </p>
                  <p className="text-sm text-[#777587] mt-1 max-w-xs leading-relaxed">
                    Describe a problem below to get two AI-generated solutions with a judge's verdict.
                  </p>
                </div>
              </div>
            )}

            {/* Message Threads */}
            {displayedHistory.map((item, i) => (
              <MessageThread
                key={activeIndex !== null ? activeIndex : i}
                data={item}
                index={activeIndex !== null ? activeIndex : i}
              />
            ))}

            {/* Loading skeleton */}
            {loading && (
              <div className="space-y-5 animate-pulse">
                <div className="flex justify-end">
                  <div className="h-10 w-64 bg-indigo-200 rounded-2xl rounded-tr-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-52 bg-white rounded-2xl border border-[#edeeef]" />
                  <div className="h-52 bg-white rounded-2xl border border-[#edeeef]" />
                </div>
                <div className="h-28 bg-[#e1e3e4] rounded-2xl" />
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="flex items-start gap-3 bg-red-50 border border-red-100 text-red-700 text-sm rounded-2xl px-5 py-4">
                <svg className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="#ef4444" strokeWidth="1.5" />
                  <path d="M8 5v3.5M8 11h.01" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </div>

        {/* Input Bar */}
        <div className="shrink-0 px-8 py-5 border-t border-[#edeeef] bg-[#f8f9fa]">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-end gap-3 bg-white rounded-2xl border border-[#edeeef] px-4 py-3 shadow-[0_4px_24px_rgba(25,28,29,0.05)] focus-within:border-indigo-300 focus-within:shadow-[0_4px_24px_rgba(53,37,205,0.08)] transition-all duration-200">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleInput}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        onSend();
                    }
                }}
                placeholder="Describe your problem… (Enter to send, Shift+Enter for newline)"
                rows={1}
                disabled={loading}
                className="flex-1 resize-none bg-transparent text-sm text-[#191c1d] placeholder:text-[#777587] outline-none leading-relaxed min-h-6 max-h-40 disabled:opacity-50"
              />
              <button
                onClick={onSend}
                disabled={loading || !input.trim()}
                id="send-btn"
                className="shrink-0 w-9 h-9 rounded-xl bg-linear-to-br from-[#3525cd] to-indigo-500
                  flex items-center justify-center text-white
                  hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed
                  transition-all duration-150 shadow-[0_4px_12px_rgba(53,37,205,0.25)]"
              >
                {loading ? (
                  <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="5.5" stroke="white" strokeWidth="1.5" strokeDasharray="22" strokeDashoffset="10" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M12.5 7H1.5M12.5 7L8 2.5M12.5 7L8 11.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </div>
            <p className="mt-2 text-center text-[10px] text-[#777587]">
              Two AI models compete · Judge evaluates automatically
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}