import api from "./axios";


export const getSessions = async()=>{

const res = await api.get("/sessions");

return res.data;

}