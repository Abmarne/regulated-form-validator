// Daily-use fields with strict validations — all required
// Each field now includes `allowedChars` for per-character filtering
// and `messageOnInvalid` for immediate error feedback

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
      message: "Name must be between 2 and 50 characters"
    }
  ],
  max: 50,
  allowedChars: /^[A-Za-z\s]$/,   // 👈 only alphabets + spaces
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
    }
  ],
  max: 6,
  allowedChars: /^[0-9]$/,   // 👈 only digits
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
  allowedChars: /^[A-Za-z0-9._%+-@]$/,   // 👈 alphanumeric + email specials
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
    }
  ],
  max: 100,
  allowedChars: /^[A-Za-z0-9\s,.-]$/,   // 👈 alphanumeric + space/comma/dot/hyphen
  messageOnInvalid: "Only letters, numbers, spaces, commas, dots, and hyphens are allowed"
};

// Phone number → only digits, required
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
    }
  ],
  max: 10,
  allowedChars: /^[0-9]$/,   // 👈 only digits
  messageOnInvalid: "Only digits are allowed in Phone Number"
};

// Gender → required select
export const GenderField = {
  name: "gender",
  label: "Gender",
  type: "select",
  options: ["Male", "Female", "Other"],
  validation: [
    { type: "required", message: "Gender is required" }
  ]
};

// Password → strong password, required
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
    }
  ],
  min: 8,
  allowedChars: /^[A-Za-z0-9@$!%*?&]$/,   // 👈 letters, digits, special chars
  messageOnInvalid: "Only letters, numbers, and @$!%*?& characters are allowed"
};

// Confirm Password → must match Password, required
export const ConfirmPasswordField = {
  name: "confirmPassword",
  label: "Confirm Password",
  type: "password",
  validation: [
    { type: "required", message: "Confirm Password is required" },
    { type: "crossField", field: "password", message: "Passwords must match" }
  ],
  allowedChars: /^[A-Za-z0-9@$!%*?&]$/,   // 👈 same as Password
  messageOnInvalid: "Only letters, numbers, and @$!%*?& characters are allowed"
};