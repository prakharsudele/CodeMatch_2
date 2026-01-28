import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import ProfilePreview from "../components/ProfilePreview";
import { API_BASE_URL } from "../api";

const ProfilePage = () => {
  const { userId } = useParams();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode"); // "request" or null
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(setProfile);
  }, [userId]);

  const handleRespond = async (action) => {
    await fetch(`${API_BASE_URL}/matches/respond`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        fromUserId: userId,
        action,
      }),
    });

    navigate("/swipe");
  };

  if (!profile) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
      <ProfilePreview
        user={profile}
        actions={
          mode === "request" && (
            <div className="flex gap-4">
              <button
                onClick={() => handleRespond("accept")}
                className="flex-1 bg-green-600 hover:bg-green-700 py-2 rounded-lg"
              >
                Accept
              </button>
              <button
                onClick={() => handleRespond("reject")}
                className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded-lg"
              >
                Reject
              </button>
            </div>
          )
        }
      />
    </div>
  );
};

export default ProfilePage;
