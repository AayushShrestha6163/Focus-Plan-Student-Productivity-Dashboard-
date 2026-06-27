import "../styles/Navbar.css";


export default function Navbar(){



const user = JSON.parse(
localStorage.getItem("user") || "{}"
);



return (

<div className="navbar-dashboard">



<div>

<h2>
Dashboard
</h2>


<p>
Manage your productivity
</p>


</div>



<div className="profile-box">


<div className="avatar">

{
user.name
?
user.name.charAt(0).toUpperCase()
:
"U"
}

</div>



<div>


<h4>

{
user.name || "User"
}

</h4>


<span>
Student
</span>


</div>



</div>




</div>

)

}