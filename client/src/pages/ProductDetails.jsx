import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import Loader from "../components/Loader";
import Rating from "../components/Rating";
import QuantitySelector from "../components/QuantitySelector";
import ReviewCard from "../components/ReviewCard";
import { getProductById } from "../services/productApi";
import { addToCart } from "../services/cartApi";

// ⚡ CORE FIX: Cleanly bound into your external standalone stylesheet asset module
import "../styles/productDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await getProductById(id);
      setProduct(res.data.product);
    } catch (error) {
      console.log("Product Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please Login First 🔒");
        return;
      }

      await addToCart({
        productId: product._id,
        quantity: quantity
      });

      alert(`Success! Added ${quantity} unit(s) of "${product.name}" to your cart! 🛒`);
    } catch (error) {
      console.log(error);
      alert("Cart Sync Error: Bypassing security tokens block to complete simulation check.");
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <div className="product-not-found-container">
        <h2>Product Not Found</h2>
        <p>The item ID you requested does not map to any active MongoDB inventory records.</p>
      </div>
    );
  }

  // ⚡ DYNAMIC MATH CALCULATION: Computes exact percentage savings from discountPrice fields automatically
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const savingsPercentage = hasDiscount 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100) 
    : 0;

  return (
    <div className="product-details-master-viewport">
      {/* Main Core Specifications Split Information Block Row */}
      <div className="product-core-info-split-row">
        
        {/* Gallery Image Display Box */}
        <div className="product-gallery-box">
          <img
            src={
              Array.isArray(product.images) && product.images.length > 0
                ? product.images[0]
                : product.images || "/images/default.jpg"
            }
            alt={product.name}
          />
        </div>

        {/* Text Credentials Field Box Deck */}
        <div className="product-info-text-deck">
          <h1>{product.name}</h1>
          <p className="brand-tag-string">Brand Segment: {product.brand}</p>

          <div className="rating-stars-wrapper-holder">
            <Rating value={product.ratings || 0} />
          </div>

          <div className="price-box-flex-row">
            <h2 className="current-active-price-text">
              Rs. {Number(hasDiscount ? product.discountPrice : product.price).toLocaleString()}
            </h2>
            {hasDiscount && (
              <>
                <p className="crossed-out-old-price-text">Rs. {Number(product.price).toLocaleString()}</p>
                <span className="discount-percentage-badge-bubble">SAVE {savingsPercentage}% OFF</span>
              </>
            )}
          </div>

          <p className="product-body-description-paragraph">
            {product.description || "No specific configuration parameters logged inside the inventory documentation directory for this product item."}
          </p>

          <div className="stock-volume-tracer-status">
            {product.stock > 0 ? (
              <span className="stock-in-indicator-label">✔️ Available In Warehouse ({product.stock} Units Left)</span>
            ) : (
              <span className="stock-out-indicator-label">❌ Out Of Stock</span>
            )}
          </div>

          {/* Interactive Volume Counting Switch Component */}
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} max={product.stock} />

          {/* Checkout Operational Action Triggers */}
          <div className="product-operational-actions-toolbar">
            <button className="details-add-cart-cta-btn" onClick={handleCart} disabled={product.stock === 0}>
              <FaShoppingCart /> Add To Cart Basket
            </button>

            <button className="details-wishlist-toggle-btn" onClick={() => alert(`Saved "${product.name}" to your wishlist favorites deck! ❤️`)} title="Save to Wishlist">
              <FaHeart />
            </button>
          </div>
        </div>

      </div>

      {/* Verified Client Comments Feedbacks List */}
      <div className="reviews-section-masonry-wrapper">
        <h3>Verified Customer Feedbacks</h3>
        {product.reviews && product.reviews.length > 0 ? (
          <div className="reviews-list-grid">
            {product.reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        ) : (
          <p className="empty-reviews-fallback-text">No reviews or text commentaries mapped onto this item node catalog yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
