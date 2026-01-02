// ===============================
// Types for Regulated Form Validator
// ===============================

/**
 * A single validation rule applied to a field.
 */
export interface ValidationRule {
  type:
    | "required"
    | "regex"
    | "length"
    | "enum"
    | "number"
    | "date"
    | "crossField"
    | "custom"
    | "pan"
    | "ifsc"
    | "aadhaar"
    | string; // allow extensibility

  /** Optional error message shown when rule fails */
  message?: string;

  /** Regex pattern (for type: "regex") */
  pattern?: string;
  flags?: string;

  /** Length constraints (for type: "length") */
  min?: number;
  max?: number;
  eq?: number;

  /** Enum options (for type: "enum") */
  options?: string[];

  /** Number constraints (for type: "number") */
  min?: number;
  max?: number;

  /** Date constraints (for type: "date") */
  before?: string; // ISO date string
  after?: string;  // ISO date string
  ageMin?: number;

  /** Cross-field validation (for type: "crossField") */
  field?: string;

  /** Conditional application of rule */
  when?: {
    field: string;
    equals?: any;
    notEquals?: any;
    notEmpty?: boolean;
    in?: any[];
    notIn?: any[];
  };

  /** Custom rule key (for type: "custom") */
  custom?: string;

  /** Extra parameters for custom rules */
  extra?: Record<string, any>;
}

/**
 * A single field in the form configuration.
 */
export interface FieldConfig {
  /** Unique field name */
  name: string;

  /** Display label */
  label?: string;

  /** Input type (text, number, date, etc.) */
  type?: string;

  /** Validation rules */
  validation?: ValidationRule[];

  /** Options for select fields */
  options?: string[];
}

/**
 * A full form configuration object.
 */
export interface FormConfig {
  fields: FieldConfig[];
}

/**
 * Result of validating a single field.
 */
export interface ValidationResult {
  valid: boolean;
  message?: string;
  errors?: string[];
}

/**
 * Result of validating all fields.
 */
export interface ValidationSummary {
  valid: boolean;
  errors: Record<string, string>;
}

/**
 * Parse a YAML or JSON config into a FormConfig.
 */
export function parseConfig(config: string | object): FormConfig;

/**
 * Validate a single field.
 */
export function validateField(
  field: FieldConfig,
  value: any,
  values?: Record<string, any>
): ValidationResult;

/**
 * Validate all fields in a form.
 */
export function validateAll(
  fields: FieldConfig[],
  values?: Record<string, any>
): ValidationSummary;

/**
 * Custom rule registry API
 */
export function addCustom(
  name: string,
  fn: (value: any, values?: Record<string, any>, rule?: ValidationRule) => boolean
): void;

export function removeCustom(name: string): void;

export function getCustom(
  name: string
): ((value: any, values?: Record<string, any>, rule?: ValidationRule) => boolean) | undefined;

export function listCustom(): string[];

/**
 * React form renderer component.
 */
export interface FormRendererProps {
  config: FormConfig;
  values?: Record<string, any>;
  onChange?: (name: string, value: any) => void;
  onSubmit?: (values: Record<string, any>) => void;
}

export const FormRenderer: React.ComponentType<FormRendererProps>;