export default function panRule(value) {
  const re = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
  return re.test(String(value || "").toUpperCase());
}