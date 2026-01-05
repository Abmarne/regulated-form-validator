// fields/bfsi.js

export const PANField = {
  name: "pan",
  label: "PAN Number",
  type: "text",
  validation: [
    {
      regex: "^[A-Z]{5}[0-9]{4}[A-Z]$",
      message: "Invalid PAN format"
    }
  ]
};

export const IFSCField = {
  name: "ifsc",
  label: "IFSC Code",
  type: "text",
  validation: [
    {
      regex: "^[A-Z]{4}0[A-Z0-9]{6}$",
      message: "Invalid IFSC code"
    }
  ]
};

export const AadhaarField = {
  name: "aadhaar",
  label: "Aadhaar Number",
  type: "text",
  validation: [
    {
      regex: "^\\d{12}$",
      message: "Invalid Aadhaar number"
    }
  ]
};

export const GSTField = {
  name: "gst",
  label: "GST Number",
  type: "text",
  validation: [
    {
      regex: "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$",
      message: "Invalid GST number"
    }
  ]
};

// Optional: add more BFSI-related fields here
export const AccountNumberField = {
  name: "accountNumber",
  label: "Bank Account Number",
  type: "text",
  validation: [
    {
      regex: "^[0-9]{9,18}$",
      message: "Invalid Account Number"
    }
  ]
};

export const MICRField = {
  name: "micr",
  label: "MICR Code",
  type: "text",
  validation: [
    {
      regex: "^[0-9]{9}$",
      message: "Invalid MICR Code"
    }
  ]
};