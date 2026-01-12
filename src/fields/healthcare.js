// ===============================
// Healthcare Fields with Enhanced Validations
// ===============================

// Patient ID → 8-character alphanumeric (uppercase letters + digits)
export const PatientIDField = {
  name: "patientId",
  label: "Patient ID",
  type: "text",
  validation: [
    { type: "required", severity: "error", message: { en: "Patient ID is required" } },
    {
      type: "regex",
      severity: "error",
      pattern: "^[A-Z0-9]{8}$",
      message: { en: "Invalid Patient ID (must be 8 uppercase letters/digits)" },
      uppercase: true
    },
    {
      type: "length",
      severity: "error",
      eq: 8,
      eqMessage: { en: "Patient ID must be exactly 8 characters" }
    }
  ],
  min: 8,
  max: 8,
  allowedChars: /^[A-Z0-9]$/,
  messageOnInvalid: { en: "Only uppercase letters and digits are allowed" }
};

// Insurance Policy Number → 2 uppercase letters + 6 digits
export const InsuranceField = {
  name: "insurance",
  label: "Insurance Policy Number",
  type: "text",
  validation: [
    { type: "required", severity: "error", message: { en: "Insurance Policy Number is required" } },
    {
      type: "regex",
      severity: "error",
      pattern: "^[A-Z]{2}[0-9]{6}$",
      message: { en: "Invalid Insurance Policy Number (e.g., AB123456)" },
      uppercase: true
    },
    {
      type: "length",
      severity: "error",
      eq: 8,
      eqMessage: { en: "Insurance Policy Number must be exactly 8 characters" }
    }
  ],
  min: 8,
  max: 8,
  allowedChars: /^[A-Z0-9]$/,
  messageOnInvalid: { en: "Only uppercase letters and digits are allowed" }
};

// Health ID → 10–16 alphanumeric characters
export const HealthIDField = {
  name: "healthId",
  label: "Health ID",
  type: "text",
  validation: [
    { type: "required", severity: "error", message: { en: "Health ID is required" } },
    {
      type: "regex",
      severity: "error",
      pattern: "^[A-Z0-9]{10,16}$",
      message: { en: "Invalid Health ID (must be 10–16 uppercase letters/digits)" },
      uppercase: true
    },
    {
      type: "length",
      severity: "warning",
      min: 10,
      max: 16,
      minMessage: { en: "Health ID must be at least 10 characters" },
      maxMessage: { en: "Health ID must be at most 16 characters" }
    }
  ],
  min: 10,
  max: 16,
  allowedChars: /^[A-Z0-9]$/,
  messageOnInvalid: { en: "Only uppercase letters and digits are allowed" }
};

// Blood Group → must be one of the valid groups
export const BloodGroupField = {
  name: "bloodGroup",
  label: "Blood Group",
  type: "select",
  options: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
  validation: [
    { type: "required", severity: "error", message: { en: "Blood Group is required" } },
    {
      type: "select",
      severity: "error",
      options: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
      message: { en: "Invalid Blood Group" }
    }
  ]
};

// Medical Record Number → 6–12 digits
export const MedicalRecordField = {
  name: "medicalRecord",
  label: "Medical Record Number",
  type: "text",
  validation: [
    { type: "required", severity: "error", message: { en: "Medical Record Number is required" } },
    {
      type: "regex",
      severity: "error",
      pattern: "^[0-9]{6,12}$",
      message: { en: "Invalid Medical Record Number (must be 6–12 digits)" }
    },
    {
      type: "length",
      severity: "warning",
      min: 6,
      max: 12,
      minMessage: { en: "Medical Record Number must be at least 6 digits" },
      maxMessage: { en: "Medical Record Number must be at most 12 digits" }
    }
  ],
  min: 6,
  max: 12,
  allowedChars: /^[0-9]$/,
  messageOnInvalid: { en: "Only digits are allowed" }
};

// ===============================
// Additional Common Healthcare Fields
// ===============================

// Doctor ID → 6-character alphanumeric (uppercase letters + digits)
export const DoctorIDField = {
  name: "doctorId",
  label: "Doctor ID",
  type: "text",
  validation: [
    { type: "required", severity: "error", message: { en: "Doctor ID is required" } },
    {
      type: "regex",
      severity: "error",
      pattern: "^[A-Z0-9]{6}$",
      message: { en: "Doctor ID must be 6 uppercase letters/digits" }
    },
    {
      type: "length",
      severity: "error",
      eq: 6,
      eqMessage: { en: "Doctor ID must be exactly 6 characters" }
    }
  ],
  min: 6,
  max: 6,
  allowedChars: /^[A-Z0-9]$/,
  messageOnInvalid: { en: "Only uppercase letters and digits are allowed" }
};

// Hospital Code → 3 uppercase letters + 3 digits
export const HospitalCodeField = {
  name: "hospitalCode",
  label: "Hospital Code",
  type: "text",
  validation: [
    { type: "required", severity: "error", message: { en: "Hospital Code is required" } },
    {
      type: "regex",
      severity: "error",
      pattern: "^[A-Z]{3}[0-9]{3}$",
      message: { en: "Invalid Hospital Code (e.g., HSP123)" }
    },
    {
      type: "length",
      severity: "error",
      eq: 6,
      eqMessage: { en: "Hospital Code must be exactly 6 characters" }
    }
  ],
  min: 6,
  max: 6,
  allowedChars: /^[A-Z0-9]$/,
  messageOnInvalid: { en: "Only uppercase letters and digits are allowed" }
};

// Prescription ID → 10-digit numeric
export const PrescriptionIDField = {
  name: "prescriptionId",
  label: "Prescription ID",
  type: "text",
  validation: [
    { type: "required", severity: "error", message: { en: "Prescription ID is required" } },
    {
      type: "regex",
      severity: "error",
      pattern: "^[0-9]{10}$",
      message: { en: "Prescription ID must be exactly 10 digits" }
    },
    {
      type: "length",
      severity: "error",
      eq: 10,
      eqMessage: { en: "Prescription ID must be exactly 10 digits" }
    }
  ],
  min: 10,
  max: 10,
  allowedChars: /^[0-9]$/,
  messageOnInvalid: { en: "Only digits are allowed" }
};

// National Health Number (NHN) → 12-digit numeric
export const NationalHealthNumberField = {
  name: "nhn",
  label: "National Health Number",
  type: "text",
  validation: [
    { type: "required", severity: "error", message: { en: "National Health Number is required" } },
    {
      type: "regex",
      severity: "error",
      pattern: "^[0-9]{12}$",
      message: { en: "NHN must be exactly 12 digits" }
    },
    {
      type: "length",
      severity: "error",
      eq: 12,
      eqMessage: { en: "NHN must be exactly 12 digits" }
    }
  ],
  min: 12,
  max: 12,
  allowedChars: /^[0-9]$/,
  messageOnInvalid: { en: "Only digits are allowed" }
};