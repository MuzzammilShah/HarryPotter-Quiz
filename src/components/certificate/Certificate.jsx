import { useRef, useState } from 'react'
import { getRank } from '../../lib/scoring'
import { exportNodeToPng } from '../../lib/certificateExport'
import CertificateCard from './CertificateCard'
import CertificateActions from './CertificateActions'

export default function Certificate({ username, house, score, total, onPlayAgain }) {
  const cardRef = useRef(null)
  const [downloading, setDownloading] = useState(false)
  const [error, setError] = useState(null)

  const rank = getRank(score)
  const date = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })

  const shareText = `I just got Sorted into ${house ?? 'Hogwarts'} and scored ${score}/${total} on the Wizarding World trivia quiz — ${rank.title}! 🪄✨`
  const shareUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`

  async function handleDownload() {
    if (!cardRef.current) return
    setDownloading(true)
    setError(null)
    try {
      await exportNodeToPng(cardRef.current, { username, house })
    } catch (err) {
      if (err?.name !== 'AbortError') {
        setError('Could not generate the certificate. Please try again.')
      }
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-12">
      <CertificateCard ref={cardRef} username={username} house={house} score={score} total={total} rank={rank} date={date} />
      <CertificateActions
        onDownload={handleDownload}
        downloading={downloading}
        shareUrl={shareUrl}
        onPlayAgain={onPlayAgain}
        error={error}
      />
    </div>
  )
}
