import { useAuth } from "../context/AuthContext";
import { getProfileCompleteness } from "../utils/profileCompleteness";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SwipeStack from "../components/SwipeStack";

const Swipe = () => {
  const { user, loading } = useAuth();
  const { percent } = getProfileCompleteness(user);
  const [users, setUsers] = useState([]);

  if (loading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/" replace />;

  if (percent < 70) return <Navigate to="/home" replace />;

  useEffect(() => {
    fetch("http://localhost:5000/swipe/feed", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  const handleSwipe = async (direction, userId) => {
    await fetch("http://localhost:5000/swipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        targetUserId: userId,
        action: direction === "right" ? "like" : "pass",
      }),
    });

    setUsers((prev) => prev.slice(1));
  };

  return (
  <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
    <div className="flex w-full max-w-6xl items-start gap-10">

      {/* Swipe Cards */}
      <div className="flex-1 flex justify-center">
        <SwipeStack users={users} onSwipe={handleSwipe} />
      </div>

      {/* Divider */}
      <div className="w-px bg-zinc-800 h-[520px] mt-6" />

      {/* Requests Sidebar */}
      <div className="w-80 shrink-0 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 flex flex-col">
        <h3 className="text-lg font-semibold mb-4">
          Match Requests
        </h3>

        <div className="flex-1 flex flex-col items-center justify-center text-center gap-3">
          <div className="text-4xl">💌</div>

          <p className="text-sm text-zinc-300 font-medium">
            No match requests yet
          </p>

          <p className="text-xs text-zinc-500 leading-relaxed">
            When someone likes you back, their request will appear here.
            Keep swiping to find your coding match!
          </p>
        </div>
      </div>

    </div>
  </div>
);

};

export default Swipe;
