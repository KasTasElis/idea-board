import { mockIdeas } from "../../consts";
import { useGlobalState, EActionTypes } from "../../state";

interface DevToolProps {
  message: string;
  buttonText: string;
  onButtonClick: () => void;
}

const DevTool = ({ message, buttonText, onButtonClick }: DevToolProps) => {
  return (
    <div className="p-1 rounded-lg flex gap-3 items-center justify-center">
      <p className="text-sm text-slate-500">{message}</p>

      <button
        onClick={onButtonClick}
        className="px-4 py-2 rounded-md text-slate-600 font-medium underline underline-offset-8 text-xs"
      >
        {buttonText}
      </button>
    </div>
  );
};

const DevTools = () => {
  const {
    dispatch,
    state: { ideas },
  } = useGlobalState();

  const onHydrate = () => {
    dispatch({
      type: EActionTypes.SET_IDEAS,
      payload: mockIdeas,
    });
  };

  const onReset = () => {
    dispatch({
      type: EActionTypes.RESET_STATE,
    });
  };

  return (
    <>
      {ideas.length ? (
        <DevTool
          message="Need some help? 🤔"
          buttonText="♻️ Reset App State!"
          onButtonClick={onReset}
        />
      ) : (
        <DevTool
          message="Want some mock data? 😏"
          buttonText="💦 Hydrate!"
          onButtonClick={onHydrate}
        />
      )}
    </>
  );
};

export { DevTools, DevTool };
