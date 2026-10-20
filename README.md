# Thouraz Pub website

Astro 7 static website for Thouraz Pub, Montecchio Precalcino. Development and QA take place on `astro-v1`. Do not deploy or modify `main` as part of pre-launch QA.

## Local development and verification

Use Node 24 LTS (Astro requires Node >=22.12.0).

```sh
npm ci
npm run check
npm run build
npm test
npm run preview
```

`npm test` checks generated `dist/` files, so build first. The lockfile makes installs reproducible. The `esbuild` install script is explicitly allowed for npm versions that require it. On restricted machines, set `ASTRO_TELEMETRY_DISABLED=1` if Astro cannot write its telemetry preferences outside the project.

## Routes that must be preserved

| URL | Purpose |
| --- | --- |
| `/` | New Italian homepage, ready for indexing after launch |
| `/home/` | Legacy preview URL; immediate HTML redirect to `/` |
| `/en/` | English homepage |
| `/menu/` | Unlisted legacy menu alias, excluded from search with `noindex` |
| `/listini/` | Permanent physical QR-code destination; renders the menu directly with `noindex` |
| `/come-funziona.html` | Existing explanation page |
| `/TESTOrario1.pdf`, `/TESTOrario2.pdf`, `/TESTOrario3.pdf` | Existing public PDF URLs |

Astro uses directory output and canonical trailing slashes. `/home`, `/en`, and `/menu` remain valid entry URLs on GitHub Pages through its directory redirects. Never remove `/listini/index.html` from the published artifact.

## Source of truth and legacy files

- `src/pages/` defines Astro routes; `src/components/` contains the homepage and menu landing.
- `src/data/site.ts` contains contact details and the four Google Drive menu links.
- `public/` contains files copied unchanged into `dist/`, including the custom-domain `CNAME`, crawler files, legacy URLs, and photos.
- `public/images/logo.webp` is a 660-pixel lossless WebP derivative of `public/LogoThouraz.png` for the new pages. Original logo URLs remain available for compatibility.
- `public/fonts/` hosts the same Montserrat Latin variable font previously loaded from Google Fonts, with its SIL Open Font License. A single preloaded WOFF2 covers the weights and accented characters used by both languages.
- Root `index.html`, `listini/index.html`, `come-funziona.html`, `TESTOrario*.pdf`, logo files, `robots.txt`, and `CNAME` are historical files from the legacy site. They are **not** the Astro publishing source. Kept deliberately during migration; edit `src/` or `public/` for the future Astro deployment.
- `dist/`, `.astro/`, and `node_modules/` are generated and ignored. Publish only `dist/`, never the repository root.

## GitHub Pages launch boundary

At the pre-launch review on 2026-09-27, GitHub Pages still served the repository root of `main` with custom domain `thourazpub.it`. These settings were left unchanged.

The workflow validates pushes to `astro-v1` and `main`, and pull requests. Production artifact upload and deployment are explicitly restricted to `main` outside pull requests. A manual run on `astro-v1` only validates; it cannot deploy. Node 24, `npm ci`, Astro checking, build, and route regression checks run before deployment.

Only at an explicitly authorized launch: make the reviewed Astro revision available on `main`, change Pages publishing to **GitHub Actions**, keep the existing custom domain and HTTPS settings, then verify production routes and menu PDFs. The website is configured for the custom domain root, not a `/MethosIT/` base path.

## Local launch preparation (2026-10-20)

The Italian homepage now lives at `/`. Canonicals, hreflang, sitemap, business schema,
and internal homepage links use the root URL. `/home/` uses an immediate HTML
meta-refresh redirect with a canonical and a clickable fallback, compatible with
static GitHub Pages hosting (not an HTTP 301 response).

Public homepage and event-page navigation no longer links to the menus, and business
schema no longer advertises a menu URL. `/listini/` remains the permanent QR target;
`/menu/` remains an unlisted compatibility alias. Both serve all four original PDF
links without JavaScript and carry `noindex, follow`. The legacy explanation page
also carries `noindex` and its return link goes to `/listini/`.

Keep these menu pages out of the sitemap and allow crawling in `robots.txt` so
search engines can read `noindex`. This is search exclusion, not access control:
anyone with the URL can still open or share it.

These are local preparations only. Production deployment and Search Console
submission remain separate launch steps; verify Pages settings before publishing.


## Conversion tracking (optional, disabled until configured)

Homepage conversion links use `data-track` attributes for these events: `whatsapp_click`, `call_click`, `maps_click`, `instagram_click`, `google_reviews_click`, `google_review_write_click`, and `language_switch`. The event payload also includes the CTA location and current language.

The site has optional Umami Cloud support. No analytics script or third-party analytics request is loaded when `PUBLIC_UMAMI_WEBSITE_ID` is unset. To enable analytics later, create the site in Umami and add the repository variable `PUBLIC_UMAMI_WEBSITE_ID`. Optionally set `PUBLIC_UMAMI_SCRIPT_URL` when using a self-hosted Umami instance; otherwise the Cloud script URL is used.

The click handler also supports a future Plausible integration if `window.plausible` is provided, so the page markup does not need to change when switching providers.

<!-- Vercel preview trigger -->
