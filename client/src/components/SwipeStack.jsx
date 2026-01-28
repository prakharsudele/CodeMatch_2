const SwipeStack = ({ users, onSwipe }) => {
  const safeUsers = users?.filter(u => u && u._id) || [];

  if (safeUsers.length === 0) {
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
    <div className="relative w-full max-w-sm h-125 flex items-center justify-center">
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
