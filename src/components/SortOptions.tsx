import classNames from "classnames";
import { useGlobalState, ESortingOptions, EActionTypes } from "../state";

const SortButton = ({
  text,
  isActive = false,
  onClick,
}: {
  text: string;
  isActive?: boolean;
  onClick?: () => void;
}) => {
  const buttonClasses = classNames("px-4 py-1 rounded-md text-sm font-medium", {
    "bg-slate-500 text-white": isActive,
    "bg-slate-200 text-slate-400": !isActive,
  });

  return (
    <button onClick={onClick} className={buttonClasses}>
      {text}
    </button>
  );
};

const SortOptions = () => {
  const {
    dispatch,
    state: { ideaSorting },
  } = useGlobalState();

  return (
    <div className="flex gap-3 items-center">
      <div className="text-slate-400 font-light text-sm">Sort By:</div>
      <div className="flex gap-2">
        {Object.values(ESortingOptions).map((value) => (
          <SortButton
            key={value}
            text={value}
            isActive={value === ideaSorting}
            onClick={() => {
              dispatch({
                type: EActionTypes.SET_IDEA_SORTING_OPTION,
                payload: value,
              });
            }}
          />
        ))}
      </div>
    </div>
  );
};

export { SortOptions };
