import { NavLink, useNavigate } from "react-router-dom";

import {
FaTachometerAlt,
FaBox,
FaShoppingCart,
FaUsers,
FaStar,
FaSignOutAlt
} from "react-icons/fa";


import "../../styles/admin/sidebar.css";



const AdminSidebar = () => {


const navigate = useNavigate();



const logout = ()=>{

localStorage.removeItem("token");

localStorage.removeItem("user");

navigate("/login");

};





return (

<div className="admin-sidebar">


<h2>
ShopSphere Admin
</h2>



<nav>


<NavLink to="/admin">

<FaTachometerAlt />

Dashboard

</NavLink>




<NavLink to="/admin/products">

<FaBox />

Products

</NavLink>




<NavLink to="/admin/orders">

<FaShoppingCart />

Orders

</NavLink>




<NavLink to="/admin/users">

<FaUsers />

Users

</NavLink>




<NavLink to="/admin/reviews">

<FaStar />

Reviews

</NavLink>



</nav>




<button onClick={logout}>

<FaSignOutAlt />

Logout

</button>



</div>

);


};


export default AdminSidebar;