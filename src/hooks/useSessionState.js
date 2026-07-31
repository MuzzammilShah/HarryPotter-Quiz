import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'hpquiz:session:v1'

const DEFAULT_STATE = {
  username: '',
  house: null,
  screen: 'landing', // 'landing' | 'quiz' | 'results' | 'certificate'
  quiz: {
    questionIds: [],
    optionOrders: {},
    currentIndex: 0,
    answers: {},
    score: 0,
  },
  completedAt: null,
}

function readInitialState() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_STATE
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object' || !('screen' in parsed) || !('quiz' in parsed)) {
      return DEFAULT_STATE
    }
    return { ...DEFAULT_STATE, ...parsed, quiz: { ...DEFAULT_STATE.quiz, ...parsed.quiz } }
  } catch {
    return DEFAULT_STATE
  }
}

export function useSessionState() {
  const [state, setState] = useState(readInitialState)

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // sessionStorage unavailable (e.g. Safari private mode) — degrade to in-memory only
    }
  }, [state])

  const updateState = useCallback((partial) => {
    setState((prev) => ({
      ...prev,
      ...(typeof partial === 'function' ? partial(prev) : partial),
    }))
  }, [])

  const updateQuiz = useCallback((partial) => {
    setState((prev) => ({
      ...prev,
      quiz: {
        ...prev.quiz,
        ...(typeof partial === 'function' ? partial(prev.quiz) : partial),
      },
    }))
  }, [])

  const resetSession = useCallback(() => {
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
    setState(DEFAULT_STATE)
  }, [])

  return { state, updateState, updateQuiz, resetSession }
}
