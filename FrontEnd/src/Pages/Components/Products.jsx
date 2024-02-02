import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  pageIncrement,
} from "../../Redux/products/productsFetchSlice";
import Product from "./Product";

function Products() {
  const [pageIndex, setPageIndex] = useState(1);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    if (pageIndex == 1 && products.products.length == 0) {
      dispatch(fetchProducts(products.pageIndex));
    }
  }, []);

  return (
    <div className="flex min-h-screen justify-center items-center flex-col">
      <h3 className="text-4xl m-8 text-center text-cyan-400">Products</h3>
      <div className="flex justify-center items-center flex-col w-full">
        <div className="flex gap-8 flex-wrap w-4/5 justify-center md:justify-normal">
          {products.products.map((product, index) => {
            return (
              <Link
                className="w-3/4 md:w-60 sm:w-56"
                to={`/product/${product.id}`}
              >
                <Product
                  key={index}
                  img={`http://127.0.0.1:8000${product.thumbnail}`}
                  heading={product.title}
                  price={product.offPrice}
                />
              </Link>
            );
          })}
        </div>
        {products.products.length == 12 * pageIndex && (
          <button
            className="bg-blue-50 py-5 px-16 border-none  rounded-2xl shadow-[0_4px_4px_0_#0000006e] my-8 hover:shadow-[0_2px_4px_0_#0000006e] hover:translate-y-1"
            onClick={(e) => {
              dispatch(pageIncrement());
              dispatch(fetchProducts(pageIndex + 1));
              setPageIndex(pageIndex + 1);
            }}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}

export default Products;
