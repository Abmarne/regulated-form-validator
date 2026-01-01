export default function aadhaarRule(value) {
  const re = /^\d{12}$/;
  return re.test(String(value || ""));
}