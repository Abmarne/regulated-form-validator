import yaml from "js-yaml";

/**
 * Parses YAML/JSON string into a config object.
 * If input is already an object, returns it unchanged.
 */
export function parseConfig(configInput) {
  if (typeof configInput === "object" && configInput !== null) return configInput;
  const str = String(configInput || "");
  try {
    return yaml.load(str);
  } catch (err) {
    try {
      return JSON.parse(str);
    } catch {
      throw new Error("Invalid YAML/JSON config: " + err.message);
    }
  }
}