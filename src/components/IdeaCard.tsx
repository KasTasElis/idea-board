import { useState } from "react";
import { IdeaForm, Card } from ".";
import { useGlobalState } from "../App";

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
  const { setState, state } = useGlobalState();

  const onDelete = () => {
    const { [idea.id]: _, ...restOfIdeas } = state.ideas;
    setState({ ideas: restOfIdeas });
  };

  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return <IdeaForm onCancel={() => setIsEditing(false)} idea={idea} />;
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
