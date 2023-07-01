const SortOptions = () => {
  return (
    <div className="flex items-center flex-wrap gap-x-5 gap-y-7">
      <div className="flex gap-3 items-center">
        <div className="text-slate-400 font-light text-sm">Sort By:</div>
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
        <div className="text-slate-400 font-light text-sm"> Alphabeticaly:</div>

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
  );
};

export { SortOptions };
