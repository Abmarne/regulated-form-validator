// ruleRegistry.js
import { getCustom } from "./customRegistry.js";

const ruleRegistry = {};

/** Register a new rule type */
export function registerRule(type, handler) {
  ruleRegistry[type] = handler;
}

/** Get a rule handler */
export function getRule(type) {
  return ruleRegistry[type];
}

/** ===========================
 * Built-in Rule Handlers
 * =========================== */

// Required
registerRule("required", async (rule, val) => {
  const empty = val === "";
  return empty
    ? { valid: false, message: rule.message || "This field is required" }
    : { valid: true };
});

// Regex
registerRule("regex", async (rule, val) => {
  try {
    const re = new RegExp(rule.pattern || rule.extra?.pattern, rule.flags || rule.extra?.flags || "");
    return re.test(val)
      ? { valid: true }
      : { valid: false, message: rule.message || "Invalid format" };
  } catch {
    return { valid: false, message: rule.message || "Invalid regex pattern" };
  }
});

// Length
registerRule("length", async (rule, val) => {
  const { min, max, eq } = rule;
  if (typeof eq === "number" && val.length !== eq)
    return { valid: false, message: rule.eqMessage || `Length must be ${eq}` };
  if (typeof min === "number" && val.length < min)
    return { valid: false, message: rule.minMessage || `Length must be ≥ ${min}` };
  if (typeof max === "number" && val.length > max)
    return { valid: false, message: rule.maxMessage || `Length must be ≤ ${max}` };
  return { valid: true };
});

// Number range
registerRule("numberRange", async (rule, val) => {
  const num = Number(val);
  if (isNaN(num)) return { valid: false, message: rule.message || "Must be a number" };
  const { min, max } = rule;
  if (typeof min === "number" && num < min)
    return { valid: false, message: rule.minMessage || `Must be ≥ ${min}` };
  if (typeof max === "number" && num > max)
    return { valid: false, message: rule.maxMessage || `Must be ≤ ${max}` };
  return { valid: true };
});

// Match another field's value
registerRule("crossField", async (rule, val, values) => {
  const otherVal = values?.[rule.field];
  if (val !== otherVal) {
    return { valid: false, message: rule.message || `Must match ${rule.field}` };
  }
  return { valid: true };
});

// Date rules
registerRule("date", async (rule, val) => {
  if (!val) return { valid: true };
  const inputDate = new Date(val);
  if (Number.isNaN(inputDate.getTime())) {
    return { valid: false, message: rule.message || "Invalid date" };
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (rule.mustBePast && inputDate >= today) {
    return { valid: false, message: rule.message || "Date must be before today" };
  }
  if (rule.mustBeFuture && inputDate <= today) {
    return { valid: false, message: rule.message || "Date must be after today" };
  }
  if (rule.before && inputDate >= new Date(rule.before)) {
    return { valid: false, message: rule.message || `Date must be before ${rule.before}` };
  }
  if (rule.after && inputDate <= new Date(rule.after)) {
    return { valid: false, message: rule.message || `Date must be after ${rule.after}` };
  }
  return { valid: true };
});

// Select options
registerRule("select", async (rule, val) => {
  if (!val) return { valid: true };
  const options = rule.options || [];
  return options.includes(val)
    ? { valid: true }
    : { valid: false, message: rule.message || "Invalid selection" };
});

// Custom rule
registerRule("custom", async (rule, val, values) => {
  const fn = getCustom(rule.custom);
  if (typeof fn !== "function") {
    return { valid: false, message: rule.message || `Unknown custom rule: ${rule.custom}` };
  }
  try {
    const ok = await Promise.resolve(fn(val, values, rule));
    return ok ? { valid: true } : { valid: false, message: rule.message || "Invalid value" };
  } catch {
    return { valid: false, message: rule.message || "Custom rule failed" };
  }
});

export default ruleRegistry;