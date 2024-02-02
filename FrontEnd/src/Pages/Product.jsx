import React from "react";
import ProductSection from "./Components/ProductSection";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Loading from "./Loading";
import { useSelector } from "react-redux";

function Product() {
  const loading = useSelector((state) => state.product.loading);
  return (
    <div>
      {loading ? (
        <div className="h-screen w-full flex justify-center items-center flex-col fixed z-10 bg-white">
          <Loading />
          <h3 className="text-3xl text-white absolute">Loading...</h3>
        </div>
      ) : null}
      <Navbar />
      <ProductSection />
      <Footer />
    </div>
  );
}

export default Product;
