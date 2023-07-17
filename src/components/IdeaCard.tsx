/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import { IdeaForm, Card } from ".";
import { useGlobalState, EActionTypes, TNotification } from "../state";
import {
  createUpdatedIdeaObject,
  getFormattedIdeaDateString,
  uuid,
} from "../utils";

type TIdea = {
  title: string;
  description: string;
  id: string;
  createdAt: number;
  updatedAt?: number;
};
interface IdeaCardProps {
  idea: TIdea;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea }) => {
  const { dispatch } = useGlobalState();
  const [isEditing, setIsEditing] = useState(false);

  const dateString = getFormattedIdeaDateString(idea);

  const onDelete = () => {
    const confirm = window.confirm(
      "Are you sure you want to deltete this idea?"
    );

    if (!confirm) return;

    dispatch({
      type: EActionTypes.DELETE_IDEA,
      payload: idea,
    });
  };

  const onEditSubmit = ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
    const updatedIdea = createUpdatedIdeaObject(idea, {
      title,
      description,
      updatedAt: Date.now(),
    });

    dispatch({
      type: EActionTypes.EDIT_IDEA,
      payload: updatedIdea,
    });

    const notification: TNotification = {
      message: "Idea edited successfully!",
      id: uuid(),
    };

    dispatch({
      type: EActionTypes.SHOW_NOTIFICATION,
      payload: notification,
    });

    setTimeout(() => {
      dispatch({
        type: EActionTypes.DELETE_NOTIFICATION,
        payload: notification,
      });
    }, 3000);

    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <IdeaForm
        onCancel={() => setIsEditing(false)}
        onSubmit={onEditSubmit}
        idea={idea}
      />
    );
  }

  return (
    <Card>
      <h3 className="text-xl font-bold mb-3 text-teal-900">{idea.title}</h3>
      <p className="mb-5 text-slate-700">{idea.description}</p>

      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500 font-light">{dateString}</p>

        <div className="flex gap-3">
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-slate-500 rounded-md text-white text-sm font-medium"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-500 rounded-md text-white text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </Card>
  );
};

export { IdeaCard };
export type { TIdea };
