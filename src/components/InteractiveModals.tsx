import React, { useState } from 'react';
import {
  RiCloseLine,
  RiFileCopyLine,
  RiCheckLine,
  RiShieldCheckFill,
  RiTerminalBoxFill,
} from '@remixicon/react';
import { validatePilotForm } from '../data/brandConfig';
import { Badge } from '@/components/base/badges/badge';
import { docUrl } from '@/lib/utils';
import { Kbd } from '@/components/base/kbd/kbd';
import { Button } from '@/components/base/buttons/button';

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
    'Migrate legacy ORM across payments-service with maxcode verifier checkpoints'
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
      {/* Floating Cookie Consent Banner */}
      {!cookieDismissed && (
        <div
          role="region"
          aria-label="Cookie consent"
          className="right-6 bottom-6 z-50 fixed bg-sf-secondary shadow-xl p-5 border border-st rounded-2xl w-[calc(100%-3rem)] max-w-[380px] transition-all duration-300 backdrop-blur-md"
        >
          <div className="flex items-center gap-2 mb-1.5">
            <RiShieldCheckFill className="size-4 text-accent-600 dark:text-accent-400" />
            <p className="font-semibold text-tx text-sm tracking-tight">
              Privacy &amp; Telemetry
            </p>
          </div>
          <p className="mb-4 text-tx-secondary text-xs leading-relaxed">
            maxcode collects anonymized benchmark convergence telemetry only when opted in.{' '}
            <a
              href={docUrl('/docs/reference/legal#privacy')}
              className="text-tx underline hover:text-tx-tertiary transition-colors"
            >
              Privacy Policy
            </a>
          </p>

          {cookieManageOpen && (
            <div className="bg-sf mb-4 p-3 border border-st-secondary rounded-xl text-xs space-y-2">
              <div className="flex justify-between items-center py-1">
                <span className="font-medium text-tx">Session Storage</span>
                <span className="font-mono text-[11px] text-tx-tertiary">Always Active</span>
              </div>
              <label className="flex justify-between items-center py-1 cursor-pointer">
                <span className="text-tx-secondary">Anonymized Checkpoint Benchmarks</span>
                <input
                  type="checkbox"
                  checked={analyticsEnabled}
                  onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                  className="accent-accent-600"
                />
              </label>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="small"
              onClick={() => setCookieManageOpen((prev) => !prev)}
              className="flex-1 justify-center"
            >
              {cookieManageOpen ? 'Hide options' : 'Manage'}
            </Button>
            <Button
              variant="primary"
              size="small"
              onClick={() => setCookieDismissed(true)}
              className="flex-1 justify-center"
            >
              Accept All
            </Button>
          </div>
        </div>
      )}

      {/* Interactive Modal Dialog */}
      {modalMode && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="maxcode interactive dialog"
          className="z-200 fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200"
          onClick={resetAndClose}
        >
          <div
            className="relative bg-sf shadow-2xl p-6 md:p-8 border border-st-secondary rounded-3xl w-full max-w-lg text-tx transform transition-all duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close modal"
              onClick={resetAndClose}
              className="top-5 right-5 absolute flex justify-center items-center hover:bg-sf-secondary rounded-full size-8 text-tx-tertiary hover:text-tx cursor-pointer transition-colors"
            >
              <RiCloseLine className="size-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <Badge color="primary" className="font-mono text-[10px] uppercase">
                v0.8.2
              </Badge>
              <span className="font-mono text-[11px] text-tx-tertiary tracking-wide flex items-center gap-1">
                <RiTerminalBoxFill className="size-3.5 text-accent-500" /> maxcode · maxm1 engine
              </span>
            </div>

            <h3 className="font-season text-2xl md:text-3xl leading-tight">
              {modalMode === 'try' && 'Start a live maxcode session'}
              {modalMode === 'talk' && 'Scope a pilot on your codebase'}
              {modalMode === 'login' && 'Sign in to maxcode workspace'}
            </h3>

            <p className="mt-2 text-tx-secondary text-sm leading-relaxed">
              {modalMode === 'try' &&
                'Run maxcode locally in your terminal or cloud CI with strict verifier checkpoints.'}
              {modalMode === 'talk' &&
                'Partner with our systems engineers to test maxcode against your codebase benchmarks and custom test runners.'}
              {modalMode === 'login' &&
                'Access your team checkpoint logs, benchmark telemetry, and shared verification hooks.'}
            </p>

            {/* CLI Quick-run box */}
            {modalMode === 'try' && (
              <div className="bg-sf-secondary mt-5 p-3.5 border border-st-secondary rounded-2xl font-mono text-xs">
                <div className="flex justify-between items-center gap-2">
                  <span className="truncate text-tx">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">$</span> npx maxcode init --model maxm1
                  </span>
                  <Button
                    variant={copiedCli ? 'primary' : 'secondary'}
                    size="small"
                    leadingIcon={copiedCli ? RiCheckLine : RiFileCopyLine}
                    onClick={handleCopyCli}
                    className="shrink-0"
                  >
                    {copiedCli ? 'Copied' : 'Copy'}
                  </Button>
                </div>
              </div>
            )}

            {submitted ? (
              <div className="bg-sf-secondary mt-6 p-6 border border-st-secondary rounded-2xl text-center space-y-3">
                <div className="size-12 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                  <RiCheckLine className="size-6" />
                </div>
                <p className="font-season text-tx text-xl">
                  Pilot Registered for {company || 'your team'}
                </p>
                <p className="text-tx-secondary text-xs leading-relaxed max-w-sm mx-auto">
                  We provisioned a sandbox workspace and sent verification instructions to{' '}
                  <span className="font-medium text-tx">{email}</span>.
                </p>
                <div className="pt-2">
                  <Button variant="primary" size="medium" onClick={resetAndClose}>
                    Done
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 mt-5">
                <div>
                  <label className="block mb-1 font-medium text-tx-secondary text-xs">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Aarav Sharma"
                    className="bg-sf-secondary/50 px-3.5 py-2.5 border border-st-secondary focus:border-accent-500 rounded-xl outline-none w-full text-sm text-tx transition-colors"
                  />
                  {errors.name && (
                    <p className="mt-1 text-rose-500 text-xs">{errors.name}</p>
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
                      className="bg-sf-secondary/50 px-3.5 py-2.5 border border-st-secondary focus:border-accent-500 rounded-xl outline-none w-full text-sm text-tx transition-colors"
                    />
                    {errors.email && (
                      <p className="mt-1 text-rose-500 text-xs">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block mb-1 font-medium text-tx-secondary text-xs">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Acme Payments"
                      className="bg-sf-secondary/50 px-3.5 py-2.5 border border-st-secondary focus:border-accent-500 rounded-xl outline-none w-full text-sm text-tx transition-colors"
                    />
                    {errors.company && (
                      <p className="mt-1 text-rose-500 text-xs">{errors.company}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block mb-1 font-medium text-tx-secondary text-xs">
                    Target Codebase Task or Migration
                  </label>
                  <textarea
                    rows={2}
                    value={useCase}
                    onChange={(e) => setUseCase(e.target.value)}
                    className="bg-sf-secondary/50 px-3.5 py-2.5 border border-st-secondary focus:border-accent-500 rounded-xl outline-none w-full text-sm text-tx transition-colors resize-none"
                  />
                  {errors.useCase && (
                    <p className="mt-1 text-rose-500 text-xs">{errors.useCase}</p>
                  )}
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-st-secondary">
                  <div className="text-[11px] text-tx-tertiary flex items-center gap-1.5">
                    <Kbd>Esc</Kbd> to cancel
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="secondary" size="medium" onClick={resetAndClose}>
                      Cancel
                    </Button>
                    <Button variant="primary" size="medium" type="submit">
                      {modalMode === 'login' ? 'Continue with SSO' : 'Request Access'}
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
