import React, { useEffect, useState } from "react";
import accountPlaceholderImg from "../../assets/accountPlaceholder.png";
import { removeUser } from "../../Redux/handelingAuth/authSlice";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function AccountPlaceholder(props) {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const handleLogout = () => {
    localStorage.setItem("accessToken", JSON.stringify({}));
    dispatch(removeUser());
  };
  const [colorToggle, setColorToggle] = useState(false);

  useEffect(() => {
    if (location.pathname === "/") {
      setColorToggle(!colorToggle);
    }
  }, [location.pathname]);
  return (
    <>
      <div
        className="flex justify-center items-center cursor-pointer"
        onClick={() => setToggle(!toggle)}
      >
        <img className="w-14" src={accountPlaceholderImg} alt="" />
        <div className="flex text-gray-100 flex-col text-xs">
          <span>
            Hello,{" "}
            {props.user.first_name.charAt(0).toUpperCase() +
              props.user.first_name.slice(1, props.user.last_name.length) +
              props.user.last_name.charAt(0).toUpperCase() +
              props.user.last_name.slice(1, props.user.last_name.length)}
          </span>
          <span style={{ fontSize: "1rem" }}>Manage Account</span>
        </div>
        <span style={{ color: "grey" }} class="material-symbols-outlined">
          expand_more
        </span>
      </div>
      {toggle && (
        <div className="absolute right-4 flex-col top-20 py-3 px-3 rounded-md flex gap-1 justify-center items-center z-20 bg-cyan-400 text-white">
          <button className=" hover:shadow-lg rounded-md text-left gap-2 w-full py-3 px-4 flex items-center">
            <span class="material-symbols-outlined">ar_on_you</span>
            <span>Manage Your Account</span>
          </button>
          <button className=" hover:shadow-lg text-left rounded-md flex items-center gap-2 w-full py-3 px-4">
            <span class="material-symbols-outlined">list_alt</span>
            <span>My Orders</span>
          </button>
          <button className=" hover:shadow-lg text-left rounded-md flex items-center gap-2 w-full py-3 px-4">
            <span class="material-symbols-outlined">grade</span>
            <span>My Reviews</span>
          </button>
          <button
            onClick={handleLogout}
            className="hover:shadow-lg text-left rounded-md flex items-center gap-2 w-full py-3 px-4"
          >
            <span class="material-symbols-outlined">logout</span>
            <span>Logout</span>
          </button>
        </div>
      )}
    </>
  );
}

export default AccountPlaceholder;
