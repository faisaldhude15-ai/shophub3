import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const navigate = useNavigate();
  
  // ⚡ Extracted item update utilities straight from our global context ecosystem
  const { cartItems, removeFromCart, clearCart, updateQty } = useContext(CartContext);

  // Calculate gross subtotal pricing dynamically
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart-view-holder">
        <style>{`
          .empty-cart-view-holder { text-align: center; padding: 80px 20px; font-family: sans-serif; }
          .return-shop-cta-btn { display: inline-block; background: #ff9900; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 16px; }
          .return-shop-cta-btn:hover { background: #e68a00; }
        `}</style>
        <h2>Your Cart is Empty 🛒</h2>
        <p>Looks like you haven't added anything to your cart directory layout framework yet.</p>
        <Link to="/shop" className="return-shop-cta-btn">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-view-wrapper-panel">
      <style>{`
        .cart-view-wrapper-panel { max-width: 1200px; margin: 40px auto; padding: 0 20px; font-family: sans-serif; }
        .cart-view-wrapper-panel h2 { font-size: 1.8rem; color: #131921; margin-bottom: 24px; }
        .cart-page-split-layout { display: flex; gap: 30px; }
        .cart-items-column-grid { flex: 2; display: flex; flex-direction: column; gap: 16px; }
        .cart-item-row-card { display: flex; align-items: center; background: #ffffff; border: 1px solid #e5e7eb; padding: 16px; border-radius: 12px; box-shadow: 0 2px 5px rgba(0,0,0,0.02); }
        .cart-row-img-frame { width: 90px; height: 90px; background: #f8fafc; border-radius: 8px; overflow: hidden; display: flex; align-items: center; justify-content: center; border: 1px solid #edf2f7; }
        .cart-row-img-frame img { max-width: 90%; max-height: 90%; object-fit: contain; }
        .cart-row-text-details { margin-left: 20px; flex: 1; }
        .cart-row-text-details h3 { font-size: 1.1rem; margin: 0 0 4px 0; color: #111111; }
        .cart-row-text-details .brand-tag { font-size: 0.9rem; color: #666666; margin: 0 0 12px 0; }
        .qty-controls-layout-bar { display: flex; align-items: center; gap: 12px; }
        .qty-adjuster-btn { background: #f1f5f9; border: 1px solid #cbd5e1; width: 28px; height: 28px; border-radius: 4px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .qty-adjuster-btn:hover { background: #e2e8f0; }
        .qty-number-display { font-size: 0.95rem; font-weight: 700; width: 20px; text-align: center; }
        
        /* Deletion & Clear State Buttons Style Sheets */
        .item-deletion-trigger { background: none; border: none; color: #dc2626; font-size: 0.85rem; font-weight: 600; cursor: pointer; padding: 0; margin-left: 20px; }
        .item-deletion-trigger:hover { text-decoration: underline; }
        .clear-entire-cart-btn { align-self: flex-start; background: #f8fafc; border: 1px solid #cbd5e1; padding: 10px 18px; border-radius: 6px; cursor: pointer; font-weight: 600; color: #475569; transition: all 0.2s; }
        .clear-entire-cart-btn:hover { background: #fee2e2; color: #991b1b; border-color: #fca5a5; }

        .cart-row-financials-display { font-size: 1.2rem; font-weight: 700; color: #111111; margin-left: 30px; min-width: 100px; text-align: right; }
        .cart-billing-summary-sidebar { flex: 1; background: #ffffff; border: 1px solid #e5e7eb; padding: 24px; border-radius: 12px; height: fit-content; box-shadow: 0 4px 10px rgba(0,0,0,0.02); }
        .cart-billing-summary-sidebar h3 { margin: 0 0 20px 0; font-size: 1.3rem; color: #131921; }
        .billing-summary-data-row { display: flex; justify-content: space-between; margin-bottom: 14px; font-size: 1rem; color: #475569; }
        .shipping-free-label { color: #16a34a; font-weight: 700; }
        .total-amount-row { font-size: 1.25rem; font-weight: 700; color: #111111; margin-top: 14px; padding-top: 14px; border-top: 1px solid #e2e8f0; }
        .secure-checkout-cta-trigger-btn { width: 100%; background: #ff9900; color: #ffffff; border: none; padding: 12px; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; margin-top: 20px; transition: background 0.2s; }
        .secure-checkout-cta-trigger-btn:hover { background: #e68a00; }
        @media (max-width: 850px) { .cart-page-split-layout { flex-direction: column; } }
      `}</style>

      <h2>Shopping Cart</h2>
      
      <div className="cart-page-split-layout">
        <div className="cart-items-column-grid">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item-row-card">
              <div className="cart-row-img-frame">
                <img src={Array.isArray(item.images) ? item.images[0] : item.images || "/images/default.jpg"} alt={item.name} />
              </div>
              
              <div className="cart-row-text-details">
                <h3>{item.name}</h3>
                <p className="brand-tag">Brand: {item.brand}</p>
                
                <div className="qty-controls-layout-bar">
                  {/* ⚡ Decrements item count down. Drops off entirely if hitting 0 */}
                  <button className="qty-adjuster-btn" onClick={() => updateQty(item._id, "dec")}>-</button>
                  <span className="qty-number-display">{item.qty || 1}</span>
                  {/* ⚡ Increments item count up */}
                  <button className="qty-adjuster-btn" onClick={() => updateQty(item._id, "inc")}>+</button>
                  
                  {/* 🗑️ REMOVE BUTTON: Deletes specific item instantly on click */}
                  <button className="item-deletion-trigger" onClick={() => removeFromCart(item._id)}>
                    Remove Item
                  </button>
                </div>
              </div>
              
              <div className="cart-row-financials-display">
                Rs {item.price * (item.qty || 1)}
              </div>
            </div>
          ))}
          
          {/* 🧹 CLEAR CART BUTTON: Wipes every item out of local storage state memory */}
          <button className="clear-entire-cart-btn" onClick={clearCart}>
            Clear Entire Shopping Cart
          </button>
        </div>

        <div className="cart-billing-summary-sidebar">
          <h3>Order Summary</h3>
          <div className="billing-summary-data-row">
            <span>Subtotal Items Price</span>
            <span>Rs {totalPrice}</span>
          </div>
          <div className="billing-summary-data-row">
            <span>Shipping Logistics</span>
            <span className="shipping-free-label">FREE</span>
          </div>
          <div className="billing-summary-data-row total-amount-row">
            <span>Total Gross Price</span>
            <span>Rs {totalPrice}</span>
          </div>
          <button className="secure-checkout-cta-trigger-btn" onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
