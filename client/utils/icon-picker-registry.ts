// @ts-nocheck
import { ICONS } from './icon-registry.js';
import {
  loadRegistry as loadRemixRegistry,
  filterRegistryIcons,
  searchRegistryIcons,
  getRegistryCategories,
} from './remix-icon-registry.js';

export { filterRegistryIcons, searchRegistryIcons, getRegistryCategories };

function humanizeLegacyKey(slug) {
  const base = slug.replace(/^si/, '');
  return base
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function builtInRegistryIcons() {
  return Object.keys(ICONS)
    .sort((a, b) => a.localeCompare(b))
    .map((slug) => ({
      slug,
      name: slug,
      title: humanizeLegacyKey(slug),
      style: '',
      aliases: [slug],
      categories: ['Built-in SVG'],
    }));
}

export async function loadRegistry() {
  const [remix, builtIn] = await Promise.all([
    loadRemixRegistry(),
    Promise.resolve(builtInRegistryIcons()),
  ]);
  return [...builtIn, ...remix];
}
