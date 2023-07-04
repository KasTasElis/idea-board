export enum EActionTypes {
  ADD_IDEA = "ADD_IDEA",
  DELETE_IDEA = "DELETE_IDEA",
  EDIT_IDEA = "EDIT_IDEA",
  SHOW_NOTIFICATION = "SHOW_NOTIFICATION",
  DELETE_NOTIFICATION = "DELETE_NOTIFICATION",
  RESTORE_STATE_FROM_LOCAL_STORAGE = "RESTORE_STATE_FROM_LOCAL_STORAGE",
  SET_IDEA_SORTING_OPTION = "SET_IDEA_SORTING_OPTION",
}

export type TGlobalState = {
  ideas: TIdea[];
  notifications: TNotification[];
  ideaSorting: ESortingOptions;
};

export type TContext = {
  state: TGlobalState;
  dispatch: React.Dispatch<TAction<EActionTypes>>;
};

export type TIdea = {
  title: string;
  description: string;
  id: string;
  createdAt: number;
  updatedAt?: number;
};

export type TNotification = {
  message: string;
  id: string;
};

export enum ESortingOptions {
  BY_DATE_ASCENDING = "Oldest",
  BY_DATE_DESCENDING = "Latest",
  A_Z = "A-Z",
  Z_A = "Z-A",
}

export type TAction<T extends EActionTypes> = T extends
  | EActionTypes.ADD_IDEA
  | EActionTypes.DELETE_IDEA
  | EActionTypes.EDIT_IDEA
  ? {
      type: T;
      payload: TIdea;
    }
  : T extends EActionTypes.SHOW_NOTIFICATION | EActionTypes.DELETE_NOTIFICATION
  ? {
      type: T;
      payload: TNotification;
    }
  : T extends EActionTypes.RESTORE_STATE_FROM_LOCAL_STORAGE
  ? {
      type: T;
      payload: TGlobalState;
    }
  : T extends EActionTypes.SET_IDEA_SORTING_OPTION
  ? {
      type: T;
      payload: ESortingOptions;
    }
  : never;
