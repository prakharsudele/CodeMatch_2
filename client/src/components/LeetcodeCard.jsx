const LeetcodeCard = () => {
  const isConnected = false; // later from backend

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">LeetCode</h3>
        <span
          className={`text-sm ${
            isConnected ? "text-green-400" : "text-yellow-400"
          }`}
        >
          {isConnected ? "Connected" : "Not Connected"}
        </span>
      </div>

      {!isConnected ? (
        <>
          <p className="mt-3 text-zinc-400 text-sm">
            Add your LeetCode username to display solved problems.
          </p>
          <button className="mt-6 px-5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700">
            Connect LeetCode
          </button>
        </>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xl font-bold">320</p>
              <p className="text-sm text-zinc-400">Solved</p>
            </div>
            <div>
              <p className="text-xl font-bold">140</p>
              <p className="text-sm text-zinc-400">Medium</p>
            </div>
            <div>
              <p className="text-xl font-bold">28</p>
              <p className="text-sm text-zinc-400">Hard</p>
            </div>
          </div>

          <div className="mt-6 h-24 rounded-lg bg-gradient-to-r from-orange-500/20 to-yellow-500/20 flex items-center justify-center text-zinc-400 text-sm">
            Problem difficulty graph
          </div>
        </>
      )}
    </div>
  );
};

export default LeetcodeCard;
