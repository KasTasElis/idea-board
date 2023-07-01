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
        <div className="mb-16 text-center">
          <h3 className="text-center text-lg mb-3 font-medium text-slate-400">
            Got something on your mind?
          </h3>
          <button className="py-2 px-3 bg-slate-200 rounded-md text-teal-900 min-w-64 h-16 text-xl w-full max-w-sm">
            ✍️ Add New Idea
          </button>
        </div>

        {/* Sort Section */}
        <div className="flex mb-5 items-center flex-wrap gap-x-5 gap-y-7">
          <div className="flex gap-3 items-center">
            <div className="text-slate-400 font-light">Sort By:</div>
            <div className="flex gap-1">
              <button className="px-4 py-1 bg-slate-400 rounded-md text-slate-800 text-sm font-medium">
                Latest
              </button>
              <button className="px-4 py-1 bg-slate-200 rounded-md text-slate-800 text-sm font-medium">
                Oldest
              </button>
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <div className="text-slate-400 font-light"> Alphabeticaly:</div>

            <div className="flex gap-1">
              <button className="px-4 py-1 bg-slate-400 rounded-md text-slate-800 text-sm font-medium">
                None
              </button>
              <button className="px-4 py-1 bg-slate-200 rounded-md text-slate-800 text-sm font-medium">
                A - Z
              </button>
              <button className="px-4 py-1 bg-slate-200 rounded-md text-slate-800 text-sm font-medium">
                Z - A
              </button>
            </div>
          </div>
        </div>

        <div>
          {[1, 2, 3].map(() => (
            <div className="mb-5">
              <div className="p-4 bg-slate-200 rounded-md">
                <h3 className="text-xl font-bold mb-3 text-teal-900">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </h3>
                <p className="mb-5 text-slate-700">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
                  impedit sint veritatis. Lorem ipsum, dolor sit amet
                  consectetur adipisicing elit. Ut enim sint officiis in
                  deserunt commodi veniam delectus nemo blanditiis ipsa,
                  doloribus, corporis vel quidem sed. Ad soluta rem nemo vero?
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-500 font-light">
                    🕒 Created 15h 12m ago...
                  </p>

                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-slate-500 rounded-md text-white text-sm font-medium">
                      Edit
                    </button>
                    <button className="px-4 py-2 bg-red-500 rounded-md text-white text-sm font-medium">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
