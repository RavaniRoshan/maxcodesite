import React, { useState } from 'react';
import { validatePilotForm } from '../data/brandConfig';

interface InteractiveModalsProps {
  modalMode: 'try' | 'talk' | 'login' | null;
  onCloseModal: () => void;
}

export const InteractiveModals: React.FC<InteractiveModalsProps> = ({
  modalMode,
  onCloseModal,
}) => {
  const [cookieDismissed, setCookieDismissed] = useState<boolean>(false);
  const [cookieManageOpen, setCookieManageOpen] = useState<boolean>(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState<boolean>(true);

  // Pilot / Try maxcode form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [useCase, setUseCase] = useState(
    'Migrate legacy ORM across payments-service with maxm1 checkpoints'
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validatePilotForm({ name, email, company, useCase });
    if (!validation.valid) {
      setErrors(validation.errors as Record<string, string>);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setErrors({});
    onCloseModal();
  };

  const handleCopyCli = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('npx maxcode init --model maxm1').catch(() => {});
    }
    setCopiedCli(true);
    window.setTimeout(() => setCopiedCli(false), 2000);
  };

  return (
    <>
      {/* Floating Cookie Consent Banner (Exact Bottom-Right Match) */}
      {!cookieDismissed && (
        <div
          role="region"
          aria-label="Cookie consent"
          className="right-6 bottom-6 z-50 fixed bg-sf-secondary shadow-xl p-6 border border-st rounded-2xl w-[calc(100%-3rem)] max-w-[380px] transition-all duration-300"
        >
          <p className="mb-1.5 font-semibold text-tx text-sm tracking-tight">
            We value your privacy
          </p>
          <p className="mb-4 text-tx-secondary text-xs leading-relaxed">
            We use cookies to improve your browsing experience and analyze site traffic.{' '}
            <a
              href="#footer"
              className="text-tx underline hover:text-tx-tertiary transition-colors"
            >
              Privacy Policy
            </a>
          </p>

          {cookieManageOpen && (
            <div className="bg-sf mb-4 p-3 border border-st-secondary rounded-xl text-xs">
              <div className="flex justify-between items-center py-1">
                <span className="font-medium text-tx">Essential Session Cookies</span>
                <span className="font-mono text-[11px] text-tx-tertiary">Always Active</span>
              </div>
              <label className="flex justify-between items-center py-1 mt-1 cursor-pointer">
                <span className="text-tx-secondary">Telemetry &amp; Performance</span>
                <input
                  type="checkbox"
                  checked={analyticsEnabled}
                  onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                  className="accent-(--sc-blue)"
                />
              </label>
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCookieManageOpen((prev) => !prev)}
              className="flex-1 bg-sf hover:bg-sf-tertiary px-4 py-2 border border-st rounded-full font-medium text-tx text-xs transition-colors cursor-pointer"
            >
              {cookieManageOpen ? 'Hide options' : 'Manage'}
            </button>
            <button
              type="button"
              onClick={() => setCookieDismissed(true)}
              className="flex-1 bg-sf-invert hover:bg-sf-invert/90 px-4 py-2 rounded-full font-medium text-tx-invert text-xs transition-colors cursor-pointer"
            >
              Accept all
            </button>
          </div>
        </div>
      )}

      {/* Interactive Modal for Try maxcode / Talk to us / Log In */}
      {modalMode && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="maxcode interactive dialog"
          className="z-200 fixed inset-0 flex justify-center items-center bg-black/45 backdrop-blur-xs p-4"
          onClick={resetAndClose}
        >
          <div
            className="relative bg-sf shadow-2xl p-6 md:p-8 border border-st rounded-3xl w-full max-w-lg text-tx"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close modal"
              onClick={resetAndClose}
              className="top-5 right-5 absolute flex justify-center items-center hover:bg-sf-secondary rounded-full w-8 h-8 text-tx-tertiary hover:text-tx cursor-pointer"
            >
              ✕
            </button>

            <div className="mb-2 font-mono text-[11px] text-(--sc-blue) uppercase tracking-widest">
              &gt;_ maxcode (v0.38.0) · powered by maxm1
            </div>

            <h3 className="font-season text-2xl md:text-3xl leading-tight">
              {modalMode === 'try' && 'Start a live maxcode session'}
              {modalMode === 'talk' && 'Scope a pilot on your codebase'}
              {modalMode === 'login' && 'Sign in to maxcode workspace'}
            </h3>

            <p className="mt-2 text-tx-secondary text-sm leading-relaxed">
              {modalMode === 'try' &&
                'Run maxcode locally or in your cloud tenancy with dynamic task routing to maxm1.'}
              {modalMode === 'talk' &&
                'Work with our engineering team to pick a migration, refactor, or task-specific maxm1 training workflow.'}
              {modalMode === 'login' &&
                'Access your live checkpoints, model routing telemetry, and domain-trained maxm1 weights.'}
            </p>

            {/* CLI Quick-run box for Try mode */}
            {modalMode === 'try' && (
              <div className="bg-sf-secondary mt-4 p-3.5 border border-st-tertiary/80 rounded-xl font-mono text-xs">
                <div className="flex justify-between items-center gap-2">
                  <span className="truncate">
                    <span className="text-(--sc-green)">$</span> npx maxcode init --model maxm1
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCli}
                    className="bg-sf hover:bg-sf-tertiary px-2.5 py-1 border border-st rounded font-sans font-medium text-[11px] text-tx cursor-pointer shrink-0"
                  >
                    {copiedCli ? 'Copied' : 'Copy CLI'}
                  </button>
                </div>
              </div>
            )}

            {submitted ? (
              <div className="bg-sf-secondary mt-6 p-5 border border-st rounded-2xl text-center">
                <p className="font-season text-tx text-xl">
                  Request registered for {company || 'your team'}
                </p>
                <p className="mt-1.5 text-tx-secondary text-xs leading-relaxed">
                  We have provisioned a dedicated maxcode + maxm1 pilot slot and sent onboarding instructions to{' '}
                  <span className="font-medium text-tx">{email}</span>.
                </p>
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="bg-sf-invert mt-4 px-5 py-2 rounded-full font-semibold text-tx-invert text-xs cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-3.5 mt-5">
                <div>
                  <label className="block mb-1 font-medium text-tx-secondary text-xs">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Aarav Sharma"
                    className="bg-white px-3.5 py-2 border border-st-tertiary focus:border-(--sc-blue) rounded-xl outline-none w-full text-sm"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sr-red-600 text-xs">{errors.name}</p>
                  )}
                </div>

                <div className="gap-3 grid grid-cols-1 sm:grid-cols-2">
                  <div>
                    <label className="block mb-1 font-medium text-tx-secondary text-xs">
                      Work Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="aarav@acme.io"
                      className="bg-white px-3.5 py-2 border border-st-tertiary focus:border-(--sc-blue) rounded-xl outline-none w-full text-sm"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sr-red-600 text-xs">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block mb-1 font-medium text-tx-secondary text-xs">
                      Company / Repository Org
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Acme Payments"
                      className="bg-white px-3.5 py-2 border border-st-tertiary focus:border-(--sc-blue) rounded-xl outline-none w-full text-sm"
                    />
                    {errors.company && (
                      <p className="mt-1 text-sr-red-600 text-xs">{errors.company}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block mb-1 font-medium text-tx-secondary text-xs">
                    Target Migration or Task for maxm1
                  </label>
                  <textarea
                    rows={2}
                    value={useCase}
                    onChange={(e) => setUseCase(e.target.value)}
                    className="bg-white px-3.5 py-2 border border-st-tertiary focus:border-(--sc-blue) rounded-xl outline-none w-full text-sm"
                  />
                  {errors.useCase && (
                    <p className="mt-1 text-sr-red-600 text-xs">{errors.useCase}</p>
                  )}
                </div>

                <div className="flex justify-end items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={resetAndClose}
                    className="bg-sf-secondary hover:bg-sf-tertiary px-4 py-2.5 rounded-full font-medium text-tx text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-sf-invert hover:bg-sf-invert/90 px-5 py-2.5 rounded-full font-semibold text-tx-invert text-xs cursor-pointer"
                  >
                    {modalMode === 'login' ? 'Continue with SSO' : 'Request maxcode Access'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
