import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./authentication/authSlice"
import cartReducer from "./cart/cartSlice"

export const store = configureStore({
    reducer: {
        // auth: authReducer,
        cart: cartReducer,
    }
})