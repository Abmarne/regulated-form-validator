import {
  // Presets
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
  // BFSI
  IFSCField,
  GSTField,
  AccountNumberField,
  MICRField,
  CreditCardField,
  CVVField,
  ExpiryDateField
} from "../src/fields/bfsi.js";

import {
  // Government
  AadhaarField,
  PANField,
  VoterIDField,
  DrivingLicenseField,
  PassportField
} from "../src/fields/government.js";

import {
  // Healthcare
  PatientIDField,
  InsuranceField,
  HealthIDField,
  BloodGroupField,
  MedicalRecordField,
  DoctorIDField,
  HospitalCodeField,
  PrescriptionIDField,
  NationalHealthNumberField
} from "../src/fields/healthcare.js";

import { validateField, validateAll } from "../src/validator.js";

describe("Validator Test Suite", () => {
  // ------------------------------
  // Common Fields
  // ------------------------------
  test("NameField valid and invalid cases", async () => {
    const resValid = await validateField(NameField, "John Doe");
    expect(resValid.valid).toBe(true);

    const resInvalid = await validateField(NameField, "J1");
    expect(resInvalid.valid).toBe(false);
    expect(resInvalid.errors[0].message).toBe("Name can only contain alphabets and spaces");
  });

  test("PincodeField must be 6 digits", async () => {
    expect((await validateField(PincodeField, "411001")).valid).toBe(true);
    expect((await validateField(PincodeField, "41100")).valid).toBe(false);
  });

  test("EmailField valid and invalid", async () => {
    expect((await validateField(EmailField, "user@example.com")).valid).toBe(true);
    expect((await validateField(EmailField, "user@com")).valid).toBe(false);
  });

  test("PhoneField must be 10 digits", async () => {
    expect((await validateField(PhoneField, "9876543210")).valid).toBe(true);
    expect((await validateField(PhoneField, "12345")).valid).toBe(false);
  });

  test("GenderField must be one of options", async () => {
    expect((await validateField(GenderField, "Male")).valid).toBe(true);
    expect((await validateField(GenderField, "Unknown")).valid).toBe(false);
  });

  test("PasswordField strong password", async () => {
    expect((await validateField(PasswordField, "Abcd@123")).valid).toBe(true);
    expect((await validateField(PasswordField, "weakpass")).valid).toBe(false);
  });

  test("ConfirmPasswordField must match", async () => {
    const values = { password: "Abcd@123", confirmPassword: "Abcd@123" };
    expect((await validateField(ConfirmPasswordField, values.confirmPassword, values)).valid).toBe(true);

    values.confirmPassword = "Mismatch";
    expect((await validateField(ConfirmPasswordField, values.confirmPassword, values)).valid).toBe(false);
  });

  test("DobField cannot be today or future", async () => {
    const today = new Date().toISOString().split("T")[0];
    expect((await validateField(DobField, today)).valid).toBe(false);
    expect((await validateField(DobField, "2000-01-01")).valid).toBe(true);
  });

  test("UsernameField valid and invalid", async () => {
    expect((await validateField(UsernameField, "user_name")).valid).toBe(true);
    expect((await validateField(UsernameField, "ab")).valid).toBe(false);
  });

  test("OTPField must be 6 digits", async () => {
    expect((await validateField(OTPField, "123456")).valid).toBe(true);
    expect((await validateField(OTPField, "1234")).valid).toBe(false);
  });

  test("AlternateEmailField optional but must be valid when provided", async () => {
    expect((await validateField(AlternateEmailField, "")).valid).toBe(true); // empty is valid
    expect((await validateField(AlternateEmailField, "invalid@")).valid).toBe(false);
    expect((await validateField(AlternateEmailField, "alt@example.com")).valid).toBe(true);
  });

  test("AlternatePhoneField optional but must be valid when provided", async () => {
    expect((await validateField(AlternatePhoneField, "")).valid).toBe(true); // empty is valid
    expect((await validateField(AlternatePhoneField, "123")).valid).toBe(false);
    expect((await validateField(AlternatePhoneField, "9876543210")).valid).toBe(true);
  });

  // ------------------------------
  // BFSI Fields
  // ------------------------------
  test("PANField valid with uppercase and lowercase input", async () => {
    expect((await validateField(PANField, "ABCDE1234F")).valid).toBe(true);
    expect((await validateField(PANField, "abcde1234f")).valid).toBe(true);
  });

  test("IFSCField valid with uppercase and lowercase input", async () => {
    expect((await validateField(IFSCField, "SBIN0001234")).valid).toBe(true);
    expect((await validateField(IFSCField, "sbin0001234")).valid).toBe(true);
  });

  test("AadhaarField must be 12 digits", async () => {
    expect((await validateField(AadhaarField, "123456789012")).valid).toBe(true);
    expect((await validateField(AadhaarField, "12345")).valid).toBe(false);
  });

  test("GSTField valid with uppercase and lowercase input", async () => {
    expect((await validateField(GSTField, "22AAAAA0000A1Z5")).valid).toBe(true);
    expect((await validateField(GSTField, "22aaaaa0000a1z5")).valid).toBe(true);
  });

  test("AccountNumberField 9–18 digits", async () => {
    expect((await validateField(AccountNumberField, "123456789")).valid).toBe(true);
    expect((await validateField(AccountNumberField, "1234")).valid).toBe(false);
  });

  test("MICRField must be 9 digits", async () => {
    expect((await validateField(MICRField, "123456789")).valid).toBe(true);
    expect((await validateField(MICRField, "12345")).valid).toBe(false);
  });

  // ------------------------------
  // Healthcare Fields
  // ------------------------------
  test("PatientIDField valid with uppercase and lowercase input", async () => {
    expect((await validateField(PatientIDField, "ABCD1234")).valid).toBe(true);
    expect((await validateField(PatientIDField, "abcd1234")).valid).toBe(true);
  });

  test("InsuranceField must be 2 letters + 6 digits", async () => {
    expect((await validateField(InsuranceField, "AB123456")).valid).toBe(true);
    expect((await validateField(InsuranceField, "A123456")).valid).toBe(false);
  });

  test("HealthIDField valid with uppercase and lowercase input", async () => {
    expect((await validateField(HealthIDField, "ABCD123456")).valid).toBe(true);
    expect((await validateField(HealthIDField, "abcd123456")).valid).toBe(true);
  });

  test("BloodGroupField must be valid option", async () => {
    expect((await validateField(BloodGroupField, "A+")).valid).toBe(true);
    expect((await validateField(BloodGroupField, "X+")).valid).toBe(false);
  });

  test("MedicalRecordField 6–12 digits", async () => {
    expect((await validateField(MedicalRecordField, "123456")).valid).toBe(true);
    expect((await validateField(MedicalRecordField, "123")).valid).toBe(false);
  });

  // ------------------------------
// Presets (missing AddressField)
// ------------------------------
test("AddressField must be 5–100 alphanumeric characters", async () => {
  expect((await validateField(AddressField, "123 Main Street")).valid).toBe(true);
  expect((await validateField(AddressField, "12")).valid).toBe(false);
});

// ------------------------------
// BFSI (missing CreditCard, CVV, ExpiryDate)
// ------------------------------
test("CreditCardField must be 16 digits", async () => {
  expect((await validateField(CreditCardField, "1234567812345678")).valid).toBe(true);
  expect((await validateField(CreditCardField, "1234")).valid).toBe(false);
});

test("CVVField must be 3 digits", async () => {
  expect((await validateField(CVVField, "123")).valid).toBe(true);
  expect((await validateField(CVVField, "12")).valid).toBe(false);
});

test("ExpiryDateField must be in MM/YY format", async () => {
  expect((await validateField(ExpiryDateField, "12/30")).valid).toBe(true);
  expect((await validateField(ExpiryDateField, "2020-12")).valid).toBe(false);
});

// ------------------------------
// Government (missing VoterID, DrivingLicense, Passport)
// ------------------------------
test("VoterIDField must be 10 alphanumeric characters", async () => {
  expect((await validateField(VoterIDField, "ABC1234567")).valid).toBe(true);
  expect((await validateField(VoterIDField, "ABC123")).valid).toBe(false);
});

test("DrivingLicenseField must be 16 alphanumeric characters", async () => {
  expect((await validateField(DrivingLicenseField, "ABCD123456789012")).valid).toBe(true);
  expect((await validateField(DrivingLicenseField, "ABCD1234")).valid).toBe(false);
});

test("PassportField must be 1 letter + 7 digits", async () => {
  expect((await validateField(PassportField, "A1234567")).valid).toBe(true);
  expect((await validateField(PassportField, "12345678")).valid).toBe(false);
});

// ------------------------------
// Healthcare (missing DoctorID, HospitalCode, PrescriptionID, NHN)
// ------------------------------
test("DoctorIDField must be 6 alphanumeric characters", async () => {
  expect((await validateField(DoctorIDField, "AB1234")).valid).toBe(true);
  expect((await validateField(DoctorIDField, "AB12")).valid).toBe(false);
});

test("HospitalCodeField must be 3 letters + 3 digits", async () => {
  expect((await validateField(HospitalCodeField, "HSP123")).valid).toBe(true);
  expect((await validateField(HospitalCodeField, "HS123")).valid).toBe(false);
});

test("PrescriptionIDField must be 10 digits", async () => {
  expect((await validateField(PrescriptionIDField, "1234567890")).valid).toBe(true);
  expect((await validateField(PrescriptionIDField, "12345")).valid).toBe(false);
});

test("NationalHealthNumberField must be 12 digits", async () => {
  expect((await validateField(NationalHealthNumberField, "123456789012")).valid).toBe(true);
  expect((await validateField(NationalHealthNumberField, "123456")).valid).toBe(false);
});

    // ------------------------------
  // validateAll integration test
  // ------------------------------
  test("validateAll returns errors object when invalid values provided", async () => {
    const values = {
      name: "J1",
      pincode: "41100",
      email: "user@com",
      address: "12",
      phone: "12345",
      gender: "Unknown",
      password: "weakpass",
      confirmPassword: "Mismatch",
      dob: new Date().toISOString().split("T")[0],
      username: "ab",
      otp: "1234",
      alternateEmail: "invalid@",
      alternatePhone: "123"
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
    expect(res.errors.name[0].message).toBe("Name can only contain alphabets and spaces");
    expect(res.errors.pincode[0].message).toBeDefined();
    expect(res.errors.email[0].message).toBeDefined();
    expect(res.errors.phone[0].message).toBeDefined();
    expect(res.errors.password[0].message).toBeDefined();
    expect(res.errors.confirmPassword[0].message).toBeDefined();
    expect(res.errors.dob[0].message).toBeDefined();
    expect(res.errors.username[0].message).toBeDefined();
    expect(res.errors.otp[0].message).toBeDefined();
    expect(res.errors.alternateEmail[0].message).toBeDefined();
    expect(res.errors.alternatePhone[0].message).toBeDefined();
  });
});