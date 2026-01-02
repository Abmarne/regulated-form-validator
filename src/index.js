import { parseConfig } from "./parser.js";
import { validateField, validateAll } from "./validator.js";
import FormRenderer from "./formRenderer.js";
import {
  addCustom,
  removeCustom,
  getCustom,
  listCustom
} from "./customRegistry.js";

// Named exports
export {
  parseConfig,
  validateField,
  validateAll,
  FormRenderer,
  addCustom,
  removeCustom,
  getCustom,
  listCustom
};

// Default export (aggregated object)
export default {
  parseConfig,
  validateField,
  validateAll,
  FormRenderer,
  addCustom,
  removeCustom,
  getCustom,
  listCustom
};