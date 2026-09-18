import { useAuth } from "../context/AuthContext";
import { getProfileCompleteness } from "../utils/profileCompleteness";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SwipeStack from "../components/SwipeStack";
import MatchRequestCard from "../components/MatchRequestCard";
import Navbar from "../components/Navbar.jsx";
import MatchModal from "../components/MatchModal";
import { API_BASE_URL } from "../api";

const Swipe = () => {
  const { user, loading } = useAuth();
  const { percent } = getProfileCompleteness(user);

  const [users, setUsers] = useState([]);
  const [matchRequests, setMatchRequests] = useState([]);
  const [matchedUser, setMatchedUser] = useState(null);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  /* Fetch swipe feed */
  useEffect(() => {
    const fetchFeed = () => {
      fetch(`${API_BASE_URL}/swipe/feed`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then(setUsers)
        .catch(console.error);
    };

    fetchFeed();

    window.addEventListener("focus", fetchFeed);

    return () => {
      window.removeEventListener("focus", fetchFeed);
    };
  }, []);

  /* Fetch match requests */
  useEffect(() => {
    fetch(`${API_BASE_URL}/matches/requests`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(setMatchRequests);
  }, []);

  /* Remove request from UI after accept/reject */
  const handleRespond = (fromUser) => {
    setMatchedUser(fromUser);

    setMatchRequests((prev) =>
      prev.filter((r) => r.from._id !== fromUser._id)
    );
  };

  /* Handle swipe */
  const handleSwipe = async (direction, userId) => {
    fetch(`${API_BASE_URL}/swipe`, {
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

  /* Guards */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <p className="text-sm text-zinc-500">Loading...</p>
      </div>
    );
  }

  if (!user) return <Navigate to="/" replace />;

  if (percent < 70) return <Navigate to="/home" replace />;

  return (
    <>
      <Navbar variant="light" />

      <main className="min-h-[calc(100vh-65px)] bg-[#fafafa] text-zinc-950">
        <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-6 lg:px-8">

          {/* Page Header */}
          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-500">
                Discover
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
                Find your next coding partner.
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">
                Browse developers, explore their profiles, and connect with
                people who share your interest in building.
              </p>
            </div>

            <div className="hidden rounded-2xl border border-zinc-200 bg-white px-4 py-3 shadow-sm sm:block">
              <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">
                Profile strength
              </p>
              <p className="mt-1 text-lg font-bold text-zinc-950">
                {percent}%
              </p>
            </div>
          </div>

          {/* Main Discovery Area */}
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">

            {/* Swipe Area */}
            <section className="min-w-0">
              <div className="rounded-[28px] border border-zinc-200 bg-white px-5 py-7 shadow-sm sm:px-8 sm:py-9">

                <div className="mb-6 text-center">
                  <h2 className="text-lg font-semibold text-zinc-950">
                    Discover developers
                  </h2>

                  <p className="mt-1 text-sm text-zinc-500">
                    Swipe right to connect or left to skip.
                  </p>
                </div>

                <div className="flex min-h-[500px] items-center justify-center">
                  <SwipeStack
                    users={users}
                    onSwipe={handleSwipe}
                  />
                </div>

                {/* Swipe controls explanation */}
                <div className="mt-5 flex items-center justify-center gap-3 text-xs text-zinc-400">
                  <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5">
                    ← Skip
                  </span>

                  <span className="text-zinc-300">or</span>

                  <span className="rounded-full border border-red-100 bg-red-50 px-3 py-1.5 text-red-500">
                    Connect →
                  </span>
                </div>
              </div>
            </section>

            {/* Match Requests */}
            <aside className="lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-sm">

                {/* Sidebar Header */}
                <div className="border-b border-zinc-100 px-6 py-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-base font-semibold text-zinc-950">
                        Match Requests
                      </h2>

                      <p className="mt-1 text-xs text-zinc-500">
                        People who want to connect with you.
                      </p>
                    </div>

                    {matchRequests.length > 0 && (
                      <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-red-50 px-2 text-xs font-bold text-red-500">
                        {matchRequests.length}
                      </span>
                    )}
                  </div>
                </div>

                {/* Requests */}
                <div className="p-5">
                  {matchRequests.length === 0 ? (
                    <div className="flex min-h-80 flex-col items-center justify-center px-4 text-center">

                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50">
                        <span className="text-lg text-zinc-400">
                          ✦
                        </span>
                      </div>

                      <p className="mt-4 text-sm font-semibold text-zinc-800">
                        No match requests yet
                      </p>

                      <p className="mt-2 max-w-xs text-xs leading-5 text-zinc-400">
                        When another developer wants to connect with you,
                        their request will appear here.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {matchRequests
                        .filter((req) => req?.from)
                        .map((req) => (
                          <MatchRequestCard
                            key={req.from._id}
                            user={req.from}
                          />
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Match Modal */}
      {matchedUser && (
        <MatchModal
          user={matchedUser}
          onClose={() => setMatchedUser(null)}
        />
      )}
    </>
  );
};

export default Swipe;