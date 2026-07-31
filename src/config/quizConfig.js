export const QUESTIONS_PER_QUIZ = 10
export const ANSWER_DELAY_MS = 1400

export const RANKS = [
  { min: 0, max: 3, title: 'Squib', flavor: "Even Filch's cat scored higher. Time to hit the library." },
  { min: 4, max: 6, title: 'First Year', flavor: 'You know your way around the castle — barely.' },
  { min: 7, max: 8, title: 'Prefect', flavor: 'Impressive. The Sorting Hat is taking notes.' },
  { min: 9, max: 9, title: 'Head Boy/Girl', flavor: 'Practically top of your class.' },
  { min: 10, max: 10, title: 'The Chosen One', flavor: 'Flawless. Even Hermione is impressed.' },
]

export function getRank(score) {
  return RANKS.find((r) => score >= r.min && score <= r.max) ?? RANKS[0]
}
