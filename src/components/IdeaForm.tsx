import { useState } from "react";
import { Card } from ".";
import { TIdea } from "./IdeaCard";

interface IdeaFormProps {
  onCancel?: () => void;
  onSubmit?: ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => void;
  idea?: TIdea;
}

export const titleMaxLength = 60;
const titleMinLength = 3;
export const descriptionMaxLength = 160;
const descriptionMinLength = 3;

const IdeaForm: React.FC<IdeaFormProps> = ({ onCancel, onSubmit, idea }) => {
  const initialTitle = idea ? idea.title : "";
  const initialTitlePlaceholder = idea ? idea.title : "Enter Title...";
  const [title, setTitle] = useState(initialTitle);

  const initialDescription = idea ? idea.description : "";
  const initialDescriptionPlaceholder = idea
    ? idea.description
    : "Enter Description...";
  const [description, setDescrition] = useState(initialDescription);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit({ title, description });
    }
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if (val.length > titleMaxLength) {
      return;
    }

    setTitle(val);
  };

  const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;

    if (val.length > descriptionMaxLength) {
      return;
    }

    setDescrition(val);
  };

  return (
    <Card>
      <form role="form" onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <label
              htmlFor="title"
              className="font-medium text-slate-700 block mb-1"
            >
              💡 Title
            </label>
            <div className="text-xs text-right mt-1 text-slate-500">{`${title.length}/${titleMaxLength}`}</div>
          </div>
          <input
            role=""
            spellCheck
            id="title"
            name="title"
            autoFocus
            className="w-full p-3 rounded-md"
            type="text"
            required
            placeholder={initialTitlePlaceholder}
            value={title}
            onChange={onChangeTitle}
            maxLength={titleMaxLength}
            minLength={titleMinLength}
          />
        </div>

        <div className="mb-5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="description"
              className="font-medium text-slate-700 block mb-1"
            >
              ✍️ Description
            </label>
            <div className="text-xs text-right mt-1 text-slate-500">{`${description.length}/${descriptionMaxLength}`}</div>
          </div>
          <textarea
            name="description"
            id="description"
            spellCheck
            maxLength={descriptionMaxLength}
            minLength={descriptionMinLength}
            className="w-full p-3 rounded-md resize-none"
            rows={3}
            placeholder={initialDescriptionPlaceholder}
            value={description}
            required
            onChange={onChangeDescription}
          />
        </div>

        <div className="flex items-center justify-end">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-slate-500 rounded-md text-white text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 rounded-md text-white text-sm font-medium"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export { IdeaForm };
