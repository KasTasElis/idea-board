import classNames from "classnames";
import {
  EActionTypes,
  EAlphabeticalSortOptions,
  EDateSortOptions,
  useGlobalState,
} from "../App";

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
    "bg-slate-400 text-slate-800": isActive,
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
    state: { sortingOptions },
  } = useGlobalState();

  return (
    <div className="flex items-center flex-wrap gap-x-5 gap-y-7 justify-between">
      <div className="flex gap-3 items-center">
        <div className="text-slate-400 font-light text-sm">Sort By:</div>
        <div className="flex gap-1">
          {Object.values(EDateSortOptions).map((value) => (
            <SortButton
              key={value}
              text={value}
              isActive={value === sortingOptions.byDate}
              onClick={() => {
                dispatch({
                  type: EActionTypes.SET_DATE_SORT_OPTION,
                  payload: value,
                });
              }}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <div className="text-slate-400 font-light text-sm"> Alphabeticaly:</div>

        <div className="flex gap-1">
          {Object.values(EAlphabeticalSortOptions).map((value) => (
            <SortButton
              key={value}
              text={value}
              isActive={value === sortingOptions.byAlphabet}
              onClick={() => {
                dispatch({
                  type: EActionTypes.SET_ALPHABETICAL_SORT_OPTION,
                  payload: value,
                });
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export { SortOptions };
