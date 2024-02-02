import React, { useState } from "react";

function ProductsFilter(props) {
  const [dropDownToggle, setDropdownToggle] = useState(false);
  return (
    <div className="relative w-52">
      <button
        onClick={() => setDropdownToggle(!dropDownToggle)}
        id="multiLevelDropdownButton"
        data-dropdown-toggle="multi-dropdown"
        class="p-4 flex
 items-center rounded-md mb-2 border-[1px] border-gray-200 w-full bg-white text-gray-500 px-5 py-2.5 "
        type="button"
      >
        {props.options[0]}
        <svg
          class="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        id="multi-dropdown"
        class={`z-10 ${
          dropDownToggle ? "" : "hidden"
        } bg-white divide-y divide-gray-100 rounded-md shadow w-full dark:bg-gray-700`}
      >
        <ul
          class="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="multiLevelDropdownButton"
        >
            {props.options.map((option)=>{
                return           <li>
                <a
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {option}
                </a>
              </li>
            })}


        </ul>
      </div>
    </div>
  );
}

export default ProductsFilter;
