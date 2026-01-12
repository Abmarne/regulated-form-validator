### 📦 Regulated Form Validator (React)
**Regulated Form Validator** is a **React library for compliance‑ready form validation and rendering**, powered by **YAML/JSON declarative configs**.
It helps developers build dynamic, auditor‑friendly forms for **BFSI, healthcare, and other regulated domains** without reinventing validation logic.
- 🛡️ **Compliance‑focused:** Ships with BFSI & healthcare presets (PAN, Aadhaar, IFSC, Insurance IDs, etc.)
- ⚡ **Developer‑friendly:** Declarative configs, runtime custom rule registry, and reusable preset fields
- 👀 **Audit‑ready:** Human‑readable configs that make validation logic transparent for compliance reviews
- 🔄 **Runtime flexibility:** Add, remove, or list custom rules dynamically without redeploying
- 🧩 **Error‑safe architecture:** Regex, date, and conditional rules handle invalid inputs gracefully
This project bridges the gap between **developer productivity** and **regulatory compliance**, making it easy to build forms that are both **user‑friendly** and **audit‑ready**.


### ✨ Features
• 	**Declarative config:** Define fields and rules in YAML/JSON.  
• 	**Dynamic rendering:** Auto-generate React forms from config.  
• 	**Rich validations:** `required`,`regex`,`length`,`enum`,`number`,`date`,`crossField`,`conditional(when)`,`custom`.  
• 	**BFSI rules built-in:** PAN, IFSC, Aadhaar.  
• 	**Auditor-friendly:** Human-readable config files for compliance reviews.   
•   **Error‑safe:** Regex and date rules handle invalid inputs gracefully.
•   **Custom registry API:** Add, remove, and list custom rules at runtime.


### 📥 Installation
```bash
npm install regulated-form-validator
```

### 📋 Preset Fields
The library ships with ready‑to‑use preset fields for daily‑use, BFSI, and healthcare domains.
Each preset includes strict validations, per‑character filtering (allowedChars), and immediate error feedback (messageOnInvalid).

**⚡ Quick Example: Load Presets in React**
Here’s how developers can directly use preset fields without writing YAML:
```js
import {
  FormRenderer,
  validateAll,
  NameField,
  EmailField,
  PANField,
} from "regulated-form-validator";

export default function PresetDemo() {
  const presetConfig = {
    fields: [NameField, EmailField, PANField],
  };

  return (
    <FormRenderer
      config={presetConfig}
      onSubmit={(values) => {
        const result = validateAll(presetConfig.fields, values);
        console.log("Validation Result:", result);
      }}
    />
  );
}
```

### 🏠 Daily-Use Preset Fields

The library ships with strict daily-use presets for common scenarios:

- **NameField** – required, alphabets only, 2–50 characters  
- **PincodeField** – required, exactly 6 digits  
- **EmailField** – required, proper email format  
- **AddressField** – required, alphanumeric + space/comma/dot/hyphen, 5–100 characters  
- **PhoneField** – required, exactly 10 digits  
- **GenderField** – required select (`Male`, `Female`, `Other`)  
- **PasswordField** – required, strong password (≥8 chars, uppercase, lowercase, number, special char)  
- **ConfirmPasswordField** – required, must match `PasswordField`  
- **DobField** – required, valid date, must be before today  
- **UsernameField** – required, 5–20 chars, alphanumeric + underscore  
- **OTPField** – required, exactly 6 digits  
- **AlternateEmailField** – optional, valid email format  
- **AlternatePhoneField** – optional, valid 10-digit phone number  
- **AgeField** – required, number between 18 and 65  

Each preset includes:
- `allowedChars` for per-character filtering  
- `messageOnInvalid` for immediate feedback  
- Human-readable error messages for compliance reviews

### 🏦 BFSI Preset Fields

The library ships with strict BFSI presets for compliance‑heavy domains:

- **PANField** – required, 10 characters, format `ABCDE1234F`  
- **IFSCField** – required, 11 characters, format `SBIN0001234`  
- **AadhaarField** – required, exactly 12 digits  
- **GSTField** – required, exactly 15 characters, strict GSTIN format  
- **AccountNumberField** – required, 9–18 digits  
- **MICRField** – required, exactly 9 digits  

Each preset includes:
- Uppercase enforcement where applicable  
- `allowedChars` for per‑character filtering  
- `messageOnInvalid` for immediate feedback  
- Auditor‑friendly error messages

### 🏥 Healthcare Preset Fields

The library ships with strict healthcare presets for patient and medical record management:

- **PatientIDField** – required, exactly 8 characters, uppercase letters + digits  
- **InsuranceField** – required, 2 uppercase letters + 6 digits (e.g., AB123456)  
- **HealthIDField** – required, 10–16 characters, uppercase letters + digits  
- **BloodGroupField** – required select, options: `A+`, `A-`, `B+`, `B-`, `O+`, `O-`, `AB+`, `AB-`  
- **MedicalRecordField** – required, 6–12 digits  

Each preset includes:
- Uppercase enforcement where applicable  
- `allowedChars` for per‑character filtering  
- `messageOnInvalid` for immediate feedback  
- Auditor‑friendly error messages

### 📖 Yaml Usage
1. **Define a YAML Config for Customization**
```Yaml
fields:
  - name: fullName
    label: Full Name
    type: text
    validation:
      - type: required
        message: "Full name is required"
      - type: regex
        pattern: "^[A-Za-z ]+$"
        message: "Only letters and spaces"
      - type: length
        min: 3
        message: "At least 3 characters"

  - name: pan
    label: PAN
    type: text
    validation:
      - type: required
        message: "PAN is required"
      - type: pan
        message: "Invalid PAN"
```

2. **Load and Render in React**
```jsx
import React from "react";
import { parseConfig, FormRenderer, validateAll } from "regulated-form-validator";
import yaml from "js-yaml";
import fs from "fs";

const config = parseConfig("form-config.yaml");

export default function App() {
  return (
    <FormRenderer
      config={config}
      onSubmit={(values) => {
        const result = validateAll(config.fields, values);
        console.log(result);
      }}
    />
  );
}
```

### 🔧 Customization
You can customize fields in several ways:
1. **Override presets**
```js
import { NameField } from "regulated-form-validator";

const CustomNameField = {
  ...NameField,
  label: "Applicant Name",
  validation: [
    ...NameField.validation,
    { type: "regex", pattern: "^[A-Za-z]+$", message: "No spaces allowed" }
  ]
};
```

2. **Add `allowedChars` and `messageOnInvalid`**
```js
const NumericCodeField = {
  name: "code",
  label: "Numeric Code",
  type: "text",
  validation: [{ type: "required", message: "Code is required" }],
  allowedChars: /^[0-9]$/,
  messageOnInvalid: "Only digits are allowed"
};
```

3. **Custom rules via addCustom**
```js
addCustom("startsWithA", (value) => String(value ?? "").startsWith("A"));
```

### 🧪 Testing
Run unit tests locally to validate your form logic:
```bash
# Run all tests
npm test

# Run tests in watch mode (helpful during development)
npm run test:watch
```

Tests are located in the  directory and cover:  
• 	Field rendering from YAML/JSON configs   
• 	Built-in BFSI validations (PAN, IFSC, Aadhaar)  
• 	Conditional and cross-field rules  
• 	Custom validation hooks
•   Error handling for invalid regex/date inputs
•   Runtime registry API (addCustom, removeCustom, listCustom)


### 📜 License
MIT © 2026 Abhiraj Madan Marne

### 💡 Roadmap
• 	✅ Local demo app for testing  
• 	✅ Publish to npm registry  
• 	✅ Add more domain-specific validation rules  
• 	✅ Expand documentation with examples
•   🚧 Add Responsive CSS

### 🤝 Contributing
Contributions, issues, and feature requests are welcome!
Feel free to open a PR or start a discussion in the issues section.

### 🌟 Why This Matters
This project aims to make regulated form validation simple, declarative, and auditor-friendly. By using YAML/JSON configs, developers can build compliance-ready forms without reinventing validation logic for BFSI, healthcare, and other sensitive domains.