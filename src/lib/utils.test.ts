import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { assetUrl, docUrl } from './utils.ts';

describe('Asset and Doc URL Resolution for GitHub Pages & Root Deployments', () => {
  it('resolves docUrl correctly', () => {
    assert.equal(docUrl('https://example.com/docs'), 'https://example.com/docs');
    assert.equal(docUrl('http://example.com/docs'), 'http://example.com/docs');
  });

  it('exports assetUrl and resolves assets with proper base prefix', () => {
    assert.equal(typeof assetUrl, 'function');
    assert.equal(assetUrl('https://example.com/img.png'), 'https://example.com/img.png');
    assert.equal(assetUrl('data:image/svg+xml;utf8,<svg></svg>'), 'data:image/svg+xml;utf8,<svg></svg>');
  });

  it('ensures no un-prefixed root /assets/ paths exist in source components', () => {
    const rootDir = process.cwd();
    const filesToCheck = [
      path.join(rootDir, 'src', 'components', 'AtmosphericBackdrops.tsx'),
      path.join(rootDir, 'src', 'components', 'FinalCtaAndFooter.tsx'),
      path.join(rootDir, 'src', 'App.tsx'),
    ];

    const unPrefixedRegex = /src=["']\/assets\/[^"']+["']/g;

    const violatingFiles: string[] = [];
    for (const file of filesToCheck) {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        const matches = content.match(unPrefixedRegex);
        if (matches && matches.length > 0) {
          violatingFiles.push(`${path.basename(file)}: ${matches.join(', ')}`);
        }
      }
    }

    assert.equal(
      violatingFiles.length,
      0,
      `Found hardcoded un-prefixed /assets/ in components which 404s on GitHub Pages:\n${violatingFiles.join('\n')}`
    );
  });

  it('validates DESIGN.md and pixel-crisp silver & white mascot assets exist and follow the spec', () => {
    const rootDir = process.cwd();
    const designMdPath = path.join(rootDir, 'DESIGN.md');
    assert.ok(fs.existsSync(designMdPath), 'DESIGN.md must exist in root');

    const expectedAssets = [
      'public/assets/max.svg',
      'public/assets/max-sheet.svg',
      'public/assets/max-favicon.svg',
      'public/max.svg',
      'public/max-sheet.svg',
      'public/max-favicon.svg',
    ];

    for (const assetRel of expectedAssets) {
      const fullPath = path.join(rootDir, assetRel);
      assert.ok(fs.existsSync(fullPath), `Asset ${assetRel} must exist`);
      const svg = fs.readFileSync(fullPath, 'utf8');
      assert.ok(svg.includes('#D9DEE5'), `${assetRel} must contain silver body #D9DEE5`);
      assert.ok(svg.includes('#FFFFFF'), `${assetRel} must contain white highlight/tick #FFFFFF`);
      assert.ok(svg.includes('#0A0F1E'), `${assetRel} must contain ink eyes #0A0F1E`);
    }
  });
});
