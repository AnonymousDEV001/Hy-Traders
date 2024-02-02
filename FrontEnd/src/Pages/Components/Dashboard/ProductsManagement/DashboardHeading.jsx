import React from 'react'

function DashboardHeading() {
  return (
    <div className="flex p-8 text-2xl bg-white rounded-md shadow font-bold justify-between">
    <span>PRODUCTS MANAGEMENT</span>{" "}
    <div className="font-thin text-lg">
      <span className="flex justify-center items-center gap-2 ">
        DATA REFRESH{" "}
        <span class="material-symbols-outlined text-blue-500">sync</span>
      </span>
      <span></span>
    </div>
  </div>
  )
}

export default DashboardHeading
