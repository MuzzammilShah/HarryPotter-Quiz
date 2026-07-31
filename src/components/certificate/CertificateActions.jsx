import MagicButton from '../common/MagicButton'

export default function CertificateActions({ onDownload, downloading, shareUrl, onPlayAgain, error }) {
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-4">
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
        <MagicButton onClick={onDownload} disabled={downloading}>
          {downloading ? 'Preparing...' : 'Download Certificate'}
        </MagicButton>
        <a href={shareUrl} target="_blank" rel="noopener noreferrer">
          <MagicButton variant="ghost">Share on WhatsApp</MagicButton>
        </a>
      </div>

      {error && <p className="font-ui text-sm text-[var(--feedback-incorrect)]">{error}</p>}

      <p className="max-w-xs text-center font-ui text-xs text-[rgba(244,236,216,0.55)]">
        WhatsApp links can't attach images directly — download the certificate first, then attach it manually to
        your chat.
      </p>

      <button
        type="button"
        onClick={onPlayAgain}
        className="font-ui text-sm underline underline-offset-4 text-[rgba(244,236,216,0.7)] hover:text-[#f4ecd8]"
      >
        Play Again
      </button>
    </div>
  )
}
