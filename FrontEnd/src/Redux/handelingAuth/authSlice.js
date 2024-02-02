import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  accessTokens: null,
  errors: null,
  user: null,
  message: null,
  loading: false,
};








export const getUserDetails = createAsyncThunk("getUserDetails", async () => {
  try {
    const accessToken = JSON.parse(localStorage.getItem("accessToken")).access;
    const response = await fetch("http://127.0.0.1:8000/api/user/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(accessToken),
      },
    });

    if (!response.ok) {
      // Handle non-200 HTTP response codes
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const userDetails = await response.json();
    return userDetails;
  } catch (error) {
    // Handle fetch errors or JSON parsing errors
    console.error("Error fetching user details:", error);
    throw error; // Rethrow the error for the calling code to handle
  }
});









// Getting access token using email and password
export const userLogin = createAsyncThunk("userLogin", async (cred) => {
  const url = "http://127.0.0.1:8000/api/token/";
  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: cred.email,
      password: cred.password,
    }),
  });
  response = await response.json();
  return response;
});












export const userSignup = createAsyncThunk("userSignup", async (cred) => {
  const url = "http://127.0.0.1:8000/api/create/user/";
  let response = await fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: cred.email,
      first_name : cred.firstName,
      last_name : cred.lastName,
      password : cred.password,
      password2 : cred.confirmPassword
    }),
  });
  response = await response.json();
  console.log(response)
  return response;
});















// Getting access token using oauth
export const oauthUserLogin = createAsyncThunk(
  "oauthUserLogin",
  async (cred) => {
    const url = "http://127.0.0.1:8000/api/token_verification_view/";

    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the content type here
      },
      body: JSON.stringify({
        provider: cred.provider,
        token: cred.access_token,
      }),
    });

    response = await response.json();
    return response;
  }
);











//Fetch Request for refreshing tokens
export const refreshAuth = createAsyncThunk("refreshAuth", async () => {
  try {
    const refresh = JSON.parse(localStorage.getItem("accessToken")).refresh;
    const url = "http://127.0.0.1:8000/api/token/refresh/";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: refresh,
      }),
    });
    const data = await response.json();

    if (response.status == 200) {
      let token = {
        refresh: refresh,
        access: data.access,
      };
      localStorage.setItem("accessToken", JSON.stringify(token));
    } else {
      localStorage.setItem("accessToken", JSON.stringify({}));
    }
    return data;
  } catch (error) {
    console.log(error.message);
  }
});

// My Reducers
const authSlice = createSlice({
  name: "userCreds",
  initialState,







  extraReducers: (builder) => {
    // Extra reducers for  userLogin
    builder.addCase(userLogin.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.detail !== undefined) {
        state.errors = action.payload.detail;
      } else {
        state.accessTokens = action.payload;
        state.errors = null;
        localStorage.setItem("accessToken", JSON.stringify(action.payload));
      }
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.errors = action.payload;
    });





    // Extra reducers for  userSignup
    builder.addCase(userSignup.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(userSignup.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.error !== undefined) {
        state.errors = action.payload.error;
      }
      else if (action.payload.message !== undefined) {
        state.message = action.payload.message;
      } else {
        state.accessTokens = action.payload;
        state.errors = null;
        localStorage.setItem("accessToken", JSON.stringify(action.payload));
      }
    });
    builder.addCase(userSignup.rejected, (state, action) => {
      state.errors = action.payload;
    });













    // Extra reducers for  oauthUserLogin

    builder.addCase(oauthUserLogin.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(oauthUserLogin.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.error !== undefined) {
        state.errors = action.payload.error;
      }
      else if (action.payload.message !== undefined) {
        state.message = action.payload.message;
      } else {
        state.accessTokens = action.payload;
        state.errors = null;
        localStorage.setItem("accessToken", JSON.stringify(action.payload));
      }
    });
    builder.addCase(oauthUserLogin.rejected, (state, action) => {
      state.errors = action.payload;
    });











    // Extra reducers for  userTokenRefresh
    builder.addCase(getUserDetails.pending, (state, action) => {
      state.loading = true;
      state.errors = null;
    });
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.errors = null;
    });
    builder.addCase(getUserDetails.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });










    //For refreshing Tokens
    builder.addCase(refreshAuth.pending, (state, action) => {
      state.errors = null;
    });
    builder.addCase(refreshAuth.fulfilled, (state, action) => {
      state.loading = false;
      const token = {
        access: action.payload.access,
        refresh: JSON.parse(localStorage.getItem("accessToken")).refresh,
      };
      state.accessTokens = token;
      state.errors = null;
    });
    builder.addCase(refreshAuth.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });
  },











  reducers: {
    removeUser: (state, action) => {
      state.user = null;
      state.accessTokens = null;
      state.message = null;
      state.loading = false
      state.errors = null
    },
    addUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { removeUser, addUser } = authSlice.actions;
export default authSlice.reducer;
