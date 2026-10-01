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
| `/` | Existing menu landing; do not replace with the Italian homepage yet |
| `/home/` | New Italian homepage |
| `/en/` | English homepage |
| `/menu/` | Menu entry point |
| `/listini/` | Permanent physical QR-code destination; renders the menu directly |
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

Moving the Italian homepage from `/home/` to `/` is a separate future change. Update canonicals, hreflang, sitemap, schema, and homepage links together at that time; keep `/listini/` functional permanently.


## Conversion tracking (optional, disabled until configured)

Homepage conversion links use `data-track` attributes for these events: `menu_click`, `whatsapp_click`, `call_click`, `maps_click`, `instagram_click`, `google_reviews_click`, `google_review_write_click`, and `language_switch`. The event payload also includes the CTA location and current language.

The site has optional Umami Cloud support. No analytics script or third-party analytics request is loaded when `PUBLIC_UMAMI_WEBSITE_ID` is unset. To enable analytics later, create the site in Umami and add the repository variable `PUBLIC_UMAMI_WEBSITE_ID`. Optionally set `PUBLIC_UMAMI_SCRIPT_URL` when using a self-hosted Umami instance; otherwise the Cloud script URL is used.

The click handler also supports a future Plausible integration if `window.plausible` is provided, so the page markup does not need to change when switching providers.

<!-- Vercel preview trigger -->
