// index.d.ts

// ===============================
// Types for Regulated Form Validator
// ===============================

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
    | string;
  message?: string;
  pattern?: string;
  flags?: string;
  min?: number;
  max?: number;
  eq?: number;
  options?: string[];
  before?: string;
  after?: string;
  ageMin?: number;
  field?: string;
  when?: {
    field: string;
    equals?: any;
    notEquals?: any;
    notEmpty?: boolean;
    in?: any[];
    notIn?: any[];
  };
  custom?: string;
  extra?: Record<string, any>;
}

export interface FieldConfig {
  name: string;
  label?: string;
  type?: string;
  validation?: ValidationRule[];
  options?: string[];
  max?: number;
  min?: number;
  allowedChars?: RegExp;
  messageOnInvalid?: string;
}

export interface FormConfig {
  fields: FieldConfig[];
}

export interface ValidationResult {
  valid: boolean;
  message?: string;
  errors?: string[];
}

export interface ValidationSummary {
  valid: boolean;
  errors: Record<string, string>;
}

export function parseConfig(config: string | object): FormConfig;

export function validateField(
  field: FieldConfig,
  value: any,
  values?: Record<string, any>
): ValidationResult;

export function validateAll(
  fields: FieldConfig[],
  values?: Record<string, any>
): ValidationSummary;

export function addCustom(
  name: string,
  fn: (value: any, values?: Record<string, any>, rule?: ValidationRule) => boolean
): void;

export function removeCustom(name: string): void;

export function getCustom(
  name: string
): ((value: any, values?: Record<string, any>, rule?: ValidationRule) => boolean) | undefined;

export function listCustom(): string[];

// Renderer typed as any to avoid React type dependency
export interface FormRendererProps {
  config: FormConfig;
  values?: Record<string, any>;
  onChange?: (name: string, value: any) => void;
  onSubmit?: (values: Record<string, any>) => void;
}

export const FormRenderer: any;

// Preset fields
export const NameField: FieldConfig;
export const EmailField: FieldConfig;
export const PincodeField: FieldConfig;
export const PhoneField: FieldConfig;
export const AddressField: FieldConfig;
export const GenderField: FieldConfig;
export const PasswordField: FieldConfig;
export const ConfirmPasswordField: FieldConfig;
export const PANField: FieldConfig;
export const IFSCField: FieldConfig;
export const AadhaarField: FieldConfig;
export const DobField: FieldConfig;