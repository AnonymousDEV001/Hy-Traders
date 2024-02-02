import React from 'react'

function Card() {
  return (
    <div 
    className='shadow-[0_0_10px_0_lightgrey] w-60 rounded-lg mx-2'
    >
    <img
    className='w-full rounded-md p-4'
      src="https://images.priceoye.pk/tecno-camon-19-neo-pakistan-priceoye-5m02d-270x270.webp"
      alt=""
    />
    <div 
    className='p-2'
    >
      <h3
      className='my-4'
      >Techno Camon 19 Neo</h3>
      <p>Rs. 45,000</p>
    </div>
  </div>
  )
}

export default Card
