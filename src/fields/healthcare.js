// ===============================
// Healthcare Fields with Strict Validations
// ===============================

// Patient ID → 8-character alphanumeric (uppercase letters + digits)
export const PatientIDField = {
  name: "patientId",
  label: "Patient ID",
  type: "text",
  validation: [
    { type: "required", message: "Patient ID is required" },
    {
      type: "regex",
      pattern: "^[A-Z0-9]{8}$",
      message: "Invalid Patient ID (must be 8 uppercase letters/digits)"
    }
  ],
  min: 8,
  max: 8,
  allowedChars: /^[A-Z0-9]$/,
  messageOnInvalid: "Only uppercase letters and digits are allowed"
};

// Insurance Policy Number → 2 uppercase letters + 6 digits
export const InsuranceField = {
  name: "insurance",
  label: "Insurance Policy Number",
  type: "text",
  validation: [
    { type: "required", message: "Insurance Policy Number is required" },
    {
      type: "regex",
      pattern: "^[A-Z]{2}[0-9]{6}$",
      message: "Invalid Insurance Policy Number (e.g., AB123456)"
    }
  ],
  min: 8,
  max: 8,
  allowedChars: /^[A-Z0-9]$/,
  messageOnInvalid: "Only uppercase letters and digits are allowed"
};

// Health ID → 10–16 alphanumeric characters
export const HealthIDField = {
  name: "healthId",
  label: "Health ID",
  type: "text",
  validation: [
    { type: "required", message: "Health ID is required" },
    {
      type: "regex",
      pattern: "^[A-Z0-9]{10,16}$",
      message: "Invalid Health ID (must be 10–16 uppercase letters/digits)"
    }
  ],
  min: 10,
  max: 16,
  allowedChars: /^[A-Z0-9]$/,
  messageOnInvalid: "Only uppercase letters and digits are allowed"
};

// Blood Group → must be one of the valid groups
export const BloodGroupField = {
  name: "bloodGroup",
  label: "Blood Group",
  type: "select",
  options: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
  validation: [{ type: "required", message: "Blood Group is required" }]
};

// Medical Record Number → 6–12 digits
export const MedicalRecordField = {
  name: "medicalRecord",
  label: "Medical Record Number",
  type: "text",
  validation: [
    { type: "required", message: "Medical Record Number is required" },
    {
      type: "regex",
      pattern: "^[0-9]{6,12}$",
      message: "Invalid Medical Record Number (must be 6–12 digits)"
    }
  ],
  min: 6,
  max: 12,
  allowedChars: /^[0-9]$/,
  messageOnInvalid: "Only digits are allowed"
};