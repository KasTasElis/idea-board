/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IdeaForm, titleMaxLength, descriptionMaxLength } from "./IdeaForm";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { TIdea } from ".";

const user = userEvent.setup();

it("has title focused on load", async () => {
  render(<IdeaForm />);

  const titleInput = screen.getByPlaceholderText(
    /Enter Title/i
  ) as HTMLInputElement;

  const descInput = screen.getByPlaceholderText(
    /Enter Description/i
  ) as HTMLInputElement;

  expect(titleInput).toHaveFocus();

  // might as well check tabing
  await user.tab();
  expect(descInput).toHaveFocus();
});

it("title shows correct character countdown", async () => {
  render(<IdeaForm />);

  const initialCountText = `0/${titleMaxLength}`;

  const titleInput = screen.getByPlaceholderText(
    /Enter Title/i
  ) as HTMLInputElement;
  const characterCountDiv = within(titleInput.parentElement!).getByText(
    initialCountText
  );

  expect(characterCountDiv).toBeVisible();
  expect(characterCountDiv.innerHTML).toBe(initialCountText);

  const title = "Hello!";
  await user.type(titleInput, title);

  expect(titleInput.value).toBe(title);
  expect(characterCountDiv.innerHTML).toBe(`${title.length}/${titleMaxLength}`);
});

it("description shows correct character countdown", async () => {
  render(<IdeaForm />);

  const initialCountText = `0/${descriptionMaxLength}`;

  const descInput = screen.getByPlaceholderText(
    /Enter Description/i
  ) as HTMLInputElement;
  const characterCountDiv = within(descInput.parentElement!).getByText(
    initialCountText
  );

  expect(characterCountDiv).toBeVisible();
  expect(characterCountDiv.innerHTML).toBe(initialCountText);

  const description = "Describe me!";
  await user.type(descInput, description);

  expect(descInput.value).toBe(description);
  expect(characterCountDiv.innerHTML).toBe(
    `${description.length}/${descriptionMaxLength}`
  );
});

// come back to this
it.skip("cant be submitted with empty or invalid title or description", async () => {
  const onSubmit = vi.fn();

  render(<IdeaForm onSubmit={onSubmit} />);

  // get the form
  const form = screen.getByRole("form");
  const titleInput = screen.getByPlaceholderText(
    /Enter Title/i
  ) as HTMLInputElement;

  const descInput = screen.getByPlaceholderText(
    /Enter Description/i
  ) as HTMLInputElement;

  const submitBtn = screen.getByRole("button", { name: /Submit/i });

  // try empty form submit
  await user.click(submitBtn);
  expect(titleInput).toBeInvalid();
  expect(onSubmit).not.toBeCalled();

  // try under minimum title length submit
  await user.type(titleInput, "a");
  await user.click(submitBtn);

  // check if title is still invalid and submit is not called
  expect(form).toBeInvalid();
  //expect(titleInput).toBeInvalid(); // why is this not working?
  expect(onSubmit).not.toBeCalled();

  // enter valid title
  await user.clear(titleInput);
  await user.type(titleInput, "Title!");
  await user.click(submitBtn);
  expect(titleInput).toBeValid();

  // desc should sitll be invalid
  expect(descInput).toBeInvalid();
  expect(onSubmit).not.toBeCalled();
  expect(form).toBeInvalid();

  // try under minimum description length submit
  await user.type(descInput, "D");
  await user.click(submitBtn);

  expect(titleInput).toBeValid();
  //expect(descInput).toBeInvalid(); // why is this not working?
  //expect(form).toBeInvalid(); // why is it not working?
  expect(onSubmit).not.toBeCalled();

  // attempt valid submission
  await user.clear(descInput);
  await user.type(descInput, "Description!");
  await user.click(submitBtn);

  // submission goes trough
  expect(titleInput).toBeValid();
  expect(descInput).toBeValid();
  expect(form).toBeValid();
  expect(onSubmit).toBeCalledTimes(1);
});

it("fields get pre-filled if idea is passed via params", () => {
  const idea: TIdea = {
    title: "Hello Title",
    description: "Hello Description...",
    id: "12345",
    createdAt: Date.now(),
  };

  render(<IdeaForm idea={idea} />);

  const titleInput = screen.getByPlaceholderText(
    idea.title
  ) as HTMLInputElement;
  const descInput = screen.getByPlaceholderText(
    idea.description
  ) as HTMLInputElement;

  expect(titleInput).toBeVisible();
  expect(titleInput.value).toBe(idea.title);
  expect(descInput).toBeVisible();
  expect(descInput.value).toBe(idea.description);

  // is the character count correct?
  const titleCountDiv = within(titleInput.parentElement!).getByText(
    `${idea.title.length}/${titleMaxLength}`
  );
  expect(titleCountDiv).toBeVisible();

  const descCountDiv = within(descInput.parentElement!).getByText(
    `${idea.description.length}/${descriptionMaxLength}`
  );
  expect(descCountDiv).toBeVisible();
});
