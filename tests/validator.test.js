import { validateField, validateAll } from "../src/validator.js";

describe("Required and regex", () => {
  test("required fails when empty", () => {
    const field = { name: "x", validation: [{ type: "required", message: "Required" }] };
    expect(validateField(field, "", {}).valid).toBe(false);
  });

  test("email regex works", () => {
    const field = { name: "email", validation: [{ type: "regex", pattern: "^[\\w.-]+@[\\w.-]+\\.[A-Za-z]{2,}$" }] };
    expect(validateField(field, "user@example.com", {}).valid).toBe(true);
    expect(validateField(field, "bad@", {}).valid).toBe(false);
  });
});

describe("Cross-field and conditional", () => {
  test("crossField equals", () => {
    const fields = [
      { name: "a", validation: [] },
      { name: "b", validation: [{ type: "crossField", field: "a", message: "Must match" }] }
    ];
    const values = { a: "123", b: "123" };
    expect(validateAll(fields, values).valid).toBe(true);
  });

  test("conditional required", () => {
    const field = {
      name: "nomineeName",
      validation: [{ type: "required", when: { field: "nomineeRelation", notEmpty: true }, message: "Nominee required" }]
    };
    const values = { nomineeRelation: "Spouse", nomineeName: "" };
    const res = validateField(field, values.nomineeName, values);
    expect(res.valid).toBe(false);
  });
});