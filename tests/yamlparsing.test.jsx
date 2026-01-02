import fs from "fs";
import yaml from "js-yaml";

test("parses YAML config correctly", () => {
  const file = fs.readFileSync("example/config.yaml", "utf8");
  const config = yaml.load(file);

  expect(config.fields).toBeDefined();
  expect(Array.isArray(config.fields)).toBe(true);
});