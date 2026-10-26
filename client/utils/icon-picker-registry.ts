// @ts-nocheck
import { ICONS } from './icon-registry.js';
import { getIconRegistryLabel } from './icon-registry-labels.js';
import {
  loadRegistry as loadRemixRegistry,
  filterRegistryIcons,
  searchRegistryIcons,
  getRegistryCategories,
} from './remix-icon-registry.js';

export { filterRegistryIcons, searchRegistryIcons, getRegistryCategories };

function builtInRegistryIcons() {
  return Object.keys(ICONS)
    .sort((a, b) => a.localeCompare(b))
    .map((slug) => ({
      slug,
      name: slug,
      title: getIconRegistryLabel(slug),
      style: '',
      aliases: [slug],
      categories: ['Built-in SVG'],
    }));
}

export async function loadRegistry(options?: { remixOnly?: boolean }) {
  if (options?.remixOnly) {
    return loadRemixRegistry();
  }
  const [remix, builtIn] = await Promise.all([
    loadRemixRegistry(),
    Promise.resolve(builtInRegistryIcons()),
  ]);
  return [...builtIn, ...remix];
}
