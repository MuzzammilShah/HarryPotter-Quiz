# Which Wizard Are You? — Project Notes for Claude

A single-page Harry Potter movies trivia quiz. Pick a username + Hogwarts house (which re-themes the whole app), answer 10 random questions from a 150-question bank, get a rank, download a shareable certificate PNG. No backend — everything is client-side, state lives in `sessionStorage`.

Original spec: `archive/harry_potter_quiz_agent_prompt.md`. Original design references (screenshots of a Blinkit "O.W.L. Trivia" app that this UI's mood is modeled on): `archive/design-reference/`. Original question bank source: `archive/harry_potter_quiz_questions.json` (copied into `src/data/questions.json` for the actual app import).

## Stack

- **Vite 8 + React 19**, plain JS (no TypeScript)
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin — note: `@import 'tailwindcss'` in `src/index.css`, no `tailwind.config.js` needed for this project's usage
- **Framer Motion** for transitions/animations
- **html2canvas** for certificate PNG export (see "Certificate export" below for why, not `html-to-image`)
- Fonts loaded via `<link>` in `index.html` (Google Fonts: Cinzel, Cormorant Garamond, Inter, Instrument Sans) — deliberately **not** a CSS `@import`, see gotchas below

No backend, no database, no auth beyond a plain-text username. Deploys to Vercel with zero config (auto-detects Vite, builds `dist/`, no env vars, no serverless functions).

## Architecture

```
src/
├── App.jsx                  # screen state machine: landing | quiz | results | certificate
├── config/
│   ├── houseThemes.js       # HOUSE_THEMES (4 houses) + HOGWARTS_DEFAULT_THEME + fixed FEEDBACK_COLORS
│   ├── assetPaths.js        # single source of truth for /assets/* paths + CRESTS_NEEDING_BLEND set
│   └── quizConfig.js        # QUESTIONS_PER_QUIZ=10, ANSWER_DELAY_MS, RANKS (score → title/flavor)
├── data/questions.json      # 150-question bank (copy of archive/harry_potter_quiz_questions.json)
├── hooks/
│   ├── useSessionState.js   # sessionStorage-synced state — THE persistence backbone, see below
│   ├── useHouseTheme.js     # applies CSS custom properties to AppShell root on house change
│   ├── useImageFallback.js  # tracks <img> onError so callers can swap to a CSS fallback
│   └── useReducedMotion.js  # matchMedia('(prefers-reduced-motion: reduce)') wrapper
├── lib/
│   ├── shuffle.js           # Fisher-Yates
│   ├── quizSelection.js     # lockNewQuiz() — picks 10 questions + shuffles options ONCE per quiz
│   ├── scoring.js           # re-exports getRank from quizConfig
│   └── certificateExport.js # html2canvas wrapper, triggers the PNG download
└── components/
    ├── layout/    AppShell, ThemedBackground, ParticleField, Footer
    ├── landing/   Landing, NameInput, HousePicker, HouseCard
    ├── quiz/      Quiz, QuestionCard, AnswerOption, ProgressBar, ScoreBadge
    ├── results/   Results, ScoreReveal, RankBadge
    ├── certificate/ Certificate, CertificateCard, CertificateActions
    └── common/    MagicButton, HouseCrest, Sparkle
```

Assets live in `public/assets/` (Vite serves this verbatim at `/assets/...`, which is why `houseThemes.js` / `assetPaths.js` can use plain string paths instead of imports):

```
public/assets/
├── logos/       # title-logo.png, hogwarts-logo.png, {house}-logo.png — all present, real art
├── houses/      # {house}-bg.jpg, hogwarts-bg-default.jpg — NOT YET PROVIDED, see fallback below
├── decor/       # snitch.png, wand.png, patronus-stag.png — NOT YET PROVIDED, optional decoration
└── wallpapers/  # two generic HP prop-photography images, unused by current UI (leftover from early exploration)
```

## Key mechanisms

**House theming.** `houseThemes.js` defines each house's `{primary, secondary, accent, crest, background}` (plus literal `*Rgb` string variants like `"116, 0, 1"` for use inside `rgba()`). `useHouseTheme` writes these as CSS custom properties (`--theme-primary`, `--theme-primary-rgb`, etc.) onto `AppShell`'s root div via `el.style.setProperty(...)` in a `useLayoutEffect`, so every descendant can read `var(--theme-*)`. Feedback colors (`--feedback-correct` / `--feedback-incorrect`) are fixed constants, deliberately never derived from house palette — Gryffindor's scarlet must never look like "wrong answer" red.

**Missing house background images.** `ThemedBackground.jsx` tries to load `theme.background`; on `onError` it falls back to a CSS gradient built from `--theme-primary`/`--theme-secondary`. This means the app works today with zero house background photos — dropping real JPGs into `public/assets/houses/` later needs no code changes.

**Session persistence (`useSessionState.js`).** One JSON blob under a single `sessionStorage` key holds `{username, house, screen, quiz: {questionIds, optionOrders, currentIndex, answers, score}, completedAt}`. Only question **ids** and each question's shuffled **option order** are persisted — actual question content is always rehydrated from the static bank by id. The 10 questions + their option order are locked exactly once (`lib/quizSelection.js`'s `lockNewQuiz`) at the landing "Begin" tap, never recomputed after — so a tab-switch mid-quiz always resumes the exact same question/options/score, no reshuffle. `resetSession()` (called by "Play Again") clears storage and returns to landing. **Downloading the certificate does NOT reset the session** — the user stays on the certificate screen after downloading (so they can also hit Share on WhatsApp); only "Play Again" resets.

**Certificate export.** `CertificateCard.jsx` is a normal, always-visible (not hidden off-screen) DOM node. `Certificate.jsx` holds a ref to it and calls `certificateExport.js`'s `exportNodeToPng()` on Download. All colors inside `CertificateCard`/`HouseCrest` (when used there) are literal resolved values from the `theme` object (e.g. `rgba(${theme.primaryRgb}, 0.55)`), **not** `var(--theme-*)` — this matters, see gotchas.

**House crests with opaque backgrounds.** Two of the six source crest PNGs (`hogwarts-logo.png`, `slytherin-logo.png`) have solid black backgrounds instead of transparency. `HouseCrest.jsx` composites every crest on a dark tinted circular card and applies `mix-blend-mode: screen` only to those two (tracked via `CRESTS_NEEDING_BLEND` in `assetPaths.js`), so black vanishes into the card. Inside `CertificateCard`, `HouseCrest` is called with a `flatten` prop instead, which swaps to a **solid black card background** and skips `mix-blend-mode` entirely — because `mix-blend-mode` doesn't survive `html2canvas` capture reliably, and a solid-black card behind an already-black-background crest looks identical anyway.

## Non-obvious bugs fixed this session (read before touching layout or the certificate)

These took significant live-browser debugging to root-cause — worth knowing before "fixing" them again from scratch.

1. **Background gradients / particle starfield were completely invisible**, despite computed styles proving the elements existed with correct backgrounds and non-zero opacity. Root cause: `AppShell`'s root div had `position: relative` with no explicit `z-index` (`z-index: auto`). Per the CSS spec, `position: relative` **without** an explicit `z-index` does NOT establish a new stacking context — so its `-z-10` child (`ThemedBackground`) and `-z-[5]` child (`ParticleField`) escaped `AppShell`'s intended stacking context and got promoted to the document root's stacking context, painting behind everything. **Fix:** `AppShell`'s root div has `z-0` (`src/components/layout/AppShell.jsx`) — any `position: relative` (or `absolute`) container that has `-z-*` descendants meant to stay "inside" it MUST also have an explicit `z-index` (even `0`), or those descendants will escape it. This is a general rule for this codebase, not just this one file.

2. **`bg-[var(--theme-secondary)]` (a bare CSS custom property used directly as a Tailwind v4 arbitrary-value background color) silently fails to compile** — Tailwind v4's arbitrary-value engine generates no rule at all for this specific pattern (confirmed by grepping the actual served CSS). Wrapped forms like `bg-[rgba(var(--theme-primary-rgb),0.35)]` compile fine; `border-[var(--theme-secondary)]` and `text-[var(--theme-secondary)]` also compile fine. Only bare `bg-[var(--x)]` is broken. **Rule of thumb:** never use a bare `var(...)` inside a Tailwind `bg-[...]` arbitrary value — use an inline `style={{ backgroundColor: 'var(--x)' }}` instead (see `ProgressBar.jsx` for the pattern).

3. **Certificate PNG downloaded with background only, no text/images** — two layered causes:
   - The Google Fonts stylesheet is cross-origin. `html-to-image`'s font-embedding step tries to read `.cssRules` off that stylesheet to inline `@font-face` rules, which throws `SecurityError` (browsers block reading `cssRules` cross-origin without CORS headers matching). This wasn't caused by using `@import` vs `<link>` — either form is still cross-origin and hits the same wall.
   - Even after suppressing that (`skipFonts: true`), `html-to-image`'s `toCanvas()` step still silently produced a **fully transparent canvas** (verified via direct pixel sampling: alpha `0` everywhere) for this specific card. This is a known Chromium limitation with `html-to-image`'s approach (serialize DOM → SVG `<foreignObject>` → `drawImage` onto canvas) for sufficiently complex nodes — the draw silently no-ops instead of erroring.
   - **Fix:** swapped `html-to-image` → **`html2canvas`**, which uses a fundamentally different approach (walks the DOM and paints primitives directly, no SVG/foreignObject step) and doesn't hit either failure mode. Verified via direct pixel sampling that `html2canvas` output has real non-transparent content. `html-to-image` has been fully removed from `package.json`; **do not reintroduce it** for this certificate node without re-verifying against a real Chromium render first (see "Debugging methodology" below) — it looked correct in code review both times it was tried and wasn't.
   - Because of this, `CertificateCard.jsx` avoids `var(--theme-*)` custom-property lookups entirely (passes literal resolved `theme.primaryRgb` etc. as props/inline styles) and avoids `mix-blend-mode` (via `HouseCrest`'s `flatten` prop) — these were defensive fixes made while chasing this bug and are safe to keep even though the real fix ended up being the library swap; removing them hasn't been re-tested.

4. **Progress bar / certificate accent text color appears to "change" per house — this is intentional, not a bug.** The progress bar fill and several certificate text accents use `--theme-secondary`. Ravenclaw's secondary is bronze/gold (reads as "golden"); Hufflepuff's secondary is a dark brown/black (`#372E29`, true to Hufflepuff's real house colors — black trim, not gold). This makes Hufflepuff's progress bar and some certificate text noticeably lower-contrast than other houses. **User has explicitly decided to leave this as-is** (period-accurate house colors matter more than uniform contrast) — do not "fix" this by switching to `accent` or otherwise normalizing it without asking first.

## Debugging methodology note

Static code review repeatedly failed to find bugs #1 and #3 above — the code looked correct on paper both times. What actually worked: a temporary headless Chromium (via `playwright-core`, pointed at the `Google Chrome for Testing` binary it downloads) launched against the real `npm run dev` server, used to read `getComputedStyle`, sample actual canvas pixel data, and screenshot real output. This was installed to a scratch/temp directory, used only for the debugging session, and fully removed afterward (`rm -rf ~/Library/Caches/ms-playwright` + the scratch dir) — the user does not want browser automation tooling permanently added to this project. If a future visual bug resists static analysis, ask before reaching for this again, but it is the proven way to actually resolve "the code looks right but the pixels are wrong" class of bugs here.

## Missing assets — drop-in paths

The app works fully today via graceful fallbacks. When real files are ready, drop them at these exact paths (no code changes needed):

| Asset | Path |
|---|---|
| Gryffindor / Slytherin / Hufflepuff / Ravenclaw background | `public/assets/houses/{house}-bg.jpg` |
| Default Hogwarts background | `public/assets/houses/hogwarts-bg-default.jpg` |
| Golden snitch decoration | `public/assets/decor/snitch.png` |
| Wand decoration | `public/assets/decor/wand.png` |
| Patronus stag (results, high score) | `public/assets/decor/patronus-stag.png` |

## Commands

```bash
npm run dev       # http://localhost:5173
npm run build     # → dist/
npm run preview   # serve the production build locally
```
