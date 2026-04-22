# Deployment

FitForm Studio is a static Vite + React build deployed to Hostinger shared hosting via Apache. Any static host works; the `.htaccess` at the repo root handles SPA routing, gzip, cache headers, and HTTPS redirect when served by Apache.

## Prerequisites

- Hostinger account with web hosting and FTP credentials, OR access to Hostinger File Manager.
- Domain configured and SSL enabled (Hostinger provides free SSL).
- Node.js 18+ and npm installed locally for the build step.

## Build

```bash
npm install
npm run build
```

Output is written to `dist/`:
- `dist/index.html`
- `dist/assets/index-*.js`
- `dist/assets/index-*.css`

Filenames include content hashes for cache-busting.

## Upload

Two methods. Either works; pick whichever is more convenient.

### Method A: Hostinger File Manager (no tools required)

1. Log in at `hpanel.hostinger.com` and open the File Manager for the domain.
2. Navigate to `public_html/`.
3. Delete the previous `index.html` and `assets/` folder (keep `.htaccess` untouched unless it changed).
4. Upload the full contents of the local `dist/` folder into `public_html/`.
5. If `.htaccess` changed in this release, upload it too (it lives in the repo root, not in `dist/`).

### Method B: FTP (FileZilla, Cyberduck, etc.)

1. Connect to the FTP host from Hostinger (port 21).
2. Navigate to `/public_html/` on the remote.
3. Delete old `index.html` and `assets/`.
4. Upload local `dist/*` into `/public_html/`.
5. Upload `.htaccess` from the repo root if it changed.

### File permissions

- Files: 644
- Directories: 755

Hostinger sets these automatically via File Manager; FTP clients may need manual adjustment.

## Verify

After upload, wait 2–5 minutes for cache invalidation, then:

1. Visit the domain over HTTPS.
2. Check the two active routes:
   - `/#/` — HomePage (Hero, About, Team, Pricing, FAQ, Contact).
   - `/#/instructors` — InstructorsPage.
3. Confirm the BSport widget loads in the Pricing section (calendar of classes).
4. Confirm the navbar "LOGIN" button opens the BSport login modal.
5. Test theme toggle (dark / light).
6. Test on mobile: hamburger menu opens, sections scroll correctly.
7. Open browser DevTools → Console: no 404s for `assets/*`, no script errors.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Blank page | Wrong files at root, or `index.html` missing | Re-verify `dist/` contents are at `public_html/` root, not inside a subfolder. |
| 404 on page refresh at non-`/` routes | `.htaccess` missing or SPA rewrite not active | Upload `.htaccess`; confirm Hostinger shows hidden files to verify presence. |
| `/assets/*` 404s | Assets uploaded to wrong path | `assets/` must be a sibling of `index.html` at `public_html/`. |
| BSport widget fails to load | CSP, ad-blocker, or network issue | Open DevTools → Network and confirm `cdn.bsport.io/scripts/widget.js` returns 200. |
| Site serves HTTP (not HTTPS) | SSL not enabled or rewrite not active | Enable SSL in Hostinger panel; the `.htaccess` already has the HTTPS redirect rule. |

## Maintenance workflow

1. Pull latest `main`, branch for the change.
2. Modify source, `npm run dev`, verify locally at `http://localhost:3000`.
3. `npm run build` and verify `dist/` is current.
4. Deploy via File Manager or FTP (above).
5. Verify live site.
6. Merge branch.

## Notes

- The `.env.local` file is for local development only and is ignored by git. It is not needed on the server.
- No server-side runtime is deployed — only static assets. Hostinger does not need Node.js on the server.
- The BSport widget is loaded from their CDN at runtime; no API keys are embedded in the bundle.
