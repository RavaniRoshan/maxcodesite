# Archived: maxcodesite

Date: 2026-10-31

This repository is **archived**. It is no longer the canonical maxcode site and
its Pages deploy workflow is disabled.

- Canonical live site: <https://ravaniroshan.github.io/maxcode/>
- Canonical source: `RavaniRoshan/maxcode`, `site/` folder
- Canonical design source of truth: `site/DESIGN.md`

## Why

Both sources deployed successfully. The canonical static site was chosen because
it is cleaner and already matches `DESIGN.md`:

- exact DESIGN.md tokens in light and dark;
- only blink, bob, glow pulse, and cursor blink animations;
- no GSAP, `motion`, or shader runtime;
- no npm build, `@google/genai`, `express`, `dotenv`, or other template leftovers;
- no client-side bundle that could carry an API key;
- claims already match `docs/BENCH.md` and the repository README.

## State

- `.github/workflows/deploy-pages.yml` was moved to
  `.github/workflows-disabled/deploy-pages.yml`, so pushes no longer deploy.
- The last GitHub Pages deployment may remain visible at the old URL until it is
  unpublished. Do not link it as the current site.
- Historical source is retained for reference only. Do not add features here.
  Make site changes in `RavaniRoshan/maxcode/site`.
