import api from "./api";


// Get User Wishlist

export const getWishlist = () => {

    return api.get("/wishlist");

};



// Add Product To Wishlist

export const addToWishlist = (productId) => {

    return api.post("/wishlist", {

        productId

    });

};



// Remove Wishlist Item

export const removeWishlistItem = (productId) => {

    return api.delete(`/wishlist/${productId}`);

};