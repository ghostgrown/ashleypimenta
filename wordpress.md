# WordPress Source of Truth — Bitcoin Depot

This file preserves the **real rendered WordPress page** so the original layout is
never lost, even after DreamHost hosting is cancelled.

## Saved source files (in repo)

- `_backup/wordpress-bitcoindepot-rendered-2026-01-16.html` — the **actual rendered
  HTML** of `https://www.ashleypimenta.com/portfolio/bitcoindepot/`, captured from the
  Internet Archive snapshot dated **2026-01-16 22:33:41 UTC**. This is a true browser
  render (Kalium theme output), not a reconstruction. It is the authoritative layout.
- `_backup/wordpress-export-2026-06-15.xml` — full WordPress WXR export (2026-06-15).
  Newer than the archive, but it is database *metadata* (ACF fields), not a render.

## Theme / rendering facts (from the rendered HTML)

- Theme: **Kalium** (child theme `kalium-child`). Portfolio type-2, `alt-four`.
- Gallery container: `<div class="gallery captions-below"><div class="row nivo">…`.
- Each gallery item is a Bootstrap column; **ACF `column_width` maps to a col class**:
  - `1-1` → `col-xs-12` (full width)
  - `1-2` → `col-xs-12 col-sm-6` (half)
  - `1-3` → `col-xs-12 col-sm-4` (third)
  - `1-4` → `col-xs-12 col-sm-3` (quarter)
- Columns sit in a wrapping row (flex/float), **in source order, top-aligned** — items
  do NOT reflow to backfill gaps. A row whose widths sum to <100% leaves trailing
  whitespace on the right. (This is why the Eleventy gallery must be `flex-wrap`, not
  CSS-grid `auto-flow: dense`.)
- Captions render **below** each item in `<div class="caption">`.
- Item types seen: plain `image`, `slider` (`portfolio-images-slider`), `video`
  (`portfolio-video`, `<video mp4="…">`), and **before/after `comparison`**
  (`figure.comparison-image-slider` / `cd-image-label` / `cd-resize-img` — a draggable
  US-vs-CA overlay).

## Authoritative gallery structure (62 items, exact render order)

Format: `# | width | type | caption | file(s)`

```
 0 | 1-1  | image      | Satoshi ATM Wrap – Redesign                   | ATMWrap-US-Mockup.png
 1 | 1-1  | image      |                                               | (needs asset: image)
 2 | 1-4  | image      | ATM Wrap (Left) | 2021                        | Bitcoin-Depot-Product-Wrap-Left.jpg
 3 | 1-4  | image      | ATM Wrap | 2021                               | atm.jpg
 4 | 1-4  | image      | ATM Wrap (Right) | 2021                       | Bitcoin-Depot-Product-Wrap-Right.jpg
 5 | 1-4  | image      | ATM Found in Wild Shot | 2025                 | BitcoinDepot-ATM-Wild.jpg
 6 | 1-1  | image      | Finney ATM Wrap – Redesign                    | BitcoinDepot-ATM-Finney-scaled.png
 7 | 1-1  | slider     |                                               | Linkedin-Employee-Banner2-scaled.jpg, Linkedin-Employee-Banner1a-scaled.jpg, Linkedin-Employee-Banner3a-scaled.jpg
 8 | 1-1  | image      | Trade Show Booth Design | ATMIA + NACS CONFER | BitcoinDepot-TadeShowBoothDesign-ATMIANACS.png
 9 | 1-1  | image      | Digital Contract Flyer | Page 1               | BitcoinDepot-ContractFlyer-FINAL-A.png
10 | 1-1  | image      | Digital Contract Flyer | Page 2               | BitcoinDepot-ContractFlyer-FINAL-B.png
11 | 1-1  | image      | Digital Franchise Flyer                       | BitcoinDepot-Franchise-Flyer-2021-FINAL.png
12 | 1-2  | image      | NYC Case Study | Page 1                       | (needs asset: image)
13 | 1-2  | image      | NYC Case Study | Page 2                       | (needs asset: image)
14 | 1-1  | image      | Banner Ads Set | 300 × 250, 320 × 480, 480 ×  | BitcoinDepot-HM-BannerSet.png
15 | 1-1  | video      |                                               | (needs asset: video)
16 | 1-1  | image      | Banner Ads – CoinATMRadar | 728x90, 300x250   | BitcoinDepot-CoinATMRadar.png
17 | 1-1  | image      | APP Launch Rollout | Fullscreen Graphic       | AppLaunch-Mockup-SM-3-FINAL-scaled.jpg
18 | 1-1  | image      | APP Launch Rollout | Bitcoin Depot Website Ba | AppLaunch-Website-Banner-scaled.jpg
19 | 1-1  | image      | APP Launch Rollout | Email Design             | AppLaunch-EmailDesign-FINAL-scaled.png
20 | 1-1  | image      | NACS Half Page AD | Print                     | BitcoinDepot-NACS-HalfPage-AD.png
21 | 1-1  | image      | Gas Station Spin Off Deliverables             | (needs asset: image)
22 | 1-1  | image      | Promotional Banners + Google Display Banner A | BitcoinDepot-GoogleDisplayAd-Set-2.png
23 | 1-3  | image      | Social Media | Atlanta Inno Tech Madness      | SM-TechMadness-2000x2000-1.jpg
24 | 1-3  | image      | Social Media                                  | SM-CyberSet-2-IG-scaled.jpg
25 | 1-3  | image      | Social Media Animation                        | SM-10KFollowers.gif
26 | 1-2  | image      |                                               | SM-CyberSet-1-TW-scaled.jpg
27 | 1-2  | image      |                                               | SM-CyberSet-1-TW-scaled.jpg
28 | 1-1  | image      | Digital Support Graphic                       | SupportLine-Graphic-Twitter-2048x1024-1.jpg
29 | 1-2  | slider     |                                               | sm-steps-2000x2000-cover.2.jpg, sm-steps-2000x2000-1.jpg, sm-steps-2000x2000-2.jpg, sm-steps-2000x2000-3.jpg, sm-steps-2000x2000-4.jpg
30 | 1-2  | image      | Social Media Fact                             | SocialMedia-BTCFact_2000x2000-compressed.jpg
31 | 1-2  | image      | Social Media | Bitcoin Fact                   | SM-BTCFacts2_3000x3000-ig-scaled.jpg
32 | 1-2  | image      | Social Media | Litecoin Fact                  | SM-LTCFacts_3000x3000-scaled.jpg
33 | 1-2  | image      | Social Media | Bitcoin Fact                   | SM-BTCFacts2_3000x3000-twitter-scaled.jpg
34 | 1-2  | image      | Social Media | Litecoin Fact                  | SM-LTCFacts_Twitter2-scaled.jpg
35 | 1-3  | image      | Social Media | Ethereum facts set             | SM-ETHFacts-Cover_2000x2000-compressed.jpg
36 | 1-3  | image      | Social Media | Ethereum facts set             | SM-ETHFacts_2000x2000-compressed.v2.jpg
37 | 1-3  | image      | Social Media | Ethereum facts set             | SM-ETHFacts-1_2000x2000-compressed.jpg
38 | 1-2  | image      | Social Media Graphic | Giveaway               | BitcoinDepot-SM-IG-500Giveaway-Graphic.jpg
39 | 1-2  | image      | Social Media                                  | SM-Graphic-BuyOnline.jpg
40 | 1-2  | image      | [Seasonal] Animation created for Independence | SocialMedia-IndependenceDay.v3-2020_2000x2000.gif
41 | 1-2  | image      | Social Media                                  | Artboard-1-scaled.jpg
42 | 1-2  | image      | Social Media | Quote                          | BitcoinDepot-SM-CoinDesk.v2-compressed.jpg
43 | 1-2  | image      | Social Media | Animation                      | sm-1000BTMs-2000x2000-1.gif
44 | 1-4  | slider     |                                               | SM-BlackHistoryMonth-1-2000x2000-1.jpg, SM-BlackHistoryMonth-2-IanBalina-2000x2000-1.jpg, SM-BlackHistoryMonth-4-DeleAtanda-2000x2000-1.jpg, SM-BlackHistoryMonth-3-WhitneyGriffith-2000x2000-1.jpeg
45 | 1-4  | image      | Social Media | St. Patrick's Day              | BitcoinDepot-StPattysDay2020_2000x2000.jpg
46 | 1-4  | image      | Social Media | Halloween                      | sm-pumpkin-2000x2000-1.jpg
47 | 1-4  | image      | Social Media | New Year                       | BitcoinDepot-SocialMedia-NewYears2021.v2.jpg
48 | 1-1  | image      | Social Media | Beer Day                       | Photographs-BeerDay-Twitter_2048x1024-scaled.jpg
49 | 1-3  | image      |                                               | GleamCampaign-Graphics-Fire_2000x2000.jpg
50 | 1-3  | image      |                                               | GleamCampaign-Graphics-Pizza_2000x2000.jpg
51 | 1-3  | image      |                                               | GleamCampaign-Graphics-Banana_2000x2000.jpg
52 | 1-3  | image      |                                               | GleamCampaign-Graphics-Dice_2000x2000.jpg
53 | 1-3  | image      |                                               | BitcoinDepot-WatermelonDay-SocialMedia_2000x20000-compressed.jpg
54 | 1-3  | image      |                                               | SM-BTCTheme-Autumn2020-2000x2000-1.jpg
55 | 1-1  | image      |                                               | BitcoinDepot-PackageDesign-Promotion.png
56 | 1-1  | image      | Swag Giveaway Illustration                    | BitcoinDepot-Package-Twitter-Illustration-rgb-1-scaled.jpg
57 | 1-3  | image      |                                               | BitcoinDepot-CompanySWAG-1.png
58 | 1-3  | image      |                                               | BitcoinDepot-CompanySWAG-2.png
59 | 1-3  | image      |                                               | BitcoinDepot-CompanySWAG-3.png
60 | 1-1  | image      | Random Giveaway | Transparent Sticker         | Bitcoin-Depot.png
61 | 1-1  | image      | Billboard Design on Lindbergh Road in Atlanta | Billboard-LindberghRoad-ATL-scaled.jpg
```

## Assets NOT migrated to Cloudinary (block a perfect carbon copy)

These items exist in the render but their images were never migrated to Cloudinary
(the `ef8ef3f` migration skipped PDFs, and the Canadian comparison image was missed):

- Item 1 `comparison` — US side is on Cloudinary; **Canadian side is missing**
  (`BitcoinDepot-ATM-ScreenTM-Template_5760x2560-Portfolio-CA-1`).
- Item 12 `NYC Case Study | Page 1` — PDF preview, no Cloudinary asset.
- Item 13 `NYC Case Study | Page 2` — PDF preview, no Cloudinary asset.
- Item 21 `Gas Station Spin Off Deliverables` — PDF preview, no Cloudinary asset.

Everything else (all other images, both sliders, the video) resolves to Cloudinary.

## KNOWN SOURCE CONFLICT (do not resolve by guessing — see [[feedback-never-guess]])

The saved render is from **2026-01-16**; the site was edited afterward (WXR export
`post_modified` = 2026-06-09). Items present in the June export but **absent from the
2026-01-16 render** — so their current layout cannot be confirmed from saved sources:

- **Google Display Banner Ad | Set 1** (`GoogleDisplayAdBanners-2020-1200x300`) and
  **Google Display Banner Ad | Set** (`BitcoinDepot-googleads-2020`). Ashley states
  these sit **on the same line** in the live WordPress. The June export lists them as
  `1-1` + `1-3` (which would stack) — so either the export is stale or the widths were
  changed live after export. The current live site is unreachable (DNS moved to
  Netlify; DreamHost server blocks direct-IP access), and the newest Internet Archive
  snapshot is the 2026-01-16 one. **Get the current live render or Ashley's explicit
  intended widths before placing these — do not guess.**
- The June export also adds a Cinco de Mayo tile, a Pride tile, and a duplicated
  "Abandoned Cart" tile that are not in the 2026-01-16 render.
