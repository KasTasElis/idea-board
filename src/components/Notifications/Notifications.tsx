import { TNotification, useGlobalState, EActionTypes } from "../../state";

type TNotificationCardProps = {
  notification: TNotification;
  onDelete: () => void;
};

const NotificationCard = ({
  notification,
  onDelete,
}: TNotificationCardProps) => {
  return (
    <div className="shadow-md p-4 rounded text-md gap-2 text-slate-100 bg-green-400 w-80 flex justify-between">
      <p>{notification.message}</p>

      <button onClick={onDelete}>⨉</button>
    </div>
  );
};

const Notifications = () => {
  const { state, dispatch } = useGlobalState();

  const onDelete = (notification: TNotification) => {
    dispatch({
      type: EActionTypes.DELETE_NOTIFICATION,
      payload: notification,
    });
  };

  return (
    <div
      className="fixed top-5 right-5 flex flex-col gap-3 z-10"
      data-testid="notification-wrapper"
    >
      {state.notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onDelete={() => onDelete(notification)}
        />
      ))}
    </div>
  );
};

export { Notifications, NotificationCard };
