import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  products: [],
  error: false,
  pageIndex: 1,
};

export const fetchProducts = createAsyncThunk(
  "fetchProducts",
  async (pageIndex) => {
    let url = `http://127.0.0.1:8000/api/products/?page=${pageIndex}`;
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    return response;
  }
);

export const productsFetchSlice = createSlice({
  name: "Products",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      if (state.pageIndex == 1) {
        state.products = action.payload;
      } else {
        action.payload.map((product) => state.products.push(product));
      }
    }),
      builder.addCase(fetchProducts.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(fetchProducts.rejected, (state, action) => {
        console.log("Error :", action.payload);
        state.error = true;
        state.loading = false;
      });
  },
  reducers: {
    pageIncrement: (state, action) => {
      state.pageIndex += 1;
    },
  },
});

export const { pageIncrement } = productsFetchSlice.actions;
export default productsFetchSlice.reducer;
