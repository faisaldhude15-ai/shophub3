import React, { useContext } from "react";
import { CartContext } from "../context/CartContext"; 
import "../styles/productCard.css";

const ProductCard = ({ product }) => {
  const cartContext = useContext(CartContext);
  const addToCart = cartContext ? cartContext.addToCart : null;

  // Safe Image path selector based on checked section placement flags
  const getImage = () => {
    if (product?.isBestSeller && product?.bestSellerImage) {
      return product.bestSellerImage;
    }
    if (product?.isNewArrival && product?.newArrivalImage) {
      return product.newArrivalImage;
    }
    if (product?.isFlashDeal && product?.flashDealImage) {
      return product.flashDealImage;
    }
    if (product?.images) {
      if (Array.isArray(product.images) && product.images.length > 0) {
        return product.images[0];
      }
      if (typeof product.images === "string") {
        return product.images;
      }
    }
    return "/images/default.jpg";
  };

  const handleCartClick = () => {
    if (addToCart) {
      addToCart(product);
    } else {
      console.warn("CartContext Provider is missing in main.jsx!");
      alert(`${product?.name || "Product"} selected, but Cart System is not wrapped in main.jsx yet.`);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img
          src={
            getImage() && getImage().startsWith("/uploads")
              ? `http://localhost:5000${getImage()}`
              : getImage()
          }
          alt={product?.name || "Product Image"}
          loading="lazy"
          onError={(e) => {
            e.target.src = "/images/default.jpg";
          }}
        />
      </div>

      <h3>{product?.name || "Unknown Product"}</h3>
      <p className="brand">Brand: {product?.brand || "Generic"}</p>

      <div className="rating">
        ⭐ {product?.ratings || 0}
        <span> ({product?.numReviews || 0} Reviews)</span>
      </div>

      <div className="price">Rs {product?.price || 0}</div>
      <p>Stock: {product?.stock || 0}</p>

      <button className="cart-btn" onClick={handleCartClick}>
        Add To Cart
      </button>
    </div>
  );
};

export default ProductCard;
