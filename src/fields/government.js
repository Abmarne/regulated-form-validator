// ===============================
// Government ID Fields with Enhanced Validations
// ===============================

// PAN → Permanent Account Number
export const PANField = {
  name: "pan",
  label: "PAN Number",
  type: "text",
  validation: [
    { type: "required", severity: "error", message: { en: "PAN is required" } },
    {
      type: "regex",
      severity: "error",
      pattern: "^[A-Z]{5}[0-9]{4}[A-Z]$",
      message: { en: "Invalid PAN format (e.g., ABCDE1234F)" },
      uppercase: true
    },
    {
      type: "length",
      severity: "error",
      eq: 10,
      eqMessage: { en: "PAN must be exactly 10 characters" }
    }
  ],
  min: 10,
  max: 10,
  allowedChars: /^[A-Z0-9]$/,
  messageOnInvalid: { en: "Only uppercase letters and digits are allowed" }
};

// Aadhaar → 12-digit numeric ID
export const AadhaarField = {
  name: "aadhaar",
  label: "Aadhaar Number",
  type: "text",
  validation: [
    { type: "required", severity: "error", message: { en: "Aadhaar is required" } },
    {
      type: "regex",
      severity: "error",
      pattern: "^\\d{12}$",
      message: { en: "Aadhaar must be exactly 12 digits" }
    },
    {
      type: "length",
      severity: "error",
      eq: 12,
      eqMessage: { en: "Aadhaar must be exactly 12 digits" }
    }
  ],
  min: 12,
  max: 12,
  allowedChars: /^[0-9]$/,
  messageOnInvalid: { en: "Only digits are allowed in Aadhaar Number" }
};

// Voter ID → 10-character alphanumeric
export const VoterIDField = {
  name: "voterId",
  label: "Voter ID",
  type: "text",
  validation: [
    { type: "required", severity: "error", message: { en: "Voter ID is required" } },
    {
      type: "regex",
      severity: "error",
      pattern: "^[A-Z0-9]{10}$",
      message: { en: "Voter ID must be 10 alphanumeric characters" },
      uppercase: true
    },
    {
      type: "length",
      severity: "error",
      eq: 10,
      eqMessage: { en: "Voter ID must be exactly 10 characters" }
    }
  ],
  min: 10,
  max: 10,
  allowedChars: /^[A-Z0-9]$/,
  messageOnInvalid: { en: "Only uppercase letters and digits are allowed" }
};

// Driving License → 16-character alphanumeric (common format)
export const DrivingLicenseField = {
  name: "drivingLicense",
  label: "Driving License Number",
  type: "text",
  validation: [
    { type: "required", severity: "error", message: { en: "Driving License Number is required" } },
    {
      type: "regex",
      severity: "error",
      pattern: "^[A-Z0-9]{16}$",
      message: { en: "Driving License must be 16 alphanumeric characters" },
      uppercase: true
    },
    {
      type: "length",
      severity: "error",
      eq: 16,
      eqMessage: { en: "Driving License must be exactly 16 characters" }
    }
  ],
  min: 16,
  max: 16,
  allowedChars: /^[A-Z0-9]$/,
  messageOnInvalid: { en: "Only uppercase letters and digits are allowed" }
};

// Passport → 8-character alphanumeric (1 letter + 7 digits)
export const PassportField = {
  name: "passport",
  label: "Passport Number",
  type: "text",
  validation: [
    { type: "required", severity: "error", message: { en: "Passport Number is required" } },
    {
      type: "regex",
      severity: "error",
      pattern: "^[A-Z][0-9]{7}$",
      message: { en: "Invalid Passport format (e.g., A1234567)" },
      uppercase: true
    },
    {
      type: "length",
      severity: "error",
      eq: 8,
      eqMessage: { en: "Passport Number must be exactly 8 characters" }
    }
  ],
  min: 8,
  max: 8,
  allowedChars: /^[A-Z0-9]$/,
  messageOnInvalid: { en: "Only uppercase letters and digits are allowed" }
};