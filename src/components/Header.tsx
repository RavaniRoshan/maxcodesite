import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RiSunLine, RiMoonLine } from '@remixicon/react';
import { ThemeMode } from '../data/brandConfig';
import { MaxMascotSvg, MaxFaviconSvg } from './BrandSvgs';
import { cx } from '@/utils/cx';
import { docUrl } from '@/lib/utils';

interface HeaderProps {
  onOpenModal: (mode: 'try' | 'talk' | 'login') => void;
  themeMode?: ThemeMode;
  onToggleTheme?: () => void;
}

type NavMenuKey = 'products' | 'developers' | 'resources' | 'company' | null;

export const MaxcodeWordmark: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span
    className={cx('inline-flex items-center gap-2 select-none', className)}
    aria-label="maxcode"
  >
    <MaxMascotSvg className="w-7 h-[30px] shrink-0 -translate-y-0.5" />
    <span
      className="font-semibold text-[22px] text-current leading-none tracking-[-0.035em] inline-flex items-center"
      style={{ fontFamily: 'var(--font-mono, monospace)' }}
    >
      maxcode
      <span
        aria-hidden="true"
        className="inline-block w-2.5 h-5 bg-[#FFFFFF] ml-1.5 animate-[pulse_1.1s_steps(1)_infinite]"
      />
    </span>
  </span>
);

const NavChevron: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cx(
      'size-3 opacity-60 transition-transform duration-200 shrink-0',
      isOpen ? 'rotate-180' : 'rotate-0'
    )}
    aria-hidden="true"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const CardArrowIcon: React.FC = () => (
  <span className="inline-flex relative w-4 h-4 overflow-hidden shrink-0">
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="group-hover/card:translate-x-4 group-hover/card:opacity-0 transition-all duration-300 ease-out"
    >
      <path
        d="M6 3L11 8L6 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 opacity-0 -translate-x-4 group-hover/card:translate-x-0 group-hover/card:opacity-100 transition-all duration-300 ease-out"
    >
      <path
        d="M6 3L11 8L6 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

export const Header: React.FC<HeaderProps> = ({
  onOpenModal,
  themeMode = 'light',
  onToggleTheme,
}) => {
  const [openMenu, setOpenMenu] = useState<NavMenuKey>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<NavMenuKey>('products');
  const [isScrolled, setIsScrolled] = useState(false);

  // Track window scroll to morph the floating island navbar (micro.so pattern)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleMenu = (key: Exclude<NavMenuKey, null>) => {
    setOpenMenu((prev) => (prev === key ? null : key));
  };

  const navItems = [
    { id: 'products', label: 'Products' },
    { id: 'developers', label: 'Developers' },
    { id: 'resources', label: 'Resources' },
    { id: 'company', label: 'Company' },
  ] as const;

  return (
    <header data-site-header="true" className="w-full">
      {/* -------------------------------------------------------------
        1. DESKTOP TOP STATIC HEADER (Visible at top of page)
        Matches micro.so: Full wordmark on left, Log In & Sign Up on right
      -------------------------------------------------------------- */}
      <div className="hidden lg:block relative z-30 mx-auto w-[88%] md:w-10/12 max-w-width-mx py-5">
        <div className="flex items-center justify-between">
          {/* Left: Full Wordmark */}
          <a
            href="#top"
            aria-label="maxcode home"
            className="hover:opacity-85 transition-opacity text-tx"
          >
            <MaxcodeWordmark />
          </a>

          {/* Right: Actions (Theme Toggle, Log In, Try maxcode) */}
          <div className="flex items-center gap-3">
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                aria-label={themeMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                title={themeMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                className="size-8 rounded-lg flex items-center justify-center text-tx-secondary hover:text-tx hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer select-none"
              >
                {themeMode === 'dark' ? (
                  <RiSunLine className="size-4 text-amber-400" />
                ) : (
                  <RiMoonLine className="size-4" />
                )}
              </button>
            )}

            <button
              type="button"
              onClick={() => onOpenModal('login')}
              className="h-8 px-3 text-sm font-medium text-tx/85 hover:text-tx hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors cursor-pointer select-none"
            >
              Log in
            </button>

            <button
              type="button"
              onClick={() => onOpenModal('try')}
              className="inline-flex cursor-pointer items-center justify-center whitespace-nowrap font-medium transition-all active:scale-[0.98] bg-sf-invert text-tx-invert shadow-[inset_0_-2px_0_0_rgba(0,0,0,0.2)] hover:bg-sf-invert/90 h-8 px-3.5 text-xs sm:text-sm gap-1.5 rounded-[8px]"
            >
              <span>Try maxcode</span>
            </button>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------
        2. DESKTOP FLOATING ISLAND PILL (Micro.so Signature Component)
        Floating fixed island anchored top-3, morphing as the user scrolls
      -------------------------------------------------------------- */}
      <div className="hidden lg:block fixed inset-x-0 top-3 z-50 mx-auto w-fit max-w-xl pointer-events-auto">
        <div
          className={cx(
            'flex items-center rounded-xl py-1.5 px-2 shadow-md ring-1 backdrop-blur-xl transition-all duration-300',
            'bg-white/80 dark:bg-[#0E1422]/95 ring-black/[0.08] dark:ring-[#1E2A40] shadow-black/5 dark:shadow-black/40 border border-transparent dark:border-[#1E2A40]'
          )}
        >
          {/* Morphing Mini Mascot Mark (smoothly slides out when scrolled) */}
          <div
            className={cx(
              'relative flex items-center transition-all duration-300 ease-out overflow-hidden',
              isScrolled
                ? 'w-11 opacity-100 pr-2 mr-1 before:absolute before:inset-y-1.5 before:right-1 before:w-[1px] before:bg-st-secondary dark:before:bg-white/15'
                : 'w-0 opacity-0 pointer-events-none'
            )}
          >
            <a
              href="#top"
              aria-label="maxcode home"
              className="flex items-center justify-center size-7 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              <MaxFaviconSvg className="size-4.5 shrink-0" />
            </a>
          </div>

          {/* Navigation Links inside Island Pill */}
          <ul className="flex items-center gap-1 list-none m-0 p-0">
            {navItems.map((item) => {
              const isOpen = openMenu === item.id;
              return (
                <li key={item.id} className="relative">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggleMenu(item.id)}
                    onMouseEnter={() => setOpenMenu(item.id)}
                    className={cx(
                      'relative z-10 h-7 px-3 text-sm font-medium rounded-md transition-colors flex items-center gap-1 cursor-pointer select-none',
                      isOpen
                        ? 'text-tx font-semibold'
                        : 'text-tx/80 hover:text-tx hover:bg-black/5 dark:hover:bg-white/5'
                    )}
                  >
                    {isOpen && (
                      <motion.span
                        layoutId="active-nav-pill"
                        className="absolute inset-0 bg-black/[0.08] dark:bg-white/10 rounded-md -z-10 shadow-xs"
                        transition={{ type: 'spring', bounce: 0.18, duration: 0.35 }}
                      />
                    )}
                    <span>{item.label}</span>
                    <NavChevron isOpen={isOpen} />
                  </button>
                </li>
              );
            })}

            {/* Direct Link to Documentation */}
            <li>
              <a
                href={docUrl('/docs')}
                className="h-7 px-3 text-sm font-medium text-tx/80 hover:text-tx hover:bg-black/5 dark:hover:bg-white/5 rounded-md transition-colors flex items-center cursor-pointer"
              >
                Docs
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* -------------------------------------------------------------
        3. MEGA-MENU DROPDOWN PANEL (Preserving all rich Diátaxis items)
        Anchored cleanly right below the floating island pill
      -------------------------------------------------------------- */}
      <AnimatePresence>
        {openMenu && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpenMenu(null)}
              className="hidden lg:block fixed inset-0 z-40 bg-black/25 dark:bg-black/50 backdrop-blur-[2px]"
            />

            {/* Floating Dropdown Island Panel */}
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block fixed left-1/2 top-14 -translate-x-1/2 z-50 w-[92vw] max-w-5xl rounded-3xl bg-sf/95 dark:bg-[#0E1422]/98 border border-st-secondary dark:border-[#1E2A40] p-6 md:p-8 shadow-2xl backdrop-blur-2xl overflow-hidden"
              onMouseLeave={() => setOpenMenu(null)}
            >
              {/* Animated Tab Switcher Container */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={openMenu}
                  initial={{ opacity: 0, y: 8, filter: 'blur(3px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -6, filter: 'blur(3px)' }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                >
                  {/* TAB 1: PRODUCTS */}
            {openMenu === 'products' && (
              <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
                <div className="flex flex-col gap-6">
                  <div>
                    <p className="mb-1.5 font-mono text-[#8D99AB] text-xs font-semibold uppercase tracking-widest">
                      Core Architecture
                    </p>
                    <div className="flex flex-col -mx-3">
                      <a
                        href="#top"
                        onClick={() => setOpenMenu(null)}
                        className="group/card hover:bg-sf-secondary/70 p-3 rounded-xl transition-all duration-200"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-tx text-base leading-normal">
                            maxcode CLI
                          </span>
                          <CardArrowIcon />
                        </div>
                        <p className="mt-1 font-normal text-[#A9B4C4] text-sm leading-snug">
                          Open-source terminal coding agent that verifies work with real checks
                        </p>
                      </a>
                      <a
                        href="#orchestration"
                        onClick={() => setOpenMenu(null)}
                        className="group/card hover:bg-sf-secondary/70 p-3 rounded-xl transition-all duration-200"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-tx text-base leading-normal">
                            The Verifier Loop
                          </span>
                          <CardArrowIcon />
                        </div>
                        <p className="mt-1 font-normal text-[#A9B4C4] text-sm leading-snug">
                          Automated test, build, and lint gates with a 3-try retry loop
                        </p>
                      </a>
                      <a
                        href="#long-horizon"
                        onClick={() => setOpenMenu(null)}
                        className="group/card hover:bg-sf-secondary/70 p-3 rounded-xl transition-all duration-200"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-tx text-base leading-normal">
                            Git Checkpoints &amp; Undo
                          </span>
                          <CardArrowIcon />
                        </div>
                        <p className="mt-1 font-normal text-[#A9B4C4] text-sm leading-snug">
                          Isolated refs under refs/maxcode/ for zero-risk rollback on failure
                        </p>
                      </a>
                    </div>
                  </div>

                  <div>
                    <p className="mb-1.5 font-mono text-[#8D99AB] text-xs font-semibold uppercase tracking-widest">
                      Cost &amp; Multi-Model Routing
                    </p>
                    <div className="flex flex-col -mx-3">
                      <a
                        href="#cost"
                        onClick={() => setOpenMenu(null)}
                        className="group/card hover:bg-sf-secondary/70 p-3 rounded-xl transition-all duration-200"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-tx text-base leading-normal">
                            Model Routing &amp; Transparent Cost
                          </span>
                          <CardArrowIcon />
                        </div>
                        <p className="mt-1 font-normal text-[#A9B4C4] text-sm leading-snug">
                          Route scaffolding to fast models and reasoning to maxm1; retries are never billed
                        </p>
                      </a>
                    </div>
                  </div>

                  <div>
                    <p className="mb-1.5 font-mono text-[#8D99AB] text-xs font-semibold uppercase tracking-widest">
                      Empirical Evidence
                    </p>
                    <div className="flex flex-col -mx-3">
                      <a
                        href={docUrl('/docs/reference/benchmarks')}
                        onClick={() => setOpenMenu(null)}
                        className="group/card hover:bg-sf-secondary/70 p-3 rounded-xl transition-all duration-200"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-tx text-base leading-normal">
                            20-Task Benchmark Suite
                          </span>
                          <CardArrowIcon />
                        </div>
                        <p className="mt-1 font-normal text-[#A9B4C4] text-sm leading-snug">
                          Public reproducible benchmark measuring verifier-on vs verifier-off pass rates
                        </p>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right Preview Card */}
                <div className="flex flex-col bg-sf-secondary border border-st-secondary p-6 rounded-2xl">
                  <p className="mb-4 font-mono text-[#8D99AB] text-xs font-semibold uppercase tracking-widest">
                    Featured Architecture · maxcode v0.8.2
                  </p>
                  <div className="relative flex flex-col justify-between bg-neutral-950 dark:bg-[#070B14] border border-neutral-800 dark:border-[#1E2A40] p-6 rounded-xl overflow-hidden text-white min-h-[240px] shadow-md">
                    <div
                      className="absolute inset-0 opacity-40 pointer-events-none"
                      style={{
                        background:
                          'radial-gradient(80% 80% at 80% 20%, var(--sc-blue) 0%, transparent 70%)',
                      }}
                    />
                    <div className="relative z-10">
                      <span className="inline-block bg-white/10 border border-white/15 px-2.5 py-1 rounded font-mono text-[11px] text-white/90">
                        &gt;_ maxcode (Apache-2.0)
                      </span>
                      <h4 className="mt-4 font-season text-2xl leading-snug text-white font-medium">
                        Mark a task done only after checks pass.
                      </h4>
                      <p className="mt-2 text-white/80 text-sm leading-relaxed">
                        Autonomous terminal coding agent with planner, worker, and an uncompromising verifier loop.
                      </p>
                    </div>
                    <div className="relative z-10 mt-6">
                      <a
                        href={docUrl('/docs')}
                        onClick={() => setOpenMenu(null)}
                        className="inline-flex items-center gap-2 bg-white text-neutral-900 hover:bg-white/90 dark:bg-accent-500 dark:text-white dark:hover:bg-accent-600 px-4 py-2 rounded-full font-semibold text-xs cursor-pointer transition-colors shadow-xs"
                      >
                        Explore Documentation ↗
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: DEVELOPERS */}
            {openMenu === 'developers' && (
              <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
                <div>
                  <p className="mb-1.5 font-mono text-[#8D99AB] text-xs font-semibold uppercase tracking-widest">
                    Diátaxis Documentation
                  </p>
                  <div className="gap-x-6 gap-y-2 grid grid-cols-2 -mx-3">
                    {[
                      {
                        title: '5-Minute Quickstart',
                        desc: 'Install, configure maxcode.toml, and run your first task',
                        href: '/docs/tutorials/quickstart',
                      },
                      {
                        title: 'CLI Reference',
                        desc: 'Specification for run, plan, undo, cost, and bench',
                        href: '/docs/reference/cli',
                      },
                      {
                        title: 'Config (maxcode.toml)',
                        desc: 'Provider URLs, keys, limits, and protected paths',
                        href: '/docs/reference/config',
                      },
                      {
                        title: 'The Verifier Loop',
                        desc: 'State machine, retry policies, and check detection',
                        href: '/docs/explanation/verifier-loop',
                      },
                      {
                        title: 'OpenAI-Compatible Providers',
                        desc: 'Setup OpenRouter, DeepSeek, Qwen, or local Ollama',
                        href: '/docs/how-to/configure-providers',
                      },
                      {
                        title: 'Checkpoints & Git Refs',
                        desc: 'Isolated git ref mechanism and instant rollback',
                        href: '/docs/reference/checkpoints',
                      },
                    ].map((item) => (
                      <a
                        key={item.title}
                        href={docUrl(item.href)}
                        onClick={() => setOpenMenu(null)}
                        className="group/card hover:bg-sf-secondary/70 p-3 rounded-xl transition-all duration-200"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-tx text-base leading-normal">
                            {item.title}
                          </span>
                          <CardArrowIcon />
                        </div>
                        <p className="mt-1 font-normal text-[#A9B4C4] text-sm leading-snug">
                          {item.desc}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-between bg-sf-secondary border border-st-secondary p-6 rounded-2xl">
                  <div>
                    <p className="mb-2 font-mono text-[#8D99AB] text-xs font-semibold uppercase tracking-widest">
                      Developer Quickstart
                    </p>
                    <div className="bg-sf p-4 border border-st-secondary rounded-xl font-mono text-xs text-tx space-y-1">
                      <div className="text-[#8D99AB]">$ git clone https://github.com/RavaniRoshan/maxcode.git</div>
                      <div className="text-[#8D99AB]">$ cd maxcode &amp;&amp; uv sync</div>
                      <div className="mt-1 text-tx">
                        <span className="text-emerald-500 font-semibold">user@maxcode</span>:~/repo$ uv run maxcode run "Fix failing tests"
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-3 border-st-secondary border-t">
                    <span className="text-[#A9B4C4] text-xs font-medium">Fumadocs Documentation</span>
                    <a
                      href={docUrl('/docs')}
                      onClick={() => setOpenMenu(null)}
                      className="font-medium text-tx text-xs hover:underline cursor-pointer"
                    >
                      Explore All Docs →
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: RESOURCES */}
            {openMenu === 'resources' && (
              <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
                <div>
                  <p className="mb-1.5 font-mono text-[#8D99AB] text-xs font-semibold uppercase tracking-widest">
                    Documentation &amp; Community
                  </p>
                  <div className="flex flex-col -mx-3">
                    {[
                      {
                        title: 'How-To Guides',
                        desc: 'Problem-oriented recipes for custom checks, steering runs, and cost caps',
                        href: '/docs/how-to',
                      },
                      {
                        title: 'Benchmark Results & Logs',
                        desc: 'Transparent CSV logs and pass-rate deltas across 20 tasks',
                        href: '/docs/reference/benchmarks',
                      },
                      {
                        title: 'Frequently Asked Questions',
                        desc: 'Answers on pricing, checkpoints, models, and security boundaries',
                        href: '#faq',
                      },
                    ].map((res) => (
                      <a
                        key={res.title}
                        href={docUrl(res.href)}
                        onClick={() => setOpenMenu(null)}
                        className="group/card hover:bg-sf-secondary/70 p-3 rounded-xl transition-all duration-200"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-tx text-base leading-normal">
                            {res.title}
                          </span>
                          <CardArrowIcon />
                        </div>
                        <p className="mt-1 font-normal text-[#A9B4C4] text-sm leading-snug">
                          {res.desc}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="bg-sf-secondary border border-st-secondary p-6 rounded-2xl">
                  <p className="mb-2 font-mono text-[#8D99AB] text-xs font-semibold uppercase tracking-widest">
                    Core Thesis
                  </p>
                  <h4 className="font-season text-tx text-2xl">
                    Why models cannot verify their own output
                  </h4>
                  <p className="mt-2 text-[#A9B4C4] text-sm leading-relaxed">
                    LLM coding assistants frequently claim tasks are complete when unit tests fail. maxcode treats the model as an unverified contributor and makes the compiler, linter, and test runner the sole arbiters of truth.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 4: COMPANY */}
            {openMenu === 'company' && (
              <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
                <div>
                  <p className="mb-1.5 font-mono text-[#8D99AB] text-xs font-semibold uppercase tracking-widest">
                    Open Source &amp; Governance
                  </p>
                  <div className="flex flex-col -mx-3">
                    {[
                      {
                        title: 'GitHub Repository',
                        desc: 'Source code, PRD, issue tracker, and discussions',
                        href: 'https://github.com/RavaniRoshan/maxcode',
                      },
                      {
                        title: 'Apache-2.0 License & Notices',
                        desc: 'Permissive license preserving OpenAI Codex attribution',
                        href: '/docs/reference/legal',
                      },
                      {
                        title: 'Contributing Guide',
                        desc: 'TDD workflow, ruff/mypy rules, and PR submission checklist',
                        href: '/docs/reference/contributing',
                      },
                      {
                        title: 'Security Policy',
                        desc: 'Private vulnerability reporting and strict API key isolation',
                        href: '/docs/reference/security',
                      },
                    ].map((item) => (
                      <a
                        key={item.title}
                        href={docUrl(item.href)}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                        onClick={() => setOpenMenu(null)}
                        className="group/card hover:bg-sf-secondary/70 p-3 rounded-xl transition-all duration-200"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-tx text-base leading-normal">
                            {item.title}
                          </span>
                          <CardArrowIcon />
                        </div>
                        <p className="mt-1 font-normal text-[#A9B4C4] text-sm leading-snug">
                          {item.desc}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="bg-sf-secondary border border-st-secondary p-6 rounded-2xl">
                  <p className="mb-2 font-mono text-[#8D99AB] text-xs font-semibold uppercase tracking-widest">
                    Privacy &amp; Keys
                  </p>
                  <h4 className="font-season text-tx text-2xl">
                    Bring your own keys. Zero telemetry leaks.
                  </h4>
                  <p className="mt-2 text-[#A9B4C4] text-sm leading-relaxed">
                    maxcode never hardcodes or transmits API keys. All keys are loaded dynamically from environment variables and excluded from run logs and git commits.
                  </p>
                </div>
              </div>
            )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* -------------------------------------------------------------
        4. MOBILE NAVIGATION (Exact Micro.so Mobile Bar & Drawer)
        Fixed bar at top-0, animated 2-bar burger button, full drawer
      -------------------------------------------------------------- */}
      <nav className="lg:hidden fixed top-0 left-0 z-50 w-full h-16 px-5 flex items-center justify-between border-b border-st-secondary/40 bg-sf/90 backdrop-blur-xl">
        <a href="#top" aria-label="maxcode home" className="text-tx">
          <MaxcodeWordmark />
        </a>

        <div className="flex items-center gap-2">
          {onToggleTheme && (
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={themeMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="size-9 flex items-center justify-center rounded-lg bg-sf-secondary border border-st-secondary text-tx cursor-pointer"
            >
              {themeMode === 'dark' ? (
                <RiSunLine className="size-4 text-amber-400" />
              ) : (
                <RiMoonLine className="size-4" />
              )}
            </button>
          )}

          {/* Micro.so animated 2-bar burger button */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="relative size-9 flex items-center justify-center rounded-lg bg-sf-secondary border border-st-secondary text-tx cursor-pointer"
          >
            <span
              className={cx(
                'absolute h-0.5 w-4 bg-current rounded-full transition-all duration-300',
                mobileMenuOpen ? 'rotate-45' : '-translate-y-1.5'
              )}
            />
            <span
              className={cx(
                'absolute h-0.5 w-4 bg-current rounded-full transition-all duration-300',
                mobileMenuOpen ? '-rotate-45' : 'translate-y-1.5'
              )}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Slide-down Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-16 left-0 z-50 w-full h-[calc(100vh-64px)] bg-sf/98 backdrop-blur-2xl border-t border-st-secondary overflow-y-auto animate-in slide-in-from-top-2 duration-200">
          <div className="mx-auto py-6 px-6 flex flex-col justify-between min-h-full">
            <div className="space-y-4">
              {[
                {
                  id: 'products',
                  label: 'Features & Architecture',
                  links: [
                    { name: 'maxcode CLI (Terminal Agent)', href: '#top' },
                    { name: 'The Verifier Loop', href: '#orchestration' },
                    { name: 'Git Checkpoints & Undo', href: '#long-horizon' },
                    { name: 'Multi-Model Routing & Cost', href: '#cost' },
                    { name: '20-Task Benchmark Suite', href: '/docs/reference/benchmarks' },
                  ],
                },
                {
                  id: 'developers',
                  label: 'Documentation (Diátaxis)',
                  links: [
                    { name: '5-Minute Quickstart', href: '/docs/tutorials/quickstart' },
                    { name: 'CLI Commands Reference', href: '/docs/reference/cli' },
                    { name: 'Configuration (maxcode.toml)', href: '/docs/reference/config' },
                    { name: 'Verifier State Machine', href: '/docs/explanation/verifier-loop' },
                    { name: 'OpenAI-Compatible Providers', href: '/docs/how-to/configure-providers' },
                    { name: 'All Documentation →', href: '/docs' },
                  ],
                },
                {
                  id: 'resources',
                  label: 'Resources & Guides',
                  links: [
                    { name: 'How-To Guides', href: '/docs/how-to' },
                    { name: 'Benchmark Results & Logs', href: '/docs/reference/benchmarks' },
                    { name: 'Frequently Asked Questions', href: '#faq' },
                  ],
                },
                {
                  id: 'company',
                  label: 'Open Source',
                  links: [
                    { name: 'GitHub Repository', href: 'https://github.com/RavaniRoshan/maxcode' },
                    { name: 'Contributing Guide', href: '/docs/reference/contributing' },
                    { name: 'Security Policy', href: '/docs/reference/security' },
                    { name: 'Apache-2.0 License', href: '/docs/reference/legal' },
                  ],
                },
              ].map((section) => {
                const isExpanded = mobileAccordion === section.id;
                return (
                  <div
                    key={section.id}
                    className="border-b border-st-secondary/60 pb-3"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setMobileAccordion((prev) =>
                          prev === section.id ? null : (section.id as NavMenuKey)
                        )
                      }
                      className="flex justify-between items-center w-full py-2 font-medium text-base text-tx cursor-pointer"
                    >
                      <span>{section.label}</span>
                      <NavChevron isOpen={isExpanded} />
                    </button>
                    {isExpanded && (
                      <div className="flex flex-col gap-2 pt-2 pb-1 pl-3">
                        {section.links.map((link) => (
                          <a
                            key={link.name}
                            href={docUrl(link.href)}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-sm text-[#A9B4C4] hover:text-[#FFFFFF] py-1 transition-colors"
                          >
                            {link.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile Bottom Action Buttons */}
            <div className="pt-8 pb-4 space-y-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenModal('login');
                }}
                className="w-full h-11 rounded-xl bg-sf-secondary border border-st-secondary text-tx font-medium text-sm flex items-center justify-center cursor-pointer"
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenModal('try');
                }}
                className="w-full h-11 rounded-xl bg-sf-invert text-tx-invert font-semibold text-sm flex items-center justify-center shadow-[inset_0_-2px_0_0_rgba(0,0,0,0.2)] active:scale-[0.98] transition-all cursor-pointer"
              >
                Try maxcode
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
