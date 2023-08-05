import { createSlice } from "@reduxjs/toolkit";

const productSlice =  createSlice({ 
    name:'product',
    initialState:{
        loading:false,
        product:{},
        isReviewSubmitted : false,
        isProductCreated:false,
        isReviewDeleted:false,
        reviews:[]
    },
    reducers:{
        productRequset(state,action){
            return {
                ...state,
                loading:true
            }
        },
        productSuccess(state,action){
            return{
                ...state,
                loading:false,
                product:action.payload.product
            }
        },
        productFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        createReviewRequset(state,action){
            return {
                ...state,
                loading:true,
               

            }
        },
        createReviewSuccess(state,action){
            return{
                ...state,
                loading:false,
                isReviewSubmitted : true
            }
        },
        createReviewFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        clearReviewSubmitted(state,action){
            return{
                ...state,
                isReviewSubmitted : false

            }
        },
        clearError(state,action){
            return{
                ...state,
                error:null
            }
        },
        clearProduct(state,action){
            return{
                ...state,
                product:{}
            }
        },
        newProductRequset(state,action){
            return {
                ...state,
                loading:true
            }
        },
        newProductSuccess(state,action){
            return{
                ...state,
                loading:false,
                product:action.payload.product,
                isProductCreated:true
            }
        },
        newProductFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload,
                isProductCreated:false
            }
        },
        clearProductCreated(state,action){
            return{
                ...state,
                isProductCreated:false
            }
        },
        deleteProductRequset(state,action){
            return {
                ...state,
                loading:true,
                isProductDeleted:false
            }
        },
        deleteProductSuccess(state,action){
            return{
                ...state,
                loading:false,
                isProductDeleted:true
            }
        },
        deleteProductFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload,
              
            }
        },
        clearProductDeleted(state,action){
            return{
                ...state,
                isProductDeleted:false
            }
        },
        updateProductRequset(state,action){
            return {
                ...state,
                loading:true,
                isProductUpdate:false

            }
        },
        updateProductSuccess(state,action){
            return{
                ...state,
                loading:false,
                product:action.payload.product,
                isProductUpdate:true
            }
        },
        updateProductFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload,
                
            }
        },
        clearProductUpdated(state,action){
            return{
                ...state,
                isProductUpdate:false
            }
        },
        reviewsRequset(state,action){
            return {
                ...state,
                loading:true
            }
        },
        reviewsSuccess(state,action){
            return{
                ...state,
                loading:false,
                reviews:action.payload.reviews
            }
        },
        reviewsFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        deleteReviewsRequset(state,action){
            return {
                ...state,
                loading:true,
              
            }
        },
        deleteReviewsSuccess(state,action){
            return{
                ...state,
                loading:false,
                isReviewDeleted:true
            }
        },
        deleteReviewsFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload,
              
            }
        },
        clearReviewDeleted(state,action){
            return{
                ...state,
                isReviewDeleted:false
            }
        },

    }
})

const {actions,reducer} = productSlice;
export const {
    productRequset,
    productSuccess,
    productFail,
    createReviewSuccess,
    createReviewRequset,
    createReviewFail,
    clearError,
    clearReviewSubmitted,
    clearProduct,
    newProductRequset,
    newProductSuccess,
    newProductFail,
    clearProductCreated,
    deleteProductFail,
    deleteProductRequset,
    deleteProductSuccess,
    clearProductDeleted,
    updateProductFail,
    updateProductRequset,
    updateProductSuccess,
    clearProductUpdated,
    reviewsFail,
    reviewsRequset,
    reviewsSuccess,
    deleteReviewsFail,
    deleteReviewsRequset,
    deleteReviewsSuccess,
    clearReviewDeleted
} = actions
export default reducer;