import { createSlice } from "@reduxjs/toolkit";

const authSlice =  createSlice({ 
    name:'auth',
    initialState:{
        loading:true,
        isAuthenticated:false
    },
    reducers:{
        loginRequset(state,action){
            return {
                ...state,
                loading:true
            }
        },
        loginSuccess(state,action){
            return{
                loading:false,
                isAuthenticated:true,
                user:action.payload.user
            }
        },
        loginFail(state,action){
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
        registerRequset(state,action){
            return {
                ...state,
                loading:true
            }
        },
        registerSuccess(state,action){
            return{
                loading:false,
                isAuthenticated:true,
                user:action.payload.user
            }
        },
        registerFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        loadUserRequset(state,action){
            return {
                ...state,
                isAuthenticated:false,
                loading:true
            }
        },
        loadUserSuccess(state,action){
            return{
                loading:false,
                isAuthenticated:true,
                user:action.payload.user
            }
        },
        loadUserFail(state,action){
            return{
                ...state,
                loading:false,
               
            }
        },
        logoutSuccess(state,action){
            return{
                loading:false,
                isAuthenticated:false,
                
            }
        },
        logoutFail(state,action){
            return{
                ...state,
                error:action.payload
            }
        },
        updateProfileRequset(state,action){
            return {
                ...state,
                loading:true,
                isUpdate:false
            }
        },
        updateProfileSuccess(state,action){
            return{
                ...state,
                loading:false,
                user:action.payload.user,
                isUpdate:true
            }
        },
        updateProfileFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        clearUpdateProfile(state,action){
            return{
                ...state,
                isUpdate:false
            }
        },
        updatePasswordRequset(state,action){
            return {
                ...state,
                loading:true,
                isUpdate:false
            }
        },
        updatePasswordSuccess(state,action){
            return{
                ...state,
                loading:false,
                isUpdate:true
            }
        },
        updatePasswordFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        forgotPasswordRequset(state,action){
            return {
                ...state,
                loading:true,
                message:null
                
            }
        },
        forgotPasswordSuccess(state,action){
            return{
                ...state,
                loading:false,
                message : action.payload.message
            }
        },
        forgotPasswordFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        resetPasswordRequset(state,action){
            return {
                ...state,
                loading:true,

                
            }
        },
        resetPasswordSuccess(state,action){
            return{
                ...state,
                loading:false,
                isAuthenticated:true,
                user:action.payload.user
            }
        },
        resetPasswordFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },

    }
})

const {actions,reducer} = authSlice;
export const {
    loginRequset,
    loginSuccess,
    loginFail,
    clearError,
    registerRequset,
    registerSuccess,
    registerFail,
    loadUserRequset,
    loadUserSuccess,
    loadUserFail,
    logoutSuccess,
    logoutFail,
    updateProfileRequset,
    updateProfileSuccess,
    updateProfileFail,
    updatePasswordRequset,
    updatePasswordSuccess,
    updatePasswordFail,
    forgotPasswordRequset,
    forgotPasswordSuccess,
    forgotPasswordFail,
    resetPasswordRequset,
    resetPasswordSuccess,
    resetPasswordFail,
    clearUpdateProfile
} = actions
export default reducer;