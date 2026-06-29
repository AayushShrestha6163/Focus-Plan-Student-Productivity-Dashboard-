import api from "./axios";


export const getGoals = async()=>{

const res = await api.get("/goals");

return res.data;

}