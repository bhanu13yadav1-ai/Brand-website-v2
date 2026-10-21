# Part B Upload Guide — Hinglish

**Target repository:** `https://github.com/bhanu13yadav1-ai/Brand-website-v2` · branch `main`

## Phone se upload

1. Pehle current repository ka backup lo.
2. `V1_PART_B_STORY_SERIES.zip` download karke Android par extract karo.
3. GitHub repo kholo → `main` → **Add file** → **Upload files**.
4. Extracted `V1_PART_B_STORY_SERIES` folder ke **contents** repository root mein upload karo; ZIP ko direct upload mat karna aur ek extra nested folder mat banana.
5. Matching root files replace karo: `index.html`, `app.js`, `styles.css`, `sw.js`, `manifest.webmanifest`, `README.md`. `fallback.js`, `app-icon.svg`, `innerwear-image-library.json`, `size-chart-template.json`, dono CSV manifests aur diagnostics files ko add/update karo. Original unrelated files ko delete mat karna.
6. Ek commit mein sab upload karo. Suggested message: `V1 Part B: branching Hinglish stories and desi wheel guide`.
7. Publish hone ke baad `https://bhanu13yadav1-ai.github.io/Brand-website-v2/part-b-diagnostics.html` kholo.
8. **Run Part B checks** dabao, phir **Check all image URLs** dabao. Failure aaye toh raw report se exact filename aur source URL dekho.

## Part B mein kya improve hua

- Part A ke 10 starter stories preserve; total 13 stories.
- 3 continuing stories, 3 parts per series, aur har series mein 2 alternate endings.
- Optional on-device bookmarks/progress; save tabhi hoga jab user opt-in kare. Data encrypted/synced nahi hai.
- “Chut / land / gand / dildo / butt plug” glossary simple desi Hinglish mein.
- Teen original wheels ke labels, result details aur reset actions Hinglish mein.
- Dark Romance/Wild wheel prompts mein colloquial Hindi/Hinglish gaali-banter; non-graphic, adults-only, consensual and skippable.
- Original catalogue, image archive, Wellness, Boyfriend/Couples, Sanskari, Fit Studio, wishlist, comparison, demo bag aur privacy panel preserved in the package source.

## QA boundary

- Static checks: 20/20 PASS.
- In-memory Chromium component interactions: 36/36 PASS.
- Ye live GitHub Pages, upstream image URL, ya physical Android tests nahi hain. External raw-GitHub image requests functional tests mein deliberately block ki gayi thi. Hosted diagnostics aur actual device check karna abhi bhi zaroori hai.

## Size/safety explanation

- “Chut” gaali/slang hai; vulva external area hai, vagina internal canal.
- “Land” slang hai; medical term penis hai.
- “Gand” slang hai, often buttocks; anus opening hai.
- Dildo mein overall length, insertable length aur widest diameter alag hote hain.
- Anal-use toy ke liye flared base/retrieval stop, intended-use guidance aur suitable lubricant check karo. Wheel numbers sirf demo filters hain—personal size recommendation nahi.

References are listed in `RESEARCH_NOTES_PART_B.md`. This is general education, not diagnosis.
