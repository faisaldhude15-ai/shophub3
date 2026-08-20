import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";

import { getProductsByCategory } from "../services/productApi";


const Category =()=>{


const {category}=useParams();


const [products,setProducts]=useState([]);




useEffect(()=>{

loadProducts();

},[category]);




const loadProducts=async()=>{

const res = await getProductsByCategory(category);

setProducts(
res.data.products
);

};




return (

<div>


<h1>

{category}

</h1>



<div className="product-grid">


{

products.map(product=>(


<div key={product._id}>


<img

src={product.images[0]}

width="200"

/>


<h3>

{product.name}

</h3>


<p>

Rs {product.price}

</p>


</div>


))


}



</div>


</div>

);


};


export default Category;