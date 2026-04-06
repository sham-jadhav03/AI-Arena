import type { ArenaResponse } from '../services/api.service'
import SolutionCard from './SolutionCard'
import JudgeVerdict from './JudgeVerdict'

interface MessageThreadProps {
  data: ArenaResponse
  index: number
}

export default function MessageThread({ data, index }: MessageThreadProps) {
  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* User Problem Bubble */}
      <div className="flex justify-end">
        <div className="max-w-2xl bg-indigo-600 text-white rounded-2xl rounded-tr-sm px-5 py-3.5 shadow-[0_4px_20px_rgba(53,37,205,0.18)]">
          <p className="text-sm leading-relaxed">{data.problem}</p>
          <span className="mt-1.5 block text-[10px] text-indigo-300 tracking-wide">
            #{index + 1}
          </span>
        </div>
      </div>

      {/* Solutions Side-by-Side */}
      <div className="grid grid-cols-2 gap-4">
        <SolutionCard
          label="Solution A"
          content={data.solution_1}
          score={data.judge.solution_1_score}
          index={1}
        />
        <SolutionCard
          label="Solution B"
          content={data.solution_2}
          score={data.judge.solution_2_score}
          index={2}
        />
      </div>

      {/* Judge Verdict */}
      <JudgeVerdict
        score1={data.judge.solution_1_score}
        score2={data.judge.solution_2_score}
        reasoning1={data.judge.solution_1_reasoning}
        reasoning2={data.judge.solution_2_reasoning}
      />
    </div>
  )
}
