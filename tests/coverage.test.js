// tests/coverage.test.js
import { validateField } from "../src/validator.js";
import { addCustom, removeCustom, listCustom } from "../src/customRegistry.js";

describe("Coverage edge cases", () => {
  // ------------------------------
  // customRegistry.js
  // ------------------------------
  test("addCustom throws when registering duplicate rule", () => {
    addCustom("dupRule", () => true);
    expect(() => addCustom("dupRule", () => true)).toThrow();
    removeCustom("dupRule"); // cleanup
  });

  test("removeCustom silently ignores unknown rule", () => {
    expect(() => removeCustom("notThere")).not.toThrow();
  });

  test("listCustom returns registered rules", () => {
    addCustom("tempRule", () => true);
    expect(listCustom()).toContain("tempRule");
    removeCustom("tempRule");
  });

  // ------------------------------
  // ruleRegistry.js
  // ------------------------------
  test("regex rule fails gracefully with empty pattern", async () => {
    const field = {
      name: "regexEmpty",
      type: "text",
      validation: [{ type: "regex", pattern: "", message: "Bad regex" }]
    };
    const res = await validateField(field, "anything");
    expect(res.valid).toBe(false);
    expect(res.errors[0].message).toBe("Bad regex");
  });

  test("length rule enforces min and max", async () => {
    const field = {
      name: "lenField",
      type: "text",
      validation: [{ type: "length", min: 2, max: 4, message: "Length out of range" }]
    };
    expect((await validateField(field, "A")).valid).toBe(false);
    expect((await validateField(field, "ABCDE")).valid).toBe(false);
    expect((await validateField(field, "AB")).valid).toBe(true);
  });

  test("date rule enforces before/after boundaries", async () => {
    const field = {
      name: "dateField",
      type: "date",
      validation: [{
        type: "date",
        before: "2025-01-01",
        after: "2000-01-01",
        message: "Date out of range"
      }]
    };
    expect((await validateField(field, "1999-12-31")).valid).toBe(false);
    expect((await validateField(field, "2026-01-01")).valid).toBe(false);
    expect((await validateField(field, "2024-01-01")).valid).toBe(true);
  });

  test("select rule rejects invalid option", async () => {
    const field = {
      name: "color",
      type: "select",
      validation: [{ type: "select", options: ["Red", "Green"], message: "Invalid color" }]
    };
    expect((await validateField(field, "Blue")).valid).toBe(false);
    expect((await validateField(field, "Red")).valid).toBe(true);
  });
});