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

// Localize error messages (i18n support)
function localizeMessage(rule, key = "message", locale = "en") {
  if (typeof rule[key] === "string") return rule[key];
  if (typeof rule[key] === "object") return rule[key][locale] || rule[key].en;
  return undefined;
}

// Helper to wrap results with severity + localized message
function withSeverity(rule, result, key = "message", locale = "en") {
  if (!result.valid) {
    return {
      ...result,
      severity: rule.severity || "error",
      message: localizeMessage(rule, key, locale) || String(result.message),
    };
  }
  return result;
}

// Required
registerRule("required", async (rule, val, values, field, locale = "en") => {
  const empty = val === "";
  return withSeverity(
    rule,
    empty
      ? { valid: false, message: "This field is required" }
      : { valid: true },
    "message",
    locale
  );
});

// Regex
registerRule("regex", async (rule, val, values, field, locale = "en") => {
  try {
    const re = new RegExp(
      rule.pattern || rule.extra?.pattern,
      rule.flags || rule.extra?.flags || ""
    );
    return withSeverity(
      rule,
      re.test(val)
        ? { valid: true }
        : { valid: false, message: "Invalid format" },
      "message",
      locale
    );
  } catch {
    return withSeverity(
      rule,
      { valid: false, message: "Invalid regex pattern" },
      "message",
      locale
    );
  }
});

// Length
registerRule("length", async (rule, val, values, field, locale = "en") => {
  const { min, max, eq } = rule;
  if (typeof eq === "number" && val.length !== eq)
    return withSeverity(rule, { valid: false, message: `Length must be ${eq}` }, "eqMessage", locale);
  if (typeof min === "number" && val.length < min)
    return withSeverity(rule, { valid: false, message: `Length must be ≥ ${min}` }, "minMessage", locale);
  if (typeof max === "number" && val.length > max)
    return withSeverity(rule, { valid: false, message: `Length must be ≤ ${max}` }, "maxMessage", locale);
  return { valid: true };
});

// Number range
registerRule("numberRange", async (rule, val, values, field, locale = "en") => {
  const num = Number(val);
  if (isNaN(num))
    return withSeverity(rule, { valid: false, message: "Must be a number" }, "message", locale);
  const { min, max } = rule;
  if (typeof min === "number" && num < min)
    return withSeverity(rule, { valid: false, message: `Must be ≥ ${min}` }, "minMessage", locale);
  if (typeof max === "number" && num > max)
    return withSeverity(rule, { valid: false, message: `Must be ≤ ${max}` }, "maxMessage", locale);
  return { valid: true };
});

// Cross-field match
registerRule("crossField", async (rule, val, values, field, locale = "en") => {
  const otherVal = values?.[rule.field];
  if (val !== otherVal) {
    return withSeverity(rule, { valid: false, message: `Must match ${rule.field}` }, "message", locale);
  }
  return { valid: true };
});

// Date rules
registerRule("date", async (rule, val, values, field, locale = "en") => {
  if (!val) return { valid: true };
  const inputDate = new Date(val);
  if (Number.isNaN(inputDate.getTime())) {
    return withSeverity(rule, { valid: false, message: "Invalid date" }, "message", locale);
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (rule.mustBePast && inputDate >= today)
    return withSeverity(rule, { valid: false, message: "Date must be before today" }, "message", locale);
  if (rule.mustBeFuture && inputDate <= today)
    return withSeverity(rule, { valid: false, message: "Date must be after today" }, "message", locale);
  if (rule.before && inputDate >= new Date(rule.before))
    return withSeverity(rule, { valid: false, message: `Date must be before ${rule.before}` }, "message", locale);
  if (rule.after && inputDate <= new Date(rule.after))
    return withSeverity(rule, { valid: false, message: `Date must be after ${rule.after}` }, "message", locale);

  return { valid: true };
});

// Select options
registerRule("select", async (rule, val, values, field, locale = "en") => {
  if (!val) return { valid: true };
  const options = rule.options || [];
  return withSeverity(
    rule,
    options.includes(val)
      ? { valid: true }
      : { valid: false, message: "Invalid selection" },
    "message",
    locale
  );
});

// Async rule
registerRule("async", async (rule, val, values, field, locale = "en") => {
  if (!rule.url) {
    return { valid: true }; // no URL, treat as valid
  }

  try {
    const response = await fetch(rule.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: val, field: field.name, values }),
    });

    const data = await response.json();

    // Expect API to return { valid: true/false }
    if (data.valid) {
      return { valid: true };
    } else {
      return {
        valid: false,
        severity: rule.severity || "error",
        message: localizeMessage(rule, "message", locale) || data.message || "Invalid value",
      };
    }
  } catch (err) {
    return {
      valid: false,
      severity: rule.severity || "error",
      message: localizeMessage(rule, "message", locale) || "Async validation failed",
    };
  }
});

// Custom rule
registerRule("custom", async (rule, val, values, field, locale = "en") => {
  const fn = getCustom(rule.custom);
  if (typeof fn !== "function") {
    return withSeverity(rule, { valid: false, message: `Unknown custom rule: ${rule.custom}` }, "message", locale);
  }
  try {
    const ok = await Promise.resolve(fn(val, values, rule));
    return ok
      ? { valid: true }
      : withSeverity(rule, { valid: false, message: "Invalid value" }, "message", locale);
  } catch {
    return withSeverity(rule, { valid: false, message: "Custom rule failed" }, "message", locale);
  }
});

export default ruleRegistry;