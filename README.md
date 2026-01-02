### 📦 Regulated Form Validator (React)
YAML-driven, dynamic form validation and rendering for React.  
Define fields and rules in YAML/JSON, render forms automatically, and enforce compliance-ready validations for BFSI, healthcare, and other regulated domains.

### ✨ Features
• 	Declarative config: Define fields and rules in YAML/JSON.  
• 	Dynamic rendering: Auto-generate React forms from config.  
• 	Rich validations: required,regex,length,enum,number,date,crossField,conditional(when),custom.  
• 	BFSI rules built-in: PAN, IFSC, Aadhaar.  
• 	Auditor-friendly: Human-readable config files for compliance reviews.   

### 📥 Installation
```bash
npm install regulated-form-validator
```

### 📖 Usage
1. Define a YAML Config
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

2. Load and Render in React
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

3. Add Custom Rules
```Js
import { addCustom } from "regulated-form-validator";

addCustom("onlyLetters", (value) => /^[A-Za-z]+$/.test(String(value ?? "")));
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