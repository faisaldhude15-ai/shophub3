import api from "./api";


// =========================
// Dashboard
// =========================

export const getDashboard = () => {

    return api.get("/admin/dashboard");

};



// =========================
// Users
// =========================

export const getAllUsers = () => {

    return api.get("/admin/users");

};



export const getUserById = (id) => {

    return api.get(`/admin/users/${id}`);

};



export const updateUserStatus = (id, data) => {

    return api.put(
        `/admin/users/${id}/status`,
        data
    );

};



// =========================
// Products
// =========================

export const getAdminProducts = () => {

    return api.get("/products");

};



// =========================
// Orders
// =========================

export const getAdminOrders = () => {

    return api.get("/admin/orders");

};



// =========================
// Reviews
// =========================

export const getAllReviews = () => {

    return api.get("/reviews/admin/all");

};



export const deleteReview = (id) => {

    return api.delete(`/reviews/${id}`);

};