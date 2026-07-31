export default function NameInput({ value, onChange }) {
  return (
    <div className="w-full max-w-sm">
      <label htmlFor="username" className="mb-1.5 block text-center font-ui text-xs uppercase tracking-[0.2em] text-[rgba(244,236,216,0.7)] sm:mb-2 sm:text-sm">
        Tell us your name
      </label>
      <input
        id="username"
        type="text"
        maxLength={40}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Your name, wizard..."
        className="themed-transition w-full rounded-full border border-[rgba(211,166,37,0.4)] bg-[rgba(10,15,30,0.55)] px-5 py-3 text-center font-body text-base text-[#f4ecd8] placeholder:text-[rgba(244,236,216,0.35)] outline-none focus:border-[var(--theme-secondary)] focus:shadow-[0_0_22px_rgba(var(--theme-secondary-rgb),0.45)] sm:px-6 sm:py-3.5 sm:text-lg"
      />
    </div>
  )
}
