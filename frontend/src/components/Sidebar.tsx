import { useChat } from '../hooks/useChat'

export default function Sidebar() {
  const { history, activeIndex, setActiveIndex, handleNewChat } = useChat()

  return (
    <aside className="w-[268px] min-w-[268px] h-full bg-[#f3f4f5] flex flex-col">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-[#edeeef]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L14 5.5V10.5L8 14L2 10.5V5.5L8 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
              <circle cx="8" cy="8" r="2" fill="white" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-[#191c1d] tracking-tight">AI Arena</span>
        </div>
      </div>

      {/* History List */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
        {history.length === 0 && (
          <p className="text-xs text-[#777587] px-3 py-4 text-center leading-relaxed">
            No conversations yet.<br />Send a problem to get started.
          </p>
        )}
        {history.map((item, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`w-full text-left px-3 py-2.5 rounded-xl transition-all duration-150 group ${
              activeIndex === i
                ? 'bg-white shadow-[0_2px_12px_rgba(25,28,29,0.06)] text-[#191c1d]'
                : 'text-[#464555] hover:bg-white/60'
            }`}
          >
            <p className="text-xs font-medium leading-snug line-clamp-2">{item.problem}</p>
            <div className="mt-1 flex gap-2">
              <span className="text-[10px] text-[#777587]">
                S1: {item.judge.solution_1_score}/10
              </span>
              <span className="text-[10px] text-[#777587]">·</span>
              <span className="text-[10px] text-[#777587]">
                S2: {item.judge.solution_2_score}/10
              </span>
            </div>
          </button>
        ))}
      </nav>

      {/* New Chat Button */}
      <div className="px-4 py-4 border-t border-[#edeeef]">
        <button
          onClick={handleNewChat}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
            bg-gradient-to-r from-[#3525cd] to-indigo-500 text-white text-xs font-semibold
            tracking-wide hover:opacity-90 active:scale-[0.98] transition-all duration-150
            shadow-[0_4px_16px_rgba(53,37,205,0.22)]"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1.5V12.5M1.5 7H12.5" stroke="white" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
          New Chat
        </button>
      </div>
    </aside>
  )
}
