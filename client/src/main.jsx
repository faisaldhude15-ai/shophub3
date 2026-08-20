import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx"; // ⚡ کارٹ سسٹم امپورٹ کیا
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider> {/* ⚡ یہاں پر پورے ایپ کو کارٹ کے ڈبے میں بند کر دیا */}
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
