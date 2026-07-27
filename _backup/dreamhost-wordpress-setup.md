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
| `ghost-grown.com` | Registration Only — DreamHost is the registrar | Renewal $19.99/year, expires 2027-02-06, auto-renewal already OFF, transfer lock ON. A `ghost-grown.com` folder also exists on the server under user `dh_h53ea8` |

**Decision (Ashley, 2026-07-26): let `ghost-grown.com` go.** The real Ghostgrown domain is
**`ghostgrownxo.com`**, already set up elsewhere. `ghost-grown.com` is unwanted, holds nothing of
value, and auto-renewal is already off, so it lapses on its own at 2027-02-06. No transfer is
needed and nothing has to be timed around it. This removes the only step in the shutdown that had
an external delay.

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

`ashleypimenta_com_1` at 65.88 MiB is the largest and is almost certainly the live one;
`ashleypimenta_com` is likely the older install matching `ashleypimenta.com.old`.

**Decision (Ashley, 2026-07-26): only `ashleypimenta.com` gets backed up.**
`ghostgrownart.com` and `goblinworldwide.com` **never became live sites** — they were builds that
were never launched, unused for years. Their five databases are intentionally abandoned and will
be destroyed when the account closes. No separate deletion step is needed; closing the account
removes them. This was a deliberate call, not an oversight.

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

### ⚠️ Correction (2026-07-26): most of this was already backed up

An earlier draft of this file overstated the risk. **The images are already preserved in this
repo's git history.** Commit `ef8ef3f` (2026-07-08) removed `uploads/` from the working tree, not
from history, and that history is pushed to GitHub.

```
git ls-tree -r --name-only ef8ef3f^ -- uploads   →  419 files
  321 jpg · 75 png · 13 mp4 · 4 pdf · 3 jpeg · 3 gif      (.git is 656 MB)
```

Recover any of them with `git checkout ef8ef3f^ -- uploads`.

So every image the live site uses exists in **three** places: Cloudinary, local `.git`, and
GitHub. Revised risk picture:

| | Files |
|---|---|
| WordPress media library | 807 |
| Preserved in git history | 419 |
| **Only on DreamHost** | **~388** |

That ~388 is overwhelmingly Kalium demo imagery, old duplicates, and unused alternate versions.
**The only genuinely valuable items are the ~46 PDFs** that were never migrated.

**Consequence: this is a small errand, not a rescue.** The plan below was simplified accordingly —
no object storage, no private repo for database dumps, no Cloudinary archive folder. Grab the
PDFs, close the account.

### Where the images actually live

| Location | Coverage |
|---|---|
| Cloudinary (cloud name `uwsjmkh2`) | Only what the Eleventy site uses — 37 content files reference it |
| `Code/ashleypimenta/uploads/` | 11 files, 15 MB |
| **DreamHost `wp-content/uploads/`** | **The full 831-record library** |

Known un-migrated items (per `wordpress.md`): the Canadian side of the Bitcoin Depot ATM
comparison slider, and three PDF-preview items (NYC Case Study pages 1–2, Gas Station Spin Off
Deliverables). Those exist only on DreamHost.

### Coverage analysis (measured 2026-07-26)

| | Files |
|---|---|
| Unique files in the WordPress media library | **807** |
| Already on Cloudinary and referenced by the live site | **406** |
| **Exists only on DreamHost** | **~401** |

Media library by type: 568 jpg, 150 png, **50 pdf**, 20 mp4, 7 gif, 4 jpeg, 3 mov, 3 heic, 1 zip,
1 mp3. Cloudinary holds 333 jpg, 84 png, 13 mp4, 3 gif and **zero PDFs**.

**All 50 PDFs are un-migrated.** They are the single most concrete loss: real deliverables with no
copy anywhere else. The rest of the ~401 gap is a mix of Kalium demo imagery (the ~38 demo pages
and demo portfolio items all carry images), older or alternate versions of work that did get
migrated, and genuinely un-migrated pieces.

**Why selective download is impossible:** Cloudinary renamed every migrated asset to a random
public ID (e.g. `auogvf5njagmy1hqxrqc.jpg`). Original filenames were not preserved, so the 406
already-safe files cannot be matched back and excluded. The download is all-or-nothing, which
means roughly half of it is redundant. That redundancy is accepted deliberately: one archived zip
in cold storage is a better outcome than permanently losing 50 PDFs to avoid it.

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

### Can you just stop paying and keep the files? No.

Researched 2026-07-26 against DreamHost's own documentation:

| Question | Answer |
|---|---|
| Can the account stay open without a paid plan? | **Yes** — the account object remains open, and cancelling a plan issues an account credit |
| Do the files survive that? | **No.** Removing hosting ("No Hosting (DNS Only)") **permanently deletes all files, users, and data on the server**. The account survives as an empty shell |
| Is there a free tier that parks a WordPress install? | No |
| Does deleting the unused ghostgrownart / goblinworldwide databases lower the bill? | **No.** Shared Unlimited is a flat $16.99/month regardless of how many databases or sites sit on it. Deleting them is housekeeping worth $0 |
| Refund or credit? | Cancelling only the plan gives a **credit**. A **refund** requires fully closing the account |

So there is no path that both stops the payment and preserves the data. Extraction has to happen
first, then cancellation.

### The checklist (SIMPLIFIED — see the correction in §7)

Since the images are already safe in git history, this reduces to four steps:

1. Wait for the backup email (`amasters.bp@gmail.com`, subject *DreamHost account backup complete!*)
2. Pull the **~46 un-migrated PDFs** out of the archive
3. Commit them to `uploads/` in this repo — they are Ashley's own portfolio work, a few MB, and
   this repo is already where the other 419 files live
4. Close the DreamHost account before **2026-08-19**

Optional extras only if they turn out to be easy: skim `ashleypimenta.com.old` for anything
interesting, and grab `kalium-child/` if a WordPress rebuild ever seems likely (it does not).

**Dropped as unnecessary:** Cloudflare R2 / Backblaze object storage, a Cloudinary archive folder,
a private GitHub repo for `.sql` dumps, and preserving the ghostgrownart / goblinworldwide
databases. All of that was built around a data-loss risk that turned out to be mostly already
mitigated.

### The original full checklist (kept for reference)

| # | Action | Why | Recoverable after closing? |
|---|---|---|---|
| 1 | ~~Transfer `ghost-grown.com`~~ **Nothing to do** | Resolved: unwanted domain, auto-renew already off, lapses 2027-02-06 on its own. Real domain is `ghostgrownxo.com` | — |
| 2 | **Download the whole `wp-content/uploads/` folder** from `/home/dh_svunx2/ashleypimenta.com/` | 831 attachments, ~11 years of source files, including the 4 items never migrated. Last access you will have | ❌ **No. Gone forever** |
| 3 | **Export the 2 `ashleypimenta_com` databases** as `.sql` (phpMyAdmin → Export) | Captures what the WXR misses: theme options, widgets, slider configs. The other 5 databases are intentionally skipped — see §4 | ❌ No |
| 4 | Download `wp-content/themes/kalium-child/` and `.htaccess`. Open `wp-config.php` and **record the `$table_prefix` value in this file**, then discard it | Custom CSS, `functions.php`, rewrite rules. The prefix is needed to read a restored dump; the credentials in that file are worthless once the account closes and must not be archived anywhere | ❌ No |
| 5 | Look inside `ashleypimenta.com.old` | Unknown contents; may hold older portfolio work | ❌ No |
| 6 | Take a fresh WXR export | The saved one is 2026-06-15. Also settles the Google Display Banner width conflict in `wordpress.md` | ❌ No |
| 7 | Save the final invoice | Records | Retrievable from `amasters.bp@gmail.com` |
| 8 | Decide before **2026-08-19** | AutoPay will charge $16.99 to the Amex ending 2000 on that date | — |

✅ Already verified safe: **no email addresses** exist on the account, so nothing mail-related is
at risk. `ashleypimenta.com`'s registration is at Porkbun, not DreamHost.

**Fastest way to do 2–5 in one shot:** Panel → Billing & Account → Manage Account → **Create a
Backup** (top right). DreamHost builds a full account backup including files and databases, then
gives you a download link. Do that first, verify the download, then work through this list.

**Where to put what you download:**

**Storage constraints (Ashley, 2026-07-26): no Google Drive, ever. Nothing kept permanently on
the Mac — iCloud is always full.**

Because the images are already preserved in git history (§7), there is almost nothing to store.
The plan is deliberately boring:

| Contents | Destination | Why |
|---|---|---|
| The **~46 un-migrated PDFs** | `uploads/` **in this repo**, committed | Ashley's own portfolio work, a few MB. The other 419 files already live in this repo's history, so this is the same shelf |
| Everything else in the archive | **Nothing.** Delete after extracting the PDFs | Kalium demo imagery, duplicates, unused versions. No value |
| `.sql` dumps, `kalium-child/`, `wp-config.php` | **Do not keep** | A WordPress rebuild is not happening. `wp-config.php` is credentials only, worthless once the account closes, and must never be committed |

⚠️ **This repo (`ghostgrown/ashleypimenta`) is PUBLIC.** The PDFs are portfolio work and fine to
commit. A WordPress `.sql` dump contains the admin email and password hash, and `wp-config.php`
contains live database credentials — neither may ever be committed here. Since neither is being
kept, this is moot, but the rule stands if that decision is ever revisited.

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

## 11. Build-this-again spec

Everything needed to stand up an identical setup from scratch, without referring to the old
server. Use with §5 (stack) and §10 (restore steps).

### Hosting shape

| Component | What it was | Notes for a rebuild |
|---|---|---|
| Plan | DreamHost Shared Unlimited, $16.99/mo | Any shared host with PHP 8.3 + MySQL works. Nothing here needed DreamHost specifically |
| Web server | Apache | `.htaccess` rewrite rules assume Apache. On nginx the WP rules must be translated |
| PHP | 8.3 | |
| Database | MySQL, one DB per install | |
| SSL | Enabled, `https` canonical | Let's Encrypt is fine |
| Canonical host | **`www.ashleypimenta.com`** | Every internal URL in the export uses `www`. Keep `www` canonical on a rebuild or run a search-replace across the DB |
| Install path | Domain root (`/home/{user}/{domain}/`) | Not a subdirectory install |

### WordPress configuration

| Setting | Value |
|---|---|
| Site title | Ashley M. Bettencourt-Pimenta (Ash Bettencourt) |
| Tagline | Graphic & Digital Design |
| Language | en-US |
| Permalink structure | `/%postname%/`, with `portfolio` as a custom post type at `/portfolio/{slug}/` |
| Admin user | `ashleypimenta_5s5k5m` (display name `ashleysuper`) |
| Table prefix | ⬜ **TO RECORD** — read `$table_prefix` from `wp-config.php` before discarding it |

### Install order (order matters)

1. WordPress core
2. Plugins: WPBakery Page Builder → Livemesh Addons → Slider Revolution → MasterSlider →
   Advanced WordPress Backgrounds → WPFront Scroll Top
3. Kalium parent theme, then `kalium-child`, then activate the child
4. Only then import content — WPBakery shortcodes render as literal `[vc_row]` text if the
   builder is not active at import time

### Licenses required

**WordPress itself is free and always was.** The only recurring cost in this whole setup was
DreamHost hosting at $16.99/month ($204/year). The products below are commercial, but were bought
once via ThemeForest years ago, not subscribed to — check the ThemeForest account tied to
`amasters.bp@gmail.com` before re-buying anything.

| Product | Vendor | Notes |
|---|---|---|
| Kalium | Laborator, via ThemeForest | Paid. Without it, imported content has no layout |
| WPBakery Page Builder | WPBakery | Paid. Often bundled with Kalium |
| Slider Revolution | ThemeCore | Paid. Often bundled with Kalium |

Livemesh Addons, MasterSlider, Advanced WordPress Backgrounds and WPFront Scroll Top have free
versions sufficient for this build.

### The portfolio layout contract

The single most important piece of custom logic, documented in full in `wordpress.md`: each
gallery item carries a `column_width` field (`1-1`, `1-2`, `1-3`, `1-4`) that maps to Bootstrap
column classes, and an `item_type` (`image`, `slider`, `video`, `comparison`). Items lay out in
source order in a wrapping row, top-aligned, and do **not** backfill gaps. Any reimplementation
must use flex-wrap, never CSS grid `auto-flow: dense`, or the layout will silently differ.

---

## 12. Shutdown log

**Resume phrase: "DreamHost backup is here."** When Ashley says this in any session, the
completion email has landed in `amasters.bp@gmail.com` (subject: *DreamHost account backup
complete!*). Pick up at the first unchecked box below: help her download the archive, **verify**
it opens and is not truncated, extract the **~46 un-migrated PDFs**, commit them to `uploads/` in
this repo, delete the rest, then close the account. Read §7's correction first — the images are
already preserved in git history, so this is a small errand, not a rescue. Do not close the
account before the verify box is checked.

| Date | Event |
|---|---|
| 2026-07-26 | This record written and panel-verified |
| 2026-07-26 19:52:59 | **Full account backup scheduled** via Panel → Billing → Backup Your Account ("Back me up!"). Covers all SFTP users, mailboxes, and MySQL databases. Completion email goes to `amasters.bp@gmail.com` |
| ⬜ pending | Backup email received, archive downloaded |
| ⬜ pending | Archive **verified** — zip opened, media and `.sql` files confirmed present |
| ⬜ pending | ~46 un-migrated PDFs extracted and committed to `uploads/` in this repo |
| ⬜ pending | Rest of the archive deleted (demo imagery, duplicates, `.sql`, `wp-config.php`) |
| ⬜ pending | **Account closed** (must be before 2026-08-19 to avoid another $16.99) |

**Rule: the account is not closed until the verify line above is checked.** A scheduled backup is
not a downloaded backup, and a downloaded backup is not a verified one.

---

## 13. Open questions

- What is in `ashleypimenta.com.old` (Feb 2024)? Never opened.
- ~~Do ghostgrownart.com or goblinworldwide.com matter enough to preserve?~~ **Resolved
  2026-07-26: no.** Neither ever went live. Both are intentionally being let go.
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
