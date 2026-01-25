import { useState } from "react";
import UserCard from "./UserCard";

const SwipeStack = ({ users }) => {
  const [index, setIndex] = useState(0);

  const handleSwipe = (direction) => {
    console.log("Swiped:", direction, users[index].name);
    setIndex((prev) => prev + 1);
  };

  return (
    <div className="relative h-[450px] w-full flex items-center justify-center">
      {users.slice(index, index + 3).map((user, i) => (
        <div
          key={user.id}
          className="absolute"
          style={{
            transform: `scale(${1 - i * 0.05}) translateY(${i * 12}px)`,
            zIndex: 10 - i,
          }}
        >
          <UserCard user={user} onSwipe={handleSwipe} />
        </div>
      ))}
    </div>
  );
};

export default SwipeStack;
