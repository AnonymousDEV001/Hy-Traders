import React, { useState } from "react";
import SideNav from "./SideNav";
import Css from "./Css/Dashboard.module.css";
import Navbar from "./Navbar";
import DashboardView from "./DashboardView";

function Dashboard() {
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
          <DashboardView/>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
