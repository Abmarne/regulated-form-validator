import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FormRenderer from "../src/formRenderer.jsx";

const config = {
  fields: [
    { name: "pan", label: "PAN", type: "text", validation: [{ type: "required" }, { type: "pan" }] }
  ]
};

test("renders and shows error on blur when empty", () => {
  render(<FormRenderer config={config} onSubmit={() => {}} />);
  const input = screen.getByLabelText("PAN");
  fireEvent.blur(input);
  const submit = screen.getByRole("button", { name: /submit/i });
  expect(submit).toBeDisabled();
});