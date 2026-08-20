import { useEffect, useState } from "react";

import {
getAllUsers
} from "../../services/adminApi";


import "../../styles/admin/users.css";



const AdminUsers = ()=>{


const [users,setUsers] = useState([]);

const [loading,setLoading] = useState(true);





useEffect(()=>{

fetchUsers();

},[]);






const fetchUsers = async()=>{


try{


const res = await getAllUsers();


setUsers(

res.data.users || []

);


}

catch(error){

console.log(error);

}

finally{

setLoading(false);

}


};







if(loading){

return <h2>Loading...</h2>;

}





return (

<div className="admin-users">


<h1>

All Users

</h1>




<table>


<thead>

<tr>

<th>Name</th>

<th>Email</th>

<th>Role</th>

<th>Status</th>

</tr>

</thead>



<tbody>


{

users.map(user=>(


<tr key={user._id}>


<td>

{user.name}

</td>



<td>

{user.email}

</td>



<td>

{user.role}

</td>



<td>

{user.isActive ? "Active":"Blocked"}

</td>



</tr>


))

}



</tbody>


</table>



</div>

);


};



export default AdminUsers;