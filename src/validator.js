import panRule from "./rules/pan.js";
import ifscRule from "./rules/ifsc.js";
import aadhaarRule from "./rules/aadhaar.js";
import { getCustom } from "./customRegistry.js";

const builtIn = { pan: panRule, ifsc: ifscRule, aadhaar: aadhaarRule };

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

function applyRule(rule, value, values) {
  if (!checkCondition(rule, values)) return { valid: true };

  switch (rule.type) {
    case "required": {
      const empty = value == null || String(value).trim() === "";
      return empty
        ? { valid: false, message: rule.message || "This field is required" }
        : { valid: true };
    }

    case "regex": {
      const flags = rule.flags || "";
      const re = new RegExp(rule.pattern, flags);
      return re.test(String(value ?? ""))
        ? { valid: true }
        : { valid: false, message: rule.message || "Invalid format" };
    }

    case "length": {
      const s = String(value ?? "");
      const { min, max, eq } = rule;
      if (typeof eq === "number" && s.length !== eq)
        return { valid: false, message: rule.message || `Length must be ${eq}` };
      if (typeof min === "number" && s.length < min)
        return { valid: false, message: rule.message || `Length must be ≥ ${min}` };
      if (typeof max === "number" && s.length > max)
        return { valid: false, message: rule.message || `Length must be ≤ ${max}` };
      return { valid: true };
    }

    case "enum": {
      return (rule.options || []).includes(value)
        ? { valid: true }
        : { valid: false, message: rule.message || "Invalid value" };
    }

    case "number": {
      const num = Number(value);
      if (Number.isNaN(num))
        return { valid: false, message: rule.message || "Must be a number" };
      if (rule.min != null && num < rule.min)
        return { valid: false, message: rule.message || `Must be ≥ ${rule.min}` };
      if (rule.max != null && num > rule.max)
        return { valid: false, message: rule.message || `Must be ≤ ${rule.max}` };
      return { valid: true };
    }

    case "date": {
      const date = new Date(value);
      if (Number.isNaN(date.getTime()))
        return { valid: false, message: rule.message || "Invalid date" };

      if (rule.before && date >= new Date(rule.before))
        return { valid: false, message: rule.message || `Must be before ${rule.before}` };

      if (rule.after && date <= new Date(rule.after))
        return { valid: false, message: rule.message || `Must be after ${rule.after}` };

      if (rule.ageMin != null) {
        const now = new Date();
        let age = now.getFullYear() - date.getFullYear();
        const m = now.getMonth() - date.getMonth();
        if (m < 0 || (m === 0 && now.getDate() < date.getDate())) age--;
        if (age < rule.ageMin)
          return { valid: false, message: rule.message || `Must be at least ${rule.ageMin}` };
      }
      return { valid: true };
    }

    case "crossField": {
      const otherVal = values?.[rule.field];
      return String(value ?? "") === String(otherVal ?? "")
        ? { valid: true }
        : { valid: false, message: rule.message || "Values must match" };
    }

    case "custom": {
      // Secure lookup of a pre-registered function by key: rule.custom
      // Optional: pass rule.extra for parameterized custom logic.
      const fn = getCustom(rule.custom);
      if (typeof fn !== "function") {
        return { valid: false, message: rule.message || `Unknown custom rule: ${rule.custom}` };
      }
      const ok = safeInvoke(fn, value, values, rule);
      return ok ? { valid: true } : { valid: false, message: rule.message || "Invalid value" };
    }

    default: {
      if (builtIn[rule.type]) {
        return builtIn[rule.type](value)
          ? { valid: true }
          : { valid: false, message: rule.message || "Invalid input" };
      }
      // Unknown rule type → treat as pass (non-blocking)
      return { valid: true };
    }
  }
}

function safeInvoke(fn, value, values, rule) {
  try {
    return !!fn(value, values, rule);
  } catch (_err) {
    // If a custom function throws, fail safely with a generic message
    return false;
  }
}

export function validateField(field, value, values = {}) {
  for (const rule of field.validation || []) {
    const res = applyRule(rule, value, values);
    if (!res.valid) return res;
  }
  return { valid: true };
}

export function validateAll(fields = [], values = {}) {
  const errors = {};
  for (const f of fields) {
    const res = validateField(f, values[f.name], values);
    if (!res.valid) errors[f.name] = res.message;
  }
  return { valid: Object.keys(errors).length === 0, errors };
}