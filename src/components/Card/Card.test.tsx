import { Card } from "./Card";
import { render, screen } from "@testing-library/react";

it("Renders correctly", () => {
  render(<Card>Hello world</Card>);

  const childElement = screen.getByText(/hello world/i);
  expect(childElement).toBeInTheDocument();
});
