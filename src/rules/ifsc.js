export default function ifscRule(value) {
  const re = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  return re.test(String(value || "").toUpperCase());
}