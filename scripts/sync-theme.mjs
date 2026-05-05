/**
 * Copies src/themes/<theme>/pages → src/pages so Astro sees one active route tree.
 * Theme slug: THEME env overrides src/content/settings/general.json theme field.
 */
import { readFileSync, rmSync, mkdirSync, cpSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

function readThemeSlug() {
  const env = process.env.THEME?.trim();
  if (env) return env;
  const generalPath = resolve(root, 'src/content/settings/general.json');
  const general = JSON.parse(readFileSync(generalPath, 'utf-8'));
  return general.theme || 'default';
}

const theme = readThemeSlug();
const themePages = resolve(root, 'src/themes', theme, 'pages');
const dest = resolve(root, 'src/pages');

if (!existsSync(themePages)) {
  console.error(`sync-theme: no folder ${themePages}`);
  process.exit(1);
}

rmSync(dest, { recursive: true, force: true });
mkdirSync(dest, { recursive: true });
cpSync(themePages, dest, { recursive: true });
console.log(`sync-theme: "${theme}" → src/pages`);
