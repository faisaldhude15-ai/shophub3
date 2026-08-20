import api from "./api";



export const getOrders = ()=>{

return api.get("/orders");

};




export const getAllOrders = ()=>{

return api.get("/admin/orders");

};




export const updateOrderStatus = (id,status)=>{


return api.put(

`/orders/${id}/status`,

{

status

}

);


};




export const createOrder = (data)=>{

return api.post("/orders",data);

};