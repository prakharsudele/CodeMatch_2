// components/SocialLinksEditor.jsx
import { useState } from "react";
import { API_BASE_URL } from "../api";

const SocialLinksEditor = ({ initialLinkedin }) => {
  const [linkedin, setLinkedin] = useState(initialLinkedin || "");
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);

    await fetch(`${API_BASE_URL}/user/linkedin`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ linkedin }),
    });

    setSaving(false);
  };

  return (
    <div className="mt-8 space-y-4 max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-white">
        Social links
      </h3>

      <input
        type="url"
        placeholder="LinkedIn profile URL"
        value={linkedin}
        onChange={(e) => setLinkedin(e.target.value)}
        className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white"
      />

      <button
        onClick={save}
        disabled={saving}
        className="px-6 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  );
};

export default SocialLinksEditor;
