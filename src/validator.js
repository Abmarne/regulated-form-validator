import { getCustom } from "./customRegistry.js";

/** Replace placeholders in messages with actual values */
function formatMessage(template, values = {}) {
  if (!template) return "";
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
}

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

async function applyRule(rule, value, values, field) {
  if (!checkCondition(rule, values)) return { valid: true };

  // Normalize value
  let val = String(value ?? "").trim();
  if (field?.type === "email") val = val.toLowerCase();
  if (rule.uppercase) val = val.toUpperCase();

  switch (rule.type) {
    case "required": {
      const empty = val === "";
      return empty
        ? { valid: false, message: rule.message || "This field is required" }
        : { valid: true };
    }

    case "regex": {
  const flags = rule.flags || "";
  const pattern = rule.pattern || rule.regex;
  try {
    const re = new RegExp(pattern, flags);
    return re.test(val)
      ? { valid: true }
      : { valid: false, message: rule.message || "Invalid format" };
  } catch {
    return { valid: false, message: rule.message || "Invalid regex pattern" };
  }
}

    case "length": {
      const { min, max, eq } = rule;
      if (typeof eq === "number" && val.length !== eq)
        return {
          valid: false,
          message: formatMessage(
            rule.eqMessage || rule.message || "Length must be {eq}",
            { eq }
          ),
        };
      if (typeof min === "number" && val.length < min)
        return {
          valid: false,
          message: formatMessage(
            rule.minMessage || rule.message || "Length must be ≥ {min}",
            { min }
          ),
        };
      if (typeof max === "number" && val.length > max)
        return {
          valid: false,
          message: formatMessage(
            rule.maxMessage || rule.message || "Length must be ≤ {max}",
            { max }
          ),
        };
      return { valid: true };
    }

    case "numberRange": {
      const num = Number(val);
      if (isNaN(num))
        return { valid: false, message: rule.message || "Must be a number" };
      const { min, max } = rule;
      if (typeof min === "number" && num < min)
        return {
          valid: false,
          message: formatMessage(
            rule.minMessage || rule.message || "Must be ≥ {min}",
            { min }
          ),
        };
      if (typeof max === "number" && num > max)
        return {
          valid: false,
          message: formatMessage(
            rule.maxMessage || rule.message || "Must be ≤ {max}",
            { max }
          ),
        };
      return { valid: true };
    }

    case "crossField": {
      const otherVal = values?.[rule.field];
      return val === String(otherVal ?? "")
        ? { valid: true }
        : { valid: false, message: rule.message || "Values must match" };
    }

    case "date": {
  if (!val) return { valid: true };
  const inputDate = new Date(val);
  if (Number.isNaN(inputDate.getTime())) {
    return { valid: false, message: rule.message || "Invalid date" };
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (inputDate >= today) {
    return { valid: false, message: rule.message || "Date must be before today" };
  }
  if (rule.before && inputDate >= new Date(rule.before)) {
    return { valid: false, message: rule.message || `Date must be before ${rule.before}` };
  }
  if (rule.after && inputDate <= new Date(rule.after)) {
    return { valid: false, message: rule.message || `Date must be after ${rule.after}` };
  }
  return { valid: true };
}

    case "select": {
      if (!val) return { valid: true };
      const options = rule.options || [];
      return options.includes(val)
        ? { valid: true }
        : { valid: false, message: rule.message || "Invalid selection" };
    }

    case "custom": {
      const fn = getCustom(rule.custom);
      if (typeof fn !== "function") {
        return {
          valid: false,
          message: rule.message || `Unknown custom rule: ${rule.custom}`,
        };
      }
      try {
        const ok = await Promise.resolve(fn(val, values, rule));
        return ok
          ? { valid: true }
          : { valid: false, message: rule.message || "Invalid value" };
      } catch {
        return { valid: false, message: rule.message || "Custom rule failed" };
      }
    }

    default:
      return { valid: true };
  }
}

export async function validateField(field, value, values = {}) {
  for (const rule of field.validation || []) {
    const res = await applyRule(rule, value, values, field);
    if (!res.valid) return res;
  }
  return { valid: true };
}

export async function validateAll(fields = [], values = {}) {
  const errors = {};
  for (const f of fields) {
    const res = await validateField(f, values[f.name], values);
    if (!res.valid) errors[f.name] = res.message;
  }
  return { valid: Object.keys(errors).length === 0, errors };
}