import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/products",
});

// ===================================
// Get All Products
// ===================================

export const getProducts = () => {
  return API.get("/");
};

// ===================================
// Get Single Product
// ===================================

export const getProductById = (id) => {
  return API.get(`/${id}`);
};

// ===================================
// Get Products By Category
// ===================================

export const getProductsByCategory = (category) => {
  return API.get(`/category/${category}`);
};

// ===================================
// Create Product
// ===================================

export const createProduct = (productData) => {
  const token = localStorage.getItem("token");

  return API.post("/", productData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ===================================
// Update Product
// ===================================

export const updateProduct = (id, productData) => {
  const token = localStorage.getItem("token");

  return API.put(`/${id}`, productData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ===================================
// Delete Product
// ===================================

export const deleteProduct = (id) => {
  const token = localStorage.getItem("token");

  return API.delete(`/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};