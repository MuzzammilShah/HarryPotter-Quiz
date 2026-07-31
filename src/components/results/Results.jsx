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
    <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-12 text-center">
      <motion.p
        className="font-ui text-sm uppercase tracking-[0.25em] text-[rgba(244,236,216,0.7)]"
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
          className="h-28 w-28 opacity-80"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        />
      )}

      <RankBadge rank={rank} />

      <motion.div
        className="mt-4 flex flex-col items-center gap-3 sm:flex-row"
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
