import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toggle:false,
    method:null
}

const signInToggleSlice = createSlice({
    name:"signInToggle",
    initialState,
    reducers:{
        signinToggle:(state,action)=>{
            state.toggle = action.payload
        },
        setSigninMethod:(state,action)=>{
            state.method = action.payload
        }
    }
})

export const {signinToggle,setSigninMethod} = signInToggleSlice.actions
export default signInToggleSlice.reducer