import React, { useState } from "react";
import { validateAll, validateField } from "./validator.js";

export default function FormRenderer({ config, onSubmit }) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  if (!config?.fields?.length) {
    return <div>No fields configured</div>;
  }

const handleChange = (e, field) => {
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
      invalidCharUsed = true; // 👈 flag invalid character
      val = filtered;
    } else {
      val = rawVal;
    }
  }

  const newValues = { ...values, [field.name]: val };
  setValues(newValues);

  // Run normal validation
  const res = validateField(field, val, newValues);

  // Decide which error to show
  setErrors({
    ...errors,
    [field.name]: invalidCharUsed
      ? field.messageOnInvalid || "Invalid character entered"
      : res.valid
      ? null
      : res.message
  });
};

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = validateAll(config.fields, values);
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