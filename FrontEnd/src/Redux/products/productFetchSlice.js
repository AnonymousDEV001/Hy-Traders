import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading:true,
    product:[],
    features:null,
    images:null,
    storage:null,
    stock:null,
    error:false,
}

export const fetchProduct = createAsyncThunk("fetchProduct" , async(id)=>{
    const url = `http://127.0.0.1:8000/api/product/?product_id=${id}`;
    let response = await fetch(url);
    return await response.json();
})

export const fetchFeatures = createAsyncThunk("fetchFeatures" , async(id)=>{
    const url = `http://127.0.0.1:8000/api/feature/${id}/`;
    let response = await fetch(url);
    return await response.json();
})
export const fetchImages = createAsyncThunk("fetchImages" , async(id)=>{
    const url = `http://127.0.0.1:8000/api/imageUpload/${id}/`;
    let response = await fetch(url);
    return await response.json();
})
export const fetchStorage = createAsyncThunk("fetchStorage" , async(id)=>{
    const url = `http://127.0.0.1:8000/api/storage/?product_id=${id}`;
    let response = await fetch(url);
    return await response.json();
})


const productFetchSlice = createSlice({
    name:"productData",
    initialState,
    extraReducers : (builders)=>{

        // product extra reducers
        builders.addCase(fetchProduct.fulfilled , (state,action)=>{
            state.loading = false;
            state.product = action.payload;
        })
        builders.addCase(fetchProduct.pending , (state,action)=>{
            state.loading = true;
        })
        builders.addCase(fetchProduct.rejected , (state,action)=>{
            state.error = true;
            state.loading = false;
        })


        // product features extra reducers
        builders.addCase(fetchFeatures.fulfilled , (state,action)=>{
            state.loading = false;
            state.features = action.payload;
        })
        builders.addCase(fetchFeatures.pending , (state,action)=>{
            state.loading = true;
        })
        builders.addCase(fetchFeatures.rejected , (state,action)=>{
            state.error = true;
            state.loading = false;
        })


        // product images extra reducers
        builders.addCase(fetchImages.fulfilled , (state,action)=>{
            state.loading = false;
            state.images = action.payload;
        })
        builders.addCase(fetchImages.pending , (state,action)=>{
            state.loading = true;
        })
        builders.addCase(fetchImages.rejected , (state,action)=>{
            state.error = true;
            state.loading = false;
        })


        // product storage extra reducers
        builders.addCase(fetchStorage.fulfilled , (state,action)=>{
            state.loading = false;
            state.storage = action.payload;
        })
        builders.addCase(fetchStorage.pending , (state,action)=>{
            state.loading = true;
        })
        builders.addCase(fetchStorage.rejected , (state,action)=>{
            state.error = true;
            state.loading = false;
        })
    }
})


export default productFetchSlice.reducer