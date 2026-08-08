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
- [ ] **Cancel DreamHost** — extraction first, then close before **2026-08-19**. Full checklist and shutdown log in `_backup/dreamhost-wordpress-setup.md` §9 and §12. See the state-of-play box below before touching anything
- [ ] **Decap CMS** — wire up `/admin/` with Netlify Identity
- [ ] **Remaining captions** — burberry, bookcovers, palmsnights, basquiat-book, lifeisgood, thetruth, evalongoria, cnn-dei, cnn-back-to-where-it-all-began, juliachild, people-of-earth, moonstruck-fine-foods
- [ ] **BMW order** — lone item at bottom of 4-col grid, ask Ashley where she wants it

---

## ⚠️ DreamHost shutdown — state of play as of 2026-08-07

A session crashed mid-extraction on 2026-07-26 and left confusing wreckage. This is what is
actually true, so nobody re-walks the circle. Detail lives in `_backup/dreamhost-wordpress-setup.md` §12.

| Fact | Status |
|---|---|
| Account backup on DreamHost's servers | ✅ Complete, downloadable in panel. **Expires 2026-08-09** |
| `user/iad1-shared-b8-41_dh_svunx2.tar.gz` (12.76 GiB) | The archive holding the WordPress install. **Never downloaded** |
| `~/Downloads/pdfs.tar.gz` | **0 bytes.** Failed artifact of the crashed session. Delete it, it is not a backup |
| `~/Downloads/mftp_zip_2026_07_26_20_*.zip` ×3 | 219 MB of file-manager exports. **Already mined**, safe to delete |
| PDFs in the media library | 50 total |
| PDFs recovered so far | **17** (13 in `_backup/pdfs-from-dreamhost/`, 4 more pulled from zip #3 on 2026-08-07) |
| **Still only on DreamHost** | **33**, including 19 Bitcoin Depot and all 8 CNN Presidential Debate boards |
| Wayback Machine as a fallback | ❌ Only ever captured 7 PDFs from this domain, zero Bitcoin Depot, zero CNN |

**Storage constraint (Ashley, restated 2026-08-07): she does not want this material living on her
laptop.** That rules out committing more big PDFs here — `.git` already grew to ~975 MB from the
first batch. Cloudinary was tried and **only partly works: the free plan rejects any raw upload
over 10 MB**, so 6 of the 17 uploaded and 11 bounced. A destination for the large files is still
undecided. GitHub release assets (2 GB per file, no clone required) is the leading candidate.

**Do not close the DreamHost account** until the remaining 33 are off the server. Renewal charges
2026-08-19.
