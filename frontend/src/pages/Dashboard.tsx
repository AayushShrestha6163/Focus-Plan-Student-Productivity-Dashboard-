import { useNavigate } from "react-router-dom";

import Sidebar from "../components/sidebar";
import Navbar from "../components/Navbar";

import "../styles/Dashboard.css";


export default function Dashboard(){


const navigate = useNavigate();



let user = {
    name:"User"
};



try {


const savedUser = localStorage.getItem("user");


if(savedUser && savedUser !== "undefined"){

user = JSON.parse(savedUser);

}


}catch(error){

console.log("User parse error");

}




const logout = ()=>{


localStorage.removeItem("token");

localStorage.removeItem("user");


navigate("/login");


};




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






<div className="stats">





<div className="stat-card">


<h3>

Tasks

</h3>


<h1>

12

</h1>


<p>

Completed 8

</p>


</div>







<div className="stat-card">


<h3>

Goals

</h3>


<h1>

5

</h1>


<p>

Completed 3

</p>


</div>







<div className="stat-card">


<h3>

Study Hours

</h3>


<h1>

6.5h

</h1>


<p>

This week

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







<div className="chart-box">



<h2>

Productivity Analytics

</h2>




<div className="fake-chart">


Analytics Chart


</div>



</div>





</div>




</div>


)

}