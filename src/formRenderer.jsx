import React, { useState } from "react";
import { validateAll, validateField } from "./validator.js";
import "./FormRenderer.css";

export default function FormRenderer({ config, onSubmit }) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  if (!config?.fields?.length) {
    return <div>No fields configured</div>;
  }

const handleChange = async (e, field) => {
  const rawVal = e.target.value;
  let val = rawVal;
  let invalidCharUsed = false;

  // Strict filtering using allowedChars
  if (field.allowedChars) {
    const filtered = rawVal
      .split("")
      .filter((ch) => field.allowedChars.test(ch))
      .join("");

    if (filtered !== rawVal) {
      invalidCharUsed = true;
      val = filtered;
    } else {
      val = rawVal;
    }
  }

  const newValues = { ...values, [field.name]: val };
  setValues(newValues);

  // Run normal validation (await!)
  const res = await validateField(field, val, newValues);

  // Decide which error to show
  setErrors({
    ...errors,
    [field.name]: invalidCharUsed
      ? field.messageOnInvalid || "Invalid character entered"
      : res.valid
      ? null
      : res.message,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const result = await validateAll(config.fields, values); // await!
  setErrors(result.errors);
  if (result.valid) {
    onSubmit(values);
  }
};

  return (
    <form onSubmit={handleSubmit}>
      {config.fields.map((field) => (
        <div key={field.name} style={{ marginBottom: "1rem" }}>
          <label>{field.label}</label>
          <input
            name={field.name}
            type={field.type || "text"}
            value={values[field.name] || ""}
            onChange={(e) => handleChange(e, field)}
            maxLength={field.max || undefined}   // 👈 enforce max length at input level
          />
          {errors[field.name] && (
            <div style={{ color: "red" }}>{errors[field.name]}</div>
          )}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}