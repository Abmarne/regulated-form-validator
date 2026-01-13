const registry = Object.create(null);

// Built-in custom rules
registry.isEven = (value) => {
  const n = Number(value);
  return !Number.isNaN(n) && n % 2 === 0;
};

registry.mustContainXYZ = (value) => {
  return String(value ?? "").includes("XYZ");
};

registry.afterDate = (value, _values, rule) => {
  const after = rule?.extra?.after;
  if (!after) return false;
  const v = new Date(value);
  const a = new Date(after);
  return !Number.isNaN(v.getTime()) && v > a;
};

registry.matchesRegex = (value, _values, rule) => {
  try {
    const pattern = rule?.extra?.pattern;
    if (!pattern) return false;
    const flags = rule?.extra?.flags || "";
    const re = new RegExp(pattern, flags);
    return re.test(String(value ?? ""));
  } catch {
    return false;
  }
};

// Async example: check username availability
registry.usernameAvailable = async (value, _values, rule) => {
  const endpoint = rule?.extra?.endpoint;
  if (!endpoint) return false;
  const res = await fetch(`${endpoint}?username=${encodeURIComponent(value)}`);
  const data = await res.json();
  return data.available;
};

// Public API
export function addCustom(name, fn) {
  if (typeof name !== "string" || !name) {
    throw new Error("Custom rule name must be a non-empty string");
  }
  if (typeof fn !== "function") {
    throw new Error("Custom rule must be a function");
  }
  if (registry[name]) {
    throw new Error(`Custom rule '${name}' already exists`);
  }
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