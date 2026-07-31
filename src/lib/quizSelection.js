import { shuffle } from './shuffle'
import { QUESTIONS_PER_QUIZ } from '../config/quizConfig'

// Locks a fresh set of question ids + per-question shuffled option orders.
// Called exactly once per quiz (on "Begin"); the result is persisted as-is
// so re-renders / tab switches never reshuffle mid-quiz.
export function lockNewQuiz(bank, count = QUESTIONS_PER_QUIZ) {
  const chosen = shuffle(bank).slice(0, count)
  const questionIds = chosen.map((q) => q.id)
  const optionOrders = {}
  for (const q of chosen) {
    optionOrders[q.id] = shuffle(q.options)
  }
  return { questionIds, optionOrders }
}

export function buildQuestionsById(bank) {
  const map = {}
  for (const q of bank) map[q.id] = q
  return map
}
