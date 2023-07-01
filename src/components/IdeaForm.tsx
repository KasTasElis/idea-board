import { Card } from ".";

interface IdeaFormProps {
  onCancel: () => void;
  idea?: {
    title: string;
    description: string;
  };
}

const IdeaForm: React.FC<IdeaFormProps> = ({ onCancel, idea }) => {
  return (
    <Card>
      <form>
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <label htmlFor="" className="font-medium text-slate-700 block mb-1">
              💡 Title
            </label>
            <div className="text-xs text-right mt-1 text-slate-500">14/60</div>
          </div>
          <input
            className="w-full p-3 rounded-md"
            type="text"
            placeholder="Enter Title..."
            value={idea ? idea.title : ""}
          />
        </div>

        <div className="mb-5">
          <div className="flex items-center justify-between">
            <label htmlFor="" className="font-medium text-slate-700 block mb-1">
              ✍️ Description
            </label>
            <div className="text-xs text-right mt-1 text-slate-500">14/60</div>
          </div>
          <textarea
            className="w-full p-3 rounded-md resize-none"
            rows={3}
            placeholder="Enter Description..."
            value={idea ? idea.description : ""}
          />
        </div>

        <div className="flex items-center justify-end">
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-slate-500 rounded-md text-white text-sm font-medium"
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-green-500 rounded-md text-white text-sm font-medium">
              Submit
            </button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export { IdeaForm };
