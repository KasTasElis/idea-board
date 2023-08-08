import { render, screen } from "./react-testing-lib/test-utils";
import userEvent from "@testing-library/user-event";
import { within } from "@testing-library/dom";

const user = userEvent.setup();

import App from "./App";

const addIdea = async (title: string, desc: string) => {
  const addIdeaBtn = screen.getByText(/Add New Idea/i);
  expect(addIdeaBtn).toBeVisible();
  await user.click(addIdeaBtn);
  expect(addIdeaBtn).not.toBeVisible();

  const titleInput = screen.getByPlaceholderText(/Enter Title/i);
  expect(titleInput).toBeVisible();
  await user.type(titleInput, title);

  const descInput = screen.getByPlaceholderText(/Enter Description/i);
  expect(descInput).toBeVisible();
  await user.type(descInput, desc);

  const submitBtn = screen.getByText(/Submit/i);
  expect(submitBtn).toBeVisible();
  await user.click(submitBtn);

  // form should be hidden, add idea button should be visible
  expect(submitBtn).not.toBeVisible();
  expect(screen.getByText(/Add New Idea/i)).toBeVisible();

  // idea should be visible in list
  expect(screen.getByText(title)).toBeVisible();
  expect(screen.getByText(desc)).toBeVisible();
};

describe.skip("Idea board app", () => {
  it.skip("can add ideas", async () => {
    render(<App />);

    await addIdea("Test Idea 1", "Test Description 1");
    await addIdea("Test Idea 2", "Test Description 2");
  });

  it.skip("can edit ideas", async () => {
    render(<App />);

    await addIdea("Test Idea 1", "Test Description 1");
    await addIdea("Test Idea 2", "Test Description 2");

    // find the right edit button
    const ideaTwoCard = screen.getByText(/Test Idea 2/i).parentElement!;

    const editBtn = within(ideaTwoCard).getByRole("button", { name: /Edit/i });

    await user.click(editBtn);

    // get title input and change it
    const titleInput = screen.getByPlaceholderText(/Test Idea 2/i);
    await user.type(titleInput, "!!!");

    // get description input and change it
    const descInput = screen.getByPlaceholderText(/Test Description 2/i);
    await user.type(descInput, "???");

    // get submit button and click it
    const submitBtn = screen.getByText(/Submit/i);
    await user.click(submitBtn);

    // edit form should be hidden
    expect(submitBtn).not.toBeVisible();

    // check that the idea has been updated
    expect(screen.getByText("Test Idea 2!!!")).toBeVisible();
    expect(screen.getByText("Test Description 2???")).toBeVisible();

    const updatedAt = within(
      screen.getByText("Test Idea 2!!!").parentElement!
    ).getByText(/Updated/i);

    // tag changed to updated at
    expect(updatedAt).toBeVisible();
  });

  it.skip("can delete ideas", async () => {
    await addIdea("Test Idea 1", "Test Description 1");
    await addIdea("Test Idea 2", "Test Description 2");

    // find the right delete button
    const ideaTwoCard = screen.getByText(/Test Idea 2/i).parentElement!;
    const deleteBtn = within(ideaTwoCard).getByRole("button", {
      name: /Delete/i,
    });
  });
});
