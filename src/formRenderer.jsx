import React, { useState } from "react";
import { validateAll, validateField } from "./validator.js";
import "./FormRenderer.css";

export default function FormRenderer({ config, onSubmit, locale = "en" }) {
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
      }
    }

    const newValues = { ...values, [field.name]: val };
    setValues(newValues);

    // Run validation
    const res = await validateField(field, val, newValues, locale);

    // Functional update to avoid race conditions
    setErrors((prev) => ({
      ...prev,
      [field.name]: invalidCharUsed
        ? (typeof field.messageOnInvalid === "object"
            ? field.messageOnInvalid[locale] || field.messageOnInvalid.en
            : field.messageOnInvalid)
        : res.valid
        ? null
        : res.errors, // array of error objects
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await validateAll(config.fields, values, locale);
    setErrors(result.errors);
    if (result.valid) {
      onSubmit(values);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {config.fields.map((field) => (
        <div key={field.name} style={{ marginBottom: "1rem" }}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            id={field.name}
            name={field.name}
            type={field.type || "text"}
            value={values[field.name] || ""}
            onChange={(e) => handleChange(e, field)}
            maxLength={field.max || undefined}
            aria-invalid={!!errors[field.name]}
            aria-describedby={`${field.name}-error`}
          />
          {errors[field.name] &&
            Array.isArray(errors[field.name]) &&
            errors[field.name].map((err, idx) => (
              <div
                key={idx}
                id={`${field.name}-error-${idx}`}
                className={`validation-message ${err.severity}`}
              >
                {typeof err.message === "object"
                  ? err.message[locale] || err.message.en
                  : err.message}
              </div>
            ))}
          {errors[field.name] && typeof errors[field.name] === "string" && (
            <div
              id={`${field.name}-error`}
              className="validation-message error"
            >
              {errors[field.name]}
            </div>
          )}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}