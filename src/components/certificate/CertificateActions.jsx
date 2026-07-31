import MagicButton from '../common/MagicButton'

function DownloadIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  )
}

function WhatsAppIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.29-.15-1.7-.84-1.96-.93-.26-.1-.46-.15-.65.15-.19.29-.75.93-.92 1.12-.17.19-.34.22-.63.07-.29-.15-1.22-.45-2.33-1.44-.86-.77-1.44-1.71-1.61-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.65-1.58-.9-2.16-.24-.57-.48-.49-.65-.5h-.56c-.19 0-.51.07-.77.36-.26.29-1.01.99-1.01 2.42s1.04 2.81 1.18 3c.15.19 2.05 3.13 4.96 4.39.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.11.55-.08 1.7-.7 1.94-1.37.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.34Z" />
      <path d="M12.02 2C6.5 2 2.02 6.48 2.02 12c0 1.85.5 3.58 1.36 5.07L2 22l5.06-1.33A9.94 9.94 0 0 0 12.02 22C17.53 22 22 17.52 22 12S17.53 2 12.02 2Zm0 18.1c-1.66 0-3.2-.46-4.52-1.25l-.32-.19-3 .79.8-2.93-.21-.3A8.08 8.08 0 0 1 3.93 12c0-4.47 3.63-8.1 8.09-8.1 4.46 0 8.09 3.63 8.09 8.1 0 4.47-3.63 8.1-8.09 8.1Z" />
    </svg>
  )
}

export default function CertificateActions({ onDownload, downloading, shareUrl, onPlayAgain, error }) {
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-3 sm:gap-4">
      <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-3">
        <MagicButton onClick={onDownload} disabled={downloading} size="sm">
          <DownloadIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          {downloading ? 'Preparing...' : 'Download Certificate'}
        </MagicButton>
        <a href={shareUrl} target="_blank" rel="noopener noreferrer">
          <MagicButton variant="ghost" size="sm">
            <WhatsAppIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Share on WhatsApp
          </MagicButton>
        </a>
      </div>

      {error && <p className="font-footer text-xs text-[var(--feedback-incorrect)] sm:text-sm">{error}</p>}

      <p className="max-w-xs text-center font-footer text-xs leading-relaxed text-[rgba(244,236,216,0.55)]">
        WhatsApp links can't attach images directly — download the certificate first, then attach it manually to
        your chat.
      </p>

      <button
        type="button"
        onClick={onPlayAgain}
        className="font-footer text-xs underline underline-offset-4 text-[rgba(244,236,216,0.7)] hover:text-[#f4ecd8] sm:text-sm"
      >
        Play Again
      </button>
    </div>
  )
}
