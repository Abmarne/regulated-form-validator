import { parseConfig } from "./parser.js";
import { validateField, validateAll } from "./validator.js";
import FormRenderer from "./formRenderer.jsx";
import { addCustom, removeCustom, getCustom, listCustom } from "./fields/customRegistry.js";

// Re-export fields
export * from "./fields/presets.js";
export * from "./fields/bfsi.js";
export * from "./fields/healthcare.js";

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