import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";
import "../styles/Login.css";


export default function Login() {


const navigate = useNavigate();


const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const [loading,setLoading] = useState(false);



const handleLogin = async(
e: React.FormEvent
)=>{


e.preventDefault();


setLoading(true);


try{


const response = await api.post(
"/auth/login",
{
email,
password
}
);



const token = response.data.token;



// save token

localStorage.setItem(
"token",
response.data.token
);


localStorage.setItem(
"user",
JSON.stringify(response.data.user)
);



// move dashboard

navigate("/dashboard");



}
catch(error){


console.log(error);

alert(
"Invalid email or password"
);


}
finally{


setLoading(false);


}



};



return (


<div className="auth-page">


<div className="auth-card">



<h1>
Focus Plan
</h1>



<h2>
Login
</h2>



<form onSubmit={handleLogin}>


<input

type="email"

placeholder="Email"

value={email}

onChange={
(e)=>setEmail(e.target.value)
}

required

/>




<input

type="password"

placeholder="Password"

value={password}

onChange={
(e)=>setPassword(e.target.value)
}

required

/>




<button 
type="submit"
disabled={loading}
>


{
loading
?
"Logging in..."
:
"Login"
}


</button>



</form>




<p>

Don't have account?


<Link to="/register">

 Create Account

</Link>


</p>



</div>


</div>


);

}