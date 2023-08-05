import axios from 'axios'
import { adminProductsFail, adminProductsRequset, adminProductsSuccess, productsFail, productsRequset, productsSuccess } from '../slices/productsSlice';
import { createReviewFail, createReviewRequset, createReviewSuccess, deleteProductFail, deleteProductRequset, deleteProductSuccess, deleteReviewsFail, deleteReviewsRequset, deleteReviewsSuccess, newProductFail, newProductRequset, newProductSuccess, productFail, productRequset, productSuccess, reviewsFail, reviewsRequset, reviewsSuccess, updateProductFail, updateProductRequset, updateProductSuccess } from '../slices/productSlice';

export const getProducts = (keyword,price, category,rating, currentPage) => async(dispatch)=>{
   
    try {  
        dispatch(productsRequset()) 
        let link = `/api/v1/products?page=${currentPage}`;
        
        if(keyword) {
            link += `&keyword=${keyword}`
        }
        if(price) {
            link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`
        }
        if(category) {
            link += `&category=${category}`
        }
        if(rating) {
            link += `&ratings=${rating}`
        }
    const {data} = await axios.get(link);
        dispatch(productsSuccess(data))
    } catch (error) {
        // handle error
        dispatch(productsFail(error.response.data.message))
    }
}


export const getProduct = id => async(dispatch)=>{
    try {
        dispatch(productRequset()) 
        const {data} = await axios.get(`/api/v1/product/${id}`);
        dispatch(productSuccess(data))
    } catch (error) {
        // handle error
        dispatch(productFail(error.response.data.message))
    }
}

export const createReview = reviewData => async(dispatch)=>{
    try {
        dispatch(createReviewRequset()) 
        const config = {
            headers :{
                'Content-type':'application/json'
            }
        }
        const {data} = await axios.put(`/api/v1/review`,reviewData,config);
        dispatch(createReviewSuccess(data))
    } catch (error) {
        // handle error
        dispatch(createReviewFail(error.response.data.message))
    }
}

export const getAdminProducts = async(dispatch)=>{
    try {
        dispatch(adminProductsRequset())
        const {data} = await axios.get(`/api/v1/admin/products`)
        dispatch(adminProductsSuccess(data))
    } catch (error) {
        dispatch(adminProductsFail(error.response.data.message))
    }
}
export const createNewProduct = productData => async(dispatch)=>{
    try {
        dispatch(newProductRequset ())
        const {data} = await axios.post(`/api/v1/admin/products/new `,productData)
        dispatch(newProductSuccess(data))
    } catch (error) {
        dispatch(newProductFail(error.response.data.message))
    }
}
export const deleteProduct = id => async(dispatch)=>{
    try {
        dispatch(deleteProductRequset ())
            await axios.delete(`/api/v1/admin/products/${id} `)
        dispatch(deleteProductSuccess())
    } catch (error) {
        dispatch(deleteProductFail(error.response.data.message))
    }
}
export const updateProduct = (id,productData) => async(dispatch)=>{
    try {
        dispatch(updateProductRequset())
           const {data} =  await axios.put(`/api/v1/admin/products/${id} `,productData)
        dispatch(updateProductSuccess(data))
    } catch (error) {
        dispatch(updateProductFail(error.response.data.message))
    }
}

export const getReviews  = id => async(dispatch)=>{
   
    try {  
        dispatch(reviewsRequset()) 
        
    const {data} = await axios.get(`/api/v1/admin/reviews`,{params:{id}});
        dispatch(reviewsSuccess(data))
    } catch (error) {
        // handle error
        dispatch(reviewsFail(error.response.data.message))
    }
}

export const deleteReview =  (productId, id) => async (dispatch) => {

    try {  
        dispatch(deleteReviewsRequset()) 
          await axios.delete(`/api/v1/admin/review`,{params: {productId, id}});
        dispatch(deleteReviewsSuccess())
    } catch (error) {
        //handle error
        dispatch(deleteReviewsFail(error.response.data.message))
    }
    
}