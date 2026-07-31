import { LOGOS, HOUSE_BACKGROUNDS } from './assetPaths'

// Feedback colors are fixed and deliberately independent of house palette —
// Gryffindor's scarlet must never be confused with "wrong answer" red.
export const FEEDBACK_COLORS = {
  correct: '#22c55e',
  correctRgb: '34, 197, 94',
  incorrect: '#ef4444',
  incorrectRgb: '239, 68, 68',
}

export const HOUSE_THEMES = {
  gryffindor: {
    key: 'gryffindor',
    name: 'Gryffindor',
    tagline: 'Daring, nerve, and chivalry',
    primary: '#740001',
    primaryRgb: '116, 0, 1',
    secondary: '#D3A625',
    secondaryRgb: '211, 166, 37',
    accent: '#EEBA30',
    crest: LOGOS.gryffindor,
    background: HOUSE_BACKGROUNDS.gryffindor,
  },
  slytherin: {
    key: 'slytherin',
    name: 'Slytherin',
    tagline: 'Ambition, cunning, and resourcefulness',
    primary: '#1A472A',
    primaryRgb: '26, 71, 42',
    secondary: '#5D5D5D',
    secondaryRgb: '93, 93, 93',
    accent: '#AAAAAA',
    crest: LOGOS.slytherin,
    background: HOUSE_BACKGROUNDS.slytherin,
  },
  hufflepuff: {
    key: 'hufflepuff',
    name: 'Hufflepuff',
    tagline: 'Dedication, patience, and loyalty',
    primary: '#ECB939',
    primaryRgb: '236, 185, 57',
    secondary: '#372E29',
    secondaryRgb: '55, 46, 41',
    accent: '#F0C75E',
    crest: LOGOS.hufflepuff,
    background: HOUSE_BACKGROUNDS.hufflepuff,
  },
  ravenclaw: {
    key: 'ravenclaw',
    name: 'Ravenclaw',
    tagline: 'Wisdom, wit, and creativity',
    primary: '#222F5B',
    primaryRgb: '34, 47, 91',
    secondary: '#946B2D',
    secondaryRgb: '148, 107, 45',
    accent: '#5D82C1',
    crest: LOGOS.ravenclaw,
    background: HOUSE_BACKGROUNDS.ravenclaw,
  },
}

export const HOGWARTS_DEFAULT_THEME = {
  key: 'hogwarts',
  name: 'Hogwarts',
  tagline: 'Draco Dormiens Nunquam Titillandus',
  primary: '#0e1b3c',
  primaryRgb: '14, 27, 60',
  secondary: '#D3A625',
  secondaryRgb: '211, 166, 37',
  accent: '#5D82C1',
  crest: LOGOS.hogwarts,
  background: HOUSE_BACKGROUNDS.hogwarts,
}

export function getTheme(houseKey) {
  if (houseKey && HOUSE_THEMES[houseKey]) return HOUSE_THEMES[houseKey]
  return HOGWARTS_DEFAULT_THEME
}

export const HOUSE_ORDER = ['gryffindor', 'slytherin', 'hufflepuff', 'ravenclaw']
