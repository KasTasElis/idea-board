import { useState } from "react";
import { IdeaForm, Card } from ".";
import { useGlobalState, EActionTypes, TNotification } from "../state";

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

const timeStampToDate = (timeStamp: number) => {
  const date = new Date(timeStamp);
  return date.toLocaleDateString("en-UK", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const CreatedOrUpdatedAt = ({ idea }: { idea: TIdea }) => {
  const relevantTimeStamp = idea.updatedAt || idea.createdAt;
  const relevantWord = idea.updatedAt ? "✍️ Updated" : "💡 Created";
  const timeStamp = timeStampToDate(relevantTimeStamp);

  return (
    <p className="text-sm text-slate-500 font-light">
      {`${relevantWord} @ ${timeStamp}`}
    </p>
  );
};

const IdeaCard: React.FC<IdeaCardProps> = ({ idea }) => {
  const { dispatch } = useGlobalState();

  const onDelete = async () => {
    const result = window.confirm(
      "Are you sure you want to deltete this idea?"
    );

    if (!result) return;

    dispatch({
      type: EActionTypes.DELETE_IDEA,
      payload: idea,
    });
  };

  const [isEditing, setIsEditing] = useState(false);

  const onEditSubmit = ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
    const editedIdea: TIdea = {
      ...idea,
      title,
      description,
      updatedAt: Date.now(),
    };

    dispatch({
      type: EActionTypes.EDIT_IDEA,
      payload: editedIdea,
    });

    const notification: TNotification = {
      id: String(Date.now()),
      message: "Idea edited successfully!",
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
        <CreatedOrUpdatedAt idea={idea} />

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
