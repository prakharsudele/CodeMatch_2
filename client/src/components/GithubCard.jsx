const GithubCard = () => {
  const isConnected = false; // later from backend

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">GitHub</h3>
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
            Connect your GitHub to show commits, repos, and activity.
          </p>
          <button className="mt-6 px-5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700">
            Connect GitHub
          </button>
        </>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">1,248</p>
              <p className="text-sm text-zinc-400">Commits</p>
            </div>
            <div>
              <p className="text-2xl font-bold">32</p>
              <p className="text-sm text-zinc-400">Repos</p>
            </div>
          </div>

          {/* Placeholder graph */}
          <div className="mt-6 h-24 rounded-lg bg-gradient-to-r from-purple-500/20 to-cyan-500/20 flex items-center justify-center text-zinc-400 text-sm">
            Contribution graph
          </div>
        </>
      )}
    </div>
  );
};

export default GithubCard;
