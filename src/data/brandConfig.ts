export type BrandPaletteKey = 'maxcode-silver' | 'maxcode-indigo' | 'maxcode-emerald' | 'maxcode-amber';

export interface BrandPalette {
  id: BrandPaletteKey;
  label: string;
  primaryAccent: string;
  variables: Record<string, string>;
}

export const BRAND_IDENTITY = {
  productName: 'maxcode',
  modelName: 'maxm1',
  cliCommand: 'maxcode',
  cliVersion: 'v0.38.0',
  heroKicker: 'maxcode',
  heroHeading: 'Longer sessions with better code',
  heroSubheading:
    'maxcode works across the codebase and saves checkpoints as it goes. The plan stays visible, so you can change direction while the run is live.',
} as const;

export const BRAND_PALETTES: Record<BrandPaletteKey, BrandPalette> = {
  'maxcode-silver': {
    id: 'maxcode-silver',
    label: 'Terminal Silver',
    primaryAccent: '#D9DEE5',
    variables: {
      '--color-bg': '#F4F6F9',
      '--color-tx': '#0A0F1E',
      '--color-tx-secondary': '#3D4A60',
      '--color-tx-tertiary': '#56637A',
      '--color-tx-invert': '#F5F7FA',
      '--color-sf': '#F4F6F9',
      '--color-sf-secondary': '#FFFFFF',
      '--color-sf-tertiary': '#EAEEF4',
      '--color-sf-invert': '#070B14',
      '--color-st': '#D5DCE6',
      '--color-st-secondary': '#E2E8F0',
      '--color-st-tertiary': '#CBD5E1',
      '--color-sr-indigo-50': '#F4F6F9',
      '--color-sr-indigo-100': '#EAEEF4',
      '--color-sr-indigo-200': '#D5DCE6',
      '--color-sr-indigo-400': '#8D99AB',
      '--color-sr-indigo-600': '#D9DEE5',
      '--color-sr-indigo-800': '#3D4A60',
      '--color-sr-indigo-900': '#0A0F1E',
      '--color-sr-orange-200': '#E2E8F0',
      '--color-sr-orange-500': '#AEB6C2',
      '--color-sr-orange-800': '#56637A',
      '--sc-blue': '#0284C7',
      '--sc-green': '#15803D',
      '--sc-orange': '#B45309',
      '--sc-purple': '#6D28D9',
      '--sc-highlight': '#EAEEF4',
      '--brand-glow-start': '#F4F6F9',
      '--brand-glow-end': '#D5DCE6',
      '--color-text-primary': '#0A0F1E',
      '--color-text-secondary': '#3D4A60',
      '--color-text-tertiary': '#56637A',
      '--color-text-placeholder': '#56637A',
      '--text': '#0A0F1E',
      '--text-2': '#3D4A60',
      '--muted': '#56637A',
    },
  },
  'maxcode-indigo': {
    id: 'maxcode-indigo',
    label: 'Maxcode Indigo',
    primaryAccent: '#556adc',
    variables: {
      '--color-tx': '#13121e',
      '--color-tx-secondary': '#3b3746',
      '--color-tx-tertiary': '#716e7c',
      '--color-tx-invert': '#faf6f1',
      '--color-sf': '#f6f3ee',
      '--color-sf-secondary': '#efeae2',
      '--color-sf-tertiary': '#e3ddd3',
      '--color-sf-invert': '#13121e',
      '--color-st': '#e3ddd3',
      '--color-st-secondary': '#ebe5dc',
      '--color-st-tertiary': '#cac3b8',
      '--color-sr-indigo-50': '#eef2ff',
      '--color-sr-indigo-100': '#e0e7ff',
      '--color-sr-indigo-200': '#c7d2fe',
      '--color-sr-indigo-400': '#818cf8',
      '--color-sr-indigo-600': '#556adc',
      '--color-sr-indigo-800': '#3730a3',
      '--color-sr-indigo-900': '#312e81',
      '--color-sr-orange-200': '#fed7aa',
      '--color-sr-orange-500': '#e26a2c',
      '--color-sr-orange-800': '#9a3412',
      '--sc-blue': '#556adc',
      '--sc-green': '#4fa876',
      '--sc-orange': '#e26a2c',
      '--sc-purple': '#9d6ae8',
      '--sc-highlight': '#ece7df',
      '--brand-glow-start': '#13121e',
      '--brand-glow-end': '#a5bbfc',
    },
  },
  'maxcode-emerald': {
    id: 'maxcode-emerald',
    label: 'Maxm1 Emerald',
    primaryAccent: '#10b981',
    variables: {
      '--color-tx': '#101816',
      '--color-tx-secondary': '#2d3d38',
      '--color-tx-tertiary': '#637670',
      '--color-tx-invert': '#f6faf8',
      '--color-sf': '#f4f6f4',
      '--color-sf-secondary': '#e9eeeb',
      '--color-sf-tertiary': '#dbe3de',
      '--color-sf-invert': '#101816',
      '--color-st': '#dbe3de',
      '--color-st-secondary': '#e4ebe7',
      '--color-st-tertiary': '#bcc8c1',
      '--color-sr-indigo-50': '#ecfdf5',
      '--color-sr-indigo-100': '#d1fae5',
      '--color-sr-indigo-200': '#a7f3d0',
      '--color-sr-indigo-400': '#34d399',
      '--color-sr-indigo-600': '#059669',
      '--color-sr-indigo-800': '#065f46',
      '--color-sr-indigo-900': '#064e3b',
      '--color-sr-orange-200': '#fde68a',
      '--color-sr-orange-500': '#d97706',
      '--color-sr-orange-800': '#92400e',
      '--sc-blue': '#059669',
      '--sc-green': '#10b981',
      '--sc-orange': '#d97706',
      '--sc-purple': '#0d9488',
      '--sc-highlight': '#e4ece8',
      '--brand-glow-start': '#101816',
      '--brand-glow-end': '#6ee7b7',
    },
  },
  'maxcode-amber': {
    id: 'maxcode-amber',
    label: 'Saffron Horizon',
    primaryAccent: '#e26a2c',
    variables: {
      '--color-tx': '#181310',
      '--color-tx-secondary': '#42362f',
      '--color-tx-tertiary': '#786960',
      '--color-tx-invert': '#faf6f1',
      '--color-sf': '#f7f3ee',
      '--color-sf-secondary': '#f0e8df',
      '--color-sf-tertiary': '#e5dad0',
      '--color-sf-invert': '#181310',
      '--color-st': '#e5dad0',
      '--color-st-secondary': '#ede3da',
      '--color-st-tertiary': '#cbbcb0',
      '--color-sr-indigo-50': '#fff7ed',
      '--color-sr-indigo-100': '#ffedd5',
      '--color-sr-indigo-200': '#fed7aa',
      '--color-sr-indigo-400': '#fb923c',
      '--color-sr-indigo-600': '#e26a2c',
      '--color-sr-indigo-800': '#9a3412',
      '--color-sr-indigo-900': '#7c2d12',
      '--color-sr-orange-200': '#c7d2fe',
      '--color-sr-orange-500': '#556adc',
      '--color-sr-orange-800': '#3730a3',
      '--sc-blue': '#e26a2c',
      '--sc-green': '#4fa876',
      '--sc-orange': '#556adc',
      '--sc-purple': '#c084fc',
      '--sc-highlight': '#efe6dc',
      '--brand-glow-start': '#181310',
      '--brand-glow-end': '#fdba74',
    },
  },
};

export type ThemeMode = 'light' | 'dark';

export const DARK_THEME_VARIABLES: Record<string, string> = {
  '--color-bg': '#070B14',
  '--color-tx': '#F5F7FA',
  '--color-tx-secondary': '#A9B4C4',
  '--color-tx-tertiary': '#8D99AB',
  '--color-tx-invert': '#0A0F1E',
  '--color-sf': '#070B14',
  '--color-sf-secondary': '#0E1422',
  '--color-sf-tertiary': '#141C2E',
  '--color-sf-invert': '#F5F7FA',
  '--color-st': '#1E2A40',
  '--color-st-secondary': '#24334E',
  '--color-st-tertiary': '#2F4366',
  '--color-card-surface': '#0E1422',
  '--color-sr-indigo-50': '#0E1422',
  '--color-sr-indigo-100': '#141C2E',
  '--color-sr-indigo-200': '#1E2A40',
  '--color-sr-indigo-400': '#8D99AB',
  '--color-sr-indigo-600': '#D9DEE5',
  '--color-sr-indigo-800': '#FFFFFF',
  '--color-sr-indigo-900': '#F5F7FA',
  '--sc-blue': '#D9DEE5',
  '--sc-green': '#FFFFFF',
  '--sc-orange': '#AEB6C2',
  '--sc-purple': '#8D99AB',
  '--sc-highlight': '#141C2E',
  '--brand-glow-start': '#070B14',
  '--brand-glow-end': '#BEE6FF',
  '--color-text-primary': '#F5F7FA',
  '--color-text-secondary': '#A9B4C4',
  '--color-text-tertiary': '#8D99AB',
  '--color-text-placeholder': '#8D99AB',
  '--text': '#F5F7FA',
  '--text-2': '#A9B4C4',
  '--muted': '#8D99AB',
};

export function getBrandCssVariables(
  paletteKey: BrandPaletteKey = 'maxcode-silver',
  mode: ThemeMode = 'dark'
): Record<string, string> {
  const palette = BRAND_PALETTES[paletteKey] ?? BRAND_PALETTES['maxcode-silver'];
  if (mode === 'dark') {
    return {
      ...palette.variables,
      ...DARK_THEME_VARIABLES,
    };
  }
  return {
    '--color-card-surface': '#ffffff',
    ...palette.variables,
  };
}

export function applyBrandCssVariables(
  paletteKey: BrandPaletteKey = 'maxcode-silver',
  target?: { setProperty: (name: string, value: string) => void } | null,
  mode: ThemeMode = 'dark'
): Record<string, string> {
  const vars = getBrandCssVariables(paletteKey, mode);
  const styleTarget =
    target !== undefined
      ? target
      : typeof document !== 'undefined' && document.documentElement
      ? document.documentElement.style
      : null;

  if (styleTarget) {
    for (const [key, value] of Object.entries(vars)) {
      styleTarget.setProperty(key, value);
    }
  }
  if (typeof document !== 'undefined' && document.documentElement && target === undefined) {
    document.documentElement.setAttribute('data-theme', mode);
    document.documentElement.classList.toggle('dark', mode === 'dark');
  }
  return vars;
}

export function interpolateDiffCount(target: number, progress: number): number {
  if (!Number.isFinite(target) || target <= 0) return 0;
  const clamped = Math.max(0, Math.min(1, progress));
  const eased = 1 - Math.pow(1 - clamped, 3);
  return Math.round(target * eased);
}

export function calculateTabProgress(elapsedMs: number, durationMs: number = 10000): number {
  if (durationMs <= 0) return 100;
  const clamped = Math.max(0, Math.min(durationMs, elapsedMs));
  return Number(((clamped / durationMs) * 100).toFixed(2));
}

export interface PilotFormInput {
  name: string;
  email: string;
  company: string;
  useCase: string;
}

export function validatePilotForm(input: PilotFormInput): { valid: boolean; errors: Partial<Record<keyof PilotFormInput, string>> } {
  const errors: Partial<Record<keyof PilotFormInput, string>> = {};
  if (!input.name || input.name.trim().length < 2) {
    errors.name = 'Please enter your full name.';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.email || !emailRegex.test(input.email.trim())) {
    errors.email = 'Please enter a valid work email.';
  }
  if (!input.company || input.company.trim().length < 2) {
    errors.company = 'Please enter your company or team name.';
  }
  if (!input.useCase || input.useCase.trim().length < 5) {
    errors.useCase = 'Please describe your repository or migration goal.';
  }
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export type TerminalStep =
  | {
      kind: 'bullet';
      color: 'blue' | 'green' | 'orange' | 'purple';
      text: string;
      thinking?: boolean;
    }
  | {
      kind: 'reply';
      text: string;
    }
  | {
      kind: 'diff';
      file: string;
      note?: string;
      add?: number;
      del?: number;
    };

export interface TerminalTranscript {
  id: string;
  mode: 'loop' | 'inview' | 'event';
  shellPrompt?: {
    userHost: string;
    path: string;
    cmd: string;
  };
  agentHeader?: {
    name: string;
    version: string;
    directory: string;
  };
  prompt: string;
  steps: TerminalStep[];
  flowFooter?: {
    cursorChar: string;
    restText: string;
    directory: string;
    contextUsed?: string;
    modelName: string;
  };
}

export const HERO_TRANSCRIPT: TerminalTranscript = {
  id: 'hero-terminal',
  mode: 'loop',
  shellPrompt: {
    userHost: 'user@maxcode',
    path: '~/acme/payments-service',
    cmd: 'maxcode',
  },
  agentHeader: {
    name: 'maxcode',
    version: '(v0.38.0)',
    directory: '~/acme/payments-service',
  },
  prompt:
    'Move the payments service off the legacy ORM without downtime. Keep the public API stable. Stop the run if a contract test fails.',
  steps: [
    {
      kind: 'bullet',
      color: 'blue',
      text: 'Thought for 6 seconds',
      thinking: true,
    },
    {
      kind: 'bullet',
      color: 'blue',
      text: 'Read billing/repository.py, billing/models.py, tests/contract/',
    },
    {
      kind: 'bullet',
      color: 'blue',
      text: "Found 214 uses of 'session.execute'",
    },
    {
      kind: 'reply',
      text: "I'll add a compatibility shim, migrate one module at a time, and run the contract suite after each change. Billing first.",
    },
    {
      kind: 'diff',
      file: 'billing/repository.py',
      note: '+shim',
      add: 41,
      del: 0,
    },
    {
      kind: 'diff',
      file: 'billing/models.py',
      note: '+data layer',
      add: 96,
      del: 12,
    },
    {
      kind: 'reply',
      text: 'Contract tests pass. 3 of 5 steps done. Moving to the ledger module now.',
    },
  ],
  flowFooter: {
    cursorChar: 'M',
    restText: 'ove on to the ledger module',
    directory: '~/acme/payments-service',
    contextUsed: 'Context 38% used',
    modelName: 'maxm1',
  },
};

export interface PillarCardData {
  id: string;
  title: string;
  description: string;
  transcript: TerminalTranscript;
}

export const LONG_HORIZON_CARDS: PillarCardData[] = [
  {
    id: 'work-across-codebase',
    title: 'Work across the codebase',
    description:
      'Point it at a migration or a cross-cutting refactor. It reads the codebase, plans the sequence, and works through the modules one by one.',
    transcript: {
      id: 'pillar-card-1',
      mode: 'inview',
      prompt: 'Replace the legacy ORM across the payments service, one module at a time.',
      steps: [
        {
          kind: 'bullet',
          color: 'blue',
          text: 'Thought for 4 seconds',
          thinking: true,
        },
        {
          kind: 'bullet',
          color: 'blue',
          text: 'Read 214 call sites across 18 modules',
        },
        {
          kind: 'diff',
          file: 'billing/repository.py',
          add: 41,
          del: 0,
        },
        {
          kind: 'diff',
          file: 'ledger/queries.py',
          add: 63,
          del: 8,
        },
      ],
      flowFooter: {
        cursorChar: 'C',
        restText: 'ontinue with the next module',
        directory: '~/acme/payments-service',
        modelName: 'maxm1',
      },
    },
  },
  {
    id: 'steer-the-run',
    title: 'Steer the run',
    description:
      'Reorder the steps, change a constraint, or drop a branch while the agent is working. Completed work stays in place.',
    transcript: {
      id: 'pillar-card-2',
      mode: 'inview',
      prompt: 'Skip the webhook rewrite for now and finish the ledger module first. Keep the rest of the plan.',
      steps: [
        {
          kind: 'bullet',
          color: 'blue',
          text: 'Thought for 2 seconds',
          thinking: true,
        },
        {
          kind: 'bullet',
          color: 'orange',
          text: "Dropped branch 'reconnect-webhooks'",
        },
        {
          kind: 'reply',
          text: 'Plan updated. The ledger module is step 3. The webhook rewrite is last.',
        },
      ],
      flowFooter: {
        cursorChar: 'S',
        restText: 'how the updated plan',
        directory: '~/acme/payments-service',
        modelName: 'maxm1',
      },
    },
  },
  {
    id: 'pick-up-from-checkpoint',
    title: 'Pick up from a checkpoint',
    description:
      'Every step is saved with its test state. When a test fails, the run resumes from the last passing checkpoint.',
    transcript: {
      id: 'pillar-card-3',
      mode: 'inview',
      prompt: 'The ledger contract tests failed. Resume from the last checkpoint and keep the completed steps.',
      steps: [
        {
          kind: 'bullet',
          color: 'blue',
          text: 'Thought for 7 seconds',
          thinking: true,
        },
        {
          kind: 'bullet',
          color: 'blue',
          text: 'Read tests/contract/test_ledger.py',
        },
        {
          kind: 'diff',
          file: 'ledger/queries.py',
          note: 'fix decimal rounding',
          add: 6,
          del: 4,
        },
        {
          kind: 'reply',
          text: 'Contract suite passes. I resumed from the last checkpoint and kept the completed work.',
        },
      ],
      flowFooter: {
        cursorChar: 'R',
        restText: 'un the full contract suite',
        directory: '~/acme/payments-service',
        modelName: 'maxm1',
      },
    },
  },
];

export interface CostTabItem {
  id: 'routing' | 'unit';
  title: string;
  description: string;
  transcript: TerminalTranscript;
}

export const COST_TABS: CostTabItem[] = [
  {
    id: 'routing',
    title: 'Pick a model for each task',
    description:
      'A refactor and a rollback review call for different models. maxcode routes them separately to maxm1 during the same run.',
    transcript: {
      id: 'cost-panel-0',
      mode: 'event',
      shellPrompt: {
        userHost: 'user@maxcode',
        path: '~/acme/payments-service',
        cmd: 'maxcode',
      },
      agentHeader: {
        name: 'maxcode',
        version: '(v0.38.0)',
        directory: '~/acme/payments-service',
      },
      prompt:
        'Write the data-layer boilerplate, then review the rollback path. Route each one to whichever model suits it.',
      steps: [
        {
          kind: 'bullet',
          color: 'blue',
          text: 'Classified 2 task types in this run',
        },
        {
          kind: 'bullet',
          color: 'green',
          text: 'Scaffolding routed to a fast, lower-cost model',
        },
        {
          kind: 'bullet',
          color: 'purple',
          text: 'Rollback review routed to maxm1 reasoning model',
        },
        {
          kind: 'reply',
          text: 'Scaffolding and rollback review went to different models. maxcode routed each task separately.',
        },
      ],
      flowFooter: {
        cursorChar: 'S',
        restText: 'how the cost split by task',
        directory: '~/acme/payments-service',
        contextUsed: 'Context 11% used',
        modelName: 'maxm1',
      },
    },
  },
  {
    id: 'unit',
    title: 'Pay for completed work',
    description: 'We charge for completed work. Retries and dead ends are not billed to you.',
    transcript: {
      id: 'cost-panel-1',
      mode: 'event',
      shellPrompt: {
        userHost: 'user@maxcode',
        path: '~/acme/payments-service',
        cmd: 'maxcode',
      },
      agentHeader: {
        name: 'maxcode',
        version: '(v0.38.0)',
        directory: '~/acme/payments-service',
      },
      prompt: 'Complete the remaining changes in the migration and report what finished.',
      steps: [
        {
          kind: 'bullet',
          color: 'blue',
          text: 'Thought for 2 seconds',
          thinking: true,
        },
        {
          kind: 'diff',
          file: 'migration complete',
          note: '214 call sites',
          add: 612,
          del: 188,
        },
        {
          kind: 'reply',
          text: 'Migration complete across 214 call sites. We bill this as completed work.',
        },
      ],
      flowFooter: {
        cursorChar: 'S',
        restText: 'ummarise the completed work',
        directory: '~/acme/payments-service',
        contextUsed: 'Context 54% used',
        modelName: 'maxm1',
      },
    },
  },
];

export const TRAINING_TRANSCRIPT: TerminalTranscript = {
  id: 'training-terminal',
  mode: 'inview',
  shellPrompt: {
    userHost: 'user@maxcode',
    path: '~/acme/underwriting',
    cmd: 'maxcode',
  },
  agentHeader: {
    name: 'maxcode',
    version: '(v0.38.0)',
    directory: '~/acme/underwriting',
  },
  prompt: 'Train a task-specific maxm1 model on our portfolio and risk parameters, then use it for this pricing task.',
  steps: [
    {
      kind: 'bullet',
      color: 'blue',
      text: 'Thought for 9 seconds',
      thinking: true,
    },
    {
      kind: 'bullet',
      color: 'blue',
      text: 'Read risk/params.yaml, historical policies',
    },
    {
      kind: 'bullet',
      color: 'purple',
      text: 'Prepared evaluation holdout',
    },
    {
      kind: 'reply',
      text: 'Training finished this run. The maxm1 model is ready for your review on this risk band.',
    },
    {
      kind: 'diff',
      file: 'risk/underwriting.maxm1',
      note: 'ready for review',
    },
  ],
};

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What is maxcode?',
    answer:
      'maxcode is a coding agent powered by maxm1 for work that spans a codebase and runs over an extended session. It keeps a visible plan, writes and tests changes incrementally, and saves checkpoints as it goes.',
  },
  {
    question: 'How does maxcode handle a long run?',
    answer:
      'It breaks the job into steps, runs the relevant tests after each step, and records a checkpoint when they pass. If a later step fails, the run can resume from the last passing checkpoint rather than starting over.',
  },
  {
    question: 'Can I change the plan while it is running?',
    answer:
      'Yes. The plan stays visible during the run. You can reorder steps, adjust a constraint, or drop a branch without losing the work that has already passed tests.',
  },
  {
    question: 'How is it priced?',
    answer:
      'Pricing is based on completed work rather than raw token usage. Within a run, simpler tasks are routed to lighter models while complex reasoning uses maxm1, and retries or dead ends are not billed to you.',
  },
  {
    question: 'Where does our code and data live?',
    answer:
      'maxcode can run in your cloud, on-premises, or in a dedicated tenancy. When a task-specific maxm1 model is trained during a run, the model weights and training artefacts remain in your environment.',
  },
  {
    question: 'How do we get started?',
    answer:
      'Talk to us to scope a pilot on your own codebase. We work with your engineering team to pick a representative migration, refactor, or specialised workflow and run it end to end.',
  },
];
