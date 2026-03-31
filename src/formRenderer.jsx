import React, { useState, useMemo } from "react";
import { validateAll, validateField } from "./validator.js";
import "./FormRenderer.css";

export default function FormRenderer({ config, onSubmit, locale = "en", theme = "modern" }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [timeouts, setTimeouts] = useState({});

  const isMultiStep = !!config?.steps?.length;
  const steps = config.steps || [{ fields: config.fields || [], title: config.title, description: config.description }];
  const currentStepData = steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  if (!isMultiStep && !config?.fields?.length) {
    return <div className="no-fields">No fields configured</div>;
  }

  const handleChange = async (e, field) => {
    const rawVal = e.target.value;
    let val = rawVal;
    let invalidCharUsed = false;

    if (field.allowedChars) {
      const filtered = rawVal.split("").filter((ch) => field.allowedChars.test(ch)).join("");
      if (filtered !== rawVal) {
        invalidCharUsed = true;
        val = filtered;
      }
    }

    const newValues = { ...values, [field.name]: val };
    setValues(newValues);

    const res = await validateField(field, val, newValues, locale);

    setErrors((prev) => ({
      ...prev,
      [field.name]: invalidCharUsed
        ? (typeof field.messageOnInvalid === "object"
            ? field.messageOnInvalid[locale] || field.messageOnInvalid.en
            : field.messageOnInvalid)
        : res.valid ? null : res.errors,
    }));
  };

  const handleNext = async (e) => {
    e.preventDefault();
    const result = await validateAll(currentStepData.fields, values, locale);
    setErrors((prev) => ({ ...prev, ...result.errors }));
    
    if (result.valid) {
      if (isLastStep) {
        onSubmit(values);
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handleBack = () => {
    if (!isFirstStep) setCurrentStep(prev => prev - 1);
  };

  const toggleVisibility = (fieldName) => {
    setVisiblePasswords((prev) => {
      const newState = { ...prev, [fieldName]: !prev[fieldName] };
      if (newState[fieldName]) {
        if (timeouts[fieldName]) clearTimeout(timeouts[fieldName]);
        const timeoutId = setTimeout(() => {
          setVisiblePasswords((prevState) => ({ ...prevState, [fieldName]: false }));
        }, 3000);
        setTimeouts((prevTimeouts) => ({ ...prevTimeouts, [fieldName]: timeoutId }));
      }
      return newState;
    });
  };

  return (
    <div className={`form-container ${theme}-theme ${isMultiStep ? 'wizard-mode' : ''}`}>
      {isMultiStep && (
        <div className="wizard-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
          <div className="step-indicator">
            Step {currentStep + 1} of {steps.length}: <strong>{currentStepData.title}</strong>
          </div>
        </div>
      )}

      <form onSubmit={handleNext} noValidate>
        {currentStepData.title && !isMultiStep && <h2 className="form-title">{currentStepData.title}</h2>}
        {currentStepData.description && <p className="form-description">{currentStepData.description}</p>}
        
        <div className="fields-grid">
          {currentStepData.fields.map((field) => (
            <div 
              key={field.name} 
              className={`form-group ${errors[field.name] ? "has-error" : ""}`}
              style={{ gridColumn: field.fullWidth ? "1 / -1" : "span 1" }}
            >
              <label htmlFor={field.name}>
                {field.label}
                {field.validation?.some(v => v.type === "required") && <span className="required-star">*</span>}
              </label>
              
              <div className="input-wrapper">
                <input
                  id={field.name}
                  name={field.name}
                  type={
                    field.type === "password"
                      ? visiblePasswords[field.name] ? "text" : "password"
                      : field.type || "text"
                  }
                  placeholder={field.placeholder || ""}
                  value={values[field.name] || ""}
                  onChange={(e) => handleChange(e, field)}
                  maxLength={field.max || undefined}
                  aria-invalid={!!errors[field.name]}
                  aria-describedby={`${field.name}-error`}
                  aria-required={field.validation?.some(v => v.type === "required")}
                />
                {field.type === "password" && (
                  <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => toggleVisibility(field.name)}
                    aria-label={visiblePasswords[field.name] ? "Hide password" : "Show password"}
                  >
                    {visiblePasswords[field.name] ? <span>👁️‍🗨️</span> : <span>👁️</span>}
                  </button>
                )}
              </div>

              <div id={`${field.name}-error`} className="error-container" role="alert">
                {errors[field.name] && (
                  Array.isArray(errors[field.name]) ? (
                    errors[field.name].map((err, idx) => (
                      <div key={idx} className={`validation-message ${err.severity}`}>
                        {typeof err.message === "object" ? err.message[locale] || err.message.en : err.message}
                      </div>
                    ))
                  ) : (
                    <div className="validation-message error">{errors[field.name]}</div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="form-actions">
          {isMultiStep && !isFirstStep && (
            <button type="button" className="back-btn" onClick={handleBack}>
              <span className="btn-icon">←</span> Back
            </button>
          )}
          <button type="submit" className="submit-btn primary-btn">
            {isLastStep ? (config.submitLabel || "Submit") : "Continue"}
            <span className="btn-icon">→</span>
          </button>
        </div>
      </form>
    </div>
  );
}
