import { useState } from "react";
import { IdeaForm, Card } from ".";

const IdeaCard: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  const idea = {
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam architecto ducimus vitae suscipit incidunt doloremque obcaecati pariatur hic quam eligendi nulla quae quis, asperiores cum? Eos placeat labore culpa veniam.",
  };

  if (isEditing) {
    return <IdeaForm onCancel={() => setIsEditing(false)} idea={idea} />;
  }

  return (
    <Card>
      <h3 className="text-xl font-bold mb-3 text-teal-900">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </h3>
      <p className="mb-5 text-slate-700">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto impedit
        sint veritatis. Lorem ipsum, dolor sit amet consectetur adipisicing
        elit. Ut enim sint officiis in deserunt commodi veniam delectus nemo
        blanditiis ipsa, doloribus, corporis vel quidem sed. Ad soluta rem nemo
        vero?
      </p>
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500 font-light">
          🕒 Created 15h 12m ago...
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-slate-500 rounded-md text-white text-sm font-medium"
          >
            Edit
          </button>
          <button className="px-4 py-2 bg-red-500 rounded-md text-white text-sm font-medium">
            Delete
          </button>
        </div>
      </div>
    </Card>
  );
};

export { IdeaCard };
