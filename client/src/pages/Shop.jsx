import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products?t=${new Date().getTime()}`)
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : (res.data.products || []);
        setProducts(data);
        setLoading(false);
      })
      .catch(err => { console.log(err); setLoading(false); });
  }, []);

  if (loading) return <div style={{ textAlign: "center", padding: "100px", color: "#64748b" }}>Loading Shop...</div>;

  return (
    <div style={{ maxWidth: "1200px", margin: "40px auto", padding: "0 20px", fontFamily: "sans-serif" }}>
      <h2 style={{ fontSize: "1.8rem", color: "#131921", marginBottom: "20px", fontWeight: "700" }}>All Shop Products</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "25px" }}>
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
