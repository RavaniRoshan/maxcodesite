import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  BRAND_IDENTITY,
  HERO_TRANSCRIPT,
  LONG_HORIZON_CARDS,
  COST_TABS,
  TRAINING_TRANSCRIPT,
  FAQ_ITEMS,
  getBrandCssVariables,
  applyBrandCssVariables,
  interpolateDiffCount,
  calculateTabProgress,
  validatePilotForm,
} from './brandConfig.ts';

describe('maxcode & maxm1 Brand Configuration & Pure Logic', () => {
  it('enforces maxcode as product name and maxm1 as special model name across all datasets', () => {
    assert.equal(BRAND_IDENTITY.productName, 'maxcode');
    assert.equal(BRAND_IDENTITY.modelName, 'maxm1');
    assert.equal(HERO_TRANSCRIPT.agentHeader?.name, 'maxcode');
    assert.equal(HERO_TRANSCRIPT.flowFooter?.modelName, 'maxm1');

    for (const card of LONG_HORIZON_CARDS) {
      assert.equal(card.transcript.flowFooter?.modelName, 'maxm1');
    }

    for (const tab of COST_TABS) {
      assert.equal(tab.transcript.agentHeader?.name, 'maxcode');
      assert.equal(tab.transcript.flowFooter?.modelName, 'maxm1');
    }

    assert.ok(TRAINING_TRANSCRIPT.prompt.includes('maxm1'));
    assert.ok(FAQ_ITEMS[0].question.includes('maxcode'));
    assert.ok(FAQ_ITEMS[0].answer.includes('maxm1'));
  });

  it('contains zero external sarvam.ai asset links or redirects in any source or public file', () => {
    const filesToCheck = [
      'index.html',
      'src/App.tsx',
      'src/index.css',
      'src/data/brandConfig.ts',
      'src/components/AgentTerminal.tsx',
      'src/components/AtmosphericBackdrops.tsx',
      'src/components/BrandSvgs.tsx',
      'src/components/CostShowcase.tsx',
      'src/components/FaqSection.tsx',
      'src/components/FinalCtaAndFooter.tsx',
      'src/components/Header.tsx',
      'src/components/InteractiveModals.tsx',
    ];

    for (const relPath of filesToCheck) {
      const content = fs.readFileSync(path.resolve(process.cwd(), relPath), 'utf8');
      assert.equal(
        content.toLowerCase().includes('sarvam'),
        false,
        `Expected ${relPath} to have zero sarvam references`
      );
    }
  });

  it('dynamically generates and applies CSS variables across palettes', () => {
    const applied: Record<string, string> = {};
    const mockStyleTarget = {
      setProperty(name: string, value: string) {
        applied[name] = value;
      },
    };

    const indigoVars = applyBrandCssVariables('maxcode-indigo', mockStyleTarget);
    assert.equal(indigoVars['--sc-blue'], '#556adc');
    assert.equal(applied['--color-sf'], '#f6f3ee');

    const emeraldVars = getBrandCssVariables('maxcode-emerald');
    assert.equal(emeraldVars['--sc-green'], '#10b981');
  });

  it('interpolates terminal diff counts accurately at boundaries and midpoint', () => {
    assert.equal(interpolateDiffCount(96, 0), 0);
    assert.equal(interpolateDiffCount(96, 1), 96);
    assert.equal(interpolateDiffCount(0, 0.5), 0);
    const mid = interpolateDiffCount(100, 0.5);
    assert.ok(mid > 50 && mid <= 90);
  });

  it('calculates cost showcase tab progress percentage bounded between 0 and 100', () => {
    assert.equal(calculateTabProgress(0, 10000), 0);
    assert.equal(calculateTabProgress(5000, 10000), 50);
    assert.equal(calculateTabProgress(15000, 10000), 100);
  });

  it('validates pilot request form inputs cleanly', () => {
    const invalidResult = validatePilotForm({
      name: 'A',
      email: 'not-an-email',
      company: '',
      useCase: 'hi',
    });
    assert.equal(invalidResult.valid, false);
    assert.ok(invalidResult.errors.name);
    assert.ok(invalidResult.errors.email);

    const validResult = validatePilotForm({
      name: 'Aarav Sharma',
      email: 'aarav@acme.io',
      company: 'Acme Payments',
      useCase: 'Migrate 214 legacy ORM call sites across 18 modules.',
    });
    assert.equal(validResult.valid, true);
    assert.equal(Object.keys(validResult.errors).length, 0);
  });

  it('verifies ridgeline-dither-footer.tsx exists in src/components/ui and exports pure dither helpers', async () => {
    const mod = await import('../components/ui/ridgeline-dither-footer.tsx');
    assert.deepEqual(mod.rdfHex('#e26a2c'), [226, 106, 44]);
    assert.equal(mod.rdfDither(0, 7, 0.5), 0);
    assert.equal(mod.rdfDither(1, 7, 0.5), 6);
    assert.ok(mod.rdfElevation(50, 100, 2, 6) > 420);
  });

  it('verifies ink-orbit-features.tsx pure helpers and dark mode CSS variables', async () => {
    const mod = await import('../components/ui/ink-orbit-features.tsx');
    assert.equal(mod.clamp(15, 0, 10), 10);
    const parsed = mod.parseTitle('Autonomous *Checkpoint*\n& Tooling Architecture');
    assert.equal(parsed.length, 2);
    assert.equal(parsed[0][1].muted, true);
    assert.equal(parsed[0][1].text, 'Checkpoint');

    const paths = mod.chartPaths([38, 56, 79, 97], 300, 130, 14);
    assert.ok(paths.line.startsWith('M14.0,'));
    assert.equal(paths.points.length, 4);
    assert.equal(mod.nearestIndex([10, 50, 90], 48), 1);

    const darkVars = getBrandCssVariables('maxcode-amber', 'dark');
    assert.equal(darkVars['--color-sf'], '#0e0b09');
    assert.equal(darkVars['--color-tx'], '#f7f2ec');
  });
});

