import {useEffect,useState} from "react";
import {useParams,useNavigate} from "react-router-dom";

import {
getTasks,
updateTask
} from "../api/taskApi";


import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import "../styles/EditTask.css";



export default function EditTask(){


const {id}=useParams();

const navigate = useNavigate();



const [task,setTask]=useState<any>({

title:"",
description:"",
priority:"Medium",
completed:false
});





useEffect(()=>{

loadTask();

},[]);





const loadTask = async()=>{


const tasks = await getTasks();


const current = tasks.find(
(t:any)=>t._id===id
);


setTask(current);



};






const handleChange=(e:any)=>{


setTask({

...task,

[e.target.name]:e.target.value

});


};







const saveTask = async(e:any)=>{


e.preventDefault();


await updateTask(

id!,

task

);


navigate("/tasks");


};







return (

<div>


<Sidebar/>

<Navbar/>




<div className="edit-page">


<div className="edit-card">


<h1>
Edit Task
</h1>




<form onSubmit={saveTask}>


<input

name="title"

value={task.title}

onChange={handleChange}

placeholder="Task title"

/>





<textarea

name="description"

value={task.description}

onChange={handleChange}

placeholder="Description"

/>







<select

name="priority"

value={task.priority}

onChange={handleChange}

>


<option>
High
</option>

<option>
Medium
</option>


<option>
Low
</option>


</select>





<button>

Update Task

</button>




</form>




</div>



</div>


</div>

)


}