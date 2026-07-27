# ashleypimenta.com — Project Memory

Eleventy portfolio site for Ashley M. Bettencourt-Pimenta. Live at `ashleypimenta.com` (and `ashleypimenta.netlify.app`). Registrar Porkbun, DNS + hosting on Netlify. **DNS flip is done — the domain no longer touches DreamHost.**

> **DreamHost / WordPress history:** the full record of how the old WordPress site was hosted, accessed, and built — plus the shutdown checklist and a rebuild spec — is at **`_backup/dreamhost-wordpress-setup.md`**. Read that before touching anything DreamHost-related.

## Stack

- **SSG:** Eleventy 2.x + Nunjucks templates
- **Hosting:** Netlify (free tier) — auto-deploys on push to `main`
- **Netlify site ID:** `50562b82-88f4-4738-b562-c86ddcf6b685`
- **Fonts:** Lato (Google Fonts) + Font Awesome 6.5 (footer icons)
- **Breakpoints:** 767px mobile, 991px tablet, 1199px desktop-sm
- **Gutter:** `--gutter` CSS var — 40px desktop / 24px tablet / 20px mobile

## Repo Structure

```
ashleypimenta/
├── src/                    — Eleventy source
│   ├── _data/              — projects.js, photography.js (custom YAML parsers)
│   ├── _includes/layouts/  — base.njk, project.njk
│   ├── assets/css/         — style.css
│   ├── assets/js/          — main.js (filter, slider, lightbox, nav)
│   ├── admin/              — Decap CMS (not wired yet)
│   ├── index.njk           — Work page (main portfolio grid)
│   ├── work/index.njk      — Individual project template
│   ├── photography.njk
│   ├── explorations.njk
│   ├── scad.njk
│   └── about.njk
├── content/
│   ├── projects/*.md       — 35 project files
│   └── photography.yml     — 68 photos with width classes
├── uploads/                — All project images (in git, pushed by year)
├── netlify.toml            — build: npm run build, publish: _site
├── .eleventy.js            — passthrough copy, collections, filters
├── package.json
└── _site/                  — built output (gitignored)
```

## Dev

```bash
cd /Users/ash/Code/ashleypimenta
npm start        # eleventy --serve on :8080, auto-reloads
npm run build    # one-shot build to _site/
```

## Filter Bar

- **Desktop (>991px):** 11 buttons — All Work, Art Direction, Banner, Digital, Illustration, Motion, OOH, Print, Promotional, Social, UX/UI
- **Mobile/Tablet (≤991px):** `<select>` dropdown replaces button row
- Filter bar lives ABOVE and OUTSIDE the portfolio grid — inside causes mobile overflow clipping

## Project Flags (in .md frontmatter)

| Flag | Effect |
|---|---|
| (none) | Main Work grid |
| `exploration: true` | Explorations / SCAD page only |
| `hidden: true` | Excluded from site entirely |

## Site Pages

| Page | URL | Nav |
|---|---|---|
| Work | `/` | Work |
| SCAD | `/scad/` | Creative Explorations |
| Photography | `/photography/` | Photography |
| About | `/about/` | About |
| Explorations | `/explorations/` | (hidden from nav) |

## Open Items

- [x] **Domain DNS flip** — done. Porkbun registrar, Netlify DNS + hosting
- [ ] **Cancel DreamHost** — extraction first, then close before **2026-08-19**. Full checklist and shutdown log in `_backup/dreamhost-wordpress-setup.md` §9 and §12. Account backup was requested 2026-07-26 19:52:59; do not close until the archive is downloaded **and verified**
- [ ] **Decap CMS** — wire up `/admin/` with Netlify Identity
- [ ] **Remaining captions** — burberry, bookcovers, palmsnights, basquiat-book, lifeisgood, thetruth, evalongoria, cnn-dei, cnn-back-to-where-it-all-began, juliachild, people-of-earth, moonstruck-fine-foods
- [ ] **BMW order** — lone item at bottom of 4-col grid, ask Ashley where she wants it
