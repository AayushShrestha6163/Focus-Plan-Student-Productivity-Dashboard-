import api from "./axios";

export interface Notification {
  _id: string;
  title: string;
  message: string;
  type: "task" | "goal" | "study" | "system";
  read: boolean;
  userId: string;
  createdAt: string;
}

export const getNotifications = async () => {
  const res = await api.get("/notifications");
  return res.data;
};

export const markAsRead = async (id: string) => {
  const res = await api.put(`/notifications/${id}/read`);
  return res.data;
};

export const deleteNotification = async (id: string) => {
  const res = await api.delete(`/notifications/${id}`);
  return res.data;
};