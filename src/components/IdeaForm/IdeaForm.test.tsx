import { render, screen } from "../../react-testing-lib/test-utils";
import userEvent from "@testing-library/user-event";
import { IdeaForm } from "./IdeaForm";
import { vitest } from "vitest";

const user = userEvent.setup();

test.skip("can't submit idea form with invalid data", async () => {
  const onSubmit = vitest.fn();

  render(<IdeaForm onSubmit={onSubmit} />);

  const submitBtn = screen.getByRole("button", { name: /Submit/i });

  await user.click(submitBtn);

  const titleInput = screen.getByPlaceholderText(/Enter Title/i);
  expect(onSubmit).not.toHaveBeenCalled();

  await user.type(titleInput, "a");
  await user.click(submitBtn);

  expect(onSubmit).not.toHaveBeenCalled();

  await user.clear(titleInput);
  await user.type(titleInput, "Title");
  await user.click(submitBtn);

  expect(onSubmit).not.toHaveBeenCalled();

  const descInput = screen.getByPlaceholderText(/Enter Description/i);

  await user.type(descInput, "a");
  await user.click(submitBtn);
  expect(onSubmit).not.toHaveBeenCalled();
});
