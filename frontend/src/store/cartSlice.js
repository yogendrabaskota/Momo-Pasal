import {createSlice} from "@reduxjs/toolkit"
import { APIAuthenticated } from "../http"
import { STATUSES } from "../globals/misc/statuses"


const cartSlice = createSlice({
    name : "cart",
    initialState : 
        {
        items : [],
        status : STATUSES.SUCCESS,
        }

    ,
    reducers : {
        setItems(state,action){
            state.items = action.payload
        },
        setStatus(state,action){
            state.status = action.payload
        }
    }

})

export const {setItems, setStatus} = cartSlice.actions
export default cartSlice.reducer

export function addToCart(productId){
    return async function addToCartThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await APIAuthenticated.post(`/cart/${productId}`)
          //  dispatch(setUser(response.data.data))
            dispatch(setItems(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUSES.ERROR))

        }
    }
}

export function fetchCartItems(){
    return async function fetchCartItemstThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await APIAuthenticated.get(`/cart`)
          
            dispatch(setItems(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUSES.ERROR))

        }
    }
}