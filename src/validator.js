import { getCustom } from "./fields/customRegistry.js";

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
      const pattern = rule.pattern || rule.regex; // support both
      const re = new RegExp(pattern, flags);
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

    case "crossField": {
      const otherVal = values?.[rule.field];
      return String(value ?? "") === String(otherVal ?? "")
        ? { valid: true }
        : { valid: false, message: rule.message || "Values must match" };
    }

    case "custom": {
      const fn = getCustom(rule.custom);
      if (typeof fn !== "function") {
        return { valid: false, message: rule.message || `Unknown custom rule: ${rule.custom}` };
      }
      try {
        const ok = fn(value, values, rule);
        return ok ? { valid: true } : { valid: false, message: rule.message || "Invalid value" };
      } catch {
        return { valid: false, message: rule.message || "Custom rule failed" };
      }
    }

    default:
      return { valid: true };
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