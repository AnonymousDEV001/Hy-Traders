import React, { useState } from "react";
import Css from "./Css/SideNav.module.css";
import Logo from "../../../assets/logo.svg";

function SideNav(props) {
  const [selectedCatagory, setSelectedCatagory] = useState(null);
  const [list, setList] = useState([
    {
      name: "Dashboard",
      icon: "dashboard",
      options: ["Sales Analytics", "Revenue"],
    },
    {
      name: "Products",
      icon: "shopping_bag",
      options: ["Products Management", "Product Editor", "Banners"],
    },
    {
      name: "Orders",
      icon: "shopping_cart",
      options: ["Sales Analytics", "Revenue"],
    },
    {
      name: "Statistics",
      icon: "equalizer",
      options: ["Sales Analytics", "Revenue"],
    },
    {
      name: "Reviews",
      icon: "star_half",
      options: ["Sales Analytics", "Revenue"],
    },
    {
      name: "Transactions",
      icon: "payments",
      options: ["Sales Analytics", "Revenue"],
    },
    {
      name: "Pages",
      icon: "layers",
      options: ["Sales Analytics", "Revenue"],
    },
    {
      name: "Settings",
      icon: "settings",
      options: ["Sales Analytics", "Revenue"],
    },
  ]);
  return (
    <div
      style={
        props.sideNavToggle
          ? { transform: "translateX(0rem)" }
          : { transform: "translateX(-30rem)" }
      }
      className={Css.sideNav}
    >
      <div className={Css.content}>
        <div className={Css.logo}>
          <img src={Logo} alt="" />
          <span>HY MOBILES</span>
        </div>
        <div className={Css.list}>
          <ul>
            {list.map((list, index) => {
              return (
                <li>
                  <div
                    style={
                      index == selectedCatagory
                        ? {
                            backgroundColor: "#f9f9f9",
                            border: "1px solid #ededed",
                            borderRadius: "0.5rem",
                          }
                        : null
                    }
                    onClick={() => {
                      if (index == selectedCatagory) {
                        return setSelectedCatagory(null);
                      }
                      setSelectedCatagory(index);
                    }}
                    className={Css.lBtn}
                  >
                    <span class="material-symbols-outlined">{list.icon}</span>
                    <span>{list.name}</span>
                  </div>
                  {index == selectedCatagory && (
                    <div className={Css.lExtend}>
                      {list.options.map((option) => {
                        return (
                          <div className={Css.ElBtn}>
                            <span class={Css.dot}></span>
                            <span>{option}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
