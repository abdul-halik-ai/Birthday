# An Arrow to Your Heart 💗 — Sariyath Beevi

A seven-page birthday surprise built with React, Vite, TypeScript, and Framer Motion. It uses a soft light scrapbook theme and works on phone-sized screens. No backend, account, tracking, or API key is required.

## Run / build

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Customize

Edit `src/config.ts` to set the sender name, letter, blessing, final message, and photo captions.

- **Photos:** add your real photos to `public/photos/` and update the `photos` array in `src/config.ts`. The included SVGs are clearly marked placeholders; no personal photos are fabricated.
- **Music:** add a licensed MP3 at `public/music/song.mp3`. Music is off until the visitor taps the music button.
- **Navigation:** use the bottom arrows, seven dots, or the URL hash `#/1` through `#/7`.
- **Birthday letter:** replace the default sample lines in `config.ts` with the exact personal message before sharing if the original wording is important. The original ZIP did not contain the full Tanglish letter.

## Publish from Android without Lovable credits

1. Open this ZIP on your phone and extract it.
2. Use a browser-based Node environment such as StackBlitz only if it supports importing/uploading the project archive in your current browser. If it does not show an import option, do not get stuck there.
3. An alternative is to upload the project to a GitHub repository from the GitHub mobile website, then connect that repository to a static host such as Netlify or Cloudflare Pages. Set the build command to `npm run build` and the publish/output directory to `dist`.
4. After deployment, open the host's public URL on your phone and test all seven pages.

This is a source project ZIP, not a hosted public website URL. A public URL is created only after you publish it with a hosting service.
