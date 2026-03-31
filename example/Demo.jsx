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

const CustomUsernameField = {
  ...UsernameField,
  validation: [
    ...UsernameField.validation,
    {
      type: "async",
      severity: "error",
      url: "https://api.example.com/check-username",
      message: { en: "This username is already taken" },
    },
  ],
};

export default function WizardDemo() {
  const wizardConfig = {
    title: "KYC Onboarding",
    submitLabel: "Finish & Open Account",
    steps: [
      {
        title: "Basic Information",
        description: "Let's start with your identity details.",
        fields: [
          { ...NameField, fullWidth: true },
          AgeField,
          GenderField,
          DobField,
        ],
      },
      {
        title: "Contact & Location",
        description: "Where can we reach you?",
        fields: [
          EmailField,
          PincodeField,
        ],
      },
      {
        title: "Legal & Security",
        description: "Nearly there! Secure your account.",
        fields: [
          PANField,
          { ...CustomUsernameField, fullWidth: true },
          PasswordField,
          ConfirmPasswordField,
        ],
      },
    ],
  };

  return (
    <div style={{ 
      padding: "40px 20px", 
      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)", 
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <FormRenderer
        config={wizardConfig}
        locale="en"
        theme="modern"
        onSubmit={(values) => {
          console.log("Final Wizard Data:", values);
          alert("KYC Completed Successfully!");
        }}
      />
    </div>
  );
}

