// validator.js
import { getRule } from "./ruleRegistry.js";
import { getCustom } from "./customRegistry.js";

/**
 * Conditional check for rule execution
 */
function checkCondition(rule, values) {
  if (!rule.when) return true;
  const { field, equals, notEmpty, notEquals, in: inList, notIn } = rule.when;
  const val = values?.[field];
  if (equals !== undefined) return val === equals;
  if (notEquals !== undefined) return val !== notEquals;
  if (notEmpty) return val != null && String(val).trim() !== "";
  if (Array.isArray(inList)) return inList.includes(val);
  if (Array.isArray(notIn)) return !notIn.includes(val);
  return true;
}

/**
 * Normalize value before validation
 */
function normalizeValue(value, field, rule) {
  let val = String(value ?? "").trim();
  if (field?.type === "email") val = val.toLowerCase();
  if (rule.uppercase) val = val.toUpperCase();
  return val;
}

/**
 * Apply a single rule to a value
 */
export async function applyRule(rule, value, values, field) {
  if (!checkCondition(rule, values)) return { valid: true };

  const val = normalizeValue(value, field, rule);
const handler = getRule(rule.type);

// Handle custom rules separately
if (rule.type === "custom") {
  const fn = getCustom(rule.custom);
  if (typeof fn !== "function") {
    return { valid: false, message: rule.message || `Unknown custom rule: ${rule.custom}` };
  }
  try {
    const ok = await Promise.resolve(fn(value, values, rule)); // 👈 use raw value here
    return ok ? { valid: true } : { valid: false, message: rule.message || "Invalid value" };
  } catch {
    return { valid: false, message: rule.message || "Custom rule failed" };
  }
}

  // If no handler registered, treat as valid
  if (!handler) return { valid: true };

  // Delegate to the registered handler
  return handler(rule, val, values, field);
}

/**
 * Validate a single field
 */
export async function validateField(field, value, values = {}) {
  for (const rule of field.validation || []) {
    const res = await applyRule(rule, value, values, field);
    if (!res.valid) return res; // short-circuit on first failure
  }
  return { valid: true };
}

/**
 * Validate all fields in parallel
 */
export async function validateAll(fields = [], values = {}) {
  const results = await Promise.all(
    fields.map(f => validateField(f, values[f.name], values))
  );

  const errors = {};
  fields.forEach((f, i) => {
    if (!results[i].valid) errors[f.name] = results[i].message;
  });

  return { valid: Object.keys(errors).length === 0, errors };
}