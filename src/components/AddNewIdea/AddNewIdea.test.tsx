import { render, screen } from "../../react-testing-lib/test-utils";
import { AddNewIdea } from "./AddNewIdea";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

test("Renders", () => {
  render(<AddNewIdea />);

  const addNewIdeaButton = screen.getByRole("button");

  expect(addNewIdeaButton).toBeInTheDocument();
});

test("Renders idea form when needed", async () => {
  render(<AddNewIdea />);

  expect(screen.queryByRole("form")).not.toBeInTheDocument();

  const addNewIdeaButton = screen.getByRole("button");

  await user.click(addNewIdeaButton);

  expect(screen.getByRole("form")).toBeInTheDocument();

  const cancelButton = screen.getByRole("button", { name: /cancel/i });

  await user.click(cancelButton);

  expect(screen.queryByRole("form")).not.toBeInTheDocument();
});
