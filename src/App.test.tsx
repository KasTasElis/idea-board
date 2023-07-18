import { render, screen } from "./react-testing-lib/test-utils";

import App from "./App";

describe("App", () => {
  it("renders headline", () => {
    render(<App />);

    screen.debug();
  });
});
