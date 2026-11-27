# The Cut Room

Interactive portfolio for Williams, a freelance YouTube editor in Lagos. Documentary, map, business explainer, biography, and motion-graphics edits.

One reel: a persistent WebGL scene, an in-page player, placeholder case studies, a raw-to-grade wipe, an exploded edit stack, a depth-displaced portrait, and a scope builder. It deploys on Vercel with no environment variables.

## Run

```bash
npm install
npm run dev
```

`npm run build` produces the production build.

## Drop in real pictures

All video entries live in `src/data/work.ts` (`title`, `style`, `role`, `description`, `src`, `poster`). They are placeholders titled “Placeholder”. Put masters and posters in `public/work/` and point `src` / `poster` at them. The shared stand-in is `public/work/placeholder.mp4`.

Grade stills are `public/work/raw.jpg` and `public/work/graded.jpg`.

## Portraits

Williams’s studio portraits stay in the repo:

- `public/williams-navy-bokeh.jpg` — the about portrait, displaced in WebGL
- `public/williams-warm-grey.jpg` — the secondary plate, mixed in on hover

The contact link is a mailto placeholder (`placeholder@thecutroom.local`). Replace it in `src/components/Scope.tsx` before launch. The scope bar shows the brief and the turnaround only.
