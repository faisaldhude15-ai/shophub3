import { useState } from "react";

import {
FaMinus,
FaPlus
} from "react-icons/fa";


import "../styles/quantitySelector.css";



const QuantitySelector = ({
quantity = 1,
onChange
}) => {


const [count,setCount]=useState(quantity);



const updateQuantity=(value)=>{


let newValue=count + value;


if(newValue < 1){

newValue=1;

}


setCount(newValue);



if(onChange){

onChange(newValue);

}


};





return (

<div className="quantitySelector">


<button

onClick={()=>updateQuantity(-1)}

>

<FaMinus/>

</button>



<span>

{count}

</span>




<button

onClick={()=>updateQuantity(1)}

>

<FaPlus/>

</button>



</div>

);


};



export default QuantitySelector;