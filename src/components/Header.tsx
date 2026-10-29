import React, { useState } from 'react';
import { BRAND_PALETTES } from '../data/brandConfig';
import { MaxMascotSvg } from './BrandSvgs';

interface HeaderProps {
  onOpenModal: (mode: 'try' | 'talk' | 'login') => void;
}

type NavMenuKey = 'products' | 'developers' | 'resources' | 'company' | null;

export const MaxcodeWordmark: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span
    className={`inline-flex items-center gap-2.5 select-none ${className}`}
    aria-label="maxcode"
  >
    <MaxMascotSvg className="w-7 h-[30px] shrink-0 -translate-y-0.5" />
    <span
      className="font-semibold text-[23px] text-current leading-none tracking-[-0.035em]"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      maxcode
    </span>
  </span>
);

const NavChevron: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-300 ease-out ${isOpen ? '-rotate-180' : 'rotate-0'}`}
  >
    <path
      d="M4 6L8 10L12 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
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

export const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
  const [openMenu, setOpenMenu] = useState<NavMenuKey>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<NavMenuKey>('products');

  // Keep reference to default amber palette so unused export doesn't warn
  void BRAND_PALETTES;

  const toggleMenu = (key: Exclude<NavMenuKey, null>) => {
    setOpenMenu((prev) => (prev === key ? null : key));
  };

  return (
    <header
      data-site-header="true"
      className="top-0 left-0 z-100 fixed bg-sf w-full"
      onMouseLeave={() => setOpenMenu(null)}
    >
      {/* Desktop Navigation */}
      <nav className="hidden lg:block relative mx-auto py-3.5 w-10/12 2xl:max-w-width-mx">
        <div className="flex justify-between items-center text-tx">
          <a
            href="#top"
            aria-label="Go to maxcode home page"
            className="hover:opacity-80 transition-opacity text-tx"
          >
            <MaxcodeWordmark />
          </a>

          <ul className="top-1/2 left-1/2 absolute flex items-center gap-2 -translate-x-1/2 -translate-y-1/2">
            {(
              [
                { id: 'products', label: 'Products' },
                { id: 'developers', label: 'Developers' },
                { id: 'resources', label: 'Resources' },
                { id: 'company', label: 'Company' },
              ] as const
            ).map((item) => {
              const isOpen = openMenu === item.id;
              return (
                <li key={item.id} className="inline-block relative font-medium text-base">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggleMenu(item.id)}
                    onMouseEnter={() => setOpenMenu(item.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-medium text-sm tracking-wide transition-all duration-200 cursor-pointer select-none ${
                      isOpen
                        ? 'bg-sf-secondary text-tx font-semibold'
                        : 'text-tx hover:bg-sf-secondary/60'
                    }`}
                  >
                    <span>{item.label}</span>
                    <NavChevron isOpen={isOpen} />
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenModal('login')}
              className="group inline-flex relative justify-center items-center gap-1 bg-sf-invert hover:bg-sf-invert/90 active:bg-sf-invert/80 px-5 py-2.5 rounded-full overflow-hidden font-semibold text-tx-invert text-sm tracking-tight transition-all duration-300 cursor-pointer select-none"
              style={{
                boxShadow:
                  '0 6px 12px 0 rgba(0, 0, 0, 0.10), 0 2px 6px 0 rgba(255, 255, 255, 0.40) inset, 0 -2px 6px 0 rgba(255, 255, 255, 0.40) inset',
              }}
            >
              <span
                className="inline-block top-1/2 left-1/2 absolute opacity-0 group-hover:opacity-80 rounded-full w-3/4 aspect-square transition-all -translate-x-1/2 -translate-y-1/2 duration-500 ease-out pointer-events-none"
                style={{
                  background:
                    'radial-gradient(50% 50% at 50% 50%, #ffedd5 0%, var(--sc-blue) 48.08%, rgba(220, 38, 38, 0.60) 100%)',
                  filter: 'blur(15px)',
                }}
              />
              <span className="z-10 flex items-center gap-2">Log In</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenModal('talk')}
              className="group inline-flex relative justify-center items-center gap-1 bg-sf-secondary hover:bg-sf-tertiary active:bg-sf-tertiary/80 px-5 py-2.5 rounded-full overflow-hidden font-semibold text-tx text-sm tracking-tight transition-all duration-300 cursor-pointer select-none"
              style={{
                boxShadow:
                  '0 6px 12px 0 rgba(0, 0, 0, 0.01), 0 2px 6px 0 rgba(255, 255, 255, 0.60) inset, 0 -2px 6px 0 rgba(255, 255, 255, 0.60) inset',
              }}
            >
              <span
                className="inline-block top-1/2 left-1/2 absolute opacity-0 group-hover:opacity-60 rounded-full w-3/4 aspect-square transition-all -translate-x-1/2 -translate-y-1/2 duration-500 ease-out pointer-events-none"
                style={{
                  background:
                    'radial-gradient(50% 50% at 50% 50%, #ffedd5 0%, var(--sc-blue) 48.08%, rgba(220, 38, 38, 0.60) 100%)',
                  filter: 'blur(25px)',
                }}
              />
              <span className="z-10 flex items-center gap-2">Contact Us</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden relative flex justify-between items-center mx-auto py-3 w-[88%]">
        <a href="#top" aria-label="Go to maxcode home page" className="text-tx">
          <MaxcodeWordmark className="w-[105px] h-[22px]" />
        </a>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onOpenModal('login')}
            className="inline-flex justify-center items-center bg-sf-invert px-4 py-1.5 rounded-full font-semibold text-tx-invert text-xs tracking-tight"
          >
            Log In
          </button>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex flex-col justify-center items-center gap-1.5 rounded-lg w-10 h-10 text-tx cursor-pointer"
          >
            <span
              className={`bg-current rounded-full w-5 h-0.5 transition-all duration-300 ${
                mobileMenuOpen ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`bg-current rounded-full w-5 h-0.5 transition-all duration-300 ${
                mobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`bg-current rounded-full w-5 h-0.5 transition-all duration-300 ${
                mobileMenuOpen ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Desktop Mega-Menu Backdrop & Panel */}
      {openMenu && (
        <>
          <div
            onClick={() => setOpenMenu(null)}
            className="hidden lg:block top-full left-0 z-40 fixed bg-black/20 backdrop-blur-[2px] w-full h-screen transition-opacity duration-200"
          />
          <div className="hidden lg:block top-full left-0 z-50 absolute bg-sf border-st border-t border-b rounded-b-3xl w-full transition-all duration-200 ease-out">
            <div className="mx-auto py-10 w-10/12 2xl:max-w-width-mx">
              {openMenu === 'products' && (
                <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
                  <div className="flex flex-col gap-6">
                    <div>
                      <p className="mb-1.5 font-mono text-tx-tertiary text-xs uppercase tracking-widest">
                        Enterprise Solutions
                      </p>
                      <div className="flex flex-col -mx-3">
                        <a
                          href="#long-horizon"
                          onClick={() => setOpenMenu(null)}
                          className="group/card hover:bg-sf-secondary/70 p-3 rounded-xl transition-all duration-200"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-tx text-base leading-normal">
                              Conversational Agents
                            </span>
                            <CardArrowIcon />
                          </div>
                          <p className="mt-1 font-normal text-tx-tertiary text-sm leading-snug">
                            Multilingual voice agents at population scale
                          </p>
                        </a>
                        <a
                          href="#top"
                          onClick={() => setOpenMenu(null)}
                          className="group/card hover:bg-sf-secondary/70 p-3 rounded-xl transition-all duration-200"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-tx text-base leading-normal">
                              maxcode
                            </span>
                            <CardArrowIcon />
                          </div>
                          <p className="mt-1 font-normal text-tx-tertiary text-sm leading-snug">
                            Long-horizon coding agents powered by maxm1 for real codebases
                          </p>
                        </a>
                        <a
                          href="#cost"
                          onClick={() => setOpenMenu(null)}
                          className="group/card hover:bg-sf-secondary/70 p-3 rounded-xl transition-all duration-200"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-tx text-base leading-normal">
                              maxcode for Stubs
                            </span>
                            <CardArrowIcon />
                          </div>
                          <p className="mt-1 font-normal text-tx-tertiary text-sm leading-snug">
                            Customer simulations that keep your evaluations honest
                          </p>
                        </a>
                      </div>
                    </div>

                    <div>
                      <p className="mb-1.5 font-mono text-tx-tertiary text-xs uppercase tracking-widest">
                        Consumer Hardware
                      </p>
                      <div className="flex flex-col -mx-3">
                        <a
                          href="#faq"
                          onClick={() => setOpenMenu(null)}
                          className="group/card hover:bg-sf-secondary/70 p-3 rounded-xl transition-all duration-200"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-tx text-base leading-normal">
                              Kaze
                            </span>
                            <CardArrowIcon />
                          </div>
                          <p className="mt-1 font-normal text-tx-tertiary text-sm leading-snug">
                            Sovereign AI hardware for real-world intelligence
                          </p>
                        </a>
                      </div>
                    </div>

                    <div>
                      <p className="mb-1.5 font-mono text-tx-tertiary text-xs uppercase tracking-widest">
                        Consumer Applications
                      </p>
                      <div className="flex flex-col -mx-3">
                        <a
                          href="#faq"
                          onClick={() => setOpenMenu(null)}
                          className="group/card hover:bg-sf-secondary/70 p-3 rounded-xl transition-all duration-200"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-tx text-base leading-normal">
                              Indus
                            </span>
                            <CardArrowIcon />
                          </div>
                          <p className="mt-1 font-normal text-tx-tertiary text-sm leading-snug">
                            Chat AI built for India across every language
                          </p>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Right preview card */}
                  <div className="flex flex-col bg-sf-secondary p-6 rounded-2xl">
                    <p className="mb-4 font-mono text-tx-tertiary text-xs uppercase tracking-widest">
                      Featured · maxcode &amp; maxm1
                    </p>
                    <div className="relative flex flex-col justify-between bg-sr-black p-6 rounded-xl overflow-hidden text-tx-invert min-h-[240px]">
                      <div
                        className="absolute inset-0 opacity-45 pointer-events-none"
                        style={{
                          background:
                            'radial-gradient(80% 80% at 80% 20%, var(--sc-blue) 0%, transparent 70%)',
                        }}
                      />
                      <div className="relative z-10">
                        <span className="inline-block bg-white/10 px-2.5 py-1 rounded font-mono text-[11px] text-tx-invert">
                          &gt;_ maxcode (v0.38.0) · maxm1
                        </span>
                        <h4 className="mt-4 font-season text-2xl leading-snug">
                          Longer sessions with better code
                        </h4>
                        <p className="mt-2 text-tx-invert/75 text-sm leading-relaxed">
                          Visible execution plans, checkpoint recovery, and dynamic routing to maxm1.
                        </p>
                      </div>
                      <div className="relative z-10 mt-6">
                        <button
                          type="button"
                          onClick={() => {
                            setOpenMenu(null);
                            onOpenModal('try');
                          }}
                          className="inline-flex items-center gap-2 bg-sf px-4 py-2 rounded-full font-semibold text-tx text-xs cursor-pointer"
                        >
                          Try maxcode ↗
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {openMenu === 'developers' && (
                <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
                  <div>
                    <p className="mb-1.5 font-mono text-tx-tertiary text-xs uppercase tracking-widest">
                      Platform &amp; APIs
                    </p>
                    <div className="gap-x-6 gap-y-2 grid grid-cols-2 -mx-3">
                      {[
                        {
                          title: 'Text & Chat (maxm1)',
                          desc: 'Frontier reasoning & long-horizon synthesis',
                        },
                        {
                          title: 'Text to Speech',
                          desc: 'Natural, expressive voices in 11 languages',
                        },
                        {
                          title: 'Speech to Text',
                          desc: 'Accurate transcription with code-mixing support',
                        },
                        {
                          title: 'Document Intelligence',
                          desc: 'Extract structured data from complex documents',
                        },
                        {
                          title: 'Studio Sandbox',
                          desc: 'Experiment with maxcode and maxm1 APIs',
                        },
                        {
                          title: 'API Pricing',
                          desc: 'Pay for completed work and transparent token tiers',
                        },
                      ].map((api) => (
                        <a
                          key={api.title}
                          href="#cost"
                          onClick={() => setOpenMenu(null)}
                          className="group/card hover:bg-sf-secondary/70 p-3 rounded-xl transition-all duration-200"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-tx text-base leading-normal">
                              {api.title}
                            </span>
                            <CardArrowIcon />
                          </div>
                          <p className="mt-1 font-normal text-tx-tertiary text-sm leading-snug">
                            {api.desc}
                          </p>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col justify-between bg-sf-secondary p-6 rounded-2xl">
                    <div>
                      <p className="mb-2 font-mono text-tx-tertiary text-xs uppercase tracking-widest">
                        Developer Quickstart
                      </p>
                      <div className="bg-sf p-4 border border-st-secondary rounded-xl font-mono text-xs text-tx">
                        <div className="text-tx-tertiary">$ npm i -g @maxcode/cli</div>
                        <div className="mt-1 text-tx">
                          <span className="text-(--sc-green)">user@maxcode</span>:~/repo$ maxcode --model maxm1
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-3 border-st border-t">
                      <span className="text-tx-tertiary text-xs">Documentation &amp; SDKs</span>
                      <button
                        type="button"
                        onClick={() => {
                          setOpenMenu(null);
                          onOpenModal('try');
                        }}
                        className="font-medium text-tx text-xs hover:underline cursor-pointer"
                      >
                        Explore Docs →
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {openMenu === 'resources' && (
                <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
                  <div>
                    <p className="mb-1.5 font-mono text-tx-tertiary text-xs uppercase tracking-widest">
                      Learn &amp; Explore
                    </p>
                    <div className="flex flex-col -mx-3">
                      {[
                        {
                          title: 'Blogs',
                          desc: 'Read about our latest launches and updates',
                        },
                        {
                          title: 'Research',
                          desc: 'Deep dives into maxm1 architecture and training',
                        },
                        {
                          title: 'Cookbooks',
                          desc: 'Tutorials, guides and starter templates for maxcode',
                        },
                      ].map((res) => (
                        <a
                          key={res.title}
                          href="#faq"
                          onClick={() => setOpenMenu(null)}
                          className="group/card hover:bg-sf-secondary/70 p-3 rounded-xl transition-all duration-200"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-tx text-base leading-normal">
                              {res.title}
                            </span>
                            <CardArrowIcon />
                          </div>
                          <p className="mt-1 font-normal text-tx-tertiary text-sm leading-snug">
                            {res.desc}
                          </p>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="bg-sf-secondary p-6 rounded-2xl">
                    <p className="mb-2 font-mono text-tx-tertiary text-xs uppercase tracking-widest">
                      Latest Research
                    </p>
                    <h4 className="font-season text-tx text-2xl">
                      Training task-specific maxm1 models during live agent runs
                    </h4>
                    <p className="mt-2 text-tx-secondary text-sm leading-relaxed">
                      How maxcode prepares evaluation holdouts and adapts maxm1 to domain-specific risk parameters on the fly.
                    </p>
                  </div>
                </div>
              )}

              {openMenu === 'company' && (
                <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
                  <div>
                    <p className="mb-1.5 font-mono text-tx-tertiary text-xs uppercase tracking-widest">
                      Company
                    </p>
                    <div className="flex flex-col -mx-3">
                      {[
                        {
                          title: 'About Us',
                          desc: 'Our mission, story, and leadership team',
                        },
                        {
                          title: 'Careers',
                          desc: 'Join us in building sovereign AI and maxcode',
                        },
                        {
                          title: 'Terms of Service',
                          desc: 'Platform terms and enterprise agreements',
                        },
                        {
                          title: 'Privacy Policy',
                          desc: 'How we protect your code, weights, and data',
                        },
                      ].map((item) => (
                        <a
                          key={item.title}
                          href="#footer"
                          onClick={() => setOpenMenu(null)}
                          className="group/card hover:bg-sf-secondary/70 p-3 rounded-xl transition-all duration-200"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-tx text-base leading-normal">
                              {item.title}
                            </span>
                            <CardArrowIcon />
                          </div>
                          <p className="mt-1 font-normal text-tx-tertiary text-sm leading-snug">
                            {item.desc}
                          </p>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="bg-sf-secondary p-6 rounded-2xl">
                    <p className="mb-2 font-mono text-tx-tertiary text-xs uppercase tracking-widest">
                      Security &amp; Compliance
                    </p>
                    <h4 className="font-season text-tx text-2xl">
                      Sovereign deployment in your cloud or on-premises
                    </h4>
                    <p className="mt-2 text-tx-secondary text-sm leading-relaxed">
                      AICPA SOC 2 Type II and ISO 27001 certified. Your code and maxm1 weights never leave your environment.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden top-full left-0 z-50 fixed bg-sf border-st border-t w-full h-[calc(100vh-60px)] overflow-y-auto">
          <div className="mx-auto py-6 w-[88%]">
            {(
              [
                {
                  id: 'products',
                  label: 'Products',
                  links: [
                    { name: 'maxcode (Powered by maxm1)', href: '#top' },
                    { name: 'Conversational Agents', href: '#long-horizon' },
                    { name: 'maxcode for Stubs', href: '#cost' },
                    { name: 'Kaze', href: '#faq' },
                    { name: 'Indus', href: '#faq' },
                  ],
                },
                {
                  id: 'developers',
                  label: 'Developers',
                  links: [
                    { name: 'maxm1 Reasoning API', href: '#cost' },
                    { name: 'Text to Speech', href: '#cost' },
                    { name: 'Speech to Text', href: '#cost' },
                    { name: 'Document Intelligence', href: '#cost' },
                  ],
                },
                {
                  id: 'resources',
                  label: 'Resources',
                  links: [
                    { name: 'Blogs', href: '#faq' },
                    { name: 'Research', href: '#faq' },
                    { name: 'Cookbooks', href: '#faq' },
                  ],
                },
                {
                  id: 'company',
                  label: 'Company',
                  links: [
                    { name: 'About Us', href: '#footer' },
                    { name: 'Careers', href: '#footer' },
                    { name: 'Security & Privacy', href: '#footer' },
                  ],
                },
              ] as const
            ).map((group) => {
              const isExpanded = mobileAccordion === group.id;
              return (
                <div key={group.id} className="border-st border-b">
                  <button
                    type="button"
                    onClick={() =>
                      setMobileAccordion((prev) => (prev === group.id ? null : group.id))
                    }
                    className="flex justify-between items-center py-4 w-full font-medium text-tx text-base text-left"
                  >
                    <span>{group.label}</span>
                    <NavChevron isOpen={isExpanded} />
                  </button>
                  {isExpanded && (
                    <div className="flex flex-col gap-2.5 pb-4 pl-2">
                      {group.links.map((l) => (
                        <a
                          key={l.name}
                          href={l.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="py-1 text-tx-secondary text-sm"
                        >
                          {l.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="flex flex-col gap-3 mt-6">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenModal('try');
                }}
                className="bg-sf-invert py-3 rounded-full w-full font-semibold text-tx-invert text-sm"
              >
                Try maxcode
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenModal('talk');
                }}
                className="bg-sf-secondary py-3 rounded-full w-full font-semibold text-tx text-sm"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
