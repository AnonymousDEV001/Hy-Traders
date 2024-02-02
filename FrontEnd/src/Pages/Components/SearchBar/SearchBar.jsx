import React, { useEffect, useState } from "react";
import Css from "./Css/SearchBar.module.css";
import SearchBarSuggestions from "./SearchBarSuggestions";

function SearchBar() {
  const [search , setSearch] = useState("")


  return (
    <div className="w-full relative">
      <div className={Css.middle}>
        <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" placeholder="Search" />
        <span className="material-symbols-outlined">search</span>
      </div>
      <SearchBarSuggestions search={search} onChange={(newState)=>setSearch(newState)} />
    </div>
  );
}

export default SearchBar;
