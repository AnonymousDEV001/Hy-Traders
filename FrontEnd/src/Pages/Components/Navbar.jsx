import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.svg";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AccountPlaceholder from "./AccountPlaceholder";
import {
  signinToggle,
  setSigninMethod,
} from "../../Redux/signIn/signInToggleSlice";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar/SearchBar";

function Navbar() {
  let location = useLocation();
  const [colorChange, setColorChange] = useState(false);
  const dispatch = useDispatch();
  const userCreds = useSelector((state) => state.userCreds.user);

  useEffect(() => {
    if (
      location.pathname.includes("/product") ||
      location.pathname.includes("/cart")
    ) {
      setColorChange(true);
      let liElements = document.querySelectorAll("li");
      liElements.forEach((li) => {
        li.addEventListener("mouseenter", (e) => {
          e.target.style.color = "black";
        });
        li.addEventListener("mouseleave", (e) => {
          e.target.style.color = "grey";
        });
      });
    }
  }, [location]);
  useEffect(() => {
    if (userCreds?.email) {
      dispatch(signinToggle(false));
    }
  }, [userCreds]);

  return (
    <div className="flex min-h-[6rem] justify-between items-center relative z-[1] flex-wrap bg-transparent">
      <div className="flex justify-center items-center mx-4">
        <Link
          style={{
            color: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          to={"/"}
        >
          <img className="w-10 mx-2" src={logo} alt="hy mobiles logo" />
          <p>HY MOBILES</p>
        </Link>
      </div>
      <div className="w-2/5">
        <SearchBar />
      </div>
      <div className="mr-4">
        <nav className="text-gray-400 sm:mt-4">
          <ul className="flex flex-wrap">
            <Link className="flex justify-center items-center" to={"/"}>
              <li
                style={colorChange ? { color: "grey" } : null}
                className={`flex justify-center rounded-sm border-b-4 hover:border-gray-400 mt-4 md:mt-0 md:text-white items-center mx-4 p-2 cursor-pointer ${
                  location.pathname === "/"
                    ? "border-cyan-400"
                    : "border-transparent"
                } ${location.pathname === "/" ? "rounded-sm" : ""}`}
              >
                HOME
              </li>
            </Link>
            <li
              className={`flex justify-center rounded-sm border-b-4 hover:border-gray-400 mt-4 md:mt-0 md:text-white items-center mx-4 p-2 cursor-pointer ${
                location.pathname === "/products"
                  ? "border-cyan-400"
                  : "border-transparent"
              } ${location.pathname === "/products" ? "rounded-sm" : ""}`}
              style={colorChange ? { color: "grey" } : null}
            >
              PRODUCTS
            </li>
            <Link to={"/cart"} className="flex justify-center items-center">
              <li
                className={`flex justify-center rounded-sm border-b-4 hover:border-gray-400 mt-4 md:mt-0 md:text-white items-center mx-4 p-2 cursor-pointer ${
                  location.pathname === "/cart"
                    ? "border-cyan-400"
                    : "border-transparent"
                } ${location.pathname === "/cart" ? "rounded-sm" : ""}`}
                style={colorChange ? { color: "grey" } : null}
              >
                CART
              </li>
            </Link>
            {userCreds && userCreds.email ? (
              <AccountPlaceholder user={userCreds} />
            ) : (
              <>
                <li
                  className={`flex justify-center border-b-4 border-transparent hover:border-gray-400 mt-4 md:mt-0 md:text-white items-center mx-4 p-2  cursor-pointer`}
                  style={colorChange ? { color: "grey" } : null}
                  onClick={() => {
                    dispatch(signinToggle(true));
                    dispatch(setSigninMethod("signin"));
                  }}
                >
                  SIGN IN
                </li>
                <li
                  className={`flex justify-center border-b-4 border-transparent hover:border-gray-400 mt-4 md:mt-0 md:text-white items-center mx-4 p-2  cursor-pointer`}
                  style={colorChange ? { color: "grey" } : null}
                  onClick={() => {
                    dispatch(signinToggle(true));
                    dispatch(setSigninMethod("signup"));
                  }}
                >
                  SIGN UP
                </li>
              </>
            )}

            <div style={colorChange ? { color: "grey" } : null}></div>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
