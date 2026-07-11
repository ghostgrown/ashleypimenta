# WordPress Source Data — Bitcoin Depot (recovered 2026-07-10)

Recovered directly from the live WordPress database (`ashleypimenta_com_1` on DreamHost,
via phpMyAdmin) before the DreamHost hosting is cancelled. The old WordPress site is no
longer reachable through `ashleypimenta.com` (DNS now points at the Netlify/Eleventy
rebuild), so this was pulled straight from the database rather than the rendered page.

## Site / page builder

- Post ID `5034`, post type `portfolio`, post status `publish`
- Builder: **WPBakery Page Builder (Visual Composer)** — not Elementor. Confirmed via
  `_wpb_vc_js_status` meta key and `post_content` starting with WPBakery shortcodes:
  `[vc_row][vc_column][vc_column_text]...`
- `sub_title` meta: `ART DIRECTION & BRAND IDENTITY`
- Theme stores per-gallery-image layout as **ACF (Advanced Custom Fields) repeater
  fields** on the post itself, not inside the WPBakery shortcode content:
  - `gallery_{N}_image` — attachment ID of the Nth gallery image
  - `gallery_{N}_column_width` — original width class for that image (`1-1`, `1-2`,
    `1-3`, or `1-4`), same notation already used in `content/projects/*.md`

## Original gallery width sequence (index → width), 76 images total

This is the authoritative, original per-image width assignment from WordPress, in
gallery order. The current `content/projects/bitcoindepot.md` in this repo has only
68 `width:` entries for the same gallery — WPBakery counted every image individually,
while the migration to Eleventy grouped some adjacent same-width images into
`type: slider` blocks (one width per slider, not per slide), so the two lists are not
a 1:1 index match. Use this as the source of truth when auditing/fixing width
mismatches — don't assume current-file index N corresponds to original index N.

```
0:1-1   1:1-1   2:1-1   3:1-1   4:1-4   5:1-4   6:1-4   7:1-4
8:1-1   9:1-1   10:1-1  11:1-1  12:1-1  13:1-1  14:1-2  15:1-2
16:1-1  17:1-1  18:1-1  19:1-1  20:1-3  21:1-1  22:1-1  23:1-1
24:1-1  25:1-2  26:1-2  27:1-1  28:1-1  29:1-3  30:1-3  31:1-3
32:1-2  33:1-2  34:1-1  35:1-2  36:1-2  37:1-2  38:1-2  39:1-2
40:1-2  41:1-3  42:1-3  43:1-3  44:1-2  45:1-2  46:1-2  47:1-2
48:1-2  49:1-2  50:1-4  51:1-4  52:1-4  53:1-3  54:1-4  55:1-4
56:1-2  57:1-1  58:1-3  59:1-3  60:1-3  61:1-3  62:1-3  63:1-3
64:1-2  65:1-3  66:1-1  67:1-1  68:1-1  69:1-1  70:1-2  71:1-3
72:1-3  73:1-3  74:1-1  75:1-1
```

(A few indices have `image: NULL` — likely a deleted/replaced attachment still holding
a width slot: indices 3, 9, 17, 35, 50, 56, 64, 67.)

## post_content (WPBakery shortcode wrapper, 2096 chars)

```
[vc_row][vc_column][vc_column_text]
<p class="p1">...
```

Full text wasn't fully recoverable through the phpMyAdmin UI (truncates long cell
values in the query grid; export/print/clipboard tools opened in popup windows the
browser automation couldn't reach). What's confirmed: it's a thin WPBakery wrapper
around a text block — the actual gallery/layout data lives in the ACF `gallery_N_*`
fields above, not in this shortcode content.

## How to get more (if needed later)

Access path used: DreamHost panel → Websites → ashleypimenta.com → Content →
Manage Database → PHPMyAdmin (auto-authenticated deep link, no password entry
needed) → database `ashleypimenta_com_1` → table `wp_5trakg_posts` / `wp_5trakg_postmeta`.

Useful queries:

```sql
-- find a portfolio post by title
SELECT ID, post_title, post_status, post_type FROM wp_5trakg_posts WHERE post_title LIKE '%Bitcoin Depot%';

-- full gallery width sequence for a given post
SELECT CAST(SUBSTRING_INDEX(SUBSTRING_INDEX(meta_key,'_',2),'_',-1) AS UNSIGNED) AS idx,
       MAX(CASE WHEN meta_key LIKE '%_column_width' THEN meta_value END) AS width,
       MAX(CASE WHEN meta_key LIKE '%_image' THEN meta_value END) AS image_id
FROM wp_5trakg_postmeta
WHERE post_id = 5034
  AND (meta_key REGEXP '^gallery_[0-9]+_column_width$' OR meta_key REGEXP '^gallery_[0-9]+_image$')
GROUP BY idx ORDER BY idx;
```

This same approach (swap `post_id`) works for any other project page's original
gallery widths, before DreamHost hosting is cancelled and this data is gone for good.
