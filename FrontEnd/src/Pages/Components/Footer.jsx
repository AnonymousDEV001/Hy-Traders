import React from 'react'
import Logo from '../../assets/logo.svg'

function Footer() {
  return (
    <div
    className='mt-16 relative'
    >
    <footer>
      <div 
      className='bg-blue-100 flex justify-between flex-wrap p-16'
      >
        <div className="flex flex-col">
          <div className="flex items-center my-4">
            <img src={Logo} alt="" />
            <p>HY MOBILES</p>
          </div>
          <div 
          className='my-4'
          >
            <p>Email Address: info@HYMOBILES.com</p>
            <p>Phone Number: +1-555-123-4567</p>
            <p>Mailing Address: [Your Physical Address]</p>
          </div>
        </div>
        <div className={`my-4`}>
          <p style={{marginBottom:" 0.5rem",fontSize:"1.1rem"}}>
            Navigation Links
          </p>
          <p>Home</p>
          <p>About Us</p>
          <p>Events</p>
          <p>Shop</p>
          <p>Contact Us</p>
          <p>FAQs</p>
          <p>Blog (if applicable)</p>
          <p>Privacy Policy</p>
          <p>Terms and Conditions</p>
        </div>
        <div className={`my-4`}>
        <p style={{marginBottom:" 0.5rem",fontSize:"1.1rem"}}>
            Social Media Links
          </p>
          <p>Instagram</p>
          <p>Facebook</p>
          <p>Google</p>
        </div>
        <div className={`my-4`}>
        <p style={{marginBottom:" 0.5rem",fontSize:"1.1rem"}}>
            Customer Service:
          </p>
          <p>Returns and Exchanges</p>
          <p>Shipping Information</p>
          <p>Frequently Asked Questions</p>
          <p>Contact Us</p>
        </div>
      </div>
      <div className='bg-blue-200 text-center flex justify-center items-center h-20'>
        <p>© 2023 HY MOBILES All rights reserved.</p>
      </div>
    </footer>
  </div>
  )
}

export default Footer
