import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "../styles/emptyCart.css";

const EmptyCart = () => {
  return (
    <div className="emptyCart">

      <div className="emptyCartCard">

        <div className="emptyCartIcon">
          <FaShoppingCart />
        </div>

        <h2>Your Cart is Empty</h2>

        <p>
          Looks like you haven't added any products to your shopping cart.
          Start shopping and discover amazing products at the best prices.
        </p>

        <div className="emptyCartButtons">

          <Link to="/shop" className="shopNowBtn">
            Continue Shopping
          </Link>

          <Link to="/" className="homeBtn">
            Back to Home
          </Link>

        </div>

      </div>

    </div>
  );
};

export default EmptyCart;