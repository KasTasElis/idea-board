/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Notifications } from "./Notifications";
import { render, screen, renderHook } from "../../react-testing-lib/test-utils";
import { EActionTypes, useGlobalState } from "../../state";
import { uuid } from "../../utils";

// how would i use global state here??
it.skip("displays notifications", async () => {
  render(<Notifications />);

  //const wrapper = screen.getByTestId("notification-wrapper");

  //expect(wrapper).toBeEmptyDOMElement();
  console.log("Initialise: ");
  screen.debug();

  const { result } = renderHook(() => useGlobalState());

  result.current.dispatch({
    type: EActionTypes.SHOW_NOTIFICATION,
    payload: { message: "Notification 1", id: uuid() },
  });

  console.log("Notification added: ");
  screen.debug();
});
