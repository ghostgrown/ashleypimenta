# RESUME HERE — DreamHost extraction, paused 2026-08-07

Ashley says **"resume"** and this is the file to open. Written because the last attempt died
mid-extraction on 2026-07-26 and left wreckage nobody could interpret. Do not re-derive any of
this, it is all verified.

## Deadlines

| What | When |
|---|---|
| Server backup is deleted by DreamHost | **2026-08-09** |
| AutoPay charges $16.99 to Amex ending 2000 | **2026-08-19** |

Cancelling DreamHost **cannot** break ashleypimenta.com. Domain is Porkbun, DNS + hosting are
Netlify, site images are Cloudinary. This is only about the PDF archive.

## Where we are

- **17 of 51 PDFs recovered**, all committed and pushed in `_backup/pdfs-from-dreamhost/`.
- **34 still only on DreamHost.** Exact list below.
- Ashley was signed into the DreamHost panel. Session may have expired, just sign in again at
  `panel.dreamhost.com` as `amasters.bp@gmail.com`. **She types the password, never Claude.**
- Route that works: Panel → Websites → SFTP Users & Files → row `dh_svunx2` (the one attached to
  ashleypimenta.com) → **File Manager** → `ashleypimenta.com/wp-content/uploads/`.
  ⚠️ That file-manager URL embeds the SFTP password. Never quote, log, or commit it.
- The file manager can zip a selection and download it. That is how the three
  `mftp_zip_2026_07_26_*.zip` files in `~/Downloads` were made.

## The 34 remaining, by folder

Ten folders. Grab whole folders, filter to PDFs after, it is far fewer clicks.

| Folder | Files | What |
|---|---|---|
| `2020/03` | **15** | The Bitcoin Depot motherlode |
| `2025/09` | 6 | CNN Presidential Debate 2024 boards |
| `2018/11` | 3 | PalmsNights OOH, blodyglove_03, Palms-Nights dup |
| `2025/12` | 2 | BD Distributor Flyer, Independent Contractor Flyer |
| `2025/10` | 2 | CNN Popcorn Box mockups |
| `2021/06` | 2 | BD Simon Malls posters |
| `2019/01` `2019/04` `2019/07` `2019/10` | 1 each | PalmsNights process book, resume PDFs |

<details>
<summary>Full filenames</summary>

```
2018/11  Palms-Nights-Process-Book-1.pdf
2018/11  PalmsNights-OOH.pdf
2018/11  blodyglove-portfolio-web_03.pdf
2019/01  PalmsNights-ProcessBook.pdf
2019/04  ashleypimenta-resume.pdf
2019/07  ashleypimenta-resumeweb.pdf
2019/10  ashleypimenta-resume.pdf
2020/03  BitcoinDepot-ATMIA-Solutions-Guide-2021-1.pdf
2020/03  BitcoinDepot-ATMIA-Solutions-Guide-2021.pdf
2020/03  BitcoinDepot-Comprehensive-Solutions-Guide-2021_02-1.pdf
2020/03  BitcoinDepot-Comprehensive-Solutions-Guide-2021_02.pdf
2020/03  BitcoinDepot-Comprehensive-Solutions-Guide-2021_v3.pdf
2020/03  BitcoinDepot-Comprehensive-Solutions-Guide-2021_v4.pdf
2020/03  BitcoinDepot-ContractFlyer-2.pdf
2020/03  BitcoinDepot-ContractFlyer.pdf
2020/03  BitcoinDepot-Franchise-Flyer-2021-FINAL-1.pdf
2020/03  BitcoinDepot-Franchise-Flyer-2021-FINAL.pdf
2020/03  BitcoinDepot-MarketingMaterials_US.pdf
2020/03  BitcoinDepot-NYCaseStudy-1-1.pdf
2020/03  BitcoinDepot-NYCaseStudy-2-1.pdf
2020/03  BitcoinDepot-NYCaseStudy-2.pdf
2020/03  BitcoinDepot-NYCaseStudy-FINAL.pdf
2021/06  BitcoinDepot-SimonMallsPoster-BartonCreekSquare-TX.pdf
2021/06  BitcoinDepot-SimonMallsPoster-RossParkMall-GA.pdf
2025/09  CNN-Presidential-Debate-2024-CandidateA_09-1.pdf
2025/09  CNN-Presidential-Debate-2024-CandidateA_09-2.pdf
2025/09  CNN-Presidential-Debate-2024-CandidateA_09.pdf
2025/09  CNN-Presidential-Debate-2024-CandidateA_10.pdf
2025/09  CNN-Presidential-Debate-2024-CandidateA_11.pdf
2025/09  CNN-Presidential-Debate-2024-CandidateA_12.pdf
2025/10  CNN_PopcornBox-Mockups-7-1.pdf
2025/10  CNN_PopcornBox-Mockups-7.pdf
2025/12  BitcoinDepot-DistributorProgram-Flyer-2021.pdf
2025/12  Independent-Contractor-Flyer-2020.v4.pdf
```
</details>

Many of the `-1` / `-2` names are WordPress re-upload collisions. **Checksum after extraction and
drop exact duplicates** — Ashley is actively frustrated by duplicate files, this matters to her.

## Ashley's constraints (do not violate)

| Rule | Detail |
|---|---|
| Nothing permanent on the laptop | No Google Drive, no iCloud, no permanent local storage |
| No duplicates | She is at her limit with this. Checksum before keeping anything |
| **Keep the Bitcoin Depot PDFs** | Stated explicitly 2026-08-07. Non-negotiable |
| Large SCAD process books | She believes these are on her **external hard drive** and is open to deleting the local copies. **NOT VERIFIED** — the drive was not plugged in. Diff by checksum before deleting anything |

## Storage: unresolved

Cloudinary was tried. **The free plan rejects any raw upload over 10 MB**, so only 6 of 17 went up
to `dreamhost-archive-2026/` (filenames preserved via the `public_id` param, cloud `uwsjmkh2`,
unsigned preset `ashleypimenta`). Eleven bounced.

Leading candidate for the big files: **GitHub release assets** — 2 GB per file, free, and nothing
has to be cloned to her disk. Not yet set up. Get her decision before uploading anything large.

## Known dead ends, do not retry

| Thing | Why not |
|---|---|
| `~/Downloads/pdfs.tar.gz` | **0 bytes.** Artifact of the 7/26 crash. Not a backup. Safe to delete |
| `~/Downloads/mftp_zip_2026_07_26_*.zip` ×3 | Fully mined, all 16 PDFs extracted. Safe to delete |
| Wayback Machine | Only ever captured 7 PDFs from this domain. Zero Bitcoin Depot, zero CNN |
| The 12.76 GiB `dh_svunx2.tar.gz` account archive | Never downloaded. Viable but heavy; the file manager is the targeted path |
| Claude reading `~/Downloads` directly | Blocked by macOS. Reading a **specific file path** works, listing the directory does not |

## Optional cleanup, not urgent

`.git` here is ~975 MB. Stripping the PDFs out of history would return it to ~656 MB, but that
force-pushes and would delete the only offsite copy. **Move files to a real home first, strip
second.** Ashley is nervous about breaking the site; she cannot, `_backup/` is not referenced by
any template. Netlify also keeps one-click rollbacks of every past deploy.
