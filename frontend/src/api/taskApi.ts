import api from "./axios";


// GET TASKS
export const getTasks = async()=>{

const res = await api.get("/tasks");

return res.data;

};



// DELETE TASK
export const deleteTask = async(id:string)=>{

const res = await api.delete(`/tasks/${id}`);

return res.data;

};




// UPDATE TASK

export const updateTask = async(
id:string,
data:any
)=>{

const res = await api.put(
`/tasks/${id}`,
data
);

return res.data;

};