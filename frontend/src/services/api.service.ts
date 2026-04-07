import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000',
})

export interface JudgeResult {
  solution_1_score: number
  solution_2_score: number
  solution_1_reasoning: string
  solution_2_reasoning: string
}

export interface ArenaResponse {
  problem: string
  solution_1: string
  solution_2: string
  judge: JudgeResult
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  result: T
}

export async function invokeArena(problem: string): Promise<ArenaResponse> {
  const response = await api.post<ApiResponse<ArenaResponse>>('/invoke', { input: problem })
  console.log('API Response:', response.data)
  
  if (!response.data.success) {
    throw new Error(response.data.message || 'Failed to execute arena')
  }

  return response.data.result
}
