import React, { useState } from "react";
import { validateField, validateAll } from "./validator.js";

/**
 * Props:
 * - config: { fields: Array<{ name, label, type, validation?: Rule[], options?: string[] }> }
 * - onSubmit?: (values) => void
 * - renderField?: (field, control, error) => ReactNode
 */
export default function FormRenderer({ config, onSubmit, renderField }) {
  const fields = Array.isArray(config?.fields) ? config.fields : [];
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (field, e) => {
    const value = e?.target ? e.target.value : e;
    const next = { ...values, [field.name]: value };
    setValues(next);
    const res = validateField(field, value, next);
    setErrors({ ...errors, [field.name]: res.valid ? null : res.message });
  };

  const handleBlur = (field) =>
    setTouched((t) => ({ ...t, [field.name]: true }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = validateAll(fields, values);
    setErrors(res.errors);
    if (res.valid && typeof onSubmit === "function") onSubmit(values);
  };

  const controlFor = (field, value, onChange, onBlur) => {
    const common = {
      id: field.name,
      name: field.name,
      value: value ?? "",
      onChange,
      onBlur,
      "aria-invalid": Boolean(errors[field.name]),
      "aria-describedby": errors[field.name]
        ? `${field.name}-error`
        : undefined,
    };

    switch (field.type) {
      case "select":
        return (
          <select {...common}>
            <option value="">Select...</option>
            {(field.options || []).map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );
      case "textarea":
        return <textarea {...common} rows={3} />;
      case "number":
        return <input {...common} type="number" />;
      case "date":
        return <input {...common} type="date" />;
      default:
        return <input {...common} type={field.type || "text"} />;
    }
  };

  const isSubmitDisabled = () => {
    const hasErrors = Object.values(errors).some(Boolean);
    const requiredFields = fields.filter((f) =>
      (f.validation || []).some((r) => r.type === "required" && !r.when)
    );
    const anyRequiredEmpty = requiredFields.some((f) => {
      const v = values[f.name];
      return v == null || String(v).trim() === "";
    });
    return hasErrors || anyRequiredEmpty;
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {fields.map((field) => {
        const value = values[field.name];
        const error = errors[field.name];
        const control = controlFor(
          field,
          value,
          (e) => handleChange(field, e),
          () => handleBlur(field)
        );

        return (
          <div key={field.name} style={{ marginBottom: 12 }}>
            <label
              htmlFor={field.name}
              style={{ display: "block", fontWeight: 600 }}
            >
              {field.label}
            </label>

            {renderField ? renderField(field, control, error) : control}

            {touched[field.name] && error && (
              <span
                id={`${field.name}-error`}
                style={{ color: "crimson", fontSize: 12 }}
              >
                {error}
              </span>
            )}
          </div>
        );
      })}
      <button type="submit" disabled={isSubmitDisabled()}>
        Submit
      </button>
    </form>
  );
}