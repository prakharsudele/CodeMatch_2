import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import UserCard from "../components/UserCard";
import SocialLinksEditor from "../components/SocialLinksEditor";

const MyProfile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-950">
      <Navbar variant="light" />

      <main className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-6 lg:px-8">

        {/* Page Header */}
        <section className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-500">
            Account
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">
            Manage your developer profile and control how you appear to
            other people on CodeMatch.
          </p>
        </section>

        {/* Main Content */}
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_0.9fr]">

          {/* Public Profile */}
          <section className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">

            <div className="mb-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-zinc-950">
                    Public profile
                  </h2>

                  <p className="mt-1 text-sm text-zinc-400">
                    This is how other developers see you.
                  </p>
                </div>

                <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-semibold text-emerald-600">
                  Live
                </span>
              </div>
            </div>

            <div className="flex justify-center">
              <UserCard
                user={user}
                isTop={false}
              />
            </div>

            <div className="mt-7 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3">
              <p className="text-center text-xs leading-5 text-zinc-400">
                Your profile information, GitHub activity, and LeetCode
                statistics are visible to developers you discover on CodeMatch.
              </p>
            </div>
          </section>

          {/* Profile Settings */}
          <div className="space-y-6">

            {/* Social Links */}
            <section className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">

              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-red-500">
                  Social presence
                </p>

                <h2 className="mt-2 text-lg font-bold text-zinc-950">
                  Connect your professional profiles
                </h2>

                <p className="mt-1 text-sm leading-6 text-zinc-400">
                  Give other developers another way to learn more about your
                  work.
                </p>
              </div>

              <SocialLinksEditor
                initialLinkedin={user.linkedin}
                initialBio={user.bio}
              />
            </section>

            {/* Profile information */}
            <section className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
                  Connected accounts
                </p>

                <h2 className="mt-2 text-lg font-bold text-zinc-950">
                  Developer activity
                </h2>
              </div>

              <div className="mt-5 space-y-3">

                {/* GitHub */}
                <div className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-950 text-[8px] font-bold text-white">
                      GH
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-zinc-900">
                        GitHub
                      </p>

                      <p className="mt-0.5 text-xs text-zinc-400">
                        {user.github
                          ? `@${user.username}`
                          : "Not connected"}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-[11px] font-semibold ${
                      user.github
                        ? "text-emerald-500"
                        : "text-zinc-400"
                    }`}
                  >
                    {user.github ? "Connected" : "Not connected"}
                  </span>
                </div>

                {/* LeetCode */}
                <div className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFA116] text-[8px] font-bold text-white">
                      LC
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-zinc-900">
                        LeetCode
                      </p>

                      <p className="mt-0.5 text-xs text-zinc-400">
                        {user.leetcode
                          ? `@${user.leetcode.username}`
                          : "Not connected"}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-[11px] font-semibold ${
                      user.leetcode
                        ? "text-emerald-500"
                        : "text-zinc-400"
                    }`}
                  >
                    {user.leetcode ? "Connected" : "Not connected"}
                  </span>
                </div>

              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
};

export default MyProfile;