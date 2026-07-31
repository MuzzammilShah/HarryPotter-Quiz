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
      className={`themed-transition flex w-full items-center gap-4 rounded-2xl border px-5 py-4 text-left disabled:cursor-default ${stateClasses[status]}`}
      animate={status === 'incorrect' ? { x: [0, -8, 8, -6, 6, 0] } : {}}
      transition={status === 'incorrect' ? { duration: 0.4 } : {}}
      whileHover={status === 'idle' && !disabled ? { scale: 1.015 } : {}}
      whileTap={status === 'idle' && !disabled ? { scale: 0.985 } : {}}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[rgba(244,236,216,0.35)] font-display text-sm font-semibold text-[#f4ecd8]">
        {letter}
      </span>
      <span className="font-ui text-base font-medium text-[#f4ecd8]">{text}</span>
      {(status === 'correct' || status === 'reveal-correct') && (
        <span className="ml-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--feedback-correct)] text-[var(--feedback-correct)]">
          ✓
        </span>
      )}
      {status === 'incorrect' && (
        <span className="ml-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--feedback-incorrect)] text-[var(--feedback-incorrect)]">
          ✕
        </span>
      )}
    </motion.button>
  )
}
