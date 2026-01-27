import UserCard from "./UserCard";

const SwipeStack = ({ users, onSwipe }) => {
  if (!users || users.length === 0) {
    return (
      <div className="text-zinc-400 text-center">
        <p className="text-lg font-medium">No more developers 😕</p>
        <p className="text-sm mt-2">
          Check back later for new matches
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-sm h-[500px] flex items-center justify-center">
      {users
        .slice(0, 3) // show top 3 stacked cards
        .map((user, index) => {
          const isTop = index === 0;

          return (
            <div
              key={user._id}
              className="absolute"
              style={{
                zIndex: 10 - index,
                transform: `scale(${1 - index * 0.05}) translateY(${index * 12}px)`,
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
