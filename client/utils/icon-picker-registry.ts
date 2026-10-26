// @ts-nocheck
import {
  loadRegistry as loadThesvgRegistry,
  filterRegistryIcons,
  searchRegistryIcons,
  getRegistryCategories,
} from './icon-registry-api.js';
import { loadRegistry as loadRemixRegistry } from './remix-icon-registry.js';

export { filterRegistryIcons, searchRegistryIcons, getRegistryCategories };

/** Remix Icon (`ri-*`) plus theSVG brand slugs for the admin icon picker. */
export async function loadRegistry() {
  const [remix, brand] = await Promise.all([loadRemixRegistry(), loadThesvgRegistry()]);
  return [...remix, ...brand];
}
