// ===============================
// Common Daily-use Fields with Enhanced Validations
// ===============================

// 1. NameField → only alphabets, required
export const NameField = {
  name: "name",
  label: "Full Name",
  type: "text",
  validation: [
    { type: "required", severity: "error", message: { en: "Name is required" } },
    {
      type: "regex",
      severity: "error",
      pattern: "^[A-Za-z\\s]+$",
      message: { en: "Name can only contain alphabets and spaces" }
    },
    {
      type: "length",
      severity: "warning",
      min: 2,
      max: 50,
      minMessage: { en: "Name must be at least 2 characters" },
      maxMessage: { en: "Name must be at most 50 characters" }
    }
  ],
  max: 50,
  allowedChars: /^[A-Za-z\s]$/,
  messageOnInvalid: { en: "Only alphabets and spaces are allowed" }
};

// 2. PincodeField → only numbers, required
export const PincodeField = {
  name: "pincode",
  label: "PIN Code",
  type: "text",
  validation: [
    { type: "required", severity: "error", message: { en: "PIN Code is required" } },
    {
      type: "regex",
      severity: "error",
      pattern: "^\\d{6}$",
      message: { en: "PIN Code must be exactly 6 digits (numbers only)" }
    },
    {
      type: "length",
      severity: "error",
      eq: 6,
      eqMessage: { en: "PIN Code must be exactly 6 digits" }
    }
  ],
  max: 6,
  allowedChars: /^[0-9]$/,
  messageOnInvalid: { en: "Only digits are allowed in PIN Code" }
};

// 3. EmailField → alphanumeric + special chars, required
export const EmailField = {
  name: "email",
  label: "Email Address",
  type: "email",
  validation: [
    { type: "required", severity: "error", message: { en: "Email is required" } },
    {
      type: "regex",
      severity: "error",
      pattern: "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$",
      message: { en: "Invalid email address format" }
    }
  ],
  allowedChars: /^[A-Za-z0-9._%+-@]$/,
  messageOnInvalid: { en: "Only letters, numbers, and email special characters are allowed" }
};

// 4. AddressField → alphanumeric, required
export const AddressField = {
  name: "address",
  label: "Address",
  type: "text",
  validation: [
    { type: "required", severity: "error", message: { en: "Address is required" } },
    {
      type: "regex",
      severity: "error",
      pattern: "^[A-Za-z0-9\\s,.-]{5,100}$",
      message: { en: "Address must be 5–100 characters, alphanumeric only" }
    },
    {
      type: "length",
      severity: "warning",
      min: 5,
      max: 100,
      minMessage: { en: "Address must be at least 5 characters" },
      maxMessage: { en: "Address must be at most 100 characters" }
    }
  ],
  max: 100,
  allowedChars: /^[A-Za-z0-9\s,.-]$/,
  messageOnInvalid: { en: "Only letters, numbers, spaces, commas, dots, and hyphens are allowed" }
};

// 5. PhoneField → only digits, required
export const PhoneField = {
  name: "phone",
  label: "Phone Number",
  type: "tel",
  validation: [
    { type: "required", severity: "error", message: { en: "Phone number is required" } },
    {
      type: "regex",
      severity: "error",
      pattern: "^\\d{10}$",
      message: { en: "Phone number must be exactly 10 digits" }
    },
    {
      type: "length",
      severity: "error",
      eq: 10,
      eqMessage: { en: "Phone number must be exactly 10 digits" }
    }
  ],
  max: 10,
  allowedChars: /^[0-9]$/,
  messageOnInvalid: { en: "Only digits are allowed in Phone Number" }
};

// 6. GenderField → required select
export const GenderField = {
  name: "gender",
  label: "Gender",
  type: "select",
  options: ["Male", "Female", "Other"],
  validation: [
    { type: "required", severity: "error", message: { en: "Gender is required" } },
    { type: "select", severity: "error", options: ["Male", "Female", "Other"], message: { en: "Invalid Gender selection" } }
  ]
};

// 7. PasswordField → strong password, required
export const PasswordField = {
  name: "password",
  label: "Password",
  type: "password",
  validation: [
    { type: "required", severity: "error", message: { en: "Password is required" } },
    {
      type: "regex",
      severity: "error",
      pattern: "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
      message: { en: "Password must be at least 8 characters, include uppercase, lowercase, number, and special character" }
    },
    {
      type: "length",
      severity: "warning",
      min: 8,
      minMessage: { en: "Password must be at least 8 characters" }
    }
  ],
  min: 8,
  allowedChars: /^[A-Za-z0-9@$!%*?&]$/,
  messageOnInvalid: { en: "Only letters, numbers, and @$!%*?& characters are allowed" }
};

// 8. ConfirmPasswordField → must match Password, required
export const ConfirmPasswordField = {
  name: "confirmPassword",
  label: "Confirm Password",
  type: "password",
  validation: [
    { type: "required", severity: "error", message: { en: "Confirm Password is required" } },
    { type: "crossField", severity: "error", field: "password", message: { en: "Passwords must match" } }
  ],
  allowedChars: /^[A-Za-z0-9@$!%*?&]$/,
  messageOnInvalid: { en: "Only letters, numbers, and @$!%*?& characters are allowed" }
};

// 9. DobField → must be valid date, cannot be today's or future date
export const DobField = {
  name: "dob",
  label: "Date of Birth",
  type: "date",
  validation: [
    { type: "required", severity: "error", message: { en: "Date of Birth is required" } },
    { type: "date", severity: "error", mustBePast: true, message: { en: "Date of Birth must be before today" } }
  ],
  max: new Date(Date.now() - 86400000).toISOString().split("T")[0]
};

// 10. UsernameField → alphanumeric + underscore, required
export const UsernameField = {
  name: "username",
  label: "Username",
  type: "text",
  validation: [
    { type: "required", severity: "error", message: { en: "Username is required" } },
    {
      type: "regex",
      severity: "error",
      pattern: "^[A-Za-z0-9_]{5,20}$",
      message: { en: "Username must be 5–20 characters, letters/numbers/underscores only" }
    },
    {
      type: "length",
      severity: "warning",
      min: 5,
      max: 20,
      minMessage: { en: "Username must be at least 5 characters" },
      maxMessage: { en: "Username must be at most 20 characters" }
    }
  ],
  min: 5,
  max: 20,
  allowedChars: /^[A-Za-z0-9_]$/,
  messageOnInvalid: { en: "Only letters, numbers, and underscores are allowed" }
};

// 11. OTPField → 6-digit numeric code
export const OTPField = {
  name: "otp",
  label: "OTP",
  type: "text",
  validation: [
    { type: "required", severity: "error", message: { en: "OTP is required" } },
    {
      type: "regex",
      severity: "error",
      pattern: "^\\d{6}$",
      message: { en: "OTP must be exactly 6 digits" }
    },
    {
      type: "length",
      severity: "error",
      eq: 6,
      eqMessage: { en: "OTP must be exactly 6 digits" }
    }
  ],
  max: 6,
  allowedChars: /^[0-9]$/,
  messageOnInvalid: { en: "Only digits are allowed in OTP" }
};

// 12. AlternateEmailField → optional email
export const AlternateEmailField = {
  name: "alternateEmail",
  label: "Alternate Email",
  type: "email",
  validation: [
    {
      type: "regex",
      severity: "warning",
      pattern: "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$",
      message: { en: "Invalid email address format" }
    }
  ],
  allowedChars: /^[A-Za-z0-9._%+-@]$/,
  messageOnInvalid: { en: "Only letters, numbers, and email special characters are allowed" }
};

// 13. AlternatePhoneField → optional phone
export const AlternatePhoneField = {
  name: "alternatePhone",
  label: "Alternate Phone Number",
  type: "tel",
  validation: [
    {
      type: "regex",
      severity: "warning",
      pattern: "^\\d{10}$",
      message: { en: "Phone number must be exactly 10 digits" }
    }
  ],
  max: 10,
  allowedChars: /^[0-9]$/,
  messageOnInvalid: { en: "Only digits are allowed in Phone Number" }
};

// 14. AgeField → must be between 18 and 65
export const AgeField = {
  name: "age",
  label: "Age",
  type: "number",
  validation: [
    { type: "required", severity: "error", message: { en: "Age is required" } },
    {
      type: "numberRange",
      severity: "warning",
      min: 18,
      max: 65,
      message: { en: "Age must be between 18 and 65" }
    }
  ]
};