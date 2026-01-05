export const PatientIDField = {
  name: "patientId",
  label: "Patient ID",
  type: "text",
  validation: [
    {
      regex: "^[A-Z0-9]{8}$",
      message: "Invalid Patient ID"
    }
  ]
};

export const InsuranceField = {
  name: "insurance",
  label: "Insurance Policy Number",
  type: "text",
  validation: [
    {
      regex: "^[A-Z]{2}[0-9]{6}$",
      message: "Invalid Insurance Policy Number"
    }
  ]
};