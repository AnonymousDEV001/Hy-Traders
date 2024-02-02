import React, { useState } from "react";
import SideNav from "../SideNav";
import Css from "../Css/ProductManagement.module.css";
import Navbar from "../Navbar";
import ProductManagementView from "./ProductManagementView";

function ProductManagement() {
  const [sideNavToggle, setSideNavToggle] = useState(false);
  return (
    <div>
      <div className={Css.Dashboard}>
        <SideNav sideNavToggle={sideNavToggle} />
        <div className={Css.view}>
          <div
            className={Css.shade}
            style={sideNavToggle ? { zIndex: 1 } : { zIndex: -1 }}
            onClick={() => setSideNavToggle(!sideNavToggle)}
          ></div>
          <Navbar
            sideNavToggle={sideNavToggle}
            onChange={(newState) => setSideNavToggle(newState)}
          />

          <ProductManagementView/>
        </div>
      </div>
    </div>
  );
}

export default ProductManagement;
