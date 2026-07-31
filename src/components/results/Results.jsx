import { motion } from 'framer-motion'
import { getRank } from '../../lib/scoring'
import { DECOR } from '../../config/assetPaths'
import { useImageFallback } from '../../hooks/useImageFallback'
import ScoreReveal from './ScoreReveal'
import RankBadge from './RankBadge'
import MagicButton from '../common/MagicButton'

export default function Results({ score, total, onViewCertificate, onPlayAgain }) {
  const rank = getRank(score)
  const highScore = score >= 9
  const { failed: patronusFailed, onError: onPatronusError } = useImageFallback(DECOR.patronusStag)

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-8 text-center sm:gap-8 sm:px-6 sm:py-12">
      <motion.p
        className="font-ui text-xs uppercase tracking-[0.25em] text-[rgba(244,236,216,0.7)] sm:text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Quiz Complete
      </motion.p>

      <ScoreReveal score={score} total={total} />

      {highScore && !patronusFailed && (
        <motion.img
          src={DECOR.patronusStag}
          onError={onPatronusError}
          alt=""
          className="h-20 w-20 opacity-80 sm:h-28 sm:w-28"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        />
      )}

      <RankBadge rank={rank} />

      <motion.div
        className="mt-3 flex flex-col items-center gap-2 sm:mt-4 sm:flex-row sm:gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <MagicButton onClick={onViewCertificate}>View Certificate</MagicButton>
        <MagicButton variant="ghost" onClick={onPlayAgain}>
          Play Again
        </MagicButton>
      </motion.div>
    </div>
  )
}
