import SwipeStack from "../components/SwipeStack";
import { users } from "../data/users";
import Footer from "../components/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-zinc-950">

      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        
        {/* LEFT */}
        <div>
  <h1 className="text-5xl font-extrabold leading-tight text-white">
    Swipe to find your{" "}
    <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
      coding match
    </span>
  </h1>

  <p className="mt-6 text-xl text-zinc-300 max-w-xl">
    CodeMatch helps developers discover like-minded programmers for learning,
    hackathons, and real-world collaboration — without awkward DMs.
  </p>

  {/* How it works */}
  <div className="mt-10 space-y-4">
    <div className="flex items-start gap-3">
      <span className="text-purple-400 font-bold">01.</span>
      <p className="text-zinc-400">
        Browse developer profiles with GitHub & LeetCode stats.
      </p>
    </div>

    <div className="flex items-start gap-3">
      <span className="text-purple-400 font-bold">02.</span>
      <p className="text-zinc-400">
        Swipe right if skills & goals align. Skip if they don’t.
      </p>
    </div>

    <div className="flex items-start gap-3">
      <span className="text-purple-400 font-bold">03.</span>
      <p className="text-zinc-400">
        Match instantly and start building together.
      </p>
    </div>
  </div>

  {/* CTA */}
  <div className="mt-12 flex items-center gap-6">
    <button className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 transition font-semibold text-lg shadow-lg shadow-purple-500/20">
      Sign up with GitHub
    </button>

    <span className="text-sm text-zinc-500">
      Free · No spam · Built for devs
    </span>
  </div>
</div>


        {/* RIGHT */}
        <SwipeStack users={users} />
      </section>
      <Footer></Footer>
    </div>
  );
}
