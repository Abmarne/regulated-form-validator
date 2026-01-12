import React from "react";
import {
  FormRenderer,
  validateAll,
  NameField,
  EmailField,
  PincodeField,
  PasswordField,
  ConfirmPasswordField,
  AgeField,
  GenderField,
  DobField,
  UsernameField,
  OTPField,
  PANField,
} from "regulated-form-validator";

// ✅ Example: override preset configs with custom rules
const CustomUsernameField = {
  ...UsernameField,
  validation: [
    ...UsernameField.validation,
    {
      type: "async", // built-in async rule
      severity: "error",
      url: "https://api.example.com/check-username",
      message: { en: "This username is already taken" },
    },
  ],
};

const ReferralCodeField = {
  name: "referralCode",
  label: "Referral Code",
  type: "text",
  validation: [
    {
      type: "regex",
      severity: "warning",
      pattern: "^[A-Z0-9]{6}$",
      message: { en: "Referral code must be 6 alphanumeric characters" },
      when: { field: "age", min: 18 }, // only validate if age ≥ 18
    },
  ],
};

export default function PresetDemo() {
  const presetConfig = {
    fields: [
      NameField,              // required + regex + length
      EmailField,             // required + regex
      PincodeField,           // required + regex + length
      PANField,               // PAN validation preset
      PasswordField,          // strong password regex
      ConfirmPasswordField,   // crossField validation
      AgeField,               // numberRange
      GenderField,            // select options
      DobField,               // date validation
      CustomUsernameField,    // async rule override
      OTPField,               // OTP validation
      ReferralCodeField,      // conditional `when`
    ],
  };

  return (
    <FormRenderer
      config={presetConfig}
      locale="en" // switch to "fr" for French messages
      onSubmit={(values) => {
        const result = validateAll(presetConfig.fields, values, "en");
        console.log("Validation Result:", result);
      }}
    />
  );
}