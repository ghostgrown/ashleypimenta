# DreamHost + WordPress — Full Setup Record

**Purpose:** a complete, standalone record of how `ashleypimenta.com` was hosted, built, and
accessed on DreamHost + WordPress, so it can be rebuilt or reconnected on DreamHost or any other
host at any point in the future, with no guesswork.

**Written:** 2026-07-26, ahead of cancelling DreamHost service. Panel-verified the same day.

**Read this first:** the domain is already fully off DreamHost and the live site does not depend
on it. But there are **three things on that account that die with it**, one of which is a domain
you still own. See [§9 Before you cancel](#9-before-you-cancel--action-checklist).

---

## 0. Where this is stored

| File | Location | What it holds |
|---|---|---|
| **This file** | `Code/ashleypimenta/_backup/dreamhost-wordpress-setup.md` | Hosting, access, WordPress stack, restore playbook, pre-cancellation checklist |
| `wordpress.md` | `Code/ashleypimenta/wordpress.md` | Deep-dive on the Bitcoin Depot portfolio page: exact gallery order, ACF width mapping, known source conflicts |
| `wordpress-export-2026-06-15.xml` | `Code/ashleypimenta/_backup/` | Full WordPress WXR export, 7.5 MB |
| `wordpress-bitcoindepot-rendered-2026-01-16.html` | `Code/ashleypimenta/_backup/` | True browser render of one portfolio page (Kalium output) |
| `MEMORY.md` | `Code/ashleypimenta/` | Current Eleventy site context |

**Where to keep it:** here, in the `ashleypimenta` repo, in `_backup/`. The irreplaceable
artifacts already live in `_backup/`, it is committed to git so it survives the laptop, and this
is site infrastructure history rather than career or Bettencourt Studios material, so it does not
belong in compass. Compass holds only a one-line memory pointer back to this file.

---

## 1. Current state (verified 2026-07-26)

| Layer | Where it is now | Evidence |
|---|---|---|
| Registrar (`ashleypimenta.com`) | **Porkbun LLC** | whois; created 2018-01-07, expires 2028-01-07 |
| DNS / nameservers | **Netlify DNS** (`dns1–4.p01.nsone.net`) | whois + `dig NS` |
| Web hosting | **Netlify** | `server: Netlify` response header |
| Apex | 200, serves the Eleventy site | title `Ashley M. Bettencourt-Pimenta` |
| `www.` | 301 → apex | Netlify redirect |
| Email (MX) | **None on this domain** | `dig MX` empty |
| DreamHost email addresses | **None on the whole account** | Panel → Mail: "You currently have no email addresses set up" |
| Old WP admin via domain | 404 | Netlify serves it now |
| Old WP uploads via domain | Unreachable | `/wp-content/uploads/...` 301s into the Netlify site |
| **WordPress files on the server** | ✅ **Still fully intact** | `/home/dh_svunx2/ashleypimenta.com/` has `wp-admin`, `wp-content`, `wp-includes`, `.htaccess` |

**What this means:** cancelling will not take down the website, break DNS, or kill any email. The
WordPress install is still sitting on the DreamHost server, complete and untouched — it is just
unreachable from the internet because the domain points elsewhere. It is only reachable from
inside the panel now, and it disappears when the account closes.

---

## 2. DreamHost account

| Item | Value |
|---|---|
| Panel | `https://panel.dreamhost.com/` |
| Account name | Ashley Masters's Account |
| **Account ID** | **2249426** |
| Joined | 2017-04-05 |
| Primary contact | **amasters.bp@gmail.com** (not `bettencourtash@`, so billing email is not in the usual inbox) |
| Account users | Account Owner Only |
| Sign-in | Password or "Sign In with Google" |

### Billing

| Item | Value |
|---|---|
| Active plan | **Shared Unlimited**, monthly |
| Plan started | 2024-12-19 |
| Price | **$16.99 / month** plus tax |
| **Renews on** | **2026-08-19** |
| Rebills | 5th of every month |
| Current balance | $16.99 |
| Payment method | American Express ending 2000, **AutoPay ON** |
| Redeemable offer sitting unused | Free .WEBSITE credit (1st-year registration) |

⏰ **The renewal date is 2026-08-19.** AutoPay is on, so it will charge $16.99 unless the account
is closed or autopay is cancelled before then.

### Server

| Item | Value |
|---|---|
| Server | **`iad1-shared-b8-41`** |
| Region | US-East (Ashburn, Virginia) |
| Web server | Apache |
| PHP | 8.3 |
| Websites on it | 1 (`ashleypimenta.com`) |
| CPU / RAM usage | Low / Low |

### Domains on the account

| Domain | Role | Detail |
|---|---|---|
| `ashleypimenta.com` | Hosted, Shared Unlimited | Registration is **elsewhere** (Porkbun). Panel offers "Transfer Registration," confirming DreamHost does not hold it |
| **`ghost-grown.com`** | **Registration Only — DreamHost IS the registrar** | Renewal $19.99/year, **expires 2027-02-06**, **auto-renewal OFF**, transfer lock ON. A `ghost-grown.com` folder also exists on the server under user `dh_h53ea8` |

⚠️ **`ghost-grown.com` is registered at DreamHost.** Closing the account puts that registration at
risk. It must be transferred out (to Porkbun, alongside the others) before the account is closed.
Auto-renewal is already off, so it would also lapse on 2027-02-06 regardless.

---

## 3. Access map — how to get back in

This is the "how was it set up / how do I reconnect" section. Credential **values** are
deliberately not written here; this records **where each one lives**.

| What | How to reach it | Notes |
|---|---|---|
| **WordPress admin** | `https://ashleypimenta.com/wp-admin/` (worked when DNS pointed at DreamHost) | Currently 404 because Netlify serves the domain. Restoring it requires pointing DNS back, or reaching the install by its server path |
| WP admin user | login **`ashleypimenta_5s5k5m`**, display name `ashleysuper`, email `amasters.bp@gmail.com` | Password reset goes to that Gmail |
| **SFTP** | Panel → Websites → SFTP Users & Files → row `dh_svunx2` → **Login Info** | Server `iad1-shared-b8-41`, host IP seen as `173.236.255.37`, port 22 |
| Browser file manager | Same row → **File Manager** | Opens `us-east-files.dreamhost.com` |
| **Database admin** | Panel → Websites → MySQL Databases → **phpMyAdmin** link | Hostname **`mysql.ashleypimenta.com`** |
| MySQL server | `iad1-mysql-e2-16a:philibert`, US-East (Ashburn) | |
| Billing / plan / close account | Panel → Billing & Account → Manage Account | "Create a Backup" and "Close Account" buttons are both top-right of that page |
| Domain registration | Panel → Domain Names → Manage Domains | |

🔐 **Security note:** the DreamHost file-manager URLs embed the SFTP credential directly in the
link. Do not paste those URLs into shared docs, tickets, or chats. Pull fresh credentials from
**Login Info** in the panel instead.

⚠️ `mysql.ashleypimenta.com` is a DreamHost-managed hostname that requires the domain to use
DreamHost's nameservers. DNS now points at Netlify, so that hostname may no longer resolve
externally. Use the panel's phpMyAdmin link rather than connecting directly.

### File paths on the server

```
/home/dh_svunx2/ashleypimenta.com/          ← the live WordPress install
    ├── wp-admin/                            (modified May 27, 2026)
    ├── wp-content/                          (modified Jul 9, 2026)  ← themes, plugins, uploads
    ├── wp-includes/                         (modified Jul 17, 2026)
    ├── .htaccess                            (523 B, Feb 4, 2024)
    ├── index.php
    └── .well-known/
/home/dh_svunx2/ashleypimenta.com.old/      ← an EARLIER install, Feb 2024. Not yet examined
/home/dh_h53ea8/ghost-grown.com/            ← separate site dir under a different SFTP user
```

### SFTP users (10 total)

| User | Domain attached |
|---|---|
| **`dh_svunx2`** | **`ashleypimenta.com`** ← the one that matters |
| `dh_h53ea8` | none attached (holds a `ghost-grown.com` folder) |
| `ashleysuper` | none attached (shows a warning icon in the panel) |
| `dh_ka8adb`, `dh_ihr73b`, `dh_fn87w6`, `dh_g25km5`, `dh_5v9tup`, `dh_w7djae`, `dh_8s7qc9` | none attached |

The unattached users are leftovers from sites that were removed from hosting. Their home
directories may still hold files.

---

## 4. Databases — there are three WordPress sites here, not one

Server `iad1-mysql-e2-16a:philibert`, hostname `mysql.ashleypimenta.com`.

| Database | Size | Description | User |
|---|---|---|---|
| `ashleypimenta_com` | 13.88 MiB | WordPress Database (ashleypimenta.com/) | `ashleypimentacom` |
| `ashleypimenta_com_1` | **65.88 MiB** | WordPress Database (ashleypimenta.com/) | `iivezwx` |
| `ghostgrownart_com` | 3.02 MiB | WordPress Database (ghostgrownart.com) | `ghostgrownartcom` |
| `ghostgrownart_com_1` | 11.77 MiB | WordPress Database (ghostgrownart.com) | `udmep8ps` |
| `ghostgrownart_com_2` | 16.48 MiB | WordPress Database (ghostgrownart.com) | `3gdw6ps7` |
| `goblinworldwide_com` | **39.52 MiB** | WordPress Database (goblinworldwide.com/) | `goblinworldwidec` |
| `goblinworldwide_com_1` | 2.44 MiB | WordPress Database (goblinworldwide.com/) | `pejfk3fe` |

**Total: 7 databases, ~153 MiB, across three different websites.**

`ghostgrownart.com` and `goblinworldwide.com` are no longer hosted (neither appears in Websites),
but **their databases are still here and still hold their content.** If either of those sites
matters even a little, those dumps need to come down too. `ashleypimenta_com_1` at 65.88 MiB is
the largest and is almost certainly the live one; `ashleypimenta_com` is likely the older install
matching `ashleypimenta.com.old`.

---

## 5. WordPress stack

### Core

| Item | Value |
|---|---|
| WP version (Jan 2026 render) | **6.9** |
| WP version (Jun 2026 export) | **7.0** |
| Site title | Ashley M. Bettencourt-Pimenta (Ash Bettencourt) |
| Tagline | Graphic & Digital Design |
| Site URL | `https://www.ashleypimenta.com` (www is canonical) |
| Language | en-US |
| Permalinks | `/portfolio/{slug}/` for portfolio, `/{slug}/` for pages |
| WP-CLI | Installed (`~/.wp-cli` exists under `dh_svunx2`) |

### Theme

| Item | Value |
|---|---|
| Parent theme | **Kalium** (Laborator, ThemeForest, **paid**) |
| Active theme | **kalium-child** |
| Portfolio layout | `type-2`, `alt-four` |
| Typography | Lato, via Kalium's TypoLab (`typolab-lato-font-8`) |
| Icons | Font Awesome |

### Plugins

| Plugin | Slug | Version | Role | Paid |
|---|---|---|---|---|
| WPBakery Page Builder | `js_composer` | — | Page builder; content stored as `[vc_row]` shortcodes | ✅ |
| Livemesh Addons for WPBakery | `addons-for-visual-composer` | — | The `lvca-*` elements: carousels, tabs, testimonials, pricing tables, piecharts, odometers, stats bars | |
| Slider Revolution | `revslider` | 6.6.13 | Hero sliders | ✅ |
| MasterSlider | `master-slider` | 3.11.0 | Second slider plugin | |
| Advanced WordPress Backgrounds | `advanced-backgrounds` | — | `awb-css` | |
| WPFront Scroll Top | `wpfront-scroll-top` | — | Back-to-top button | |

Kalium, WPBakery, and Slider Revolution are commercial licenses. A rebuild needs them or the
layout has to be redone from scratch.

### Custom fields

| Field | Used for |
|---|---|
| `column_width` | Portfolio gallery item width: `1-1`, `1-2`, `1-3`, `1-4` → Bootstrap col classes (see `wordpress.md`) |
| `item_type` | `image`, `slider`, `video`, `comparison` |
| `heading_title`, `sub_title`, `header_position` | Page headers |
| `page_custom_css` | Per-page CSS overrides |
| `custom_logo`, `custom_logo_width`, `custom_sticky_logo`, `sticky_menu_skin`, `custom_menu_skin`, `section_logo_switch` | Kalium per-page header controls |
| `header_fullwidth`, `footer_fullwidth`, `footer_visibility`, `fixed_footer` | Kalium per-page layout |
| `hover_effect_style`, `hover_layer_options`, `hover_color_transparency` | Portfolio thumbnail hover |
| `_wpb_vc_js_status`, `_vc_post_settings` | WPBakery state |

---

## 6. Content inventory (2026-06-15 export)

| Post type | Count |  | Status | Count |
|---|---|---|---|---|
| `attachment` | 831 |  | `inherit` | 831 |
| `nav_menu_item` | 111 |  | `publish` | 237 |
| `portfolio` | 81 |  | `draft` | 8 |
| `page` | 55 |  | `trash` | 2 |
| `post` | 1 |  | `private` | 1 |

**Published portfolio pieces: 76.** Real work (CNN, Turner/TBS/TNT, Bitcoin Depot, SCAD,
freelance) plus Kalium demo items never deleted (Noor Chair, O3 Cabinets, Plywood Chair, Eskimo,
Ryuji Mitani, Toronto Maps, Mjölk Books, Raincup, and similar).

**Published pages: 50.** Roughly 12 real (Home, ABOUT, Portfolio, photography, Illustrations, Logo
Designs, Creative Explorations `/scad/`, Contact, extras) and ~38 Kalium demo leftovers (Elements,
Alerts, Buttons, Icons, Dividers, Team, Clients, Pricing Table, Grid 3/4/5 Columns, Masonry v1–v3,
Portfolio 2/3/4 Col, Cart, Checkout, My Account, Sample Page, Blog).

The Eleventy site carries 35 projects and 5 pages, so the migration was a deliberate cut.

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

831 attachment records total, all under `wp-content/uploads/YYYY/MM/`.

### Taxonomy terms

Advertising, Animation, Banner, Billboard, Book Design, Branding, Campaign, Collage, Commercial,
Digital, Graphic Design, Illustration, Information Design, Inspiration, Logos, Menu Design,
Microsite, Mobile App, Motion, OOH, OOH Campaign, Print, Projects, plus Main Menu.

---

## 7. What is saved, and what is not

| Component | Saved? | Where |
|---|---|---|
| Posts, pages, portfolio, custom fields, menus, categories | ✅ | `_backup/wordpress-export-2026-06-15.xml` |
| One page's true rendered layout | ✅ | `_backup/wordpress-bitcoindepot-rendered-2026-01-16.html` |
| Attachment **records** (filenames, captions, metadata) | ✅ | in the WXR |
| Attachment **files** (actual images) | ❌ | 11 files locally; the rest on DreamHost, partly on Cloudinary |
| MySQL dumps (7 databases) | ❌ | Never taken |
| `wp-content/themes/kalium-child/` | ❌ | Never taken |
| Slider Revolution / MasterSlider configs | ❌ | Live in DB tables the WXR does not export |
| Kalium theme options, widgets, Customizer | ❌ | Live in `wp_options` |
| `wp-config.php`, `.htaccess` | ❌ | Never taken |
| `ashleypimenta.com.old` (the Feb 2024 install) | ❌ | Never examined |
| ghostgrownart.com / goblinworldwide.com content | ❌ | Only in their databases |

**A WXR export is not a backup.** It is content metadata and cannot restore a site alone.

### Where the images actually live

| Location | Coverage |
|---|---|
| Cloudinary (cloud name `uwsjmkh2`) | Only what the Eleventy site uses — 37 content files reference it |
| `Code/ashleypimenta/uploads/` | 11 files, 15 MB |
| **DreamHost `wp-content/uploads/`** | **The full 831-record library** |

Known un-migrated items (per `wordpress.md`): the Canadian side of the Bitcoin Depot ATM
comparison slider, and three PDF-preview items (NYC Case Study pages 1–2, Gas Station Spin Off
Deliverables). Those exist only on DreamHost.

---

## 8. How the migration was done

1. WXR export pulled from WP admin, 2026-06-15.
2. Rendered HTML of the Bitcoin Depot page recovered from the Internet Archive snapshot of
   2026-01-16, because ACF metadata alone did not reveal the real rendered layout.
3. Rebuilt as Eleventy 2.x + Nunjucks (see `MEMORY.md`), 35 projects as markdown.
4. Images migrated to Cloudinary (commit `ef8ef3f`), skipping PDFs.
5. DNS moved: registrar Porkbun, nameservers → Netlify DNS, site served by Netlify.

---

## 9. Before you cancel — action checklist

Ordered by consequence. Items 1–5 are permanent losses.

| # | Action | Why | Recoverable after closing? |
|---|---|---|---|
| 1 | **Transfer `ghost-grown.com` registration off DreamHost** (to Porkbun) | DreamHost is the registrar. Closing the account puts a domain you own at risk. Transfer lock is ON, so unlock it first and get the auth code | ❌ **No — you could lose the domain** |
| 2 | **Download the whole `wp-content/uploads/` folder** from `/home/dh_svunx2/ashleypimenta.com/` | 831 attachments, ~11 years of source files, including the 4 items never migrated. Last access you will have | ❌ **No. Gone forever** |
| 3 | **Export all 7 MySQL databases** as `.sql` (phpMyAdmin → Export) | Captures what the WXR misses, plus the entire ghostgrownart.com and goblinworldwide.com sites | ❌ No |
| 4 | Download `wp-content/themes/kalium-child/`, `wp-config.php`, `.htaccess` | Custom CSS, `functions.php`, rewrite rules | ❌ No |
| 5 | Look inside `ashleypimenta.com.old` and the unattached SFTP users' home dirs | Unknown contents; may hold older work | ❌ No |
| 6 | Take a fresh WXR export | The saved one is 2026-06-15. Also settles the Google Display Banner width conflict in `wordpress.md` | ❌ No |
| 7 | Save the final invoice | Records | Retrievable from `amasters.bp@gmail.com` |
| 8 | Decide before **2026-08-19** | AutoPay will charge $16.99 to the Amex ending 2000 on that date | — |

✅ Already verified safe: **no email addresses** exist on the account, so nothing mail-related is
at risk. `ashleypimenta.com`'s registration is at Porkbun, not DreamHost.

**Fastest way to do 2–5 in one shot:** Panel → Billing & Account → Manage Account → **Create a
Backup** (top right). DreamHost builds a full account backup including files and databases, then
gives you a download link. Do that first, verify the download, then work through this list.

**Where to put what you download:**

| File | Destination |
|---|---|
| 7 `.sql` dumps, fresh WXR, `kalium-child/`, `wp-config.php`, `.htaccess` | `Code/ashleypimenta/_backup/dreamhost-final/` (small, text-ish, fine for git) |
| Raw `uploads/` folder | Google Drive — too large for git |

---

## 10. Restore playbook — putting WordPress back later

1. **Host + install.** Any host with one-click WordPress (DreamHost: Websites → Add Website).
2. **Point DNS back.** The domain is at Porkbun on Netlify nameservers. Either change nameservers
   at Porkbun to the new host's, or replace the A records. Allow up to 48h.
3. **Buy or reuse licenses:** Kalium, WPBakery, Slider Revolution.
4. **Install plugins first, then parent theme, then child theme.** Order matters — WPBakery
   shortcodes render as raw `[vc_row]` text if the builder is not active at import time.
5. **Import the WXR.** Tools → Import → WordPress importer. Do **not** check "download and import
   file attachments" — the source URLs are dead and it will stall.
6. **Reattach media.** Upload files into `wp-content/uploads/` preserving `YYYY/MM/` exactly, then
   register them with *Media from FTP* or *Add From Server*, then *Regenerate Thumbnails*. Only
   possible if step 2 of §9 was done.
7. **Or skip 5–6 entirely and restore the `.sql` dump** into the new database and drop the files
   in place. That restores theme options, widgets, and slider configs too — far more faithful than
   a WXR import. Update `wp_options` `siteurl` and `home` if the domain changed.
8. **Rebuild what neither method carries:** menu assignments and anything tied to absolute paths.
9. **Verify layout** against `wordpress-bitcoindepot-rendered-2026-01-16.html`, the only
   authoritative record of a real rendered page.
10. **Delete the demo content** — ~38 pages and a dozen portfolio items are Kalium leftovers.
11. **wp-admin** is then back at `https://ashleypimenta.com/wp-admin/`, user
    `ashleypimenta_5s5k5m`.

Realistically, path 7 (database restore) is the one that actually reproduces the old site. Both
paths depend on files that only exist on DreamHost right now.

---

## 11. Open questions

- What is in `ashleypimenta.com.old` (Feb 2024)? Never opened.
- What is in the 8 unattached SFTP users' home directories?
- Do ghostgrownart.com or goblinworldwide.com matter enough to preserve? Their databases are
  intact but the sites are unhosted.
- Which `ashleypimenta_com` database is live — almost certainly `_1` at 65.88 MiB, but confirm
  against `wp-config.php` before relying on it.
- Does the live WordPress differ from the 2026-06-15 export? The Google Display Banner Ad width
  conflict in `wordpress.md` is still unresolved.
- Should the un-migrated assets (Canadian ATM comparison, three PDF previews) be added to the
  Eleventy site or intentionally dropped?

---

## Related

- `wordpress.md` — Bitcoin Depot page structure, ACF width mapping, source conflicts
- `MEMORY.md` — current Eleventy + Netlify site context
- `Notes.md` — CSS recipes carried over from the rebuild
