import {
  NameField,
  PincodeField,
  EmailField,
  AddressField,
  PhoneField,
  GenderField,
  PasswordField,
  ConfirmPasswordField,
  DobField,
  UsernameField,
  OTPField,
  AlternateEmailField,
  AlternatePhoneField
} from "../src/fields/presets.js";

import {
  PANField,
  IFSCField,
  AadhaarField,
  GSTField,
  AccountNumberField,
  MICRField
} from "../src/fields/bfsi.js";

import {
  PatientIDField,
  InsuranceField,
  HealthIDField,
  BloodGroupField,
  MedicalRecordField
} from "../src/fields/healthcare.js";

import { validateField, validateAll } from "../src/validator.js";

describe("Validator Test Suite", () => {
  // ------------------------------
  // Common Fields
  // ------------------------------
  test("NameField valid and invalid cases", async () => {
    expect(await validateField(NameField, "John Doe")).toEqual({ valid: true });
    expect((await validateField(NameField, "J1")).valid).toBe(false);
  });

  test("PincodeField must be 6 digits", async () => {
    expect(await validateField(PincodeField, "411001")).toEqual({ valid: true });
    expect((await validateField(PincodeField, "41100")).valid).toBe(false);
  });

  test("EmailField valid and invalid", async () => {
    expect(await validateField(EmailField, "user@example.com")).toEqual({ valid: true });
    expect((await validateField(EmailField, "user@com")).valid).toBe(false);
  });

  test("PhoneField must be 10 digits", async () => {
    expect(await validateField(PhoneField, "9876543210")).toEqual({ valid: true });
    expect((await validateField(PhoneField, "12345")).valid).toBe(false);
  });

  test("GenderField must be one of options", async () => {
    expect(await validateField(GenderField, "Male")).toEqual({ valid: true });
    expect((await validateField(GenderField, "Unknown")).valid).toBe(false);
  });

  test("PasswordField strong password", async () => {
    expect(await validateField(PasswordField, "Abcd@123")).toEqual({ valid: true });
    expect((await validateField(PasswordField, "weakpass")).valid).toBe(false);
  });

  test("ConfirmPasswordField must match", async () => {
    const values = { password: "Abcd@123", confirmPassword: "Abcd@123" };
    expect(await validateField(ConfirmPasswordField, values.confirmPassword, values)).toEqual({ valid: true });
    values.confirmPassword = "Mismatch";
    expect((await validateField(ConfirmPasswordField, values.confirmPassword, values)).valid).toBe(false);
  });

  test("DobField cannot be today or future", async () => {
    const today = new Date().toISOString().split("T")[0];
    expect((await validateField(DobField, today)).valid).toBe(false);
    expect(await validateField(DobField, "2000-01-01")).toEqual({ valid: true });
  });

  test("UsernameField valid and invalid", async () => {
    expect(await validateField(UsernameField, "user_name")).toEqual({ valid: true });
    expect((await validateField(UsernameField, "ab")).valid).toBe(false);
  });

  test("OTPField must be 6 digits", async () => {
    expect(await validateField(OTPField, "123456")).toEqual({ valid: true });
    expect((await validateField(OTPField, "1234")).valid).toBe(false);
  });

  // ------------------------------
  // BFSI Fields
  // ------------------------------
  test("PANField valid with uppercase and lowercase input", async () => {
    expect(await validateField(PANField, "ABCDE1234F")).toEqual({ valid: true });
    expect(await validateField(PANField, "abcde1234f")).toEqual({ valid: true }); // lowercase accepted
  });

  test("IFSCField valid with uppercase and lowercase input", async () => {
    expect(await validateField(IFSCField, "SBIN0001234")).toEqual({ valid: true });
    expect(await validateField(IFSCField, "sbin0001234")).toEqual({ valid: true }); // lowercase accepted
  });

  test("AadhaarField must be 12 digits", async () => {
    expect(await validateField(AadhaarField, "123456789012")).toEqual({ valid: true });
    expect((await validateField(AadhaarField, "12345")).valid).toBe(false);
  });

  test("GSTField valid with uppercase and lowercase input", async () => {
    expect(await validateField(GSTField, "22AAAAA0000A1Z5")).toEqual({ valid: true });
    expect(await validateField(GSTField, "22aaaaa0000a1z5")).toEqual({ valid: true }); // lowercase accepted
  });

  test("AccountNumberField 9–18 digits", async () => {
    expect(await validateField(AccountNumberField, "123456789")).toEqual({ valid: true });
    expect((await validateField(AccountNumberField, "1234")).valid).toBe(false);
  });

  test("MICRField must be 9 digits", async () => {
    expect(await validateField(MICRField, "123456789")).toEqual({ valid: true });
    expect((await validateField(MICRField, "12345")).valid).toBe(false);
  });

  // ------------------------------
  // Healthcare Fields
  // ------------------------------
  test("PatientIDField valid with uppercase and lowercase input", async () => {
    expect(await validateField(PatientIDField, "ABCD1234")).toEqual({ valid: true });
    expect(await validateField(PatientIDField, "abcd1234")).toEqual({ valid: true }); // lowercase accepted
  });

  test("InsuranceField must be 2 letters + 6 digits", async () => {
    expect(await validateField(InsuranceField, "AB123456")).toEqual({ valid: true });
    expect((await validateField(InsuranceField, "A123456")).valid).toBe(false);
  });

  test("HealthIDField valid with uppercase and lowercase input", async () => {
    expect(await validateField(HealthIDField, "ABCD123456")).toEqual({ valid: true });
    expect(await validateField(HealthIDField, "abcd123456")).toEqual({ valid: true }); // lowercase accepted
  });

  test("BloodGroupField must be valid option", async () => {
    expect(await validateField(BloodGroupField, "A+")).toEqual({ valid: true });
    expect((await validateField(BloodGroupField, "X+")).valid).toBe(false);
  });

  test("MedicalRecordField 6–12 digits", async () => {
    expect(await validateField(MedicalRecordField, "123456")).toEqual({ valid: true });
    expect((await validateField(MedicalRecordField, "123")).valid).toBe(false);
  });

  // ------------------------------
  // validateAll integration test
  // ------------------------------
  test("validateAll returns errors object", async () => {
    const values = {
      name: "John Doe",
      pincode: "411001",
      email: "user@example.com",
      address: "123 Street",
      phone: "9876543210",
      gender: "Male",
      password: "Abcd@123",
      confirmPassword: "Abcd@123",
      dob: "2000-01-01",
      username: "user_name",
      otp: "123456"
    };
    const res = await validateAll(
      [NameField, PincodeField, EmailField, AddressField, PhoneField, GenderField, PasswordField, ConfirmPasswordField, DobField, UsernameField, OTPField],
      values
    );
    expect(res.valid).toBe(true);
    expect(res.errors).toEqual({});
  });
});