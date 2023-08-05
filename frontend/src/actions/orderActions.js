import axios from "axios"
import { adminOrdersFail, adminOrdersRequset, adminOrdersSuccess, createOrderFail, createOrderRequset, createOrderSuccess, deleteOrderFail, deleteOrderRequset, deleteOrderSuccess, orderDetailsFail, orderDetailsRequset, orderDetailsSuccess, updateOrderFail, updateOrderRequset, updateOrderSuccess, userOrdersFail, userOrdersRequset, userOrdersSuccess } from "../slices/orderSlice"

export const createOrder = order => async(dispatch) => {
    try {
        dispatch(createOrderRequset())
       const {data} = await axios.post(`/api/v1/order/new`,order)
       dispatch(createOrderSuccess(data))
    } catch (error) {
        dispatch(createOrderFail(error.response.data.message))
    }
}

export const userOrders = async(dispatch) => {
    try {
        dispatch(userOrdersRequset())
       const {data} = await axios.get(`/api/v1/myorders`)
       dispatch(userOrdersSuccess(data))
    } catch (error) {
        dispatch(userOrdersFail(error.response.data.message))
    }
}
export const orderDetail = id => async(dispatch) => {
    try {
        dispatch(orderDetailsRequset())
       const {data} = await axios.get(`/api/v1/order/${id}`)
       dispatch(orderDetailsSuccess(data))
    } catch (error) {
        dispatch(orderDetailsFail(error.response.data.message))
    }
}

export const adminOrders = async(dispatch) => {
    try {
        dispatch(adminOrdersRequset())
       const {data} = await axios.get(`/api/v1/admin/orders`)
       dispatch(adminOrdersSuccess(data))
    } catch (error) {
        dispatch(adminOrdersFail(error.response.data.message))
    }
}
export const deleteOrder = id => async(dispatch) => {
    try {
        dispatch(deleteOrderRequset())
            await axios.delete(`/api/v1/admin/order/${id}`)
       dispatch(deleteOrderSuccess())
    } catch (error) {
        dispatch(deleteOrderFail(error.response.data.message))
    }
}
export const updateOrder = (id , orderData)=> async(dispatch) => {
    try {
        dispatch(updateOrderRequset())
          const {data} =  await axios.put(`/api/v1/admin/order/${id}`,orderData)
       dispatch(updateOrderSuccess(data))
    } catch (error) {
        dispatch(updateOrderFail(error.response.data.message))
    }
}