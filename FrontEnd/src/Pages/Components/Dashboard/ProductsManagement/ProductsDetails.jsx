import React from 'react'

function ProductsDetails() {
  return (
    <div className="flex  gap-6">
    <span>Products <span className="font-semibold">All</span> (16)</span>
    <div className="border-[1px] border-gray-950"></div>
    <span className="text-blue-600 font-semibold">Published <span className="text-black font-normal">(5)</span></span>
    <div className="border-[1px] border-gray-950"></div>
    <span className="text-blue-600 font-semibold">Drafts <span className="text-black font-normal">(5)</span></span>
  </div>
  )
}

export default ProductsDetails
