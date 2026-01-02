import { validateField } from "../src/validator.js";

describe("Conditional rules", () => {
  test("equals condition applies rule", () => {
    const field = {
      name: "bonus",
      validation: [
        { type: "required", when: { field: "role", equals: "Manager" }, message: "Bonus required" }
      ]
    };
    const values = { role: "Manager", bonus: "" };
    expect(validateField(field, values.bonus, values).valid).toBe(false);
  });

  test("notEquals condition applies rule", () => {
    const field = {
      name: "extra",
      validation: [
        { type: "required", when: { field: "status", notEquals: "Inactive" }, message: "Extra required" }
      ]
    };
    const values = { status: "Active", extra: "" };
    expect(validateField(field, values.extra, values).valid).toBe(false);
  });

  test("notEmpty condition applies rule", () => {
    const field = {
      name: "nomineeName",
      validation: [
        { type: "required", when: { field: "nomineeRelation", notEmpty: true }, message: "Nominee required" }
      ]
    };
    const values = { nomineeRelation: "Spouse", nomineeName: "" };
    expect(validateField(field, values.nomineeName, values).valid).toBe(false);
  });

  test("in list condition applies rule", () => {
    const field = {
      name: "specialCode",
      validation: [
        { type: "required", when: { field: "dept", in: ["HR", "Finance"] }, message: "Code required" }
      ]
    };
    const values = { dept: "HR", specialCode: "" };
    expect(validateField(field, values.specialCode, values).valid).toBe(false);
  });

  test("notIn list condition applies rule", () => {
    const field = {
      name: "restricted",
      validation: [
        { type: "required", when: { field: "dept", notIn: ["Legal", "Audit"] }, message: "Restricted required" }
      ]
    };
    const values = { dept: "Engineering", restricted: "" };
    expect(validateField(field, values.restricted, values).valid).toBe(false);
  });

  test("skips rule when condition not met", () => {
    const field = {
      name: "bonus",
      validation: [
        { type: "required", when: { field: "role", equals: "Manager" }, message: "Bonus required" }
      ]
    };
    const values = { role: "Developer", bonus: "" };
    // Condition not met, so rule is skipped
    expect(validateField(field, values.bonus, values).valid).toBe(true);
  });
});