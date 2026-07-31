import { useEffect, useMemo, useRef, useState } from 'react'
import questionsBank from '../../data/questions.json'
import { buildQuestionsById } from '../../lib/quizSelection'
import { ANSWER_DELAY_MS } from '../../config/quizConfig'
import QuestionCard from './QuestionCard'
import ProgressBar from './ProgressBar'
import ScoreBadge from './ScoreBadge'

const QUESTIONS_BY_ID = buildQuestionsById(questionsBank.questions)

export default function Quiz({ quizState, updateQuiz, onComplete }) {
  const { questionIds, optionOrders, currentIndex, answers, score } = quizState
  const total = questionIds.length

  const currentId = questionIds[currentIndex]
  const currentQuestion = QUESTIONS_BY_ID[currentId]
  const options = optionOrders[currentId] ?? []
  const existingAnswer = answers[currentId]

  const [locked, setLocked] = useState(Boolean(existingAnswer))
  const timeoutRef = useRef(null)

  // Re-sync local "locked" flag whenever the question changes (e.g. after
  // advancing, or after rehydrating from sessionStorage on a fresh mount).
  // If we rehydrate onto an already-answered question (e.g. the tab was
  // closed during the auto-advance delay), advance immediately rather than
  // getting stuck on a revealed answer with no pending timer.
  useEffect(() => {
    const alreadyAnswered = Boolean(answers[currentId])
    setLocked(alreadyAnswered)

    if (alreadyAnswered) {
      timeoutRef.current = setTimeout(() => {
        if (currentIndex + 1 >= total) {
          onComplete()
        } else {
          updateQuiz({ currentIndex: currentIndex + 1 })
        }
      }, ANSWER_DELAY_MS)
    }

    return () => clearTimeout(timeoutRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId, answers])

  const correctIndex = useMemo(
    () => options.findIndex((opt) => opt === currentQuestion?.correctAnswer),
    [options, currentQuestion],
  )

  if (!currentQuestion) return null

  function handleSelect(index) {
    if (locked) return
    const selectedText = options[index]
    const correct = selectedText === currentQuestion.correctAnswer

    // Writing the answer updates `answers`, which re-runs the effect above
    // and schedules the auto-advance — keeping a single source of truth for
    // the advance timer instead of duplicating it here.
    updateQuiz((prev) => ({
      answers: { ...prev.answers, [currentId]: { selected: selectedText, correct } },
      score: correct ? prev.score + 1 : prev.score,
    }))
    setLocked(true)
  }

  const selectedIndex = existingAnswer ? options.indexOf(existingAnswer.selected) : -1

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-12">
      <div className="flex w-full max-w-lg flex-col items-center gap-3">
        <ProgressBar current={currentIndex} total={total} />
        <p className="font-ui text-xs uppercase tracking-[0.2em] text-[rgba(244,236,216,0.6)]">
          Question {currentIndex + 1} of {total}
        </p>
        <ScoreBadge score={score} total={total} />
      </div>

      <QuestionCard
        question={currentQuestion}
        options={options}
        selectedIndex={locked ? selectedIndex : -1}
        correctIndex={correctIndex}
        locked={locked}
        onSelect={handleSelect}
      />
    </div>
  )
}
