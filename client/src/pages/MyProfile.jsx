import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import UserCard from "../components/UserCard";
import SocialLinksEditor from "../components/SocialLinksEditor";

const MyProfile = () => {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-12">

        {/* Header */}
        <section>
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-zinc-400 mt-1">
            This is how other developers see you on CodeMatch.
          </p>
        </section>

        {/* Public Card Preview */}
        <section className="flex justify-center">
          <UserCard user={user} isTop={false} />
        </section>

        {/* Social Links */}
        <section className="max-w-md mx-auto">
          <SocialLinksEditor initialLinkedin={user.linkedin} />
        </section>

      </main>
    </div>
  );
};

export default MyProfile;
