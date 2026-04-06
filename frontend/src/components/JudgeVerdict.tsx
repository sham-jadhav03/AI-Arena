interface JudgeVerdictProps {
  score1: number
  score2: number
  reasoning1: string
  reasoning2: string
}

export default function JudgeVerdict({ score1, score2, reasoning1, reasoning2 }: JudgeVerdictProps) {
  const winner = score1 > score2 ? 1 : score2 > score1 ? 2 : null

  return (
    <div className="bg-[#e1e3e4] rounded-2xl px-6 py-5 space-y-4">
      {/* Title */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#464555]">
          Judge's Verdict
        </span>
        {winner && (
          <span className="ml-auto text-[11px] font-bold text-indigo-700 bg-indigo-50 px-3 py-0.5 rounded-full">
            Solution {winner} Wins
          </span>
        )}
        {!winner && (
          <span className="ml-auto text-[11px] font-bold text-[#464555] bg-white/70 px-3 py-0.5 rounded-full">
            Tie
          </span>
        )}
      </div>

      {/* Score Row */}
      <div className="grid grid-cols-2 gap-4">
        <ScoreItem label="Solution 1" score={score1} isWinner={winner === 1} reasoning={reasoning1} />
        <ScoreItem label="Solution 2" score={score2} isWinner={winner === 2} reasoning={reasoning2} />
      </div>
    </div>
  )
}

function ScoreItem({
  label,
  score,
  isWinner,
  reasoning,
}: {
  label: string
  score: number
  isWinner: boolean
  reasoning: string
}) {
  return (
    <div className={`rounded-xl p-4 space-y-2 ${isWinner ? 'bg-indigo-600 text-white' : 'bg-white/70 text-[#191c1d]'}`}>
      <div className="flex items-center justify-between">
        <span className={`text-[11px] font-semibold tracking-widest uppercase ${isWinner ? 'text-indigo-200' : 'text-[#464555]'}`}>
          {label}
        </span>
        <span className={`text-base font-bold ${isWinner ? 'text-white' : 'text-indigo-700'}`}>
          {score}<span className={`text-xs font-normal ${isWinner ? 'text-indigo-200' : 'text-[#777587]'}`}>/10</span>
        </span>
      </div>
      <p className={`text-xs leading-relaxed ${isWinner ? 'text-indigo-100' : 'text-[#464555]'}`}>{reasoning}</p>
    </div>
  )
}
