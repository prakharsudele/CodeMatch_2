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
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <SwipeStack users={users} onSwipe={handleSwipe} />
    </div>
  );
};

export default Swipe;
