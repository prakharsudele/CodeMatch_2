import UserCard from "./UserCard";

const SwipeStack = ({ users, onSwipe }) => {
  const safeUsers = users?.filter((u) => u && u._id) || [];

  if (safeUsers.length === 0) {
    return (
      <div className="flex w-full max-w-sm flex-col items-center justify-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50">
          <span className="text-xl text-zinc-300">⌁</span>
        </div>

        <p className="mt-5 text-lg font-semibold text-zinc-900">
          No more developers
        </p>

        <p className="mt-2 max-w-xs text-sm leading-6 text-zinc-400">
          You've reached the end of your current discovery list. Check back
          later for new developers.
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex h-[520px] w-full max-w-sm items-center justify-center">
      {safeUsers
        .slice(0, 3)
        .map((user, index) => {
          const isTop = index === 0;

          return (
            <div
              key={user._id}
              className="absolute"
              style={{
                zIndex: 10 - index,
                transform: `scale(${1 - index * 0.05}) translateY(${
                  index * 12
                }px)`,
              }}
            >
              <UserCard
                user={user}
                isTop={isTop}
                onSwipe={(direction) =>
                  isTop && onSwipe(direction, user._id)
                }
              />
            </div>
          );
        })
        .reverse()}
    </div>
  );
};

export default SwipeStack;