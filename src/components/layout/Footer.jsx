function GitHubIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.17.69-3.84-1.34-3.84-1.34-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.53-.29-5.19-1.27-5.19-5.64 0-1.25.44-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.17a10.9 10.9 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.17 3.17-1.17.63 1.58.24 2.75.12 3.04.74.8 1.18 1.82 1.18 3.07 0 4.38-2.66 5.34-5.2 5.63.41.35.77 1.04.77 2.11 0 1.52-.01 2.75-.01 3.12 0 .3.2.66.79.55A11.26 11.26 0 0 0 23.25 11.75C23.25 5.48 18.27.5 12 .5Z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="relative z-10 mt-auto flex w-full flex-col items-center gap-3 px-6 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
      <p className="font-footer text-xs text-[rgba(244,236,216,0.55)]">
        Built for fun on Harry Potter's birthday by{' '}
        <a
          href="https://muhammedshah.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[rgba(244,236,216,0.85)] hover:text-[#f4ecd8]"
        >
          Muhammed Shah
        </a>{' '}
        using Claude Code
      </p>

      <a
        href="https://github.com/MuzzammilShah/HarryPotter-Quiz"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 font-footer text-xs text-[rgba(244,236,216,0.55)] hover:text-[#f4ecd8]"
      >
        <GitHubIcon className="h-4 w-4" />
        View on GitHub
      </a>
    </footer>
  )
}
