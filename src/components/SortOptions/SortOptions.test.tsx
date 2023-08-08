import { render, screen } from "../../react-testing-lib/test-utils";
import {
  SortOptions,
  activeCssClasses,
  inactiveCssClasses,
} from "./SortOptions";
import { ESortingOptions } from "../../state";
import { initialState } from "../../state";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

test("Renders", () => {
  render(<SortOptions />);
  const label = screen.getByText(/sort by/i);
  expect(label).toBeInTheDocument();

  const sortButtons = screen.getAllByRole("button");

  const sortOptions = Object.keys(ESortingOptions);
  expect(sortButtons).toHaveLength(sortOptions.length);

  sortButtons.forEach((button) => {
    expect(button).toBeInTheDocument();
  });
});

test("Renders active button state styles", () => {
  render(<SortOptions />);

  const buttons = screen.getAllByRole("button");

  buttons.forEach((button) => {
    // Checking for classes here feels a bit flaky, but it is the user-centric way of testing this state.
    if (button.textContent === initialState.ideaSorting) {
      expect(button).toHaveClass(activeCssClasses);
      expect(button).not.toHaveClass(inactiveCssClasses);
    } else {
      expect(button).toHaveClass(inactiveCssClasses);
      expect(button).not.toHaveClass(activeCssClasses);
    }
  });
});

test("Clicking a sort button changes the active state styles", async () => {
  render(<SortOptions />);

  const sortOptionOtherThanDefault = Object.values(ESortingOptions).find(
    (value) => value !== initialState.ideaSorting
  );

  const sortButtonOtherThanDefault = screen.getByRole("button", {
    name: sortOptionOtherThanDefault,
  });

  expect(sortButtonOtherThanDefault).toHaveClass(inactiveCssClasses);
  expect(sortButtonOtherThanDefault).not.toHaveClass(activeCssClasses);

  await user.click(sortButtonOtherThanDefault);

  expect(sortButtonOtherThanDefault).not.toHaveClass(inactiveCssClasses);
  expect(sortButtonOtherThanDefault).toHaveClass(activeCssClasses);
});
