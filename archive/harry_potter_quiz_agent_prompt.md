# Build Prompt: "Which Wizard Are You?" — Harry Potter Movies Quiz

Paste everything below into your coding agent as the project brief.

---

## 1. Project Summary

Build a single-page web app: a magical, animated Harry Potter **movies trivia quiz**. No backend, no database, no auth — pure client-side, deployed as a static/serverless site on **Vercel**.

**Flow:**
1. Landing screen — Hogwarts-themed hero, user enters a **username**, then picks a **Hogwarts house** (Gryffindor / Slytherin / Hufflepuff / Ravenclaw) by tapping its crest. Selecting a house immediately re-themes the app (background image, color palette/accents) to match that house — see §3.5. "Begin" is enabled once both name and house are set.
2. 10 questions are randomly drawn from a bank of 150 (bundled as static JSON — see §3), each with 4 options, one correct answer. The chosen house's theme persists across the quiz, results, and certificate screens.
3. Each question: user taps an option → correct answer's button turns **green**, wrong tap turns **red** (and the correct one also highlights green so they see the right answer) → short delay/animation → auto-advance to next question.
4. After question 10: results screen showing score out of 10 (e.g. "7/10"), with a house-style rank/title based on score (e.g. 0-3 "Squib," 4-6 "First Year," 7-8 "Prefect," 9 "Head Boy/Girl," 10 "The Chosen One" — feel free to invent flavor text).
5. Generate a **downloadable certificate** as a PNG (canvas-rendered) featuring the username, score, house (with crest), and date, styled like a Hogwarts/Ministry of Magic certificate, using that house's color palette as its border/seal accent. Provide a "Download" button and a "Share on WhatsApp" button (`https://wa.me/?text=...` deep link with a short message; the certificate image itself can't be attached via that link, so the WhatsApp text should read well even as text-only, and the user separately downloads the PNG to attach manually — mention this in the UI).
6. "Play Again" resets the session and reshuffles a new set of 10 questions.

**Persistence requirement:** No backend/cloud storage. Use **`sessionStorage`** (not localStorage) to persist state within the browser tab/session — so if the user switches tabs and comes back, their username, current question index, answers, and score survive. A fresh tab/new session starts clean. Clear the session on "Play Again" or on completing + downloading the certificate (your call — pick whichever feels better for UX and note the choice).

## 2. Tech Stack & Architecture

- **Framework:** React (Vite) — lightweight, fast, deploys cleanly to Vercel as a static build. (If you'd rather use Next.js for future extensibility, that's fine too — but this app needs zero server-side logic, so plain Vite+React is simpler and sufficient.)
- **Styling:** Tailwind CSS + custom CSS for magical effects (particles, glows, parallax) where Tailwind alone isn't enough.
- **Animation:** Framer Motion for transitions (question changes, button feedback, screen transitions). Consider a lightweight particle library (e.g. `tsparticles` or hand-rolled canvas) for ambient floating sparks/snitches on the background — keep performance in mind, don't tank mobile framerates.
- **Certificate generation:** Render to an off-screen `<canvas>` (or use `html-to-image` / `html2canvas` on a hidden styled DOM node) → export as PNG via `canvas.toDataURL()` → trigger download via an `<a download>` link.
- **State management:** React state + `sessionStorage` sync. A single `useSessionState` hook or similar is enough; no need for Redux/Zustand at this scale.
- **Deployment target:** Vercel. Ensure `vercel.json` / build config needs zero environment variables and zero serverless functions — everything client-side.

## 3. Question Data

I've generated a **verified 150-question bank** covering all 8 films (Sorcerer's/Philosopher's Stone through Deathly Hallows Part 2, plus a handful of general/cast trivia), each with movie tag, difficulty, category, 4 options, and the correct answer. It's attached as `harry_potter_quiz_questions.json`. Import it as static data (e.g. drop it in `src/data/questions.json`).

Schema:
```json
{
  "questions": [
    {
      "id": "hp-001",
      "movieNumber": 1,
      "movie": "Harry Potter and the Sorcerer's Stone",
      "difficulty": "easy",
      "category": "Places",
      "question": "What is the number of the platform Harry uses to board the Hogwarts Express?",
      "options": ["Platform 9¾", "Platform 10", "Platform 12", "Platform 7½"],
      "correctAnswer": "Platform 9¾"
    }
  ]
}
```

**Important implementation notes:**
- `options` are NOT pre-shuffled — shuffle them client-side per render so the correct answer isn't always in the same position.
- When picking the 10 questions for a session, shuffle the full 150 and take the first 10 (or optionally stratify — e.g. guarantee a spread across movies/difficulty — your call, simple random is fine for v1).
- Store the chosen 10 (and their shuffled option orders) in `sessionStorage` at quiz start so a tab-switch mid-quiz doesn't reshuffle questions/answers under the user.

## 3.5 House Selection & Theming

Add a `houseThemes.js` (or `.ts`) config mapping each house to its palette and assets, e.g.:

```js
export const HOUSE_THEMES = {
  gryffindor: {
    name: "Gryffindor",
    primary: "#740001",   // deep scarlet
    secondary: "#D3A625", // gold
    accent: "#EEBA30",
    crest: "/assets/houses/gryffindor-crest.png",
    background: "/assets/houses/gryffindor-bg.jpg",
  },
  slytherin: {
    name: "Slytherin",
    primary: "#1A472A",   // dark green
    secondary: "#5D5D5D", // silver
    accent: "#AAAAAA",
    crest: "/assets/houses/slytherin-crest.png",
    background: "/assets/houses/slytherin-bg.jpg",
  },
  hufflepuff: {
    name: "Hufflepuff",
    primary: "#ECB939",   // yellow
    secondary: "#372E29", // black/brown
    accent: "#F0C75E",
    crest: "/assets/houses/hufflepuff-crest.png",
    background: "/assets/houses/hufflepuff-bg.jpg",
  },
  ravenclaw: {
    name: "Ravenclaw",
    primary: "#222F5B",   // blue
    secondary: "#946B2D", // bronze
    accent: "#5D82C1",
    crest: "/assets/houses/ravenclaw-crest.png",
    background: "/assets/houses/ravenclaw-bg.jpg",
  },
};
```

Implementation notes:
- Drive theming with CSS custom properties (e.g. `--theme-primary`, `--theme-secondary`, `--theme-accent`) set on a root wrapper element whenever the house changes, so Tailwind utility classes and custom CSS can both reference them (`bg-[var(--theme-primary)]`, etc.).
- Persist the chosen house in the same `sessionStorage` blob as username/quiz state, so it survives a tab switch.
- **Keep answer-feedback colors (green = correct, red = wrong) fixed and legible regardless of house theme** — don't let Gryffindor's red palette get confused with the "wrong answer" red. Use distinct, clearly different shades for feedback vs. house chrome.
- Before a house is chosen (on first load of the landing screen), fall back to a neutral Hogwarts-crest theme/background rather than defaulting to one house.
- If a given house's background image isn't available yet, gracefully fall back to a CSS gradient built from that house's `primary`/`secondary` colors rather than breaking the layout — don't hard-block on assets.

## 4. Assets

I'll be adding Harry-Potter-themed image/graphic assets directly into the project workspace. Here's the specific list — organizing them under these paths/names will let the agent wire them up directly against the config above:

| Asset | Suggested filename | Notes |
|---|---|---|
| Title/wordmark logo | `assets/title-logo.png` | Transparent PNG, wide aspect (~1200×400), used on the landing hero |
| Hogwarts crest (neutral/default) | `assets/hogwarts-crest.png` | Transparent PNG (~512×512), used before a house is picked, and optionally on the certificate alongside the house crest |
| Default Hogwarts background | `assets/hogwarts-bg-default.jpg` | Landscape (~1920×1080), shown pre-house-selection |
| Gryffindor crest | `assets/houses/gryffindor-crest.png` | Transparent PNG, ~512×512 |
| Slytherin crest | `assets/houses/slytherin-crest.png` | Transparent PNG, ~512×512 |
| Hufflepuff crest | `assets/houses/hufflepuff-crest.png` | Transparent PNG, ~512×512 |
| Ravenclaw crest | `assets/houses/ravenclaw-crest.png` | Transparent PNG, ~512×512 |
| Gryffindor background | `assets/houses/gryffindor-bg.jpg` | Landscape (~1920×1080), used once selected |
| Slytherin background | `assets/houses/slytherin-bg.jpg` | Landscape (~1920×1080) |
| Hufflepuff background | `assets/houses/hufflepuff-bg.jpg` | Landscape (~1920×1080) |
| Ravenclaw background | `assets/houses/ravenclaw-bg.jpg` | Landscape (~1920×1080) |
| Golden snitch | `assets/snitch.png` | Transparent PNG, used as a floating/ambient decoration across screens (house-agnostic) |
| Wand | `assets/wand.png` | Transparent PNG, decorative/loading-state use |
| Patronus (stag) | `assets/patronus-stag.png` | Transparent PNG, could appear on the results screen for a high score |

Also include the reference screenshots you mentioned for UI inspiration (any filenames are fine — just drop them in a `reference/` folder and point the agent at them). **Use all of this as the visual foundation** — check the assets folder before designing from scratch, and match the mood/palette of the reference screenshots. If something's missing (e.g. a minor icon), it's fine for the agent to source or build a simple SVG rather than blocking on it — but the 4 house crests + 4 house backgrounds are the ones actually driving core functionality, so those matter most to have ready.

## 5. UX / Animation Details

- **Landing screen:** Hogwarts background, animated logo/title entrance, username input with a magical-feeling focus state, then a **house picker** — 4 crest cards (Gryffindor/Slytherin/Hufflepuff/Ravenclaw) that visibly highlight/glow on hover and lock in with a satisfying selected-state animation on tap (background and accent colors transitioning smoothly to match, not an abrupt cut). CTA button ("Enter the Wizarding World" or similar) enables once name + house are both set.
- **Question screen:** Progress indicator (e.g. "Question 4 of 10" or a filling wand/progress bar), question text with an entrance animation, 4 answer buttons with hover/tap feedback, a satisfying transition when moving to the next question (not just an instant swap — think card-flip, slide, or a magical particle wipe).
- **Answer feedback:** Immediate color change (green/red) with a subtle animation (shake for wrong, sparkle/glow for right) before auto-advancing (~1–1.5s delay is usually enough — make it configurable).
- **Results screen:** Animated score reveal (count-up), a rank/title, and clear buttons for "Download Certificate," "Share on WhatsApp," and "Play Again."
- **Certificate:** Parchment/wax-seal aesthetic, username, score, date, and a decorative border — this is the "keepsake" moment, so give it real visual polish since it's what gets shared.
- Keep animations snappy — magical, not sluggish. Respect `prefers-reduced-motion` where reasonable.

## 6. Deliverables

- Full working Vite+React app, ready to `vercel deploy` with no config beyond defaults.
- Clean component structure (e.g. `Landing`, `Quiz`, `QuestionCard`, `Results`, `Certificate`, `useSessionState` hook).
- Mobile-responsive (most people will play this on a phone shared via WhatsApp).
- All 4 house themes tested end-to-end (landing → quiz → results → certificate) to confirm colors/backgrounds swap correctly and nothing regresses to a default/neutral look partway through.
- Brief README on how to run locally and deploy.

## 7. Explicitly Out of Scope

- No backend, database, leaderboard, or analytics.
- No user accounts/auth beyond the plain-text username used for the certificate.
- No real image upload/attach for WhatsApp share (technical limitation of `wa.me` links) — text share + manual PNG download/attach is the accepted workaround.
