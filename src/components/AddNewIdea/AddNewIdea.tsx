import { useState } from "react";
import { IdeaForm, TIdea } from "..";
import { useGlobalState, EActionTypes } from "../../state";
import { uuid } from "../../utils";

const AddNewIdea = () => {
  const [showForm, setShowForm] = useState(false);
  const { dispatch } = useGlobalState();

  const onSubmit = ({
    description,
    title,
  }: {
    description: string;
    title: string;
  }) => {
    const newIdea: TIdea = {
      title,
      description,
      id: uuid(),
      createdAt: Date.now(),
    };

    dispatch({
      type: EActionTypes.ADD_IDEA,
      payload: newIdea,
    });

    setShowForm(false);
  };

  if (showForm) {
    return <IdeaForm onCancel={() => setShowForm(false)} onSubmit={onSubmit} />;
  }

  return (
    <div className="text-center">
      <h3 className="text-center text-lg mb-3 font-medium text-slate-400">
        Got something on your mind?
      </h3>
      <button
        onClick={() => setShowForm(true)}
        className="py-2 px-3 bg-slate-200 rounded-md text-teal-900 min-w-64 h-16 text-xl w-full max-w-sm"
      >
        ✍️ Add New Idea
      </button>
    </div>
  );
};

export { AddNewIdea };
