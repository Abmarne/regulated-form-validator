import { parseConfig } from "./parser.js";
import { validateField, validateAll } from "./validator.js";
<<<<<<< HEAD
import FormRenderer from "./formRenderer.js";
=======
import FormRenderer from "./formRenderer.jsx";
>>>>>>> 1ffcb5ebd5314d8abc371addfefb18506cd7a777
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