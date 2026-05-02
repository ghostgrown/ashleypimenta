# Portfolio Dev Log

Running notes for picking this project back up between sprints.

---

## Project Overview

Single-page portfolio site for **Ash**, graphic designer.
Stack: semantic HTML5 + plain CSS. No frameworks, no build tools — open `index.html` in a browser to preview.

---

## File Structure

```
my-first-portfolio/
├── index.html      — all markup, one page
├── styles.css      — all styles, plain CSS with custom properties
└── MEMORY.md       — this file
```

---

## Design System

| Token | Value | Notes |
|---|---|---|
| `--accent` | `#C96442` | Terracotta — the signature color |
| `--accent-light` | `#FBF5F2` / `#1E1410` | Tinted section backgrounds (light / dark) |
| `--bg` | `#FFFFFF` / `#141210` | Page background (light / dark) |
| `--bg-nav` | `rgba(255,255,255,0.94)` / `rgba(20,18,16,0.94)` | Frosted nav (light / dark) |
| `--text` | `#1C1C1C` / `#F0EAE5` | Body text (light / dark) |
| `--text-muted` | `#787878` / `#9A8880` | Secondary text (light / dark) |
| `--border` | `#E8E0DC` / `#3A2C26` | Lines & outlines (light / dark) |
| `--font-serif` | Cormorant Garamond | Headings, hero name, tagline |
| `--font-sans` | Inter | Body, nav links, buttons |

Dark mode is driven by `[data-theme="dark"]` on `<html>`. Preference is saved to `localStorage`; first-time visitors inherit `prefers-color-scheme`.

---

## Sections Built

| Section | ID | Notes |
|---|---|---|
| Nav | — | Fixed, frosted glass. Logo + 3 links + dark/light toggle |
| Hero | `#hero` | Full-viewport. Eyebrow label, display name, italic tagline, CTA button |
| Services | `#work` | 3-column grid of outlined terracotta cards with inline SVG icons |
| About | `#about` | 2-col: image placeholder left, text + button right |
| Contact | `#contact` | Centered. Email link, Instagram + LinkedIn placeholders |
| Footer | — | Simple copyright line |

---

## Session Log

### Sprint 1 — 2026-05-02
- Built initial page from scratch: `index.html` + `styles.css`
- Fonts: Cormorant Garamond (serif headings) + Inter (sans body)
- Services cards changed from filled white blocks → transparent with terracotta outline
- Added light/dark mode toggle to nav
  - Moon icon shown in light mode, sun in dark mode
  - Anti-flash inline script at top of `<body>` prevents wrong-theme flicker on load

---

## Placeholder Content to Swap Out

- `[City]` — designer's location (About section)
- `[X]` — years of experience (About section)
- `hello@example.com` — real contact email (Contact section + `mailto:` href)
- `#` hrefs on Instagram and LinkedIn links
- About paragraphs — replace with real bio
- Services descriptions — tailor to actual offerings
- Image placeholder in About — replace `.image-placeholder` div with a real `<img>`

---

## Ideas / Next Steps

- [ ] Portfolio / work grid section (case study cards with hover overlays)
- [ ] Scroll-triggered fade-in animations (Intersection Observer, no libraries)
- [ ] Active nav link highlight on scroll
- [ ] Mobile hamburger menu
- [ ] Favicon
- [ ] Open Graph meta tags for social sharing
- [ ] Deploy (Netlify / GitHub Pages — just drag the folder)
