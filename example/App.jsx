import React from "react";
import ReactDOM from "react-dom/client";
import FormRenderer from "../src/formRenderer";
import config from "./config.yaml";

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Form Validator Demo</h1>
      <FormRenderer
        config={config}
        onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
      />
    </div>
  );
}