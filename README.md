# Which Wizard Are You?

A magical, single-page Harry Potter movies trivia quiz. Pick a username and Hogwarts house, answer 10 randomly-drawn questions from a 150-question bank, get a rank, and download a shareable certificate. No backend — everything runs client-side and persists per-tab via `sessionStorage`.

## Stack

Vite + React 19, Tailwind CSS v4, Framer Motion, `html-to-image` for certificate export.

## Local development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

```bash
npm run build      # production build to dist/
npm run preview    # serve the production build locally
```

## Deploying

Deploys to Vercel with zero configuration — it auto-detects the Vite project, runs `npm run build`, and serves `dist/`. No environment variables or serverless functions required.

## Missing assets — drop these in when ready

The app already works end-to-end with graceful fallbacks (CSS gradients built from each house's palette) for the assets below. Once you have the real files, drop them at these exact paths and refresh — no code changes needed:

| Asset | Path |
|---|---|
| Gryffindor background | `public/assets/houses/gryffindor-bg.jpg` |
| Slytherin background | `public/assets/houses/slytherin-bg.jpg` |
| Hufflepuff background | `public/assets/houses/hufflepuff-bg.jpg` |
| Ravenclaw background | `public/assets/houses/ravenclaw-bg.jpg` |
| Default Hogwarts background | `public/assets/houses/hogwarts-bg-default.jpg` |
| Golden snitch decoration | `public/assets/decor/snitch.png` |
| Wand decoration | `public/assets/decor/wand.png` |
| Patronus stag (results, high score) | `public/assets/decor/patronus-stag.png` |

Suggested sizes: ~1920×1080 landscape JPGs for backgrounds, transparent PNGs for decor.

## Notes on implementation choices

- **Session persistence**: a single `sessionStorage` blob holds username, house, current screen, and the locked quiz state (question ids + shuffled option order + answers + score). The 10 questions and their option order are shuffled once at quiz start and never recomputed, so switching tabs mid-quiz always resumes exactly where you left off.
- **Play Again**: returns to the landing screen and clears the session (re-enter name/house), matching the design reference's own "Play Again" behavior.
- **Session clearing**: also happens automatically after a successful certificate PNG download, so the keepsake is safely on-device first.
- **House crests with opaque backgrounds**: two of the six source crest PNGs (`hogwarts-logo.png`, `slytherin-logo.png`) have solid black backgrounds rather than transparency. Rather than re-exporting art, `HouseCrest` composites every crest on a dark tinted card and applies `mix-blend-mode: screen` only to those two, so the black vanishes into the card.
- **Certificate export**: uses `html-to-image` (not `html2canvas` or raw canvas) for better fidelity with `mix-blend-mode` and custom web fonts, both of which the certificate relies on.
- **Feedback colors**: green/red answer feedback is fixed and independent of house palette, so Gryffindor's scarlet is never confused with "wrong answer" red.
