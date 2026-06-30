import axiosInstance from "./axios";

export interface Goal {
  _id: string;
  title: string;
  description?: string;
  targetValue: number;
  currentValue: number;
  completed: boolean;
  userId: string;
}

export const getGoals = async () => {
  const res = await axiosInstance.get("/goals");
  return res.data;
};

export const addGoal = async (goal: {
  title: string;
  description?: string;
  targetValue: number;
}) => {
  const res = await axiosInstance.post("/goals", goal);
  return res.data;
};

export const updateGoal = async (id: string, goal: Partial<Goal>) => {
  const res = await axiosInstance.put(`/goals/${id}`, goal);
  return res.data;
};

export const deleteGoal = async (id: string) => {
  const res = await axiosInstance.delete(`/goals/${id}`);
  return res.data;
};