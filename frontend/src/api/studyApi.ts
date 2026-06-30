import axiosInstance from "./axios";

export interface StudySession {
  _id: string;
  subject: string;
  duration: number; // minutes
  date: string;
  userId: string;
}

export const getSessions = async () => {
  const res = await axiosInstance.get("/sessions");
  return res.data;
};

export const addSession = async (session: {
  subject: string;
  duration: number;
}) => {
  const res = await axiosInstance.post("/sessions", session);
  return res.data;
};