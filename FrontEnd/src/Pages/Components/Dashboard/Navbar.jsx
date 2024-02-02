import React from "react";
import Css from "./Css/Navbar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { useSelector } from "react-redux";
import AccountPlaceholder from "../AccountPlaceholder";

function Navbar({ sideNavToggle, onChange }) {
  const user = useSelector((state) => state.userCreds.user);

  return (
    <div className={Css.Navbar}>
      <div className={Css.nav}>
        <div className={Css.menu} onClick={() => onChange(!sideNavToggle)}>
          <span class="material-symbols-outlined">menu</span>
        </div>
        <div className={Css.search}>
          <SearchBar />
        </div>
        {user && user.email ? <AccountPlaceholder user={user} /> : null}
      </div>
    </div>
  );
}

export default Navbar;
