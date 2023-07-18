import { render, screen } from "./react-testing-lib/test-utils";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

import App from "./App";

describe("App", () => {
  it("renders the app", async () => {
    render(<App />);

    const addIdeaBtn = screen.getByText(/Add New Idea/i);
    expect(addIdeaBtn).toBeInTheDocument();

    screen.debug();

    await user.click(addIdeaBtn); // Perform a click with `shiftKey: true`

    screen.debug();
  });
});
