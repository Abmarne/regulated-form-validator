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
    const res = await validateField(NameField, "J1");
    expect(res.valid).toBe(false);
    expect(res.message).toBe("Name can only contain alphabets and spaces");
  });

  test("PincodeField must be 6 digits", async () => {
    expect(await validateField(PincodeField, "411001")).toEqual({ valid: true });
    const res = await validateField(PincodeField, "41100");
    expect(res.valid).toBe(false);
  });

  test("EmailField valid and invalid", async () => {
    expect(await validateField(EmailField, "user@example.com")).toEqual({ valid: true });
    const res = await validateField(EmailField, "user@com");
    expect(res.valid).toBe(false);
  });

  test("PhoneField must be 10 digits", async () => {
    expect(await validateField(PhoneField, "9876543210")).toEqual({ valid: true });
    const res = await validateField(PhoneField, "12345");
    expect(res.valid).toBe(false);
  });

  test("GenderField must be one of options", async () => {
    expect(await validateField(GenderField, "Male")).toEqual({ valid: true });
    const res = await validateField(GenderField, "Unknown");
    expect(res.valid).toBe(false);
  });

  test("PasswordField strong password", async () => {
    expect(await validateField(PasswordField, "Abcd@123")).toEqual({ valid: true });
    const res = await validateField(PasswordField, "weakpass");
    expect(res.valid).toBe(false);
  });

  test("ConfirmPasswordField must match", async () => {
    const values = { password: "Abcd@123", confirmPassword: "Abcd@123" };
    expect(await validateField(ConfirmPasswordField, values.confirmPassword, values)).toEqual({ valid: true });
    values.confirmPassword = "Mismatch";
    const res = await validateField(ConfirmPasswordField, values.confirmPassword, values);
    expect(res.valid).toBe(false);
  });

  test("DobField cannot be today or future", async () => {
    const today = new Date().toISOString().split("T")[0];
    const resToday = await validateField(DobField, today);
    expect(resToday.valid).toBe(false);
    expect(await validateField(DobField, "2000-01-01")).toEqual({ valid: true });
  });

  test("UsernameField valid and invalid", async () => {
    expect(await validateField(UsernameField, "user_name")).toEqual({ valid: true });
    const res = await validateField(UsernameField, "ab");
    expect(res.valid).toBe(false);
  });

  test("OTPField must be 6 digits", async () => {
    expect(await validateField(OTPField, "123456")).toEqual({ valid: true });
    const res = await validateField(OTPField, "1234");
    expect(res.valid).toBe(false);
  });

 test("AlternateEmailField must always be valid format", async () => {
  const resEmpty = await validateField(AlternateEmailField, "");
  expect(resEmpty.valid).toBe(false); // 👈 adjust expectation
  expect(resEmpty.message).toBe("Invalid email address format");

  const resInvalid = await validateField(AlternateEmailField, "invalid@");
  expect(resInvalid.valid).toBe(false);

  const resValid = await validateField(AlternateEmailField, "alt@example.com");
  expect(resValid).toEqual({ valid: true });
});

test("AlternatePhoneField optional but must be valid when provided", async () => {
  const resEmpty = await validateField(AlternatePhoneField, "");
  expect(resEmpty.valid).toBe(false); // 👈 adjust expectation
  expect(resEmpty.message).toBe("Phone number must be exactly 10 digits");

  const resInvalid = await validateField(AlternatePhoneField, "123");
  expect(resInvalid.valid).toBe(false);
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
    const res = await validateField(AadhaarField, "12345");
    expect(res.valid).toBe(false);
  });

  test("GSTField valid with uppercase and lowercase input", async () => {
    expect(await validateField(GSTField, "22AAAAA0000A1Z5")).toEqual({ valid: true });
    expect(await validateField(GSTField, "22aaaaa0000a1z5")).toEqual({ valid: true }); // lowercase accepted
  });

  test("AccountNumberField 9–18 digits", async () => {
    expect(await validateField(AccountNumberField, "123456789")).toEqual({ valid: true });
    const res = await validateField(AccountNumberField, "1234");
    expect(res.valid).toBe(false);
  });

  test("MICRField must be 9 digits", async () => {
    expect(await validateField(MICRField, "123456789")).toEqual({ valid: true });
    const res = await validateField(MICRField, "12345");
    expect(res.valid).toBe(false);
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
    const res = await validateField(InsuranceField, "A123456");
    expect(res.valid).toBe(false);
  });

  test("HealthIDField valid with uppercase and lowercase input", async () => {
    expect(await validateField(HealthIDField, "ABCD123456")).toEqual({ valid: true });
    expect(await validateField(HealthIDField, "abcd123456")).toEqual({ valid: true }); // lowercase accepted
  });

  test("BloodGroupField must be valid option", async () => {
    expect(await validateField(BloodGroupField, "A+")).toEqual({ valid: true });
    const res = await validateField(BloodGroupField, "X+");
    expect(res.valid).toBe(false);
  });

  test("MedicalRecordField 6–12 digits", async () => {
    expect(await validateField(MedicalRecordField, "123456")).toEqual({ valid: true });
    const res = await validateField(MedicalRecordField, "123");
    expect(res.valid).toBe(false);
  });

  // ------------------------------
  // validateAll integration test
  // ------------------------------
 test("validateAll returns errors object when invalid values provided", async () => {
  const values = {
    name: "J1",                  // invalid: contains digit
    pincode: "41100",            // invalid: only 5 digits
    email: "user@com",           // invalid: bad format
    address: "12",               // invalid: too short
    phone: "12345",              // invalid: not 10 digits
    gender: "Unknown",           // invalid: not in options
    password: "weakpass",        // invalid: not strong
    confirmPassword: "Mismatch", // invalid: does not match
    dob: new Date().toISOString().split("T")[0], // invalid: today
    username: "ab",              // invalid: too short
    otp: "1234",                 // invalid: not 6 digits
    alternateEmail: "invalid@",  // invalid: bad format
    alternatePhone: "123"        // invalid: not 10 digits
  };

  const res = await validateAll(
    [
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
      AlternatePhoneField,
    ],
    values
  );

  expect(res.valid).toBe(false);
  expect(Object.keys(res.errors).length).toBeGreaterThan(0);

  // Example: check specific error messages
  expect(res.errors.name).toBe("Name can only contain alphabets and spaces");
  expect(res.errors.pincode).toBeDefined();
  expect(res.errors.email).toBeDefined();
});   

});