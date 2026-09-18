import { useState } from "react";
import { API_BASE_URL } from "../api";

const SocialLinksEditor = ({ initialLinkedin, initialBio }) => {
  const [linkedin, setLinkedin] = useState(initialLinkedin || "");
  const [bio, setBio] = useState(initialBio || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const save = async () => {
    setSaving(true);
    setSaved(false);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/user/linkedin`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          linkedin,
          bio,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save profile");
      }

      setSaved(true);
    } catch (err) {
      console.error("Profile update failed:", err);
      setError(err.message || "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Bio */}
      <div>
        <div className="flex items-end justify-between">
          <label className="text-sm font-semibold text-zinc-900">
            About you
          </label>

          <span className="text-[11px] text-zinc-400">
            {bio.length}/200
          </span>
        </div>

        <p className="mt-1 text-xs leading-5 text-zinc-400">
          Tell other developers what you build, what you're interested in,
          or who you'd like to collaborate with.
        </p>

        <textarea
          value={bio}
          onChange={(e) => {
            if (e.target.value.length <= 200) {
              setBio(e.target.value);
            }
          }}
          rows={4}
          placeholder="e.g. Building MERN apps and practicing DSA. Looking for people interested in AI/ML and open source."
          className="mt-3 w-full resize-none rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm leading-6 text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-red-300 focus:bg-white focus:ring-4 focus:ring-red-50"
        />
      </div>

      {/* LinkedIn */}
      <div>
        <label className="text-sm font-semibold text-zinc-900">
          LinkedIn
        </label>

        <p className="mt-1 text-xs leading-5 text-zinc-400">
          Add your professional profile so developers can learn more about
          your work.
        </p>

        <input
          type="url"
          placeholder="https://linkedin.com/in/your-profile"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          className="mt-3 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-red-300 focus:bg-white focus:ring-4 focus:ring-red-50"
        />
      </div>

      {/* Save */}
      <div className="flex items-center justify-between gap-4">
        <div>
          {saved && (
            <p className="text-xs font-medium text-emerald-500">
              Profile updated successfully
            </p>
          )}

          {error && (
            <p className="text-xs font-medium text-red-500">
              {error}
            </p>
          )}
        </div>

        <button
          onClick={save}
          disabled={saving}
          className="rounded-xl bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save changes"}
        </button>
      </div>
    </div>
  );
};

export default SocialLinksEditor;