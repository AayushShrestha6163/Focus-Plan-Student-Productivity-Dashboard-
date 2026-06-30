import api from "./axios";

export interface Task {
  _id: string;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  schedule: string;
  reminder: boolean;
  completed: boolean;
  userId: string;
}

// GET TASKS
export const getTasks = async () => {
  const res = await api.get("/tasks");
  return res.data;
};

// GET SINGLE TASK
export const getTaskById = async (id: string) => {
  const res = await api.get(`/tasks/${id}`);
  return res.data;
};

// ADD TASK
export const addTask = async (data: Partial<Task>) => {
  const res = await api.post("/tasks", data);
  return res.data;
};

// DELETE TASK
export const deleteTask = async (id: string) => {
  const res = await api.delete(`/tasks/${id}`);
  return res.data;
};

// UPDATE TASK
export const updateTask = async (id: string, data: any) => {
  const res = await api.put(`/tasks/${id}`, data);
  return res.data;
};