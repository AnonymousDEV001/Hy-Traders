import React, { useEffect } from "react";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Products from "./Components/Products";
import Footer from "./Components/Footer";
import Catagories from "./Components/Catagories";
import PhoneInfoHero from "./Components/PhoneInfoHero";
import Loading from "./Loading";
import { useSelector } from "react-redux";

function Home() {
  const loading = useSelector((state) => state.products.loading);

  return (
    <div>
      {loading ? (
        <div className="h-screen w-full flex justify-center items-center flex-col fixed z-30 bg-white">
          <Loading />
          <h3 className="text-3xl text-white absolute">Loading...</h3>
        </div>
      ) : null}
      <Navbar />
      <Hero />
      <PhoneInfoHero />
      <Catagories />
      <Products />
      <Footer />
    </div>
  );
}

export default Home;
