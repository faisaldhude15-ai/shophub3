import { useEffect, useState } from "react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import Loader from "../../components/Loader";

import {
  getAllReviews,
  deleteReview
} from "../../services/adminApi";

import "../../styles/admin/reviews.css";


const AdminReviews = () => {


const [reviews,setReviews] = useState([]);

const [loading,setLoading] = useState(true);




useEffect(()=>{

fetchReviews();

},[]);





const fetchReviews = async()=>{


try{


const res = await getAllReviews();


setReviews(
res.data.reviews || []
);


}
catch(error){

console.log(error);

}
finally{

setLoading(false);

}


};







const removeReview = async(id)=>{


try{


if(window.confirm("Delete this review?")){


await deleteReview(id);


fetchReviews();


}


}
catch(error){

console.log(error);

}


};







if(loading){

return <Loader/>;

}







return (


<div className="admin-layout">


<AdminSidebar/>




<div className="admin-content">



<h1>
Reviews Management
</h1>





<div className="reviews-table">


<table>


<thead>

<tr>

<th>User</th>

<th>Product</th>

<th>Rating</th>

<th>Comment</th>

<th>Action</th>

</tr>

</thead>





<tbody>



{

reviews.length === 0 ? (

<tr>

<td colSpan="5">

No Reviews Found

</td>

</tr>


)

:

reviews.map((review)=>(



<tr key={review._id}>


<td>

{
review.user?.fullName || "Customer"
}

</td>





<td>

{
review.product?.name || "Product"
}

</td>





<td>

{
"⭐".repeat(review.rating || 0)
}

</td>





<td>

{
review.comment
}

</td>





<td>


<button

className="delete-review"

onClick={()=>removeReview(review._id)}

>

Delete

</button>



</td>




</tr>


))


}





</tbody>


</table>


</div>





</div>



</div>


);


};



export default AdminReviews;