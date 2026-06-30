import { Link } from "react-router-dom";
import "../styles/Landing.css";


export default function Landing(){

return (

<div className="landing">


<nav className="navbar">


<h1 className="logo">
FOCUS PLAN
</h1>


<div className="nav-links">

<Link to="/login">
Login
</Link>

<Link 
className="nav-btn"
to="/register">
Register
</Link>

</div>


</nav>





<section className="hero">


<h1>

Stay Organized.

<br/>

<span>
Stay Productive.
</span>

</h1>


<p>

Track tasks, manage goals,
study sessions and improve your productivity.

</p>


<Link 
className="primary-btn"
to="/register">

Get Started Free

</Link>


</section>






<section className="preview">


<div className="cards">


<div className="card">
<h3>Tasks</h3>
<p>Manage daily work</p>
</div>


<div className="card">
<h3>Goals</h3>
<p>Track progress</p>
</div>


<div className="card">
<h3>Study</h3>
<p>Monitor time</p>
</div>


<div className="card">
<h3>Analytics</h3>
<p>View reports</p>
</div>


</div>



<div className="dashboard-box">

Dashboard Preview

</div>


</section>





<section className="features">


<div className="feature">
<h3>
Smart Tasks
</h3>
<p>
Organize assignments easily.
</p>
</div>



<div className="feature">

<h3>
Study Tracker
</h3>

<p>
Improve your learning habits.
</p>

</div>



<div className="feature">

<h3>
Analytics
</h3>

<p>
Understand your productivity.
</p>

</div>


</section>




<footer className="footer">

Built for Student Productivity 🚀

</footer>


</div>

);

}