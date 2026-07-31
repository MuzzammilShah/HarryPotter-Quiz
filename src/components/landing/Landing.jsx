import { motion } from 'framer-motion'
import { LOGOS } from '../../config/assetPaths'
import NameInput from './NameInput'
import HousePicker from './HousePicker'
import MagicButton from '../common/MagicButton'

export default function Landing({ username, house, onUsernameChange, onHouseChange, onBegin }) {
  const canBegin = username.trim().length > 0 && Boolean(house)

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-12">
      <motion.img
        src={LOGOS.title}
        alt="The Wizarding World of Harry Potter"
        className="w-full max-w-md drop-shadow-[0_0_24px_rgba(211,166,37,0.35)]"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      />

      <motion.h1
        className="text-glow-gold text-center font-display text-xl font-semibold text-[#f4ecd8] sm:text-3xl"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        Which Wizard Are You?
      </motion.h1>

      <motion.div
        className="flex w-full flex-col items-center gap-6 sm:gap-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <NameInput value={username} onChange={onUsernameChange} />
        <HousePicker selected={house} onSelect={onHouseChange} />

        <MagicButton onClick={onBegin} disabled={!canBegin}>
          Enter the Wizarding World
        </MagicButton>
      </motion.div>
    </div>
  )
}
