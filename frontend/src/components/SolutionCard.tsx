import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface SolutionCardProps {
  label: string
  content: string
  score: number
  index: 1 | 2
}

export default function SolutionCard({ label, content, score, index }: SolutionCardProps) {
  const scoreColor =
    score >= 9
      ? 'text-emerald-600 bg-emerald-50'
      : score >= 7
        ? 'text-indigo-600 bg-indigo-50'
        : 'text-orange-600 bg-orange-50'

  return (
    <div className="flex flex-col bg-white rounded-2xl border border-[#c7c4d826] shadow-[0_12px_40px_rgba(25,28,29,0.04)] overflow-hidden">
      {/* Card Header */}
      <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[#edeeef]">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
            {index}
          </span>
          <span className="text-xs font-semibold tracking-widest uppercase text-[#464555]">
            {label}
          </span>
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${scoreColor}`}>
          {score}/10
        </span>
      </div>

      {/* Markdown Body */}
      <div className="px-6 py-5 flex-1 overflow-auto prose prose-sm prose-slate max-w-none
        prose-headings:font-semibold prose-headings:text-[#191c1d] prose-headings:tracking-tight
        prose-p:text-[#464555] prose-p:leading-relaxed
        prose-code:bg-[#f3f4f5] prose-code:text-indigo-700 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs
        prose-pre:bg-[#f3f4f5] prose-pre:rounded-xl prose-pre:text-xs
        prose-strong:text-[#191c1d]
        prose-li:text-[#464555]">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </div>
  )
}
