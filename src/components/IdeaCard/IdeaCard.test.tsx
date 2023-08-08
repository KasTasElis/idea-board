/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IdeaCard, TIdea } from "./IdeaCard";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { uuid } from "../../utils";

const user = userEvent.setup();

// how would i use global state here??
it.only("displays idea", async () => {
  const idea: TIdea = {
    title: "Test Idea",
    description: "Test Description",
    id: uuid(),
    createdAt: Date.now(),
  };

  render(<IdeaCard idea={idea} />);

  const title = screen.getByText(idea.title);
  const description = screen.getByText(idea.description);
  const date = screen.getByText(/Created/);
  const editButton = screen.getByRole("button", { name: /Edit/ });
  const deleteButton = screen.getByRole("button", { name: /Edit/ });

  // these assertions needed? The queries above seem to fail if the elements are not found
  expect(title).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(date).toBeInTheDocument();
  expect(editButton).toBeInTheDocument();
  expect(deleteButton).toBeInTheDocument();

  // click on edit button user action
  await user.click(editButton);

  // form should  be visible
  const editForm = screen.getByRole("form");
  expect(editForm).toBeInTheDocument();

  const cancelButton = screen.getByRole("button", { name: /Cancel/ });
  expect(cancelButton).toBeInTheDocument();

  await user.click(cancelButton);

  expect(editForm).not.toBeInTheDocument();
});
