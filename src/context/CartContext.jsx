'use client'
import { createContext } from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { processCartItems , checkForIndex }from "@/utils/processCartItems";


export const CartContext = createContext()

// Cart reducer runs twice for some reason so the increment values are devided by 2 
export const CartReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CART':
            return{
                items: action.payload
            }
        case 'ADD_ITEM': {
            // Clone the current items as to not modify the state directly
            const currentItems = JSON.parse(JSON.stringify(state.items))
            const isInArrayIndex = checkForIndex(currentItems , action.payload._id)

            // If item is not already in the array add it to the array and add a quantity propriety
            if(isInArrayIndex === null){
                action.payload.quantity = 1
                currentItems.push(action.payload)
            } else {
            // If item is in an array just modify the quantity
                currentItems[isInArrayIndex].quantity += 1
            }

            return {
                items:currentItems
            }
        }
        case 'REMOVE_ITEM':{
            // Clone the current items as to not modify the state directly
            let currentItems = JSON.parse(JSON.stringify(state.items))
            const isInArrayIndex = checkForIndex(currentItems , action.payload._id)

            // Check if item exists in the current array
            if(isInArrayIndex !== null){
                // If quantity is higher than 1 then just subtract 1 
                if(currentItems[isInArrayIndex].quantity > 1){
                    currentItems[isInArrayIndex].quantity -= 1
                } else {
                // If quantity is lower or 1 then remove the item from the array
                    currentItems = currentItems.filter((item) => item._id !== action.payload._id)
                }

            }
            return {
                items:currentItems
            }
        }          
        default:
            return state
    }
}

export const CartContextProvider = ({children}) => {

    
    const initialDataLoaded = useRef(false);
    const [state, dispatch] = useReducer(CartReducer, {
        items: []
    })

    useEffect(() => {
        // Retrieve cart data from localStorage on mount
        if (!initialDataLoaded.current) {
            const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
            dispatch({ type: 'SET_CART', payload: storedCart });
            initialDataLoaded.current = true;
        }
      }, []);
    
      useEffect(() => {
        // Set cart data in local storage on change
        localStorage.setItem('cart', JSON.stringify(state.items));
        console.log("ITEMS : " , state.items)
      }, [state.items]);


    return(
        <CartContext.Provider value={{...state, dispatch}}> 
            { children }
        </CartContext.Provider>
    )
}