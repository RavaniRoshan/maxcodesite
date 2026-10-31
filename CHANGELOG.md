# Changelog

All notable changes to the **maxcode** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.8.0] - 2026-10-31

### Added
- **Originkit Tidal Stipple (`OrchidFlurry`) Hero Background:**
  - Integrated high-performance WebGL2 stipple density gradient with rolling wave fronts and lit crests.
  - Interactive pointer-drag particle warping with drifting wakes and soft dissipation.
  - Full-bleed hero positioning extending to `top: 0` behind the header wordmark and island navigation bar.
  - Progressive bottom vertical gradient mask dissolving into the base surface across the preview terminal section.
- **Theme-Synchronized Shading:**
  - **Dark Mode:** Deep `#070B14` surface ground with `#0081FF` electric blue particles and `#5FCDFF` luminescent crest glints.
  - **Light Mode:** Crisp `#F4F6F9` surface ground with `#0284C7` azure particles and `#0F172A` deep ink crests for optimal daytime contrast.
- **Root Documentation:**
  - Added comprehensive root `README.md` and `ARCHITECTURE.md` detailing the maxcode long-horizon execution model and verifier loop.

### Changed
- **Navigation Bar & Readability Refinements:**
  - Elevated navigation link contrast in light mode to solid text tokens (`#0A0F1E`) with enhanced hover states.
  - Preserved the clean icon theme toggle on the central island pill (`☀️` / `🌙`).
  - Removed duplicate text-based theme switch from the top-right header for a streamlined interface.
- **Global Scrolling:**
  - Hidden browser vertical and horizontal scrollbars globally (`scrollbar-width: none`) while preserving smooth touch and wheel scrolling.

### Fixed
- Resolved light theme text contrast across announcement badges, kickers, and code terminal containers.
- Fixed shader uniform parameter alignment and TypeScript typing definitions.

---

## [0.7.0] - 2026-10-29

### Added
- Unified marketing site with Fumadocs technical documentation integration.
- Pixel-crisp silver & white mascot SVG artwork and responsive brand motifs.
- Live verifier playground with deterministic execution simulations and interactive git rollbacks.
- Cost showcase interactive slider highlighting outcome-based billing models.
