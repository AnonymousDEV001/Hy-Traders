import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouMayAlsoLikeSection from "./YouMayAlsoLikeSection";
import Specifications from "./Specifications";
import { fetchProduct } from "../../Redux/products/productFetchSlice";
import { useDispatch, useSelector } from "react-redux";
import ImageZoom from "./ImageZoom";
import { signinToggle } from "../../Redux/signIn/signInToggleSlice";
import IncreaseBtnForProductSection from "./IncreaseBtnForProductSection";

function ProductSection() {
  const [imageIndex, setImageIndex] = useState(0);
  const [imageObjectIndex, setImageObjectIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [storageObjectIndex, setStorageObjectIndex] = useState(null);

  const [storingProduct, setStoringProduct] = useState(null);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);

  const params = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.product);
  const userCreds = useSelector((state) => state.userCreds.user);
  const accessTokens = useSelector((state) => state.userCreds.accessTokens);

  //making new states
  const [product_2, setProduct_2] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const url = `http://127.0.0.1:8000/api/product/?product_id=${params.id}`;
      let response = await fetch(url);
      response = await response.json();
      setProduct_2(response);
    };
    fetchProduct();
  }, []);

  const [images_2, setImages_2] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      const url = `http://127.0.0.1:8000/api/imageUpload/${params.id}/`;
      let response = await fetch(url);
      response = await response.json();
      setImages_2(response);
    };
    fetchImages();
  }, []);

  const [storage_2, setStorage_2] = useState(null);

  useEffect(() => {
    const fetchStorage = async () => {
      const url = `http://127.0.0.1:8000/api/storage/?product_id=${params.id}`;
      let response = await fetch(url);
      response = await response.json();
      setStorage_2(response);
      if (response.length > 0) {
        setStorageObjectIndex(0);
      }
    };
    fetchStorage();
  }, []);

  const [totalPrice_2, setTotalPrice_2] = useState(0);
  useEffect(() => {
    if (product_2 !== null) {
      let price = 0;
      // console.log(product_2.offPrice)
      if (storageObjectIndex !== null) {
        price =
          Number(storage_2[storageObjectIndex].incrementPrice) +
          Number(product_2.offPrice);
      } else {
        price = Number(product_2.offPrice);
      }
      setTotalPrice_2(price);
    }
  }, [product_2, storageObjectIndex]);

  const [stock_2, setStock_2] = useState(null);
  const [stockValue_2, setStockValue_2] = useState(null);

  useEffect(() => {
    const fetchStock = async () => {
      const url = `http://127.0.0.1:8000/api/stock/?product_id=${params.id}`;
      let response = await fetch(url);
      response = await response.json();
      setStock_2(response);
    };
    fetchStock();
  }, []);

  useEffect(() => {
    if (stock_2 !== null && images_2 !== null && storage_2 !== null) {
      let value = 0;
      if (storageObjectIndex !== null) {
        for (let index = 0; index < stock_2.length; index++) {
          if (
            stock_2[index].productColorForignKey ==
              images_2[imageObjectIndex].id &&
            stock_2[index].productStorageForignKey ==
              storage_2[storageObjectIndex].id
          ) {
            value = stock_2[index].stock;
          }
        }
      } else if (storageObjectIndex === null) {
        for (let index = 0; index < stock_2.length; index++) {
          if (
            stock_2[index].productColorForignKey ==
            images_2[imageObjectIndex].id
          ) {
            value = stock_2[index].stock;
          }
        }
      }
      setStockValue_2(value);
    }
  }, [stock_2, storageObjectIndex, imageObjectIndex]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    //in serializer i am not sending product id so this part is not working i will fix it later
    if (state?.product?.product?.id !== Number(params.id)) {
      dispatch(fetchProduct(params.id));
    }
  }, []);

  useEffect(() => {
    if (accessTokens !== null && storingProduct !== null) {
      const func = async () => {
        await addingToCart(storingProduct);
      };
      func();
    }
  }, [accessTokens]);

  const handleCart = async (e) => {
    e.preventDefault();

    let stockId = 0;
    if (storageObjectIndex !== null) {
      for (let index = 0; index < stock_2.length; index++) {
        if (
          stock_2[index].productColorForignKey ==
            images_2[imageObjectIndex].id &&
          stock_2[index].productStorageForignKey ==
            storage_2[storageObjectIndex].id
        ) {
          stockId = stock_2[index].id;
        }
      }
    } else if (storageObjectIndex === null) {
      for (let index = 0; index < stock_2.length; index++) {
        if (
          stock_2[index].productColorForignKey == images_2[imageObjectIndex].id
        ) {
          stockId = stock_2[index].id;
        }
      }
    }

    const productData = {
      productForignKey: params.id,
      productStockForignKey: stockId,
      quantity: quantity,
    };

    if (!userCreds?.email) {
      setStoringProduct(productData);
      return dispatch(signinToggle(true));
    }

    await addingToCart(productData);
  };

  const addingToCart = async (productData) => {
    let url = "http://127.0.0.1:8000/api/cart/";
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(accessTokens.access),
      },
      body: JSON.stringify(productData),
    });
    response = await response.json();
    setError(response);
  };

  return (
    <>
      <div className="flex justify-between md:flex-nowrap md:items-start items-center flex-wrap">
        <div>
          {images_2 !== null ? (
            <ImageZoom
              image={`http://127.0.0.1:8000${images_2[imageObjectIndex].images[imageIndex].image}`}
            />
          ) : null}

          <div className="flex my-4 mx-8 w-[35rem] flex-wrap">
            {images_2 !== null
              ? images_2[imageObjectIndex].images.map((imgs, index) => (
                  <img
                    className="cursor-pointer w-24 mx-2 shadow-[0px_0px_10px_0_lightgrey] rounded-xl p-2"
                    onClick={() => {
                      setImageIndex(index);
                    }}
                    src={`http://127.0.0.1:8000${imgs.image}`}
                    alt=""
                  />
                ))
              : null}
          </div>
        </div>
        <div className="flex justify-between items-center w-11/12 mx-4">
          <div className="w-4/5 py-12 h-full">
            <div className="ratings"></div>

            {product_2 !== null ? (
              <h3 className="text-cyan-400 text-2xl">
                {product_2.title.toUpperCase()}
              </h3>
            ) : null}
            <p className="my-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis a culpa enim ipsam porro corrupti! Asperiores
              repellendus voluptate cumque enim inventore in nam? Molestias
              dicta unde tenetur quia quibusdam eius?
            </p>

            <h3 className="text-cyan-400 my-2 text-2xl">Colors</h3>

            <div className="flex">
              {images_2 !== null
                ? images_2.map((img, index) => {
                    return (
                      <div
                        onClick={(e) => {
                          setImageObjectIndex(index);
                          setImageIndex(0);
                          setSelectedProduct(index);
                        }}
                        style={
                          selectedProduct === index
                            ? { border: "2px solid #00C2FF" }
                            : null
                        }
                        className="flex flex-col mr-2 items-center border-[1px] border-gray-300 rounded cursor-pointer p-2"
                      >
                        <img
                          className="w-16"
                          src={`http://127.0.0.1:8000${img.images[0].image}`}
                          alt=""
                        />
                        <div>{img.color}</div>
                      </div>
                    );
                  })
                : null}
            </div>
            {storage_2 !== null && storage_2.length > 0 ? (
              <>
                {" "}
                <h3 className="text-cyan-400 my-2 text-2xl">Storage</h3>
                <div className="flex">
                  {storage_2.map((storage, index) => {
                    return (
                      <div
                        style={
                          storageObjectIndex === index
                            ? { border: "2px solid #00C2FF" }
                            : null
                        }
                        className="flex mr-2 p-2 border-[1px] border-gray-300 rounded cursor-pointer"
                        onClick={() => {
                          setStorageObjectIndex(index);
                        }}
                      >
                        <div className="ram">{storage.ram} RAM</div>
                        <span className="mx-1">-</span>
                        <div className="rom">{storage.rom} ROM</div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : null}
            <div className="installmentPlans"></div>
            <div className="garentee"></div>

            <p className="my-2">
              Avaliable Stock:{" "}
              <span
                style={
                  stockValue_2 !== null && stockValue_2 > 0
                    ? { color: "green" }
                    : { color: "red" }
                }
              >
                {stockValue_2 !== null && stockValue_2 > 0
                  ? `IN STOCK (${stockValue_2})`
                  : "OUT OF STOCK"}
              </span>
            </p>

            {totalPrice_2 !== null ? <p className="my-2">Price: {totalPrice_2}</p> : null}

            <form>
              <IncreaseBtnForProductSection
                quantity={quantity}
                onChange={(newState) => setQuantity(newState)}
              />
              {error.message ? (
                <p style={{ color: "green" }}>{error.message}</p>
              ) : (
                <p style={{ color: "red" }}>{error.error}</p>
              )}
              <button
                className="py-4 px-8 mt-4 border-none hover:bg-blue-500 bg-blue-400 rounded-xl text-white"
                onClick={handleCart}
              >
                Add To Cart
              </button>
            </form>
          </div>
        </div>
      </div>
      <YouMayAlsoLikeSection />
      <Specifications />
    </>
  );
}

export default ProductSection;
