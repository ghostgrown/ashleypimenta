# DreamHost + WordPress — Full Setup Record

**Purpose:** a complete, standalone record of how `ashleypimenta.com` was hosted and built on
DreamHost + WordPress, so the site can be rebuilt on DreamHost or any other host at any point in
the future. Written 2026-07-26, ahead of cancelling DreamHost service.

**Status of the migration:** the domain is already fully off DreamHost. Nothing on the live site
depends on DreamHost today. See [Current state](#1-current-state-2026-07-26) and then
[Before you cancel](#8-before-you-cancel--action-checklist), which has one genuinely urgent item.

---

## 0. Where this is stored

| File | Location | What it holds |
|---|---|---|
| **This file** | `Code/ashleypimenta/_backup/dreamhost-wordpress-setup.md` | Hosting + WordPress stack, restore playbook, pre-cancellation checklist |
| `wordpress.md` | `Code/ashleypimenta/wordpress.md` | Deep-dive on the Bitcoin Depot portfolio page: exact gallery order, ACF width mapping, known source conflicts |
| `wordpress-export-2026-06-15.xml` | `Code/ashleypimenta/_backup/` | Full WordPress WXR export, 7.5 MB |
| `wordpress-bitcoindepot-rendered-2026-01-16.html` | `Code/ashleypimenta/_backup/` | True browser render of one portfolio page (Kalium output) |
| `MEMORY.md` | `Code/ashleypimenta/` | Current Eleventy site context |

**Where to keep it:** here, in the `ashleypimenta` repo, in `_backup/`. Reasons:

1. The two irreplaceable artifacts (the WXR export and the rendered HTML) already live in
   `_backup/`. A record that points at files in a different repo goes stale the first time
   something moves.
2. This is site infrastructure history, not career or Bettencourt Studios business material, so
   it does not belong in compass.
3. `_backup/` is committed to git, so it survives the laptop.

Compass gets nothing from this beyond a one-line memory pointer saying the record exists and
lives here.

---

## 1. Current state (2026-07-26)

Verified live, not from notes:

| Layer | Where it is now | Evidence |
|---|---|---|
| Registrar | **Porkbun LLC** | whois: `Registrar: Porkbun LLC`, created 2018-01-07, expires **2028-01-07** |
| DNS / nameservers | **Netlify DNS** (`dns1–4.p01.nsone.net`) | whois + `dig NS` |
| Web hosting | **Netlify** | `server: Netlify`, `x-nf-request-id` on the response headers |
| Apex `ashleypimenta.com` | 200, serves the Eleventy site | title `Ashley M. Bettencourt-Pimenta` |
| `www.` | 301 → apex | Netlify redirect |
| Email (MX) | **None on this domain** | `dig MX` returns empty |
| Old WP admin | Gone | `/wp-admin/` returns 404 (Netlify) |
| Old WP uploads | Unreachable via domain | `/wp-content/uploads/...` returns 301 into the Netlify site |

**What this means:** cancelling DreamHost will not take down the website, will not break DNS, and
will not kill any email, because the domain no longer points there and no mail is configured on
it. The DreamHost account is now only a container for whatever files still sit on its server.

⚠️ The old WordPress media library is **only** reachable from inside DreamHost now. The domain no
longer routes there, so once the account is gone those files are gone. That is the one real risk.
See section 8.

---

## 2. DreamHost account facts

| Item | Value |
|---|---|
| Panel | `https://panel.dreamhost.com/` |
| Account email | **amasters.bp@gmail.com** (pre-filled at login; matches the WordPress admin user's email) |
| Sign-in | Password or "Sign In with Google" |
| Domain hosted | `ashleypimenta.com` (with `www` as the canonical host — every internal URL in the export is `https://www.ashleypimenta.com`) |
| SSL | Was active (all export URLs are `https`) |
| Billing records | **Not in `bettencourtash@gmail.com`.** A search of that inbox for DreamHost returns nothing, so receipts and renewal notices go to `amasters.bp@gmail.com` |

**Still to confirm from inside the panel** (this section should be filled in before cancelling):

- [ ] Plan type and price (Shared Starter / Shared Unlimited / DreamPress / VPS)
- [ ] Renewal date and whether it auto-renews
- [ ] Any other domains or subdomains hosted on the account
- [ ] Any DreamHost-hosted mailboxes or forwards (on any domain, not just this one)
- [ ] MySQL databases and hostname (typically `mysql.ashleypimenta.com`)
- [ ] SFTP/shell username and server (typically `ps#####.dreamhostps.com` or `xxx.dreamhost.com`)
- [ ] Whether any DreamHost one-click installs besides WordPress exist
- [ ] Whether the domain registration itself was ever at DreamHost (it is at Porkbun now, so no,
      but confirm nothing is left holding it)

---

## 3. WordPress stack

### Core

| Item | Value |
|---|---|
| WP version (Jan 2026 render) | **6.9** |
| WP version (Jun 2026 export) | **7.0** |
| Site title | Ashley M. Bettencourt-Pimenta (Ash Bettencourt) |
| Tagline | Graphic & Digital Design |
| Site URL | `https://www.ashleypimenta.com` |
| Language | en-US |
| Admin user | login `ashleypimenta_5s5k5m`, display name `ashleysuper`, email `amasters.bp@gmail.com` |
| Permalinks | `/portfolio/{slug}/` for portfolio, `/{slug}/` for pages |

### Theme

| Item | Value |
|---|---|
| Parent theme | **Kalium** (Laborator, ThemeForest, premium) |
| Active theme | **kalium-child** |
| Portfolio layout used | `type-2`, `alt-four` |
| Typography | Lato, loaded via Kalium's TypoLab (`typolab-lato-font-8`) |
| Icons | Font Awesome |

Kalium is a **paid** theme. Any future rebuild on WordPress needs a valid Kalium license, or the
layout has to be rebuilt from scratch.

### Plugins (from enqueued assets on the live render)

| Plugin | Slug | Version seen | Role |
|---|---|---|---|
| WPBakery Page Builder | `js_composer` | — | Page builder for all 50 pages. Content is stored as `[vc_row]` shortcodes |
| Livemesh Addons for WPBakery | `addons-for-visual-composer` | — | The `lvca-*` element library: carousels, tabs, testimonials, pricing tables, piecharts, odometers, stats bars |
| Slider Revolution | `revslider` | 6.6.13 | Hero sliders |
| MasterSlider | `master-slider` | 3.11.0 | Second slider plugin |
| Advanced WordPress Backgrounds | `advanced-backgrounds` | — | `awb-css` |
| WPFront Scroll Top | `wpfront-scroll-top` | — | Back-to-top button |

WPBakery, Slider Revolution and Kalium are all commercial. Three of the six are paid.

### Custom fields

The export shows heavy use of custom meta rather than a named ACF field group export. Key
per-item fields:

| Field | Used for |
|---|---|
| `column_width` | Portfolio gallery item width: `1-1`, `1-2`, `1-3`, `1-4` (maps to Bootstrap col classes, see `wordpress.md`) |
| `item_type` | `image`, `slider`, `video`, `comparison` |
| `heading_title`, `sub_title`, `header_position` | Page headers |
| `page_custom_css` | Per-page CSS overrides |
| `custom_logo`, `custom_logo_width`, `custom_sticky_logo`, `sticky_menu_skin`, `custom_menu_skin`, `section_logo_switch` | Kalium per-page header controls |
| `header_fullwidth`, `footer_fullwidth`, `footer_visibility`, `fixed_footer` | Kalium per-page layout |
| `hover_effect_style`, `hover_layer_options`, `hover_color_transparency` | Portfolio thumbnail hover |
| `_wpb_vc_js_status`, `_vc_post_settings` | WPBakery state |

---

## 4. Content inventory (from the 2026-06-15 export)

### By post type

| Post type | Count |
|---|---|
| `attachment` | 831 |
| `nav_menu_item` | 111 |
| `portfolio` (custom post type) | 81 |
| `page` | 55 |
| `post` | 1 |

### By status

| Status | Count |
|---|---|
| `inherit` (attachments) | 831 |
| `publish` | 237 |
| `draft` | 8 |
| `trash` | 2 |
| `private` | 1 |

### Published portfolio pieces: 76

Real work (CNN, Turner/TBS/TNT, Bitcoin Depot, SCAD, freelance) plus a batch of leftover Kalium
demo items that were never deleted (Noor Chair, O3 Cabinets, Plywood Chair, Eskimo, Ryuji Mitani,
Toronto Maps, Mjölk Books, Raincup, and similar).

### Published pages: 50

Roughly 12 real pages (Home, ABOUT, Portfolio, photography, Illustrations, Logo Designs, Creative
Explorations `/scad/`, Contact, extras) and roughly 38 Kalium demo leftovers (Elements, Alerts,
Buttons, Icons, Dividers, Team, Clients, Pricing Table, Grid 3/4/5 Columns, Masonry v1–v3,
Portfolio 2/3/4 Col, Cart, Checkout, My Account, Sample Page, Blog, and so on).

The current Eleventy site carries **35 project files** and 5 pages, so the migration was a
deliberate cut, not a straight port.

### Media library by upload year

```
2015  ██                    34
2016  █                     20
2017  ██                    28
2018  ████████████████████ 320
2019  █████████████████    271
2020  ████████████████████████████████ 514
2021  ████                  64
2022  ███                   56
2023  █████                 86
2024  ▏                      6
2025  ███████████████      248
2026  ██                    28
```

Counts are references in the export, not unique files. 831 attachment records total. All served
from `https://www.ashleypimenta.com/wp-content/uploads/YYYY/MM/`.

### Taxonomy terms

Menus and portfolio categories: Advertising, Animation, Banner, Billboard, Book Design, Branding,
Campaign, Collage, Commercial, Digital, Graphic Design, Illustration, Information Design,
Inspiration, Logos, Menu Design, Microsite, Mobile App, Motion, OOH, OOH Campaign, Print,
Projects, plus Main Menu.

---

## 5. What was saved, and what was not

| Component | Saved? | Where |
|---|---|---|
| Posts, pages, portfolio, custom fields, menus, categories | ✅ Yes | `_backup/wordpress-export-2026-06-15.xml` |
| One page's true rendered layout | ✅ Yes | `_backup/wordpress-bitcoindepot-rendered-2026-01-16.html` |
| Attachment **records** (filenames, metadata, captions) | ✅ Yes | in the WXR |
| Attachment **files** (the actual images) | ❌ **No** | Only 11 files in `uploads/` locally; the rest are on DreamHost and partly on Cloudinary |
| MySQL database dump (`.sql`) | ❌ No | Never taken |
| `wp-content/themes/kalium-child/` (custom CSS, functions.php) | ❌ No | Never taken |
| Plugin settings (Slider Revolution sliders, MasterSlider sliders) | ❌ No | Live in DB tables the WXR does not export |
| `wp-config.php`, `.htaccess` | ❌ No | Never taken |
| Widget settings, Customizer settings, Kalium theme options | ❌ No | Stored in `wp_options`, not in the WXR |

**A WXR export is not a backup.** It is content metadata. It cannot restore a site on its own.

### Where the images actually live now

| Location | Coverage |
|---|---|
| Cloudinary (cloud name `uwsjmkh2`) | The images used by the current Eleventy site — 37 content files reference it |
| `Code/ashleypimenta/uploads/` | 11 files, 15 MB |
| DreamHost `wp-content/uploads/` | **The full 831-record library, including everything never migrated** |

Known gaps already documented in `wordpress.md`: the Canadian side of the Bitcoin Depot ATM
comparison slider, and three PDF-preview items (NYC Case Study pages 1 and 2, Gas Station Spin Off
Deliverables). Those specific files exist only on DreamHost.

---

## 6. How the migration was done (for reference)

1. WXR export pulled from WP admin, 2026-06-15.
2. Rendered HTML of the Bitcoin Depot page recovered from the Internet Archive snapshot of
   2026-01-16, because the ACF metadata alone did not reveal the real rendered layout.
3. Site rebuilt as Eleventy 2.x + Nunjucks (see `MEMORY.md`), 35 projects as markdown in
   `content/projects/`.
4. Images migrated to Cloudinary (commit `ef8ef3f`), skipping PDFs.
5. DNS moved: registrar Porkbun, nameservers pointed at Netlify DNS, site served by Netlify.

---

## 7. Restore playbook — rebuilding WordPress later

If you ever want this back on WordPress, on DreamHost or anywhere:

1. **Host + WP install.** Any host with a one-click WordPress. DreamHost's is under
   Websites → Add Website. Point the domain's DNS at the new host (currently at Netlify DNS via
   Porkbun, so change nameservers or A records there).
2. **Buy or reuse licenses.** Kalium (Laborator/ThemeForest), WPBakery Page Builder, Slider
   Revolution. Without Kalium, the WXR imports as unstyled content and the `column_width` /
   `item_type` fields do nothing.
3. **Install plugins first**, then the theme, then the child theme. Order matters: WPBakery
   shortcodes render as raw `[vc_row]` text if the builder is not active at import time.
4. **Import the WXR.** Tools → Import → WordPress importer → upload
   `wordpress-export-2026-06-15.xml`. Do **not** check "download and import file attachments" —
   the source URLs are dead, it will just stall.
5. **Reattach media.** Upload the image files into `wp-content/uploads/` preserving the
   `YYYY/MM/` folder structure exactly, then run a plugin like *Media from FTP* or *Add From
   Server* to register them, and *Regenerate Thumbnails*. This step is only possible if you saved
   the uploads folder before cancelling (section 8).
6. **Rebuild what the WXR cannot carry:** Kalium theme options, menus assignment, widgets,
   Slider Revolution sliders, MasterSlider sliders, and any custom CSS that lived in
   `kalium-child/style.css`.
7. **Verify layout** against `wordpress-bitcoindepot-rendered-2026-01-16.html`, which is the only
   authoritative record of how a real page actually rendered.
8. **Delete the demo content.** Roughly 38 pages and a dozen portfolio items are Kalium demo
   leftovers.

Realistically: steps 5 and 6 are where this either works or does not, and both depend on files
that only exist on DreamHost right now.

---

## 8. Before you cancel — action checklist

Ordered by consequence.

| # | Action | Why | Reversible after cancelling? |
|---|---|---|---|
| 1 | **Download the entire `wp-content/uploads/` folder via SFTP** (or DreamHost's file manager, or a full-site backup zip) | 831 attachments, ~11 years of source files, including the 4 known items never migrated. The domain no longer routes to DreamHost, so this is the last access you will have | ❌ **No. Gone forever** |
| 2 | Export the MySQL database as `.sql` from the panel (Websites → Databases → phpMyAdmin → Export) | Captures everything the WXR misses: theme options, widgets, slider configs, plugin settings | ❌ No |
| 3 | Download `wp-content/themes/kalium-child/` | Custom CSS and `functions.php` tweaks | ❌ No |
| 4 | Take a fresh WXR export | The saved one is 2026-06-15; if anything was edited after that, you lose it. Also resolves the Google Display Banner width conflict flagged in `wordpress.md` | ❌ No |
| 5 | Screenshot or archive the live pages you care about | Only one page (Bitcoin Depot) has a true saved render | Partly, via Internet Archive |
| 6 | Confirm no mailboxes or forwards exist on the DreamHost account | Losing an active mailbox silently is the classic cancellation mistake. `ashleypimenta.com` has no MX, but check other domains on the account | ❌ No |
| 7 | Check for other domains/subdomains hosted on the account | Anything else you forgot is hosted there dies too | ❌ No |
| 8 | Save the final invoice and note the renewal date | Records | Retrievable from email |
| 9 | Confirm the domain is not registered at DreamHost | It is at Porkbun, so this should be clean, but verify | — |

Items 1–4 are the whole point. Everything else is hygiene.

Storage suggestion for what you download: `Code/ashleypimenta/_backup/dreamhost-final/` for the
`.sql`, the fresh WXR and the child theme (all small and text-ish), and the raw `uploads/` folder
into Google Drive rather than git, since it will be large.

---

## 9. Open questions

- What plan is the DreamHost account actually on, and when does it renew? Panel access needed.
- Are there other domains, subdomains, or mailboxes on the account?
- Does the live WordPress differ from the 2026-06-15 export? The unresolved Google Display Banner
  Ad width conflict in `wordpress.md` can only be settled by looking at the live site or a fresh
  export, and the live site is only reachable from inside DreamHost now.
- Should the un-migrated assets (Canadian ATM comparison image, three PDF previews) be pulled
  down and added to the Eleventy site, or intentionally dropped?

---

## Related

- `wordpress.md` — Bitcoin Depot page structure, ACF width mapping, source conflicts
- `MEMORY.md` — current Eleventy + Netlify site context
- `Notes.md` — CSS recipes carried over from the rebuild
