// Single source of truth for real asset paths under public/assets/.
// Anything listed under HOUSE_BACKGROUNDS / DECOR does not exist on disk yet —
// components consuming these must fail gracefully (see useImageFallback).

export const LOGOS = {
  title: '/assets/logos/title-logo.png',
  hogwarts: '/assets/logos/hogwarts-logo.png',
  gryffindor: '/assets/logos/gryffindor-logo.png',
  slytherin: '/assets/logos/slytherin-logo.png',
  hufflepuff: '/assets/logos/hufflepuff-logo.png',
  ravenclaw: '/assets/logos/ravenclaw-logo.png',
}

// Crests whose source PNG has an opaque black background rather than
// transparency. HouseCrest applies mix-blend-mode: screen only to these,
// so black pixels vanish into the dark card instead of rendering as a box.
export const CRESTS_NEEDING_BLEND = new Set(['hogwarts', 'slytherin'])

export const HOUSE_BACKGROUNDS = {
  hogwarts: '/assets/houses/hogwarts-bg-default.jpg',
  gryffindor: '/assets/houses/gryffindor-bg.jpg',
  slytherin: '/assets/houses/slytherin-bg.jpg',
  hufflepuff: '/assets/houses/hufflepuff-bg.jpg',
  ravenclaw: '/assets/houses/ravenclaw-bg.jpg',
}

export const DECOR = {
  snitch: '/assets/decor/snitch.png',
  wand: '/assets/decor/wand.png',
  patronusStag: '/assets/decor/patronus-stag.png',
}

export const WALLPAPERS = {
  wallpaper1: '/assets/wallpapers/wallpaper-1.jpg',
  wallpaper2: '/assets/wallpapers/wallpaper-2.jpg',
}
