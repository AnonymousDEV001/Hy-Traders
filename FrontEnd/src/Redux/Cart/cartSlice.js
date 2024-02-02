import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quantity: 1,
  cartItems: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    addToCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    toggleCartCheckedOption: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => {
        if (item.cart.id == action.payload) {
          item.cart.checked = !item.cart.checked;
        }
        return item;
      });
    },
    selectAllCartCheckedOption: (state, action) => {
      state.cartItems = state.cartItems.map((item) => {
        item.cart.checked = action.payload;
        return item;
      });
    },
    changeQuantity: (state, action) => {
      if(state.cartItems !== null){
        state.cartItems = state.cartItems.filter((item) => {
          if (item.cart.id == action.payload.id) {
            item.cart.quantity = action.payload.quantity;
          }
          return item;
        });
      }
    },
  },
});

export const {
  increaseQuantity,
  decreaseQuantity,
  setCartItems,
  addToCartItems,
  toggleCartCheckedOption,
  selectAllCartCheckedOption,
  changeQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
