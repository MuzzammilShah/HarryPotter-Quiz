export default function ScoreBadge({ score, total }) {
  return (
    <p className="text-center font-ui text-xs font-semibold uppercase tracking-[0.25em] text-[rgba(244,236,216,0.75)]">
      Your score: {score}/{total}
    </p>
  )
}
