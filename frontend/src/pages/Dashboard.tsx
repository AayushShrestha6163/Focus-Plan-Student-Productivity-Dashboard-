import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";


import { getTasks } from "../api/taskApi";
import { getGoals } from "../api/goalApi";
import { getSessions } from "../api/studyApi";


import {
BarChart,
Bar,
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer
} from "recharts";


import "../styles/Dashboard.css";



export default function Dashboard(){


const navigate = useNavigate();



const [tasks,setTasks] = useState<any[]>([]);

const [goals,setGoals] = useState<any[]>([]);

const [sessions,setSessions] = useState<any[]>([]);


const [loading,setLoading] = useState(true);





let user = {
name:"User"
};



try{


const savedUser =
localStorage.getItem("user");


if(savedUser && savedUser !== "undefined"){

user = JSON.parse(savedUser);

}


}catch(error){

console.log(
"User error"
);

}






useEffect(()=>{

loadDashboard();

},[]);






const loadDashboard = async()=>{


try{


const taskData = await getTasks();

const goalData = await getGoals();

const sessionData = await getSessions();



setTasks(taskData);

setGoals(goalData);

setSessions(sessionData);



}catch(error){


console.log(
"Dashboard error",
error
);


}
finally{


setLoading(false);


}


};







const logout = ()=>{


localStorage.removeItem("token");

localStorage.removeItem("user");


navigate("/login");


};






const totalStudyHours =
sessions.reduce(

(total,item)=>
total + (item.duration || 0),

0

);







const chartData = [


{
name:"Mon",
tasks:5,
hours:2
},


{
name:"Tue",
tasks:8,
hours:3
},


{
name:"Wed",
tasks:6,
hours:4
},


{
name:"Thu",
tasks:10,
hours:5
},


{
name:"Fri",
tasks:7,
hours:6
}


];







return (


<div>



<Sidebar/>


<Navbar/>




<div className="dashboard">





<div className="dashboard-header">



<div>


<h1>

Good Morning, {user.name} 👋

</h1>



<p>

Track your productivity today

</p>


</div>






<button

className="logout-btn"

onClick={logout}

>

Logout

</button>



</div>








{
loading ?


<h2>
Loading dashboard...
</h2>



:


<div className="stats">





<div className="stat-card">


<h3>
Tasks
</h3>


<h1>
{tasks.length}
</h1>


<p>
Total tasks
</p>


</div>







<div className="stat-card">


<h3>
Goals
</h3>


<h1>
{goals.length}
</h1>


<p>
Active goals
</p>


</div>







<div className="stat-card">


<h3>
Study Hours
</h3>


<h1>
{totalStudyHours}h
</h1>


<p>
Learning time
</p>


</div>







<div className="stat-card">


<h3>
Focus Score
</h3>


<h1>
92%
</h1>


<p>
Excellent
</p>


</div>





</div>

}









<div className="charts">





<div className="chart-card">


<h2>
Task Completion
</h2>



<ResponsiveContainer
width="100%"
height={300}
>


<BarChart data={chartData}>


<XAxis
dataKey="name"
/>


<YAxis/>


<Tooltip/>


<Bar

dataKey="tasks"

 />



</BarChart>


</ResponsiveContainer>



</div>









<div className="chart-card">


<h2>
Study Progress
</h2>



<ResponsiveContainer
width="100%"
height={300}
>


<LineChart data={chartData}>


<XAxis
dataKey="name"
/>



<YAxis/>


<Tooltip/>


<Line

type="monotone"

dataKey="hours"

/>



</LineChart>



</ResponsiveContainer>



</div>





</div>







</div>





</div>


)

}