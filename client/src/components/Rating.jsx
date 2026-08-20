import { FaStar } from "react-icons/fa";

import "../styles/rating.css";


const Rating = ({value=0})=>{


return (

<div className="rating-stars">


{

[1,2,3,4,5].map((star)=>(


<FaStar

key={star}

className={

star <= value

?

"active-star"

:

"empty-star"

}

/>


))


}


</div>

);


};


export default Rating;