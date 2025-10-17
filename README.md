# From Favour to Martina

This is a small romantic web page + slideshow built for **Martina**. It contains a 45-second slideshow (3 photos), a subtle in-browser Afro-love instrumental generated with the WebAudio API, and your full birthday message.

## What you must do before deploying

1. **Replace the placeholder images** in the `images/` folder with the 3 photos you uploaded in the chat:
   - `images/photo1.jpg`
   - `images/photo2.jpg`
   - `images/photo3.jpg`

   Make sure they are high-resolution and named exactly like above.

2. **Preview locally** (optional)
   - You can open `index.html` in your browser locally. Some browsers may block in-browser audio autoplay until you interact (click/touch) the page — this is normal. Click once to start audio.

3. **Deploy to GitHub & Vercel (one-click deploy)**

### Create the repo on GitHub
- Create a new public repository named `from-favour-to-martina` under the GitHub account `okopifavour-cell`.
- Upload all files from this project (you can drag-and-drop in GitHub's web UI).

### Connect to Vercel
- Sign in to https://vercel.com with your GitHub account.
- Click **New Project → Import Git Repository** and select `from-favour-to-martina`.
- Use the default settings and **Deploy**. Vercel will provide a live link like `https://from-favour-to-martina.vercel.app`.

## Customization
- To change the volume, edit `script.js` and adjust `masterVolume` (0.0 to 1.0).
- To change the quote or message, edit `index.html`.

---
Created for Martina 💜 — good luck and happy birthday to her!
