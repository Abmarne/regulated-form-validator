### 📦 Regulated Form Validator (React)
YAML-driven, dynamic form validation and rendering for React.  
Define fields and rules in YAML/JSON, render forms automatically, and enforce compliance-ready validations for BFSI, healthcare, and other regulated domains.

### ✨ Features
• 	**Declarative config:** Define fields and rules in YAML/JSON.  
• 	**Dynamic rendering:** Auto-generate React forms from config.  
• 	**Rich validations:** `required`,`regex`,`length`,`enum`,`number`,`date`,`crossField`,`conditional(when)`,`custom`.  
• 	**BFSI rules built-in:** PAN, IFSC, Aadhaar.  
• 	**Auditor-friendly:** Human-readable config files for compliance reviews.   

### 📥 Installation
```bash
npm install regulated-form-validator
```

### 📖 Usage
1. **Define a YAML Config**
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

## 📋 Preset Fields

The library ships with **ready-to-use preset fields** for common daily-use scenarios as well as BFSI and healthcare domains. Each preset includes strict validations, per-character filtering (`allowedChars`), and immediate error feedback (`messageOnInvalid`).

### Daily-Use Fields
- **NameField**
  - Type: `text`
  - Validations: required, alphabets only, 2–50 characters
  - allowedChars: `/^[A-Za-z\s]$/`
  - messageOnInvalid: "Only alphabets and spaces are allowed"

- **EmailField**
  - Type: `email`
  - Validations: required, proper email format
  - allowedChars: `/^[A-Za-z0-9._%+-@]$/`
  - messageOnInvalid: "Only letters, numbers, and email special characters are allowed"

- **PincodeField**
  - Type: `text`
  - Validations: required, exactly 6 digits
  - allowedChars: `/^[0-9]$/`
  - messageOnInvalid: "Only digits are allowed in PIN Code"

- **PhoneField**
  - Type: `tel`
  - Validations: required, exactly 10 digits
  - allowedChars: `/^[0-9]$/`
  - messageOnInvalid: "Only digits are allowed in Phone Number"

- **AddressField**
  - Type: `text`
  - Validations: required, alphanumeric + space/comma/dot/hyphen, 5–100 characters
  - allowedChars: `/^[A-Za-z0-9\s,.-]$/`
  - messageOnInvalid: "Only letters, numbers, spaces, commas, dots, and hyphens are allowed"

- **GenderField**
  - Type: `select`
  - Validations: required
  - Options: `Male`, `Female`, `Other`

- **PasswordField**
  - Type: `password`
  - Validations: required, min 8 chars, must include uppercase, lowercase, number, special character
  - allowedChars: `/^[A-Za-z0-9@$!%*?&]$/`
  - messageOnInvalid: "Only letters, numbers, and @$!%*?& characters are allowed"

- **ConfirmPasswordField**
  - Type: `password`
  - Validations: required, must match `PasswordField`
  - allowedChars: `/^[A-Za-z0-9@$!%*?&]$/`
  - messageOnInvalid: "Only letters, numbers, and @$!%*?& characters are allowed"

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

### 🧪 Local Testing / Development
Since the package is not yet published, you can test it locally using the included demo app:
```bash
# Navigate to the project root
cd regulated-form-validator

# Modify demo files
example/App.jsx
example/config.yaml

# Start the Vite dev server
npm run dev
```

Open http://localhost:5173 in your browser to interact with the form.

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

### 📜 License
MIT © 2026 Abhiraj Madan Marne

### 💡 Roadmap
• 	✅ Local demo app for testing  
• 	🚧 Publish to npm registry  
• 	🚧 Add more domain-specific validation rules  
• 	🚧 Expand documentation with examples

### 🤝 Contributing
Contributions, issues, and feature requests are welcome!
Feel free to open a PR or start a discussion in the issues section.

### 🌟 Why This Matters
This project aims to make regulated form validation simple, declarative, and auditor-friendly. By using YAML/JSON configs, developers can build compliance-ready forms without reinventing validation logic for BFSI, healthcare, and other sensitive domains.