/* eslint-disable react-refresh/only-export-components */
import classNames from "classnames";
import { useGlobalState, ESortingOptions, EActionTypes } from "../../state";

type SortButtonProps = {
  text: string;
  isActive?: boolean;
  onClick?: () => void;
};

export const activeCssClasses = "bg-slate-500 text-white";
export const inactiveCssClasses = "bg-slate-200 text-slate-400";

const SortButton = ({ text, isActive = false, onClick }: SortButtonProps) => {
  const buttonClasses = classNames("px-4 py-1 rounded-md text-sm font-medium", {
    [activeCssClasses]: isActive,
    [inactiveCssClasses]: !isActive,
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

  const onClick = (value: ESortingOptions) => {
    dispatch({
      type: EActionTypes.SET_IDEA_SORTING_OPTION,
      payload: value,
    });
  };

  return (
    <div className="flex gap-3 items-center">
      <div className="text-slate-400 font-light text-sm">Sort By:</div>
      <div className="flex gap-2">
        {Object.values(ESortingOptions).map((value) => (
          <SortButton
            key={value}
            text={value}
            isActive={value === ideaSorting}
            onClick={() => onClick(value)}
          />
        ))}
      </div>
    </div>
  );
};

export { SortOptions };
