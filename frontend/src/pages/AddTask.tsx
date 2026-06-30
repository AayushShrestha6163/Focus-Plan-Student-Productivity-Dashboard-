import {useState} from "react";
import {useNavigate} from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import api from "../api/axios";

import "../styles/AddTask.css";



export default function AddTask(){


const navigate = useNavigate();



const [title,setTitle] = useState("");

const [description,setDescription] = useState("");

const [priority,setPriority] = useState("Medium");

const [schedule,setSchedule] = useState("");

const [reminder,setReminder] = useState(true);



const saveTask = async()=>{


if(!title || !schedule){

alert("Please enter task title and schedule");

return;

}



try{



await api.post("/tasks",{

title,

description,

priority,

schedule,

reminder,

completed:false

});



navigate("/tasks");



}catch(error){

console.log(error);

alert("Failed to create task");

}



};







return (

<div>


<Sidebar/>

<Navbar/>





<div className="addtask-page">





<div className="addtask-card">






<h2>
Create New Task
</h2>








<input


className="title-input"


placeholder="What needs to be done?"


value={title}


onChange={
e=>setTitle(e.target.value)
}


/>








<label>
DESCRIPTION
</label>





<textarea


placeholder="Add some details about this task..."


value={description}


onChange={
e=>setDescription(e.target.value)
}


/>









<div className="task-options">






<div className="schedule-box">


<label>
SCHEDULE
</label>



<input


type="datetime-local"


value={schedule}


onChange={
e=>setSchedule(e.target.value)
}


/>



</div>









<div className="priority-box">


<label>
PRIORITY
</label>





<div className="priority-buttons">





<button

type="button"

className={
priority==="High"
?
"active-priority"
:
""
}

onClick={
()=>setPriority("High")
}

>

High

</button>







<button

type="button"

className={
priority==="Medium"
?
"active-priority"
:
""
}

onClick={
()=>setPriority("Medium")
}

>

Medium

</button>







<button

type="button"

className={
priority==="Low"
?
"active-priority"
:
""
}

onClick={
()=>setPriority("Low")
}

>

Low

</button>






</div>


</div>






</div>









<div className="notification-box">





<div className="notify-left">


🔔


<span>

Remind me

</span>


</div>






<button


type="button"


className={
reminder
?
"toggle on"
:
"toggle"
}



onClick={
()=>setReminder(!reminder)
}


>


<div></div>


</button>







</div>









<div className="suggestion">





💡


<b>

Deep Work Suggestion

</b>





<p>

This task is estimated at 45 mins.
Schedule during your peak hours.

</p>






</div>











<div className="buttons">






<button


type="button"


onClick={
()=>navigate("/tasks")
}

>

Cancel

</button>








<button


type="button"


className="save"


onClick={saveTask}

>

Save Task

</button>







</div>









</div>







</div>






</div>

)

}