import { EActionTypes, TNotification, useGlobalState } from "../App";

type TNotificationCardProps = {
  notification: TNotification;
};

const NotificationCard = ({ notification }: TNotificationCardProps) => {
  const { dispatch } = useGlobalState();

  const onDelete = () => {
    dispatch({
      type: EActionTypes.DELETE_NOTIFICATION,
      payload: notification,
    });
  };

  return (
    <div className="shadow-md p-4 rounded text-md gap-2 text-slate-100 bg-green-400 w-80 flex justify-between">
      <p>{notification.message}</p>

      <button onClick={onDelete}>⨉</button>
    </div>
  );
};

const Notifications = () => {
  const { state } = useGlobalState();

  return (
    <div className="fixed top-5 right-5 flex flex-col gap-3 z-10">
      {state.notifications.map((notification) => (
        <NotificationCard key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export { Notifications, NotificationCard };
