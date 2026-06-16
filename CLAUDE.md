# ashleypimenta — Claude Code Notes

## Stack
Eleventy 2.x + Nunjucks. Source in `src/`. Built to `_site/`. Deployed via Netlify on push to `main`.

## Local dev
`npm start` → localhost (port varies). Never `open index.html` — there is no root index.html.

## Filter bar rule (non-negotiable)
The custom dropdown (`#customSelect` in `src/index.njk`) must show on **all breakpoints ≤1199px** — that means phones, tablets, and small/medium desktop windows. The button row only appears at >1199px (full wide desktop).

Do NOT change this breakpoint without Ashley's explicit approval. Accessibility across older and smaller devices is a priority.

## Never use native `<select>` for styled dropdowns
macOS/iOS override the open-state appearance regardless of CSS. Use the custom div-based dropdown pattern in `src/index.njk` (`#customSelect`) for any dropdown that needs to match the site style.

## Source files
- `src/assets/css/style.css` — all styles
- `src/assets/js/main.js` — filter logic, slider, lightbox, nav
- `src/index.njk` — homepage (portfolio grid + filter bar)
- `content/projects/*.md` — one file per project; edit here to update project pages
- `_backup/wordpress-export-2026-06-15.xml` — original WP export, keep for reference
