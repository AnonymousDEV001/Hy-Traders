import React,{useState} from 'react'
// import Css from "../Css/IncreaseDecrease.module.css";

function IncreaseBtnForProductSection({ quantity, onChange }) {

  return (
    <div 
    className="flex"
    >
      <div
        className={`p-4 bg-blue-300 text-white cursor-pointer rounded-[0.6rem_0_0_0.6rem]`}
        id="decrease"
        onClick={() => {
          if (quantity <= 1) {
            return;
          }
          onChange(quantity-1);
        }}
      >
        -
      </div>
      <input         className="focus:outline-none text-center w-12 border-[1px] border-gray-100" onChange={(e)=>  onChange(Number(e.target.value))} value={quantity} />
      <div
        className={`p-4 bg-blue-300 text-white cursor-pointer rounded-[0_0.6rem_0.6rem_0]` 
      }
        id="increase"
        onClick={() => {
            onChange(quantity+1);
        }}
      >
        +
      </div>
    </div>
  )
}

export default IncreaseBtnForProductSection
