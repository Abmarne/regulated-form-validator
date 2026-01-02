import { validateField } from "../src/validator.js";
import { addCustom } from "../src/customRegistry.js";

describe("Length rule", () => {
  test("fails when shorter than min", () => {
    const field = { name: "short", validation: [{ type: "length", min: 5 }] };
    expect(validateField(field, "abc", {}).valid).toBe(false);
  });

  test("passes when equal to min", () => {
    const field = { name: "short", validation: [{ type: "length", min: 3 }] };
    expect(validateField(field, "abc", {}).valid).toBe(true);
  });

  test("fails when longer than max", () => {
    const field = { name: "long", validation: [{ type: "length", max: 3 }] };
    expect(validateField(field, "abcd", {}).valid).toBe(false);
  });

  test("passes when exact length matches eq", () => {
    const field = { name: "exact", validation: [{ type: "length", eq: 4 }] };
    expect(validateField(field, "test", {}).valid).toBe(true);
  });
});

describe("Enum rule", () => {
  const field = { name: "color", validation: [{ type: "enum", options: ["red", "blue"] }] };

  test("passes when value is in options", () => {
    expect(validateField(field, "red", {}).valid).toBe(true);
  });

  test("fails when value is not in options", () => {
    expect(validateField(field, "green", {}).valid).toBe(false);
  });
});

describe("Number rule", () => {
  test("fails when not a number", () => {
    const field = { name: "num", validation: [{ type: "number" }] };
    expect(validateField(field, "abc", {}).valid).toBe(false);
  });

  test("passes when within min/max", () => {
    const field = { name: "num", validation: [{ type: "number", min: 10, max: 20 }] };
    expect(validateField(field, "15", {}).valid).toBe(true);
  });

  test("fails when below min", () => {
    const field = { name: "num", validation: [{ type: "number", min: 10 }] };
    expect(validateField(field, "5", {}).valid).toBe(false);
  });

  test("fails when above max", () => {
    const field = { name: "num", validation: [{ type: "number", max: 10 }] };
    expect(validateField(field, "20", {}).valid).toBe(false);
  });
});

describe("Date rule", () => {
  test("fails when invalid date", () => {
    const field = { name: "dob", validation: [{ type: "date" }] };
    expect(validateField(field, "not-a-date", {}).valid).toBe(false);
  });

  test("passes when before cutoff", () => {
    const field = { name: "dob", validation: [{ type: "date", before: "2025-01-01" }] };
    expect(validateField(field, "2024-12-31", {}).valid).toBe(true);
  });

  test("fails when after cutoff", () => {
    const field = { name: "dob", validation: [{ type: "date", before: "2025-01-01" }] };
    expect(validateField(field, "2025-12-31", {}).valid).toBe(false);
  });

  test("ageMin works correctly", () => {
    const field = { name: "dob", validation: [{ type: "date", ageMin: 18 }] };
    const validDob = new Date();
    validDob.setFullYear(validDob.getFullYear() - 20);
    expect(validateField(field, validDob.toISOString().split("T")[0], {}).valid).toBe(true);

    const invalidDob = new Date();
    invalidDob.setFullYear(invalidDob.getFullYear() - 10);
    expect(validateField(field, invalidDob.toISOString().split("T")[0], {}).valid).toBe(false);
  });
});

describe("Custom rule (registry)", () => {
  beforeAll(() => {
    // Register a safe custom rule for testing
    addCustom("containsXYZ", (value) => String(value ?? "").includes("XYZ"));
  });

  test("passes when custom function returns true", () => {
    const field = {
      name: "customField",
      validation: [{ type: "custom", custom: "containsXYZ" }]
    };
    expect(validateField(field, "containsXYZ", {}).valid).toBe(true);
  });

  test("fails when custom function returns false", () => {
    const field = {
      name: "customField",
      validation: [{ type: "custom", custom: "containsXYZ" }]
    };
    expect(validateField(field, "nope", {}).valid).toBe(false);
  });
});