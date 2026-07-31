import { motion, AnimatePresence } from 'framer-motion'
import AnswerOption from './AnswerOption'

export default function QuestionCard({ question, options, selectedIndex, correctIndex, locked, onSelect }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        className="flex w-full max-w-lg flex-col gap-6"
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -24 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <div className="text-center">
          <span className="mb-3 inline-block rounded-full border border-[rgba(244,236,216,0.25)] px-4 py-1 font-ui text-xs uppercase tracking-[0.25em] text-[rgba(244,236,216,0.7)]">
            {question.difficulty}
          </span>
          <h2 className="font-display text-xl font-semibold leading-snug text-[#f4ecd8] sm:text-2xl">
            {question.question}
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {options.map((option, index) => {
            let status = 'idle'
            if (locked) {
              if (index === correctIndex) status = 'reveal-correct'
              if (index === selectedIndex && index !== correctIndex) status = 'incorrect'
            }
            return (
              <AnswerOption
                key={option}
                index={index}
                text={option}
                status={status}
                disabled={locked}
                onSelect={onSelect}
              />
            )
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
