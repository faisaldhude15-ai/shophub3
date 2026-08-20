import Rating from "./Rating";

import "../styles/reviewCard.css";


const ReviewCard = ({review}) => {


return (

<div className="reviewCard">


<div className="reviewHeader">



<div className="userInfo">


<h4>

{review.user?.name || "Customer"}

</h4>


<p>

{
new Date(review.createdAt)
.toLocaleDateString()

}

</p>


</div>





<Rating

value={review.rating}

/>



</div>





<p className="reviewComment">

{review.comment}

</p>





</div>

);


};


export default ReviewCard;