import { render, screen, within } from "./react-testing-lib/test-utils";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

import App from "./App";
import { vitest } from "vitest";
import { mockIdeas } from "./consts";

test("can add a new idea with title, description and created at date", async () => {
  render(<App />);

  const ideas = screen.queryAllByRole("listitem");
  expect(ideas.length).toBe(0);

  const addIdeaBtn = screen.getByRole("button", { name: /Add New Idea/i });
  await user.click(addIdeaBtn);

  const form = screen.getByRole("form");
  expect(form).toBeVisible();

  const titleInput = screen.getByPlaceholderText(/Enter Title/i);
  expect(titleInput).toHaveFocus();

  const ideaTitle = "Test Idea 1";
  const ideaDesc = "Test Description 1";

  await user.type(titleInput, ideaTitle);
  expect(titleInput).toHaveValue(ideaTitle);

  await user.tab();

  const descInput = screen.getByPlaceholderText(/Enter Description/i);
  expect(descInput).toHaveFocus();

  await user.type(descInput, ideaDesc);
  expect(descInput).toHaveValue(ideaDesc);

  const submitBtn = screen.getByRole("button", { name: /Submit/i });
  await user.click(submitBtn);

  expect(form).not.toBeVisible();

  const ideas2 = screen.queryAllByRole("listitem");
  expect(ideas2.length).toBe(1);

  screen.getByText(ideaTitle);
  screen.getByText(ideaDesc);
  screen.getByText(/created/i);
});

test("can edit an idea and see updated title, description and date", async () => {
  render(<App />);

  const addIdeaBtn = screen.getByRole("button", { name: /Add New Idea/i });
  await user.click(addIdeaBtn);

  const titleInput = screen.getByPlaceholderText(/Enter Title/i);

  const ideaTitle = "Test Idea 1";
  const ideaDesc = "Test Description 1";

  await user.type(titleInput, ideaTitle);

  const descInput = screen.getByPlaceholderText(/Enter Description/i);

  await user.type(descInput, ideaDesc);

  const submitBtn = screen.getByRole("button", { name: /Submit/i });
  await user.click(submitBtn);

  const editBtn = screen.getByRole("button", { name: /Edit/i });
  await user.click(editBtn);

  const editForm = screen.getByRole("form");
  expect(editForm).toBeVisible();

  const editTitleInput = screen.getByDisplayValue(ideaTitle);

  expect(editTitleInput).toHaveFocus();

  await user.clear(editTitleInput);
  const updatedTitle = "Updated Title";
  await user.type(editTitleInput, updatedTitle);
  expect(editTitleInput).toHaveValue(updatedTitle);

  await user.tab();

  const editDescInput = screen.getByDisplayValue(ideaDesc);
  expect(editDescInput).toHaveFocus();

  await user.clear(editDescInput);
  const updatedDesc = "Updated Description";
  await user.type(editDescInput, updatedDesc);
  expect(editDescInput).toHaveValue(updatedDesc);

  // can cancel edit
  const cancelBtn = screen.getByRole("button", { name: /Cancel/i });
  await user.click(cancelBtn);

  expect(editForm).not.toBeVisible();

  // idea is still the same
  screen.getByText(ideaTitle);
  screen.getByText(ideaDesc);
  screen.getByText(/created/i);

  // can try edit again

  const editBtn2 = screen.getByRole("button", { name: /Edit/i });

  await user.click(editBtn2);

  const editForm2 = screen.getByRole("form");
  expect(editForm2).toBeVisible();

  const editTitleInput2 = screen.getByDisplayValue(ideaTitle);
  await user.clear(editTitleInput2);
  await user.type(editTitleInput2, updatedTitle);
  expect(editTitleInput2).toHaveValue(updatedTitle);

  await user.tab();

  const editDescInput2 = screen.getByDisplayValue(ideaDesc);
  await user.clear(editDescInput2);
  await user.type(editDescInput2, updatedDesc);
  expect(editDescInput2).toHaveValue(updatedDesc);

  const editSubmitBtn = screen.getByRole("button", { name: /Submit/i });
  await user.click(editSubmitBtn);

  expect(editForm2).not.toBeVisible();

  // can see updated title, description and timestamp
  screen.getByText(updatedTitle);
  screen.getByText(updatedDesc);
  screen.getByText(/updated @/i);

  // can see a notification
  screen.getByText(/edited successfully/i);

  // can dismiss notification
  const notificationCloseBtn = screen.getByRole("button", { name: "⨉" }); // carefull, "⨉" is a special char not to be confused with "X"
  await user.click(notificationCloseBtn);

  expect(screen.queryByText(/edited successfully/i)).not.toBeInTheDocument();
});

test("can delete an idea", async () => {
  render(<App />);

  const addIdeaBtn = screen.getByRole("button", { name: /Add New Idea/i });
  await user.click(addIdeaBtn);

  const titleInput = screen.getByPlaceholderText(/Enter Title/i);

  const ideaTitle = "Test Idea 1";
  const ideaDesc = "Test Description 1";

  await user.type(titleInput, ideaTitle);

  const descInput = screen.getByPlaceholderText(/Enter Description/i);

  await user.type(descInput, ideaDesc);

  const submitBtn = screen.getByRole("button", { name: /Submit/i });
  await user.click(submitBtn);

  const deleteBtn = screen.getByRole("button", { name: /Delete/i });

  // simulate a "cancel" delete
  const confirmCancel = vitest.fn(() => false);
  window.confirm = confirmCancel;

  await user.click(deleteBtn);

  // idea is still there
  expect(screen.queryByText(ideaTitle)).toBeInTheDocument();
  expect(screen.queryByText(ideaDesc)).toBeInTheDocument();

  // simulate a confirm delete
  const confirm = vitest.fn(() => true);
  window.confirm = confirm;

  await user.click(deleteBtn);

  // idea is not there
  expect(screen.queryByText(ideaTitle)).not.toBeInTheDocument();
  expect(screen.queryByText(ideaDesc)).not.toBeInTheDocument();
});

test("can 'hydrate' and 'teardown' app state", async () => {
  render(<App />);
  const hydrateBtn = screen.getByRole("button", { name: /Hydrate/i });

  await user.click(hydrateBtn);

  const ideas = screen.queryAllByRole("listitem");
  expect(ideas.length).toBe(mockIdeas.length);

  const resetBtn = screen.getByRole("button", { name: /Reset/i });
  await user.click(resetBtn);

  const ideasAfterReset = screen.queryAllByRole("listitem");
  expect(ideasAfterReset.length).toBe(0);
});

describe("can sort ideas", () => {
  test("by date", async () => {
    render(<App />);

    const hydrateBtn = screen.getByRole("button", { name: /Hydrate/i });
    await user.click(hydrateBtn);

    const ideas = screen.queryAllByRole("listitem");

    const firstIdeaTitle = within(ideas[0]).getByRole("heading").innerHTML;
    const lastIdeaTitle = within(ideas[3]).getByRole("heading").innerHTML;

    expect(firstIdeaTitle).toBe(mockIdeas[3].title);
    expect(lastIdeaTitle).toBe(mockIdeas[0].title);

    const sortByOldestBtn = screen.getByRole("button", { name: /Oldest/i });
    await user.click(sortByOldestBtn);

    const ideasAfterSort = screen.queryAllByRole("listitem");

    const firstIdeaTitleAfterSort = within(ideasAfterSort[0]).getByRole(
      "heading"
    ).innerHTML;
    const lastIdeaTitleAfterSort = within(ideasAfterSort[3]).getByRole(
      "heading"
    ).innerHTML;

    expect(firstIdeaTitleAfterSort).toBe(mockIdeas[0].title);
    expect(lastIdeaTitleAfterSort).toBe(mockIdeas[3].title);
  });

  test("alphabetically", async () => {
    render(<App />);

    const hydrateBtn = screen.getByRole("button", { name: /Hydrate/i });
    await user.click(hydrateBtn);

    const sortAtoZ = screen.getByRole("button", { name: /A-Z/i });
    await user.click(sortAtoZ);

    const ideas = screen.queryAllByRole("listitem");

    const firstIdeaTitle = within(ideas[0]).getByRole("heading").innerHTML;
    const lastIdeaTitle = within(ideas[3]).getByRole("heading").innerHTML;

    expect(firstIdeaTitle).toBe(mockIdeas[1].title);
    expect(lastIdeaTitle).toBe(mockIdeas[0].title);

    const sortZtoA = screen.getByRole("button", { name: /Z-A/i });
    await user.click(sortZtoA);

    const ideasAfterSort = screen.queryAllByRole("listitem");

    const firstIdeaTitleAfterSort = within(ideasAfterSort[0]).getByRole(
      "heading"
    ).innerHTML;
    const lastIdeaTitleAfterSort = within(ideasAfterSort[3]).getByRole(
      "heading"
    ).innerHTML;

    expect(firstIdeaTitleAfterSort).toBe(mockIdeas[0].title);
    expect(lastIdeaTitleAfterSort).toBe(mockIdeas[1].title);
  });
});

test.todo("notifications will dismiss themselves");
test.todo("on window reload, state persists");
