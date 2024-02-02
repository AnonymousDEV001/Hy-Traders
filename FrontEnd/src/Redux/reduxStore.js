import { configureStore } from "@reduxjs/toolkit";
import signInToggleSlice from "./signIn/signInToggleSlice";
import ProductFetchSlice from "./products/ProductFetchSlice";
import productsFetchSlice from "./products/productsFetchSlice";
import cartSlice from "./Cart/cartSlice";
import authSlice from "./handelingAuth/authSlice";


export const store = configureStore({
    reducer:{
        products:productsFetchSlice,
        product:ProductFetchSlice,
        cartItems:cartSlice,
        signInToggle:signInToggleSlice,
        userCreds:authSlice,

    }
})