import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../services/authApi";

import "../styles/register.css";



const Register = () => {


const navigate = useNavigate();



const [form,setForm] = useState({

name:"",

email:"",

phone:"",

password:"",

confirmPassword:""

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




if(form.password !== form.confirmPassword){


setError("Passwords do not match");


return;


}






const data={


name:form.name,

email:form.email,

phone:form.phone,

password:form.password


};






await registerUser(data);





alert("Registration Successful");



navigate("/login");




}

catch(error){


console.log(error);



setError(

error.response?.data?.message ||

"Registration Failed"

);


}


};







return (

<div className="register-page">





<div className="register-box">





<h1>

Create Account

</h1>







{

error &&

<p className="error">

{error}

</p>

}







<form onSubmit={handleSubmit}>






<input

type="text"

name="name"

placeholder="Full Name"

value={form.name}

onChange={handleChange}

required

/>








<input

type="email"

name="email"

placeholder="Email Address"

value={form.email}

onChange={handleChange}

required

/>








<input

type="text"

name="phone"

placeholder="Phone Number"

value={form.phone}

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








<input

type="password"

name="confirmPassword"

placeholder="Confirm Password"

value={form.confirmPassword}

onChange={handleChange}

required

/>









<button type="submit">

Register

</button>






</form>








<p>

Already have an account?


<Link to="/login">

Login

</Link>


</p>






</div>





</div>

);


};



export default Register;