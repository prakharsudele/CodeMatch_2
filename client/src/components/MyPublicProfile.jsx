// components/MyPublicProfile.jsx
import UserCard from "./UserCard";
import { useAuth } from "../context/AuthContext";

const MyPublicProfile = () => {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="flex justify-center">
      <UserCard user={user} isTop={false} />
    </div>
  );
};

export default MyPublicProfile;
