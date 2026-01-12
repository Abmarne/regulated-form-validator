// ===============================
// BFSI Fields with Enhanced Validations
// ===============================

// IFSC → Indian Financial System Code
export const IFSCField = {
  name: "ifsc",
  label: "IFSC Code",
  type: "text",
  validation: [
    { type: "required", severity: "error", message: { en: "IFSC Code is required" } },
    {
      type: "regex",
      severity: "error",
      pattern: "^[A-Z]{4}0[A-Z0-9]{6}$",
      message: { en: "Invalid IFSC format (e.g., SBIN0001234)" },
      uppercase: true
    },
    {
      type: "length",
      severity: "error",
      eq: 11,
      eqMessage: { en: "IFSC Code must be exactly 11 characters" }
    }
  ],
  min: 11,
  max: 11,
  allowedChars: /^[A-Z0-9]$/,
  messageOnInvalid: { en: "Only uppercase letters and digits are allowed" }
};

// GST → Goods and Services Tax ID
export const GSTField = {
  name: "gst",
  label: "GST Number",
  type: "text",
  validation: [
    { type: "required", severity: "error", message: { en: "GST Number is required" } },
    {
      type: "regex",
      severity: "error",
      pattern: "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$",
      message: { en: "Invalid GST format" },
      uppercase: true
    },
    {
      type: "length",
      severity: "error",
      eq: 15,
      eqMessage: { en: "GST Number must be exactly 15 characters" }
    }
  ],
  min: 15,
  max: 15,
  allowedChars: /^[A-Z0-9]$/,
  messageOnInvalid: { en: "Only uppercase letters and digits are allowed" }
};

// Account Number → 9–18 digits
export const AccountNumberField = {
  name: "accountNumber",
  label: "Bank Account Number",
  type: "text",
  validation: [
    { type: "required", severity: "error", message: { en: "Account Number is required" } },
    {
      type: "regex",
      severity: "error",
      pattern: "^[0-9]{9,18}$",
      message: { en: "Account Number must be 9–18 digits" }
    },
    {
      type: "length",
      severity: "warning",
      min: 9,
      max: 18,
      minMessage: { en: "Account Number must be at least 9 digits" },
      maxMessage: { en: "Account Number must be at most 18 digits" }
    }
  ],
  min: 9,
  max: 18,
  allowedChars: /^[0-9]$/,
  messageOnInvalid: { en: "Only digits are allowed in Account Number" }
};

// MICR → 9-digit numeric code
export const MICRField = {
  name: "micr",
  label: "MICR Code",
  type: "text",
  validation: [
    { type: "required", severity: "error", message: { en: "MICR Code is required" } },
    {
      type: "regex",
      severity: "error",
      pattern: "^[0-9]{9}$",
      message: { en: "MICR Code must be exactly 9 digits" }
    },
    {
      type: "length",
      severity: "error",
      eq: 9,
      eqMessage: { en: "MICR Code must be exactly 9 digits" }
    }
  ],
  min: 9,
  max: 9,
  allowedChars: /^[0-9]$/,
  messageOnInvalid: { en: "Only digits are allowed in MICR Code" }
};

// SWIFT → 8 or 11 alphanumeric characters
export const SWIFTField = {
  name: "swift",
  label: "SWIFT Code",
  type: "text",
  validation: [
    { type: "required", severity: "error", message: { en: "SWIFT Code is required" } },
    {
      type: "regex",
      severity: "error",
      pattern: "^[A-Z0-9]{8}([A-Z0-9]{3})?$",
      message: { en: "SWIFT Code must be 8 or 11 alphanumeric characters" },
      uppercase: true
    },
    {
      type: "length",
      severity: "warning",
      min: 8,
      max: 11,
      minMessage: { en: "SWIFT Code must be at least 8 characters" },
      maxMessage: { en: "SWIFT Code must be at most 11 characters" }
    }
  ],
  min: 8,
  max: 11,
  allowedChars: /^[A-Z0-9]$/,
  messageOnInvalid: { en: "Only uppercase letters and digits are allowed" }
};

// Credit Card Number → 16-digit numeric
export const CreditCardField = {
  name: "creditCard",
  label: "Credit Card Number",
  type: "text",
  validation: [
    { type: "required", severity: "error", message: { en: "Credit Card Number is required" } },
    {
      type: "regex",
      severity: "error",
      pattern: "^[0-9]{16}$",
      message: { en: "Credit Card Number must be exactly 16 digits" }
    },
    {
      type: "length",
      severity: "error",
      eq: 16,
      eqMessage: { en: "Credit Card Number must be exactly 16 digits" }
    }
  ],
  min: 16,
  max: 16,
  allowedChars: /^[0-9]$/,
  messageOnInvalid: { en: "Only digits are allowed in Credit Card Number" }
};

// CVV → 3-digit numeric
export const CVVField = {
  name: "cvv",
  label: "CVV",
  type: "password",
  validation: [
    { type: "required", severity: "error", message: { en: "CVV is required" } },
    {
      type: "regex",
      severity: "error",
      pattern: "^[0-9]{3}$",
      message: { en: "CVV must be exactly 3 digits" }
    },
    {
      type: "length",
      severity: "error",
      eq: 3,
      eqMessage: { en: "CVV must be exactly 3 digits" }
    }
  ],
  min: 3,
  max: 3,
  allowedChars: /^[0-9]$/,
  messageOnInvalid: { en: "Only digits are allowed in CVV" }
};

// Expiry Date → must be a valid future date (MM/YY)
export const ExpiryDateField = {
  name: "expiryDate",
  label: "Expiry Date",
  type: "text",
  validation: [
    { type: "required", severity: "error", message: { en: "Expiry Date is required" } },
    {
      type: "regex",
      severity: "error",
      pattern: "^(0[1-9]|1[0-2])\\/([0-9]{2})$",
      message: { en: "Expiry Date must be in MM/YY format" }
    }
  ],
  messageOnInvalid: { en: "Only valid MM/YY format is allowed" }
};