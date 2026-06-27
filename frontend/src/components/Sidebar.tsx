import {
  Home,
  CheckSquare,
  Target,
  BookOpen,
  Calendar,
  Bell,
  BarChart3,
  LogOut
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import "../styles/Sidebar.css";


export default function Sidebar(){


const navigate = useNavigate();



const logout = ()=>{

localStorage.removeItem("token");
localStorage.removeItem("user");

navigate("/login");

};



return (

<div className="sidebar">


<h2>
Focus Plan
</h2>



<div className="menu">


<div className="menu-item active">
<Home size={20}/>
<span>Dashboard</span>
</div>



<div className="menu-item">
<CheckSquare size={20}/>
<span>Tasks</span>
</div>




<div className="menu-item">
<Target size={20}/>
<span>Goals</span>
</div>




<div className="menu-item">
<BookOpen size={20}/>
<span>Study</span>
</div>




<div className="menu-item">
<BarChart3 size={20}/>
<span>Analytics</span>
</div>




<div className="menu-item">
<Calendar size={20}/>
<span>Calendar</span>
</div>




<div className="menu-item">
<Bell size={20}/>
<span>Notifications</span>
</div>



</div>




<button
className="sidebar-logout"
onClick={logout}
>

<LogOut size={18}/>

Logout

</button>



</div>

)

}