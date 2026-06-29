import {useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";

import {
getTasks,
deleteTask,
updateTask
} from "../api/taskApi";


import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";


import "../styles/Tasks.css";



export default function Tasks(){


const navigate = useNavigate();


const [tasks,setTasks]=useState<any[]>([]);

const [deleteId,setDeleteId]=useState<string|null>(null);



useEffect(()=>{

loadTasks();

},[]);





const loadTasks = async()=>{

try{

const data = await getTasks();

setTasks(data);

}catch(error){

console.log(error);

}

};






const handleDelete = async()=>{


if(deleteId){


await deleteTask(deleteId);


setDeleteId(null);


loadTasks();


}

};







const toggleComplete = async(task:any)=>{


await updateTask(

task._id,

{
completed:!task.completed
}

);


loadTasks();


};







const formatDate=(date:string)=>{


if(!date) return "No date";


return new Date(date).toLocaleString(
"en-US",
{
weekday:"short",
month:"short",
day:"numeric",
hour:"numeric",
minute:"2-digit"
}
);


};









return (

<div>


<Sidebar/>

<Navbar/>




<div className="task-page">





<div className="task-header">


<div>

<h1>
My Tasks
</h1>


<p>
You have {tasks.length} tasks remaining
</p>


</div>




<button

className="add-task"

onClick={()=>navigate("/add-task")}

>

+ Add Task

</button>


</div>







<div className="task-list">





{
tasks.map((task)=>(


<div 
className="task-card"
key={task._id}
>




<div className="task-left">



<input

type="checkbox"

checked={task.completed}

onChange={()=>toggleComplete(task)}

/>





<div>


<h3
className={
task.completed
?
"completed"
:
""
}
>

{task.title}

</h3>





<p>

{task.description}

</p>






<div className="task-info">



<span className={
task.priority?.toLowerCase()
}>

{task.priority}

</span>





<span>

📅 {formatDate(task.schedule)}

</span>





</div>





</div>



</div>






<div className="actions">


<button

className="edit-btn"

onClick={()=>navigate(
`/edit-task/${task._id}`
)}

>

Edit

</button>






<button

className="delete-btn"

onClick={()=>setDeleteId(task._id)}

>

Delete

</button>



</div>






</div>



))

}





</div>









<div className="task-stats">





<div className="stat-box blue">


<h2>

{tasks.length}

</h2>


<p>
TOTAL TASKS
</p>


</div>






<div className="stat-box">


<h2>

42h 15m

</h2>


<p>
DEEP WORK HOURS
</p>


</div>







<div className="stat-box">


<h2>

84%

</h2>


<p>
EFFICIENCY RATE
</p>


</div>






</div>







</div>








{
deleteId &&


<div className="delete-overlay">


<div className="delete-popup">


<h2>
Delete Task?
</h2>


<p>
Are you sure you want to delete this task?
</p>



<button

className="cancel-delete"

onClick={()=>setDeleteId(null)}

>

Cancel

</button>





<button

className="confirm-delete"

onClick={handleDelete}

>

Delete

</button>




</div>



</div>

}




</div>

)

}