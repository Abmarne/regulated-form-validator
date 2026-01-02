import { validateField } from "../src/validator.js";   // <-- add this import

describe("BFSI validations", () => {
  test("valid PAN passes", () => {
    const field = { name: "pan", validation: [{ type: "pan" }] };
    expect(validateField(field, "ABCDE1234F", {}).valid).toBe(true);
  });

  test("invalid PAN fails", () => {
    const field = { name: "pan", validation: [{ type: "pan" }] };
    expect(validateField(field, "12345", {}).valid).toBe(false);
  });

  test("valid IFSC passes", () => {
    const field = { name: "ifsc", validation: [{ type: "ifsc" }] };
    expect(validateField(field, "SBIN0001234", {}).valid).toBe(true);
  });

  test("invalid IFSC fails", () => {
    const field = { name: "ifsc", validation: [{ type: "ifsc" }] };
    expect(validateField(field, "XYZ123", {}).valid).toBe(false);
  });

  test("valid Aadhaar passes", () => {
    const field = { name: "aadhaar", validation: [{ type: "aadhaar" }] };
    expect(validateField(field, "123412341234", {}).valid).toBe(true);
  });

  test("invalid Aadhaar fails", () => {
    const field = { name: "aadhaar", validation: [{ type: "aadhaar" }] };
    expect(validateField(field, "abcd1234", {}).valid).toBe(false);
  });
});