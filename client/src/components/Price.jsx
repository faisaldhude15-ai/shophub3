import "../styles/price.css";


const Price = ({price,discount=0}) => {


const finalPrice = 
price - (price * discount / 100);



return (

<div className="priceBox">


<h2>

Rs. {finalPrice.toLocaleString()}

</h2>



{
discount > 0 &&

<>

<del>

Rs. {price.toLocaleString()}

</del>


<span>

{discount}% OFF

</span>

</>

}



</div>

);


};


export default Price;