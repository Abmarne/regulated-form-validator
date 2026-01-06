// ===============================
// BFSI Fields with Strict Validations
// ===============================

// PAN → Permanent Account Number
export const PANField = {
  name: "pan",
  label: "PAN Number",
  type: "text",
  validation: [
    { type: "required", message: "PAN is required" },
    {
      type: "regex",
      pattern: "^[A-Z]{5}[0-9]{4}[A-Z]$",
      message: "Invalid PAN format (e.g., ABCDE1234F)",
      uppercase: true
    },
    {
      type: "length",
      eq: 10,
      eqMessage: "PAN must be exactly 10 characters"
    }
  ],
  min: 10,
  max: 10,
  allowedChars: /^[A-Z0-9]$/,
  messageOnInvalid: "Only uppercase letters and digits are allowed"
};

// IFSC → Indian Financial System Code
export const IFSCField = {
  name: "ifsc",
  label: "IFSC Code",
  type: "text",
  validation: [
    { type: "required", message: "IFSC Code is required" },
    {
      type: "regex",
      pattern: "^[A-Z]{4}0[A-Z0-9]{6}$",
      message: "Invalid IFSC format (e.g., SBIN0001234)",
      uppercase: true
    },
    {
      type: "length",
      eq: 11,
      eqMessage: "IFSC Code must be exactly 11 characters"
    }
  ],
  min: 11,
  max: 11,
  allowedChars: /^[A-Z0-9]$/,
  messageOnInvalid: "Only uppercase letters and digits are allowed"
};

// Aadhaar → 12-digit numeric ID
export const AadhaarField = {
  name: "aadhaar",
  label: "Aadhaar Number",
  type: "text",
  validation: [
    { type: "required", message: "Aadhaar is required" },
    {
      type: "regex",
      pattern: "^\\d{12}$",
      message: "Aadhaar must be exactly 12 digits"
    },
    {
      type: "length",
      eq: 12,
      eqMessage: "Aadhaar must be exactly 12 digits"
    }
  ],
  min: 12,
  max: 12,
  allowedChars: /^[0-9]$/,
  messageOnInvalid: "Only digits are allowed in Aadhaar Number"
};

// GST → Goods and Services Tax ID
export const GSTField = {
  name: "gst",
  label: "GST Number",
  type: "text",
  validation: [
    { type: "required", message: "GST Number is required" },
    {
      type: "regex",
      pattern: "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$",
      message: "Invalid GST format",
      uppercase: true
    },
    {
      type: "length",
      eq: 15,
      eqMessage: "GST Number must be exactly 15 characters"
    }
  ],
  min: 15,
  max: 15,
  allowedChars: /^[A-Z0-9]$/,
  messageOnInvalid: "Only uppercase letters and digits are allowed"
};

// Account Number → 9–18 digits
export const AccountNumberField = {
  name: "accountNumber",
  label: "Bank Account Number",
  type: "text",
  validation: [
    { type: "required", message: "Account Number is required" },
    {
      type: "regex",
      pattern: "^[0-9]{9,18}$",
      message: "Account Number must be 9–18 digits"
    },
    {
      type: "length",
      min: 9,
      max: 18,
      minMessage: "Account Number must be at least 9 digits",
      maxMessage: "Account Number must be at most 18 digits"
    }
  ],
  min: 9,
  max: 18,
  allowedChars: /^[0-9]$/,
  messageOnInvalid: "Only digits are allowed in Account Number"
};

// MICR → 9-digit numeric code
export const MICRField = {
  name: "micr",
  label: "MICR Code",
  type: "text",
  validation: [
    { type: "required", message: "MICR Code is required" },
    {
      type: "regex",
      pattern: "^[0-9]{9}$",
      message: "MICR Code must be exactly 9 digits"
    },
    {
      type: "length",
      eq: 9,
      eqMessage: "MICR Code must be exactly 9 digits"
    }
  ],
  min: 9,
  max: 9,
  allowedChars: /^[0-9]$/,
  messageOnInvalid: "Only digits are allowed in MICR Code"
};