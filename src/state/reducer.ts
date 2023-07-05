import { TGlobalState, TAction, EActionTypes, initialState } from ".";

export const addIdea = (
  state: TGlobalState,
  action: TAction<EActionTypes.ADD_IDEA>
) => {
  const updatedIdeas = [action.payload, ...state.ideas];
  return {
    ...state,
    ideas: updatedIdeas,
  };
};

export const deleteIdea = (
  state: TGlobalState,
  action: TAction<EActionTypes.DELETE_IDEA>
) => {
  const updatedIdeas = state.ideas.filter(
    (idea) => idea.id !== action.payload.id
  );
  return {
    ...state,
    ideas: updatedIdeas,
  };
};

export const editIdea = (
  state: TGlobalState,
  action: TAction<EActionTypes.EDIT_IDEA>
) => {
  const updatedIdeas = state.ideas.map((idea) => {
    if (idea.id === action.payload.id) {
      return action.payload;
    }
    return idea;
  });
  return {
    ...state,
    ideas: updatedIdeas,
  };
};

export const showNotification = (
  state: TGlobalState,
  action: TAction<EActionTypes.SHOW_NOTIFICATION>
) => {
  const updatedNotifications = [action.payload, ...state.notifications];
  return {
    ...state,
    notifications: updatedNotifications,
  };
};

export const deleteNotification = (
  state: TGlobalState,
  action: TAction<EActionTypes.DELETE_NOTIFICATION>
) => {
  const updatedNotifications = state.notifications.filter(
    (notification) => notification.id !== action.payload.id
  );
  return {
    ...state,
    notifications: updatedNotifications,
  };
};

export const setIdeas = (
  state: TGlobalState,
  action: TAction<EActionTypes.SET_IDEAS>
) => {
  return {
    ...state,
    ideas: action.payload,
  };
};

export const setIdeaSortingOption = (
  state: TGlobalState,
  action: TAction<EActionTypes.SET_IDEA_SORTING_OPTION>
) => {
  return {
    ...state,
    ideaSorting: action.payload,
  };
};

const reducer = (state: TGlobalState, action: TAction<EActionTypes>) => {
  switch (action.type) {
    case EActionTypes.ADD_IDEA:
      return addIdea(state, action);
    case EActionTypes.DELETE_IDEA:
      return deleteIdea(state, action);
    case EActionTypes.EDIT_IDEA:
      return editIdea(state, action);
    case EActionTypes.SHOW_NOTIFICATION:
      return showNotification(state, action);
    case EActionTypes.DELETE_NOTIFICATION:
      return deleteNotification(state, action);
    case EActionTypes.SET_IDEAS:
      return setIdeas(state, action);
    case EActionTypes.SET_IDEA_SORTING_OPTION:
      return setIdeaSortingOption(state, action);
    case EActionTypes.RESET_STATE:
      return initialState;
    default:
      return state;
  }
};

export { reducer };
