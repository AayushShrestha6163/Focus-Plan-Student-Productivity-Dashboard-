import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";
import "../styles/Register.css";


export default function Register() {

const navigate = useNavigate();

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const [success,setSuccess] = useState(false);



const handleRegister = async(
e:React.FormEvent
)=>{

e.preventDefault();


try{


await api.post("/auth/register",{

name,
email,
password

});


// show success UI

setSuccess(true);


setTimeout(()=>{

navigate("/login");

},2500);



}catch(error){

alert("Registration failed");

}


};


if(success){

return (

<div className="success-page">


<div className="success-card">


<div className="success-icon">
✓
</div>


<h1>
Account Created!
</h1>


<p>
Welcome to Focus Plan 🚀
</p>


<p className="small-text">
Your productivity journey starts now.
</p>


<div className="redirect">

Redirecting to login...

</div>


</div>


</div>

)

}




return (

<div className="auth-page">


<div className="auth-card">


<h1>
Focus Plan
</h1>


<h2>
Create Account
</h2>



<form onSubmit={handleRegister}>


<input

placeholder="Full Name"

value={name}

onChange={
e=>setName(e.target.value)
}

/>



<input

type="email"

placeholder="Email"

value={email}

onChange={
e=>setEmail(e.target.value)
}

/>



<input

type="password"

placeholder="Password"

value={password}

onChange={
e=>setPassword(e.target.value)
}

/>



<button>

Create Account

</button>


</form>



<p>

Already have account?

<Link to="/login">

 Login

</Link>

</p>



</div>


</div>

)

}