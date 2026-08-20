import api from "./api";



export const getCart = ()=>{

return api.get("/cart");

};



export const addToCart = (data)=>{

return api.post("/cart",data);

};



export const updateCartItem = (id,quantity)=>{

return api.put(`/cart/${id}`,{

quantity

});

};



export const removeCartItem = (id)=>{

return api.delete(`/cart/${id}`);

};