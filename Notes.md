# Notes

## Flush image grid (no grey gaps under images) — "crop grid"

**Problem:** In a flex-wrap gallery, images keep their own aspect ratio
(`height: auto`), so in a row the cells stretch to the tallest image and the
shorter ones leave grey background showing underneath. Jagged, uneven rows.

**Fix:** give each multi-column cell a fixed shape and let the image fill it,
cropping the overflow. The two knobs:
- **`aspect-ratio`** = the cell shape (`3/4` portrait, `1/1` square, `4/3`
  landscape…). This makes every cell in a row the same height.
- **`object-fit: cover`** = fills the cell and crops the overflow (like
  `background-size: cover`). `object-position: center` (default) picks what is
  kept; change it to keep a different part of the image.

**Exact recipe in `src/assets/css/style.css`** (Photography page, applied at
ALL breakpoints — mobile, tablet, and desktop):
```css
.photo-item.w-half,
.photo-item.w-third,
.photo-item.w-fifth,
.photo-item.w-sixth { aspect-ratio: 3 / 4; }

.photo-item.w-half img,
.photo-item.w-third img,
.photo-item.w-fifth img,
.photo-item.w-sixth img { height: 100%; object-fit: cover; }
```
Full-width (`w-full`) photos are left out on purpose — a single full-width image
per row has nothing to line up with, so it keeps its natural height.

**To reuse on other galleries later:** factor this into a small utility class
(e.g. `.crop-grid` on the container, `.crop-cell` on each item) so any gallery
can opt in without repeating the selectors.
