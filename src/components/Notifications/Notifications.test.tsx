/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Notifications, NotificationCard } from "./Notifications";
import { render, screen, renderHook } from "../../react-testing-lib/test-utils";
import { EActionTypes, TNotification, useGlobalState } from "../../state";
import { uuid } from "../../utils";
import { GlobalStateProvider } from "../../state";
import { act } from "react-dom/test-utils";
import { vitest } from "vitest";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

describe("Notifications", () => {
  test("initially renders no notifications", () => {
    render(<Notifications />);

    const wrapper = screen.getByTestId("notification-wrapper");
    expect(wrapper).toBeEmptyDOMElement();
  });

  test.skip("displays added notifications", async () => {
    render(<Notifications />);

    console.log("Initialise: ");
    screen.debug();

    const { result } = renderHook(() => useGlobalState(), {
      wrapper: GlobalStateProvider,
    });

    // This must be how you test a reducer
    expect(result.current.state.notifications.length).toBe(0);

    act(() => {
      result.current.dispatch({
        type: EActionTypes.SHOW_NOTIFICATION,
        payload: { message: "Notification 1", id: uuid() },
      });
    });

    expect(result.current.state.notifications.length).toBe(1);

    // why is the notification not showing up?
    console.log("Notification added: ");
    screen.debug();
  });
});

describe("NotificationCard", () => {
  const notification: TNotification = {
    message: "Hello world!",
    id: uuid(),
  };
  const onDeleteMock = vitest.fn();

  beforeEach(() => {
    render(
      <NotificationCard notification={notification} onDelete={onDeleteMock} />
    );
  });

  afterEach(() => {
    vitest.resetAllMocks();
  });

  test("renders content", async () => {
    expect(screen.getByText(notification.message)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(onDeleteMock).toHaveBeenCalledTimes(0);
  });

  test("calls onDelete when delete button is clicked", async () => {
    const deleteButton = screen.getByRole("button");

    await user.click(deleteButton);

    expect(onDeleteMock).toHaveBeenCalledTimes(1);
  });
});
