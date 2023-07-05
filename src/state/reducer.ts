import { TGlobalState, TAction, EActionTypes, initialState } from ".";

const reducer = (state: TGlobalState, action: TAction<EActionTypes>) => {
  switch (action.type) {
    case EActionTypes.ADD_IDEA:
      return {
        ...state,
        ideas: [action.payload, ...state.ideas],
      };
    case EActionTypes.DELETE_IDEA:
      return {
        ...state,
        ideas: state.ideas.filter((idea) => idea.id !== action.payload.id),
      };
    case EActionTypes.EDIT_IDEA:
      return {
        ...state,
        ideas: state.ideas.map((idea) => {
          if (idea.id === action.payload.id) {
            return action.payload;
          }
          return idea;
        }),
      };
    case EActionTypes.SHOW_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case EActionTypes.DELETE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload.id
        ),
      };
    case EActionTypes.SET_IDEAS:
      return {
        ...state,
        ideas: action.payload,
      };
    case EActionTypes.SET_IDEA_SORTING_OPTION:
      return {
        ...state,
        ideaSorting: action.payload,
      };
    case EActionTypes.RESET_STATE:
      return initialState;
    default:
      return state;
  }
};

export { reducer };
