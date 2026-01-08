import { validateField } from "../src/validator.js";
import { addCustom, removeCustom, listCustom } from "../src/customRegistry.js";

// ------------------------------
// Conditional Rules (when)
// ------------------------------
describe("Conditional rules (when)", () => {
  test("Required only when equals condition met", async () => {
    const field = {
      name: "conditional",
      label: "Conditional Field",
      type: "text",
      validation: [
        { type: "required", when: { field: "trigger", equals: "YES" }, message: "Required when trigger=YES" }
      ]
    };
    expect(await validateField(field, "", { trigger: "NO" })).toEqual({ valid: true });
    expect((await validateField(field, "", { trigger: "YES" })).valid).toBe(false);
  });

  test("NotEquals condition", async () => {
    const field = {
      name: "conditional",
      label: "Conditional Field",
      type: "text",
      validation: [
        { type: "required", when: { field: "trigger", notEquals: "BLOCK" }, message: "Required unless BLOCK" }
      ]
    };
    expect(await validateField(field, "", { trigger: "BLOCK" })).toEqual({ valid: true });
    expect((await validateField(field, "", { trigger: "ALLOW" })).valid).toBe(false);
  });

  test("in/notIn conditions", async () => {
    const field = {
      name: "conditional",
      label: "Conditional Field",
      type: "text",
      validation: [
        { type: "required", when: { field: "trigger", in: ["A", "B"] }, message: "Required if trigger in A/B" }
      ]
    };
    expect(await validateField(field, "", { trigger: "C" })).toEqual({ valid: true });
    expect((await validateField(field, "", { trigger: "A" })).valid).toBe(false);

    const field2 = {
      name: "conditional2",
      label: "Conditional Field 2",
      type: "text",
      validation: [
        { type: "required", when: { field: "trigger", notIn: ["X", "Y"] }, message: "Required if not in X/Y" }
      ]
    };
    expect(await validateField(field2, "", { trigger: "X" })).toEqual({ valid: true });
    expect((await validateField(field2, "", { trigger: "Z" })).valid).toBe(false);
  });
});

// ------------------------------
// Date Constraints
// ------------------------------
describe("Date constraints", () => {
  test("Date must be before specific date", async () => {
    const field = {
      name: "dateTest",
      label: "Date Test",
      type: "date",
      validation: [{ type: "date", before: "2025-01-01", message: "Must be before 2025" }]
    };
    expect((await validateField(field, "2026-01-01")).valid).toBe(false);
    expect(await validateField(field, "2024-12-31")).toEqual({ valid: true });
  });

  test("Date must be after specific date", async () => {
    const field = {
      name: "dateTest",
      label: "Date Test",
      type: "date",
      validation: [{ type: "date", after: "2000-01-01", message: "Must be after 2000" }]
    };
    expect((await validateField(field, "1999-12-31")).valid).toBe(false);
    expect(await validateField(field, "2001-01-01")).toEqual({ valid: true });
  });
});

// ------------------------------
// Number Range
// ------------------------------
describe("Number range validation", () => {
  test("Number must be within range", async () => {
    const field = {
      name: "age",
      label: "Age",
      type: "number",
      validation: [{ type: "numberRange", min: 18, max: 65, message: "Age must be between {min} and {max}" }]
    };
    expect((await validateField(field, "17")).valid).toBe(false);
    expect((await validateField(field, "66")).valid).toBe(false);
    expect(await validateField(field, "30")).toEqual({ valid: true });
  });
});

// ------------------------------
// Custom Rules
// ------------------------------
describe("Custom rules", () => {
 test("Custom rule isEven passes/fails correctly", async () => {
  const field = {
    name: "evenNumber",
    label: "Even Number",
    type: "text",
    validation: [{ type: "custom", custom: "isEven", message: "Must be even" }]
  };
  const resPass = await validateField(field, "4");
  expect(resPass.valid).toBe(true);

  const resFail = await validateField(field, "5");
  expect(resFail.valid).toBe(false);
  expect(resFail.message).toBe("Must be even");
});

test("Built-in mustContainXYZ works", async () => {
  const field = {
    name: "xyzField",
    label: "XYZ Field",
    type: "text",
    validation: [{ type: "custom", custom: "mustContainXYZ", message: "Must contain XYZ" }]
  };
  const resPass = await validateField(field, "abcXYZdef");
  expect(resPass.valid).toBe(true);

  const resFail = await validateField(field, "abcdef");
  expect(resFail.valid).toBe(false);
  expect(resFail.message).toBe("Must contain XYZ");
});

  test("Unknown custom rule fails gracefully", async () => {
    const field = {
      name: "unknown",
      label: "Unknown Custom",
      type: "text",
      validation: [{ type: "custom", custom: "doesNotExist", message: "Unknown rule" }]
    };
    const res = await validateField(field, "anything");
    expect(res.valid).toBe(false);
    expect(res.message).toBe("Unknown rule");
  });

test("Built-in afterDate works", async () => {
    const field = {
      name: "afterDateField",
      type: "text",
      validation: [
        {
          type: "custom",
          custom: "afterDate",
          message: "Must be after 2025-01-01",
          extra: { after: "2025-01-01" },
        },
      ],
    };

    const resFail = await validateField(field, "2024-12-31");
    expect(resFail.valid).toBe(false);

    const resPass = await validateField(field, "2026-01-01");
    expect(resPass.valid).toBe(true);
  });

  test("Built-in matchesRegex works", async () => {
    const field = {
      name: "regexField",
      type: "text",
      validation: [
        {
          type: "custom",
          custom: "matchesRegex",
          message: "Must match pattern",
          extra: { pattern: "^[A-Z]{3}$" },
        },
      ],
    };

    const resPass = await validateField(field, "ABC");
    expect(resPass.valid).toBe(true);

    const resFail = await validateField(field, "abc");
    expect(resFail.valid).toBe(false);
    expect(resFail.message).toBe("Must match pattern");
  });

  test("Runtime add/remove custom rule works", async () => {
    addCustom("startsWithA", (value) => String(value ?? "").startsWith("A"));

    const field = {
      name: "startsWithAField",
      type: "text",
      validation: [
        { type: "custom", custom: "startsWithA", message: "Must start with A" },
      ],
    };

    const resPass = await validateField(field, "Alice");
    expect(resPass.valid).toBe(true);

    const resFail = await validateField(field, "Bob");
    expect(resFail.valid).toBe(false);
    expect(resFail.message).toBe("Must start with A");

    // Registry should contain the rule
    expect(listCustom()).toContain("startsWithA");

    // Remove and confirm it's gone
    removeCustom("startsWithA");
    expect(listCustom()).not.toContain("startsWithA");
  });

  test("addCustom throws on invalid name", () => {
  expect(() => addCustom("", () => true)).toThrow();
});

test("addCustom throws on non-function", () => {
  expect(() => addCustom("badRule", "notAFunction")).toThrow();
});

test("regex rule fails on invalid pattern", async () => {
  const field = {
    name: "regexField",
    type: "text",
    validation: [{ type: "regex", pattern: "[", message: "Invalid regex" }],
  };
  const res = await validateField(field, "anything");
  expect(res.valid).toBe(false);
});

test("numberRange fails on NaN input", async () => {
  const field = {
    name: "numField",
    type: "text",
    validation: [{ type: "numberRange", min: 1, max: 10, message: "Must be number" }],
  };
  const res = await validateField(field, "notANumber");
  expect(res.valid).toBe(false);
});

test("date rule catches invalid date", async () => {
  const field = {
    name: "dateField",
    type: "date",
    validation: [{ type: "date", message: "Invalid date" }],
  };
  const res = await validateField(field, "notADate");
  expect(res.valid).toBe(false);
});

test("custom rule fails gracefully on exception", async () => {
  addCustom("throwsError", () => { throw new Error("fail"); });
  const field = {
    name: "errorField",
    type: "text",
    validation: [{ type: "custom", custom: "throwsError", message: "Custom failed" }],
  };
  const res = await validateField(field, "anything");
  expect(res.valid).toBe(false);
  expect(res.message).toBe("Custom failed");
  removeCustom("throwsError");
});
});
