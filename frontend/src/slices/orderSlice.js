import { createSlice } from "@reduxjs/toolkit";

const orderSlice =  createSlice({ 
    name: 'order',
    initialState: {
       orderDetail:{},
        userOrder:[],
        adminOrder:[],
        loading:false,
        isOrderDeleted: false,
        isOrderUpdated:false
    },
    reducers: {
       createOrderRequset(state,action){
            return{
                ...state,
                loading:true,
               
            }
       },
       createOrderSuccess(state,action){
        return{
            ...state,
            loading:false,
            orderDetail:action.payload.order
        }
   },
   createOrderFail(state,action){
    return{
        ...state,
        loading:false,
        error:action.payload
    }
}, 
    clearError(state,action){
        return{
            ...state,
            error:null
        }
    },
    userOrdersRequset(state,action){
        return{
            ...state,
            loading:true,
           
        }
},
   userOrdersSuccess(state,action){
    return{
        ...state,
        loading:false,
        userOrders: action.payload.orders
    }
},
    userOrdersFail(state,action){
    return{
        ...state,
        loading:false,
        error:action.payload
    }
}, 
orderDetailsRequset(state,action){
    return{
        ...state,
        loading:true,
       
    }
},
orderDetailsSuccess(state,action){
return{
    ...state,
    loading:false,
    orderDetail: action.payload.order
}
},
orderDetailsFail(state,action){
return{
    ...state,
    loading:false,
    error:action.payload
}
}, 
    adminOrdersRequset(state,action){
        return{
            ...state,
            loading:true,
        
        }
    },
    adminOrdersSuccess(state,action){
    return{
        ...state,
        loading:false,
        adminOrders: action.payload.orders
    }
    },
    adminOrdersFail(state,action){
    return{
        ...state,
        loading:false,
        error:action.payload
    }
}, 
    deleteOrderRequset(state,action){
        return{
            ...state,
            loading:true,
           
        }
},
   deleteOrderSuccess(state,action){
    return{
        ...state,
        loading:false,
        isOrderDeleted:true
    }
},
    deleteOrderFail(state,action){
    return{
        ...state,
        loading:false,
        error:action.payload
    }
}, 
 updateOrderRequset(state,action){
        return{
            ...state,
            loading:true,
           
        }
},
   updateOrderSuccess(state,action){
    return{
        ...state,
        loading:false,
        isOrderUpdated:true
    }
},
    updateOrderFail(state,action){
    return{
        ...state,
        loading:false,
        error:action.payload
    }
}, 
    clearOrderDeleted(state,action){
        return{
            ...state,
            isOrderDeleted:false
        }
    },
    clearOrderUpdated(state,action){
        return{
            ...state,
            isOrderUpdated:false
        }
    }
 

    }
})

const {actions,reducer} = orderSlice;
export const {
    createOrderRequset,
    createOrderSuccess,
    createOrderFail,
    clearError,
    userOrdersRequset,
    userOrdersSuccess,
    userOrdersFail,
    orderDetailsRequset,
    orderDetailsSuccess,
    orderDetailsFail,
    adminOrdersFail,
    adminOrdersRequset,
    adminOrdersSuccess,
    deleteOrderFail,
    deleteOrderRequset,
    deleteOrderSuccess,
    updateOrderFail,
    updateOrderRequset,
    updateOrderSuccess,
    clearOrderDeleted,
    clearOrderUpdated


} = actions
export default reducer;