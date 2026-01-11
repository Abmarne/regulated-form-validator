// ===============================
// Common Daily-use Fields with Strict Validations
// ===============================

// 1. NameField → only alphabets, required
export const NameField = {
  name: "name",
  label: "Full Name",
  type: "text",
  validation: [
    { type: "required", message: "Name is required" },
    {
      type: "regex",
      pattern: "^[A-Za-z\\s]+$",
      message: "Name can only contain alphabets and spaces"
    },
    {
      type: "length",
      min: 2,
      max: 50,
      minMessage: "Name must be at least 2 characters",
      maxMessage: "Name must be at most 50 characters"
    }
  ],
  max: 50,
  allowedChars: /^[A-Za-z\s]$/,
  messageOnInvalid: "Only alphabets and spaces are allowed"
};

// 2. PincodeField → only numbers, required
export const PincodeField = {
  name: "pincode",
  label: "PIN Code",
  type: "text",
  validation: [
    { type: "required", message: "PIN Code is required" },
    {
      type: "regex",
      pattern: "^\\d{6}$",
      message: "PIN Code must be exactly 6 digits (numbers only)"
    },
    {
      type: "length",
      eq: 6,
      eqMessage: "PIN Code must be exactly 6 digits"
    }
  ],
  max: 6,
  allowedChars: /^[0-9]$/,
  messageOnInvalid: "Only digits are allowed in PIN Code"
};

// 3. EmailField → alphanumeric + special chars, required
export const EmailField = {
  name: "email",
  label: "Email Address",
  type: "email",
  validation: [
    { type: "required", message: "Email is required" },
    {
      type: "regex",
      pattern: "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$",
      message: "Invalid email address format"
    }
  ],
  allowedChars: /^[A-Za-z0-9._%+-@]$/,
  messageOnInvalid: "Only letters, numbers, and email special characters are allowed"
};

// 4. AddressField → alphanumeric, required
export const AddressField = {
  name: "address",
  label: "Address",
  type: "text",
  validation: [
    { type: "required", message: "Address is required" },
    {
      type: "regex",
      pattern: "^[A-Za-z0-9\\s,.-]{5,100}$",
      message: "Address must be 5–100 characters, alphanumeric only"
    },
    {
      type: "length",
      min: 5,
      max: 100,
      minMessage: "Address must be at least 5 characters",
      maxMessage: "Address must be at most 100 characters"
    }
  ],
  max: 100,
  allowedChars: /^[A-Za-z0-9\s,.-]$/,
  messageOnInvalid: "Only letters, numbers, spaces, commas, dots, and hyphens are allowed"
};

// 5. PhoneField → only digits, required
export const PhoneField = {
  name: "phone",
  label: "Phone Number",
  type: "tel",
  validation: [
    { type: "required", message: "Phone number is required" },
    {
      type: "regex",
      pattern: "^\\d{10}$",
      message: "Phone number must be exactly 10 digits"
    },
    {
      type: "length",
      eq: 10,
      eqMessage: "Phone number must be exactly 10 digits"
    }
  ],
  max: 10,
  allowedChars: /^[0-9]$/,
  messageOnInvalid: "Only digits are allowed in Phone Number"
};

// 6. GenderField → required select
export const GenderField = {
  name: "gender",
  label: "Gender",
  type: "select",
  options: ["Male", "Female", "Other"],
  validation: [
    { type: "required", message: "Gender is required" },
    { type: "select", options: ["Male", "Female", "Other"], message: "Invalid Gender selection" }
  ]
};

// 7. PasswordField → strong password, required
export const PasswordField = {
  name: "password",
  label: "Password",
  type: "password",
  validation: [
    { type: "required", message: "Password is required" },
    {
      type: "regex",
      pattern:
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
      message:
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
    },
    {
      type: "length",
      min: 8,
      minMessage: "Password must be at least 8 characters"
    }
  ],
  min: 8,
  allowedChars: /^[A-Za-z0-9@$!%*?&]$/,
  messageOnInvalid: "Only letters, numbers, and @$!%*?& characters are allowed"
};

// 8. ConfirmPasswordField → must match Password, required
export const ConfirmPasswordField = {
  name: "confirmPassword",
  label: "Confirm Password",
  type: "password",
  validation: [
    { type: "required", message: "Confirm Password is required" },
    { type: "crossField", field: "password", message: "Passwords must match" }
  ],
  allowedChars: /^[A-Za-z0-9@$!%*?&]$/,
  messageOnInvalid: "Only letters, numbers, and @$!%*?& characters are allowed"
};

// ===============================
// Extra Common Defaults
// ===============================

// 9. DobField → must be valid date, cannot be today's or future date
export const DobField = {
  name: "dob",
  label: "Date of Birth",
  type: "date",
  validation: [
    { type: "required", message: "Date of Birth is required" },
    { 
      type: "date", 
      mustBePast: true,   // 👈 explicitly enforce past-only dates
      message: "Date of Birth must be before today" 
    }
  ],
  // Prevent selecting today/future in date picker
  max: new Date(Date.now() - 86400000).toISOString().split("T")[0]
};

// 10. UsernameField → alphanumeric + underscore, required
export const UsernameField = {
  name: "username",
  label: "Username",
  type: "text",
  validation: [
    { type: "required", message: "Username is required" },
    {
      type: "regex",
      pattern: "^[A-Za-z0-9_]{5,20}$",
      message: "Username must be 5–20 characters, letters/numbers/underscores only"
    },
    {
      type: "length",
      min: 5,
      max: 20,
      minMessage: "Username must be at least 5 characters",
      maxMessage: "Username must be at most 20 characters"
    }
  ],
  min: 5,
  max: 20,
  allowedChars: /^[A-Za-z0-9_]$/,
  messageOnInvalid: "Only letters, numbers, and underscores are allowed"
};

// 11. OTPField → 6-digit numeric code
export const OTPField = {
  name: "otp",
  label: "OTP",
  type: "text",
  validation: [
    { type: "required", message: "OTP is required" },
    {
      type: "regex",
      pattern: "^\\d{6}$",
      message: "OTP must be exactly 6 digits"
    },
    {
      type: "length",
      eq: 6,
      eqMessage: "OTP must be exactly 6 digits"
    }
  ],
  max: 6,
  allowedChars: /^[0-9]$/,
  messageOnInvalid: "Only digits are allowed in OTP"
};

// 12. AlternateEmailField → optional email
export const AlternateEmailField = {
  name: "alternateEmail",
  label: "Alternate Email",
  type: "email",
  validation: [
    {
      type: "regex",
      pattern: "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$",
      message: "Invalid email address format"
    }
  ],
  allowedChars: /^[A-Za-z0-9._%+-@]$/,
  messageOnInvalid: "Only letters, numbers, and email special characters are allowed"
};

// 13. AlternatePhoneField → optional phone
export const AlternatePhoneField = {
  name: "alternatePhone",
  label: "Alternate Phone Number",
  type: "tel",
  validation: [
    {
      type: "regex",
      pattern: "^\\d{10}$",
      message: "Phone number must be exactly 10 digits"
    }
  ],
  max: 10,
  allowedChars: /^[0-9]$/,
  messageOnInvalid: "Only digits are allowed in Phone Number"
};

export const AgeField = {
  name: "age",
  label: "Age",
  type: "number",
  validation: [
    { type: "required", message: "Age is required" },
    { type: "numberRange", min: 18, max: 65, message: "Age must be between {min} and {max}" }
  ]
};