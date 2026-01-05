// Internal registry object to store custom validation functions
const registry = {};

/**
 * Add a custom validation function
 * @param {string} key - Unique name for the custom rule
 * @param {function} fn - Validation function (value, values, rule) => boolean
 */
export function addCustom(key, fn) {
  if (typeof key !== "string" || typeof fn !== "function") {
    throw new Error("addCustom requires a string key and a function");
  }
  registry[key] = fn;
}

/**
 * Remove a custom validation function
 * @param {string} key - Name of the custom rule to remove
 */
export function removeCustom(key) {
  delete registry[key];
}

/**
 * Get a custom validation function by key
 * @param {string} key - Name of the custom rule
 * @returns {function|undefined} - The registered function, or undefined if not found
 */
export function getCustom(key) {
  return registry[key];
}

/**
 * List all registered custom rule keys
 * @returns {string[]} - Array of keys
 */
export function listCustom() {
  return Object.keys(registry);
}