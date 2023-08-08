import userEvent from "@testing-library/user-event";
import { render, screen } from "../../react-testing-lib/test-utils";
import { DevTools, DevTool } from "./DevTools";
import { vitest } from "vitest";

const user = userEvent.setup();

describe("DevTool", () => {
  test("Renders correctly", async () => {
    render(
      <DevTool
        message="Need some help? 🤔"
        buttonText="♻️ Reset App State!"
        onButtonClick={() => undefined}
      />
    );

    const message = screen.getByText(/need some help/i);
    expect(message).toBeInTheDocument();

    const button = screen.getByRole("button", {
      name: /reset app state/i,
    });
    expect(button).toBeInTheDocument();
  });

  test("Callback fires on button click", async () => {
    const onButtonClick = vitest.fn();

    render(
      <DevTool
        message="Need some help? 🤔"
        buttonText="♻️ Reset App State!"
        onButtonClick={onButtonClick}
      />
    );

    const button = screen.getByRole("button", {
      name: /reset app state/i,
    });

    await user.click(button);

    expect(onButtonClick).toHaveBeenCalledOnce();
  });
});

describe("DevTools", () => {
  test("Renders correctly", async () => {
    render(<DevTools />);

    const wantSomeDataText = screen.getByText(/want some mock data/i);
    const hydrateButton = screen.getByRole("button", { name: /hydrate/i });

    expect(wantSomeDataText).toBeInTheDocument();
    expect(hydrateButton).toBeInTheDocument();

    await user.click(hydrateButton);

    // is there a better way to deal with stale query? This is a bit repetitive...
    expect(screen.queryByText(/want some mock data/i)).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /hydrate/i })
    ).not.toBeInTheDocument();

    const needSomeHelpText = screen.getByText(/need some help/i);
    const resetButton = screen.getByRole("button", { name: /reset/i });

    expect(needSomeHelpText).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
  });
});
