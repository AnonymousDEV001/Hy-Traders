import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Product from "./Pages/Product";
import Signin from "./Pages/Components/Signin";
import Cart from "./Pages/Cart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserDetails, refreshAuth } from "./Redux/handelingAuth/authSlice";
import Dashboard from "./Pages/Components/Dashboard/Dashboard";
import ProductManagement from "./Pages/Components/Dashboard/ProductsManagement/ProductManagement";


function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userCreds);

  useEffect(() => {
    try {
      let token = localStorage.getItem("accessToken");
      if (!token) {
        localStorage.setItem("accessToken", JSON.stringify({}));
      }
      if (token && JSON.parse(token).access === undefined) {
        return;
      }
      dispatch(refreshAuth());
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    if (user.user !== null || user.accessTokens === null) {
      return;
    }
    dispatch(getUserDetails());
  }, [user.accessTokens]);

  useEffect(() => {
    // checking if auth tokens exists if yes then refreshing the token every 4 mins
    if (user.user !== null) {
      try {
        let token = localStorage.getItem("accessToken");
        if (!token) {
          localStorage.setItem("accessToken", JSON.stringify({}));
        }
        if (token && JSON.parse(token).access === undefined) {
          return;
        }
        let interval = setInterval(() => {
          dispatch(refreshAuth());
        }, 1000 * 60 * 4);

        return () => clearInterval(interval);
      } catch (error) {
        console.log(error.message);
      }
    }
  }, [user.accessTokens]);

  const toggle = useSelector((state) => state.signInToggle.toggle);
  return (
    <BrowserRouter>
      {toggle ? <Signin /> : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/dashboard/productsManagement" element={<ProductManagement/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
