import React from "react";
import ReactDOM from "react-dom/client";
import {
  FormRenderer,
  NameField,
  EmailField,
  PincodeField,
  PasswordField,
  ConfirmPasswordField,
  DobField
} from "../src/index";   // adjust path if needed

function App() {
  const formConfig = {
    fields: [NameField, EmailField,PincodeField, PasswordField, ConfirmPasswordField,DobField]
  };

  console.log("App.jsx loaded");
  console.log("Form config:", formConfig);

  return (
    <div style={{ padding: 20 }}>
      <h2>Form Validator Demo</h2>
      <FormRenderer
        config={formConfig}
        onSubmit={(values) => {
          console.log("Form submitted values:", values);
          alert("Form submitted:\n" + JSON.stringify(values, null, 2));
        }}
      />
    </div>
  );
}

// 👇 Mount directly here
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);