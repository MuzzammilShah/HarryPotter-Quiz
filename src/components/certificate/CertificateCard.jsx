import { forwardRef } from 'react'
import { LOGOS } from '../../config/assetPaths'
import { getTheme } from '../../config/houseThemes'
import HouseCrest from '../common/HouseCrest'

// Every color here is resolved to a literal value from `theme` rather than
// a CSS custom property lookup (var(--theme-*)). html-to-image serializes
// this subtree via an SVG foreignObject, and custom properties set via
// style.setProperty() on a distant ancestor (AppShell) frequently don't
// resolve inside that clone — silently producing a blank/white export.
const CertificateCard = forwardRef(function CertificateCard({ username, house, score, total, rank, date }, ref) {
  const theme = getTheme(house)

  return (
    <div
      ref={ref}
      className="relative mx-auto flex w-full max-w-md flex-col items-center gap-5 overflow-hidden rounded-3xl border px-8 py-10 text-center"
      style={{
        borderColor: `rgba(${theme.secondaryRgb}, 0.55)`,
        background: `radial-gradient(120% 100% at 50% 0%, rgba(${theme.primaryRgb},0.55), #060a18 70%)`,
        boxShadow: `0 0 50px rgba(${theme.secondaryRgb}, 0.25), inset 0 0 40px rgba(0,0,0,0.5)`,
      }}
    >
      {/* corner house crests */}
      <div className="absolute left-4 top-4 h-8 w-8 opacity-70">
        <HouseCrest
          houseKey="gryffindor"
          src={LOGOS.gryffindor}
          size="sm"
          className="!h-8 !w-8"
          primaryRgb={theme.primaryRgb}
          secondaryRgb={theme.secondaryRgb}
          flatten
        />
      </div>
      <div className="absolute right-4 top-4 h-8 w-8 opacity-70">
        <HouseCrest
          houseKey="slytherin"
          src={LOGOS.slytherin}
          size="sm"
          className="!h-8 !w-8"
          primaryRgb={theme.primaryRgb}
          secondaryRgb={theme.secondaryRgb}
          flatten
        />
      </div>
      <div className="absolute bottom-4 left-4 h-8 w-8 opacity-70">
        <HouseCrest
          houseKey="hufflepuff"
          src={LOGOS.hufflepuff}
          size="sm"
          className="!h-8 !w-8"
          primaryRgb={theme.primaryRgb}
          secondaryRgb={theme.secondaryRgb}
          flatten
        />
      </div>
      <div className="absolute bottom-4 right-4 h-8 w-8 opacity-70">
        <HouseCrest
          houseKey="ravenclaw"
          src={LOGOS.ravenclaw}
          size="sm"
          className="!h-8 !w-8"
          primaryRgb={theme.primaryRgb}
          secondaryRgb={theme.secondaryRgb}
          flatten
        />
      </div>

      <p className="font-ui text-xs uppercase tracking-[0.3em]" style={{ color: theme.secondary }}>
        The Wizarding World of Harry Potter
      </p>

      <HouseCrest
        houseKey={house ?? 'hogwarts'}
        src={theme.crest}
        size="lg"
        glow
        primaryRgb={theme.primaryRgb}
        secondaryRgb={theme.secondaryRgb}
        flatten
      />

      <p className="font-body text-lg text-[rgba(244,236,216,0.85)]">This is to certify that</p>

      <p
        className="font-display text-3xl font-bold text-[#f4ecd8]"
        style={{
          textShadow: `0 0 12px rgba(${theme.secondaryRgb}, 0.55), 0 0 32px rgba(${theme.secondaryRgb}, 0.25)`,
        }}
      >
        {username}
      </p>

      <p className="max-w-xs font-body text-lg text-[rgba(244,236,216,0.85)]">
        of the House of <span className="font-semibold" style={{ color: theme.secondary }}>{theme.name}</span>, sat
        the Wizarding Trivia and received the following grade
      </p>

      <div className="flex flex-col items-center gap-1">
        <p
          className="font-display text-2xl font-bold"
          style={{
            color: theme.secondary,
            textShadow: `0 0 12px rgba(${theme.secondaryRgb}, 0.55), 0 0 32px rgba(${theme.secondaryRgb}, 0.25)`,
          }}
        >
          {rank.title}
        </p>
        <p className="font-ui text-sm text-[rgba(244,236,216,0.75)]">
          with a score of {score}/{total}
        </p>
      </div>

      <p className="font-ui text-xs uppercase tracking-[0.2em] text-[rgba(244,236,216,0.5)]">{date}</p>
    </div>
  )
})

export default CertificateCard
