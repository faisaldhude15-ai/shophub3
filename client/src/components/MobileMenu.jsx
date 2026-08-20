import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

import "../styles/mobileMenu.css";


const MobileMenu = ({open,setOpen}) => {


return (

<div

className={
open
?
"mobileMenu active"
:
"mobileMenu"
}

>


<div className="mobileHeader">


<h2>
ShopSphere
</h2>


<button

onClick={()=>setOpen(false)}

>

<FaTimes/>

</button>


</div>




<ul>


<li>

<Link

to="/"

onClick={()=>setOpen(false)}

>

Home

</Link>

</li>



<li>

<Link

to="/shop"

onClick={()=>setOpen(false)}

>

Shop

</Link>

</li>




<li>

<Link

to="/category/Mobiles"

onClick={()=>setOpen(false)}

>

Mobiles

</Link>

</li>





<li>

<Link

to="/category/Electronics"

onClick={()=>setOpen(false)}

>

Electronics

</Link>

</li>





<li>

<Link

to="/cart"

onClick={()=>setOpen(false)}

>

Cart

</Link>

</li>





<li>

<Link

to="/login"

onClick={()=>setOpen(false)}

>

Login

</Link>

</li>



</ul>



</div>

);


};


export default MobileMenu;