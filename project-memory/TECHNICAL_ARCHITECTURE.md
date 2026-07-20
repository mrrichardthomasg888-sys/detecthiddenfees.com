# Technical Architecture

## Frontend
- **Type**: Static HTML pages (no framework — plain HTML/CSS/JS)
- **CSS**: Inline `<style>` blocks per page (no CSS preprocessor)
- **JS**: Minimal vanilla JavaScript (PDF download, sticky CTA bar)
- **Font**: Google Fonts — Inter (weights 400, 600, 700, 800, 900)
- **Icons**: Emoji-based (no icon library)
- **Images**: External badge images (buildlist.io, listbulb.com, stork.ai), no internal images

## Backend
- **None**: Fully static site
- **Analytics**: `hiddenfeeai.com` handles document processing (separate app, not in this repo)
- **Forms**: None on detecthiddenfees.com

## Hosting
- **Platform**: GitHub Pages
- **Custom domain**: detecthiddenfees.com
- **SSL**: Auto-provisioned via GitHub Pages / Cloudflare
- **DNS**: Cloudflare (proxied)

## Build Process
- **No build system**: Static HTML files pushed directly to main branch
- **GitHub Pages**: Auto-deploys from main branch
- **Note**: Multiple build scripts exist in root (`build_*.js`, `build_*.ps1`, `gen_*.js`) — these are legacy and may not be maintained. The site currently works without running any build step.

## File Structure
```
/
├── *.html                    # All pages (flat, no subdirectories)
├── /functions/               # (possibly Cloudflare Functions, check)
├── *.js                      # Build scripts and tools
├── *.json                    # Data files (terms data, schema maps, keyword groups)
├── *.ps1                     # PowerShell build scripts (legacy)
├── *.bat                     # Batch build scripts (legacy)
├── favicon.svg
├── sitemap.xml
├── robots.txt
├── _headers
├── indexnow-key.txt
├── /project-memory/          # This folder
```

## Important Technical Decisions
1. **Flat file structure** — all HTML files in root, no subdirectories. This affects internal linking.
2. **No build step** — pushes go live instantly. Simple but means every commit deploys.
3. **Inter font** — loaded from Google Fonts with preconnect hints.
4. **Footer-column CSS** — standardized `min-width:200px; display:block; padding:5px 0;` pattern on all pages.
5. **Schema** — inline JSON-LD blocks in each page `<head>`.
6. **Animations** — CSS `@keyframes` for fadeUp, gradientShift, floatOrb effects.
7. **Sticky CTA bar** — fixed bottom bar on all pages (mobile-first).

## Known Limitations
1. **No CMS** — every page must be hand-edited or script-generated.
2. **Inline CSS duplication** — no shared stylesheet, each page has its own `<style>` block (~900 lines each).
3. **Build artifacts** — many `.js`, `.json`, `.ps1` files in root from the generation system. Could be cleaned up.
4. **No image optimization** — no lazy loading except homepage badges (recently added).
5. **No caching headers** — relies on GitHub Pages defaults.
6. **No service worker** — no offline support.

## Environment Variables
- None stored in repo (static site)
- IndexNow key: `241f89e1cd603413c1ee2de939c63dbb` (in indexnow-key.txt)
- Bing Webmaster API key: NOT CONFIGURED — needs to be set up

## Cloudflare
- **Proxy**: Enabled (orange cloud)
- **Caching**: Standard
- **SSL**: Full (strict)
- **Page Rules**: Unknown — check Cloudflare dashboard