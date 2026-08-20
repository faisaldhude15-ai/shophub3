import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../services/authApi";

import "../styles/login.css";



const Login = () => {


const navigate = useNavigate();



const [form,setForm] = useState({

email:"",

password:""

});



const [error,setError] = useState("");






const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};







const handleSubmit=async(e)=>{


e.preventDefault();


try{


setError("");



const res = await loginUser(form);





// Save JWT

localStorage.setItem(

"token",

res.data.token

);





// Save user

localStorage.setItem(

"user",

JSON.stringify(res.data.user)

);





alert("Login Successful");



navigate("/");



}

catch(error){


console.log(error);


setError(

error.response?.data?.message ||

"Invalid Email or Password"

);


}


};








return (

<div className="login-page">





<div className="login-box">





<h1>

Login

</h1>





{

error &&

<p className="error">

{error}

</p>

}








<form onSubmit={handleSubmit}>



<input

type="email"

name="email"

placeholder="Email Address"

value={form.email}

onChange={handleChange}

required

/>






<input

type="password"

name="password"

placeholder="Password"

value={form.password}

onChange={handleChange}

required

/>







<button type="submit">

Login

</button>





</form>







<p>

Don't have an account?


<Link to="/register">

Register

</Link>


</p>





</div>





</div>

);


};



export default Login;