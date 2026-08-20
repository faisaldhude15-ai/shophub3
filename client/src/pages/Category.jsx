import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext"; // ⚡ CORE FIX: Import CartContext directly
import "../styles/category.css";

const Category = () => {
  const { category } = useParams();

  // ⚡ CORE FIX: Extract global cart handling trigger function safely
  const cartContext = useContext(CartContext);
  const addToCart = cartContext ? cartContext.addToCart : null;

  const products = {
    mobiles: [
      {
        _id: "MOB01", // Mapped specific structural IDs for MongoDB consistency
        name: "Apple iPhone 14 Pro Max",
        price: 320000, // Kept raw numeric value for perfect sum math computations
        brand: "Apple",
        images: ["/images/Apple iPhone 14 Pro Max.jpg"],
      },
      {
        _id: "MOB02",
        name: "Samsung Galaxy S25",
        price: 250000,
        brand: "Samsung",
        images: ["/images/samsung.jpg"],
      },
      {
        _id: "MOB03",
        name: "Vivo V50",
        price: 135000,
        brand: "Vivo",
        images: ["/images/vivo.jpg"],
      },
      {
        _id: "MOB04",
        name: "Xiaomi 15",
        price: 185000,
        brand: "Xiaomi",
        images: ["/images/xiaomi.jpg"],
      },
      {
        _id: "MOB05",
        name: "iPhone 16 Pro",
        price: 399999,
        brand: "Apple",
        images: ["/images/iPhone 16 Pro.jpg"],
      },
      {
        _id: "MOB06",
        name: "OnePlus 13",
        price: 210000,
        brand: "OnePlus",
        images: ["/images/oneplus.jpg"],
      },
    ],

    laptop: [
      {
        _id: "LAP01",
        name: "HP Pavilion",
        price: 185000,
        brand: "HP",
        images: ["/images/hp.jpg"],
      },
      {
        _id: "LAP02",
        name: "Dell Inspiron",
        price: 195000,
        brand: "Dell",
        images: ["/images/dell.jpg"],
      },
      {
        _id: "LAP03",
        name: "Lenovo ThinkPad",
        price: 210000,
        brand: "Lenovo",
        images: ["/images/lenovo.jpg"],
      },
      {
        _id: "LAP04",
        name: "MacBook Pro",
        price: 420000,
        brand: "Apple",
        images: ["/images/macbook.jpg"],
      },
    ],

    electronics: [
      {
        _id: "ELEC01",
        name: "Sony Headphones",
        price: 95000,
        brand: "Sony",
        images: ["/images/headphones.jpg"],
      },
      {
        _id: "ELEC02",
        name: "Gaming Mouse",
        price: 65000,
        brand: "Generic",
        images: ["/images/mouse.jpg"],
      },
      {
        _id: "ELEC03",
        name: "RGB Mouse",
        price: 8000,
        brand: "Generic",
        images: ["/images/or mouse.jpg"],
      },
    ],

    accessories: [
      {
        _id: "ACC01",
        name: "Wall Watch",
        price: 3500,
        brand: "Generic",
        images: ["/images/wall watch.jpg"],
      },
      {
        _id: "ACC02",
        name: "Wireless Mouse",
        price: 5000,
        brand: "Generic",
        images: ["/images/mouse.jpg"],
      },
      {
        _id: "ACC03",
        name: "Wall Clock",
        price: 4000,
        brand: "Generic",
        images: ["/images/Wall Clock.webp"],
      },
      {
        _id: "ACC04",
        name: "Smart Watch",
        price: 18000,
        brand: "Generic",
        images: ["/images/watch.jpg"],
      },
    ],
  };

  const items = products[category?.toLowerCase()] || [];

  // 🛒 Click event execution pipeline logic handler
  const handleCartSubmissionClick = (item) => {
    if (addToCart) {
      // Structure standard object layout before pushing into your state array
      const productPayload = {
        _id: item._id,
        name: item.name,
        price: item.price,
        brand: item.brand || "Generic",
        images: item.images,
        qty: 1
      };
      addToCart(productPayload);
      alert(`${item.name} added to cart! 🛒`);
    } else {
      console.error("CartContext provider wrapper check missing inside main.jsx tree!");
    }
  };

  return (
    <div className="category-page">
      <h1>{category?.toUpperCase()}</h1>

      <div className="category-grid">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div className="category-card" key={index}>
              {/* ⚡ Pulls exact path safely out of the array mapping string */}
              <img src={item.images[0]} alt={item.name} />

              <h3>{item.name}</h3>
              <p className="price">Rs. {item.price.toLocaleString()}</p>

              {/* ⚡ Connected action trigger button */}
              <button 
                className="category-add-btn" 
                onClick={() => handleCartSubmissionClick(item)}
              >
                Add To Cart
              </button>
            </div>
          ))
        ) : (
          <h2>No Products Found</h2>
        )}
      </div>
    </div>
  );
};

export default Category;
