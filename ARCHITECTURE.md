# maxcode Architecture Specification

This document details the architectural design and system runtime underpinning **maxcode** and its integration with the **maxm1** model series.

---

## 1. System Overview

maxcode is engineered specifically for long-horizon autonomous software engineering tasks that require tens or hundreds of discrete file changes without human intervention.

```
+-------------------------------------------------------------------+
|                         maxcode Session                           |
+-------------------------------------------------------------------+
                                  │
                                  ▼
                     +──────────────────────────+
                     | Step Decomposition (DAG) |
                     +──────────────────────────+
                                  │
                                  ▼
           +───────────────────────────────────────────────+
           |                Execution Loop                 |
           +───────────────────────────────────────────────+
           | 1. Code modification (maxm1 model)            |
           | 2. Deterministic Verification Suite           |
           |    - Types (tsc / pyright)                    |
           |    - Tests (pytest / vitest / jest)           |
           |    - Lint & Format (eslint / ruff)            |
           | 3. Evaluation:                                |
           |    - PASS: Commit Git Checkpoint -> Step N+1  |
           |    - FAIL: Rollback to Checkpoint -> Retry/Alt|
           +───────────────────────────────────────────────+
                                  │
                                  ▼
                     +──────────────────────────+
                     | Final Verification Gate  |
                     +──────────────────────────+
```

---

## 2. Core Architectural Pillars

### 2.1 Visible Plan & DAG Decomposition
- At the start of an execution session, maxcode analyzes the user's objective and constructs an explicit, dependency-ordered Directed Acyclic Graph (DAG) of actionable steps.
- The plan is rendered continuously in the terminal and interactive UI, giving operators full observability into which step is currently executing, which steps are queued, and what verification constraints exist for each step.
- Operators can inject modifications or alter the course of the plan at any checkpoint without stopping the session.

### 2.2 Deterministic Verifier Loop
- Code generations are never assumed to be correct based on token probability alone.
- Every intermediate change is passed through an isolated test runner before any state is locked in:
  1. Static analysis & compilation passes.
  2. Targeted unit and regression tests relating to modified files.
  3. Broader integration or end-to-end contract suites.
- If a verification step fails, maxcode analyzes the compiler errors or test failure logs, devises a corrective patch, or triggers an instant rollback to preserve codebase integrity.

### 2.3 Instant Git Rollbacks
- maxcode maintains a dedicated local checkpoint ledger.
- Before each atomic step begins execution, a lightweight shadow git reference (`refs/maxcode/checkpoints/<step-id>`) is captured.
- When an exploratory branch or complex refactor encounters an unresolvable conflict or test regression, the workspace is reverted to the preceding checkpoint in under 50ms, eliminating orphaned changes or corrupted source files.

### 2.4 Multi-Tier Model Routing (maxm1)
- Long runs require different cognitive profiles at different phases:
  - **Planner / Architect:** High context window, deep reasoning model used for DAG planning, dependency resolution, and rollback triage.
  - **Coder / Implementer:** Fast, high-throughput model specialized in precise syntax edits, type-safe refactoring, and diff generation.
  - **Reviewer / Verifier:** Independent model verifying that changes satisfy the originating issue and conform to codebase standards.

### 2.5 Telemetry & Privacy Boundaries
- All source code, AST caches, and local git histories remain strictly within the user's local or self-hosted execution environment.
- Only opt-in, anonymized benchmark convergence metrics are collected when enabled by the operator.

---

## 3. Web & Documentation Stack

- **Marketing Landing Page:** React 19 + Vite with Tailwind CSS v4, dynamic GSAP timeline orchestration, and Originkit WebGL2 particle shaders (`OrchidFlurry`).
- **Technical Documentation:** Next.js App Router static export powered by Fumadocs adhering to the Diátaxis documentation structure (Tutorials, How-To Guides, Technical Reference, and Conceptual Explanation).
- **Theme System:** Semantic BoardUI token hierarchy with real-time reactive dark/light palette synchronization.
