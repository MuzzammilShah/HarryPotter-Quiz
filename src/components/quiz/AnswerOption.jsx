import { motion } from 'framer-motion'

const LETTERS = ['A', 'B', 'C', 'D']

// status: 'idle' | 'correct' | 'incorrect' | 'reveal-correct' (shown green because
// it was the right answer, even though the user picked a different option)
export default function AnswerOption({ index, text, status, disabled, onSelect }) {
  const letter = LETTERS[index] ?? index + 1

  const stateClasses = {
    idle: 'border-[rgba(244,236,216,0.18)] bg-[rgba(10,15,30,0.45)] hover:border-[rgba(244,236,216,0.4)]',
    correct:
      'border-[var(--feedback-correct)] bg-[rgba(var(--feedback-correct-rgb),0.18)] shadow-[0_0_22px_rgba(var(--feedback-correct-rgb),0.5)]',
    'reveal-correct':
      'border-[var(--feedback-correct)] bg-[rgba(var(--feedback-correct-rgb),0.18)] shadow-[0_0_22px_rgba(var(--feedback-correct-rgb),0.5)]',
    incorrect:
      'border-[var(--feedback-incorrect)] bg-[rgba(var(--feedback-incorrect-rgb),0.18)] shadow-[0_0_22px_rgba(var(--feedback-incorrect-rgb),0.5)]',
  }

  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={() => onSelect(index)}
      className={`themed-transition flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left disabled:cursor-default sm:gap-4 sm:rounded-2xl sm:px-5 sm:py-4 ${stateClasses[status]}`}
      animate={status === 'incorrect' ? { x: [0, -8, 8, -6, 6, 0] } : {}}
      transition={status === 'incorrect' ? { duration: 0.4 } : {}}
      whileHover={status === 'idle' && !disabled ? { scale: 1.015 } : {}}
      whileTap={status === 'idle' && !disabled ? { scale: 0.985 } : {}}
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[rgba(244,236,216,0.35)] font-display text-xs font-semibold text-[#f4ecd8] sm:h-9 sm:w-9 sm:text-sm">
        {letter}
      </span>
      <span className="font-ui text-sm font-medium text-[#f4ecd8] sm:text-base">{text}</span>
      {(status === 'correct' || status === 'reveal-correct') && (
        <span className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--feedback-correct)] text-[var(--feedback-correct)] sm:h-7 sm:w-7">
          ✓
        </span>
      )}
      {status === 'incorrect' && (
        <span className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--feedback-incorrect)] text-[var(--feedback-incorrect)] sm:h-7 sm:w-7">
          ✕
        </span>
      )}
    </motion.button>
  )
}
