import { useState } from "react";
import { IdeaForm, IdeaCard, SortOptions } from "./components";

const AddNewIdea = () => {
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    return <IdeaForm onCancel={() => setShowForm(false)} />;
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

const App = () => {
  return (
    <div className="p-3">
      <div className="max-w-screen-md mx-auto">
        <div className="flex flex-col justify-center text-center gap-2">
          <div className="text-5xl">🤔</div>
          <h1 className="text-3xl font-bold mb-7 text-center text-teal-900">
            Idea Board
          </h1>
        </div>

        {/* New Idea Section */}
        <div className="mb-16">
          <AddNewIdea />
        </div>

        <div className="mb-5">
          <SortOptions />
        </div>

        <div>
          {[1, 2, 3].map(() => (
            <div className="mb-5">
              <IdeaCard />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
