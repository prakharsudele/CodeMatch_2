import { API_BASE_URL } from "../api";

export const fetchNotifications = async () => {
  const res = await fetch(`${API_BASE_URL}/notifications`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.json();
};

export const markNotificationsRead = async () => {
  await fetch(`${API_BASE_URL}/notifications/read`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
