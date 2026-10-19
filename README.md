# maxcode

> Coding agent for long-running work powered by **maxm1**.

maxcode is an autonomous coding agent designed for long-horizon software engineering tasks. It plans multi-step modifications across codebases, runs deterministic verification suites after each step, and maintains a linear checkpoint graph enabling instant rollbacks whenever a test fails or requirements diverge.

---

## Key Capabilities

- **Visible Plan**: Breaks complex goals into verifiable steps, shows live progress in a clean terminal interface, and allows steering while running.
- **Deterministic Verifier Loop**: Automatically invokes your test suite, typecheckers, and linters after every checkpoint before advancing to the next file or module.
- **Instant Checkpoint Rollbacks**: Maintains atomic git rollbacks so failed experiments and regressions are reverted instantly with zero manual cleanup.
- **Specialized Model Routing**: Routes planning, large-scale refactoring, and code review separately to **maxm1** optimized models within the same session.
- **Outcome-Based Billing**: Pay only for successfully completed work; retries, dead ends, and rollbacks are never charged.

---

## Quickstart

Run maxcode directly in any repository with no prior installation:

```bash
# Run via uvx (recommended)
uvx maxcode

# Or install globally with pip / brew
pip install maxcode
```

Run inside your repository:

```bash
cd your-project
maxcode "Refactor the authentication middleware to use JWT bearer tokens without downtime"
```

---

## Project Structure

This repository contains both the official product marketing site and the complete Diátaxis-structured technical documentation.

```
maxcodesite/
├── app/                  # Application root (Vite + React 19)
├── components/           # UI components & BoardUI design primitives
│   ├── base/             # Base buttons, dialogs, form controls
│   ├── application/      # High-level compound views
│   └── originkit/        # Originkit shader and visual components
├── docs/                 # Diátaxis documentation site (Next.js + Fumadocs)
│   ├── app/              # App Router routes and SSG export
│   └── content/docs/     # Tutorials, How-Tos, Reference, Explanation
├── public/               # Static assets, branding SVGs, and favicon
├── src/                  # Source code for marketing landing page
│   ├── components/       # Hero, Verifier, Terminal, Stats, FAQ
│   ├── data/             # Brand config and palette variables
│   └── lib/              # GSAP animations and utility functions
└── scripts/              # Build pipelines and distribution merge scripts
```

---

## Development

### Prerequisites

- Node.js 20+
- npm or pnpm

### Setup & Run

```bash
# Install dependencies
npm install

# Run the marketing site locally
npm run dev

# Run the documentation site locally
npm run docs:dev

# Run tests
npm test

# Run TypeScript checks across site & docs
npm run lint

# Build production bundle (merges marketing site and docs into dist/)
npm run build
```

---

## Architecture & Design System

The application is built on:
- **Framework**: React 19, TypeScript, Vite
- **Docs**: Next.js App Router with Fumadocs static exports
- **Styling**: Tailwind CSS v4 with semantic BoardUI color tokens (`--color-tx`, `--color-sf`, `--color-st`)
- **Motion**: GSAP 3 + ScrollTrigger for scroll-driven animations
- **Visuals**: Originkit Tidal Stipple (`OrchidFlurry`) WebGL2 dynamic wave background

---

## License

Apache-2.0
