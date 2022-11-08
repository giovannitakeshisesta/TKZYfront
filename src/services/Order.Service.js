import createHttp from "./BaseService";

const http = createHttp(true);

//---------------------- HOLDERS ----------------------
export const getHolder = () => http.get("/holder");
export const putHolder = (data) => http.put(`/holder`, data);

//---------------------- ORDERS ----------------------
export const getOrders = ( ) => http.get("/orders");
export const createOrder = (data) => http.post("/orders/create", data);
export const patchOrder = (id, order) => http.patch(`/orders/${id}`, order);
export const deleteFromOrders = (id) => http.delete(`/orders/${id}`);
export const editIsDone = ( orderId, itemId) =>  http.patch(`/orders/isdone/${orderId}`, itemId);

