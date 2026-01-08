// Secure registry of custom validation functions.
// - Keys are strings used in config: { type: "custom", custom: "mustContainXYZ" }
// - Values are pure functions: (value, values, rule) => boolean
// - Exposes add/remove/get to manage functions safely at runtime.

const registry = Object.create(null);

// Built-in safe examples
registry.isEven = (value) => {
  const n = Number(String(value ?? "").trim());
  return !Number.isNaN(n) && n % 2 === 0;
};

registry.mustContainXYZ = (value) =>
  String(value ?? "").toUpperCase().includes("XYZ");

registry.afterDate = (value, _values, rule) => {
  if (!rule?.extra?.after) return false;
  const v = new Date(value);
  const a = new Date(rule.extra.after);
  return !Number.isNaN(v.getTime()) && v > a;
};

registry.matchesRegex = (value, _values, rule) => {
  const pattern = rule?.extra?.pattern;
  if (!pattern) return false;
  const flags = rule?.extra?.flags ?? "";
  return new RegExp(pattern, flags).test(String(value ?? ""));
};

// Public API
export function addCustom(name, fn) {
  if (typeof name !== "string" || !name)
    throw new Error("Custom rule name must be a non-empty string");
  if (typeof fn !== "function")
    throw new Error("Custom rule must be a function");
  registry[name] = fn;
}

export function removeCustom(name) {
  delete registry[name];
}

export function getCustom(name) {
  return registry[name];
}

export function listCustom() {
  return Object.keys(registry);
}