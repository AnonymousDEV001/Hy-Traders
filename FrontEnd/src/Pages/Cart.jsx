import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import IncreaseDecrease from "./Components/IncreaseDecrease";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import {
  setCartItems,
  toggleCartCheckedOption,
  selectAllCartCheckedOption,
} from "../Redux/Cart/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const userCreds = useSelector((state) => state.userCreds.accessTokens);
  const cartItems = useSelector((state) => state.cartItems.cartItems);
  const cartItemsRef = useRef([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(119);
  const [totalSelectedItems, setTotalSelectedItems] = useState(0);

  const handleDelete = async (id) => {
    const updatedCartItems = cartItems.filter((item) => item.cart.id !== id);
    dispatch(setCartItems(updatedCartItems));
    const url = "http://127.0.0.1:8000/api/cart/";
    try {
      let response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(userCreds.access),
        },
        body: JSON.stringify({
          id: id,
        }),
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    if (userCreds !== null) {
      const fetchCart = async () => {
        const url = "http://127.0.0.1:8000/api/cart/";
        let response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(userCreds.access),
          },
        });
        response = await response.json();
        dispatch(setCartItems(response));
      };
      fetchCart();
    }
  }, [userCreds]);

  const hangleSelectAll = (e) => {
    dispatch(selectAllCartCheckedOption(e.target.checked));
  };

  useEffect(() => {
    if (cartItems !== null) {
      let offPrice = 0;
      let selectedItems = 0;
      cartItems.forEach((item) => {
        if (item.cart.checked) {
          offPrice +=
            (Number(item.product.offPrice) +
              Number(item.storage.incrementPrice)) *
            item.cart.quantity;
          selectedItems++;
        }
      });
      setTotalPrice(offPrice);
      setTotalSelectedItems(selectedItems);
    }
  }, [cartItems]);

  return (
    <div>
      <Navbar />
      <div className="w-full flex p-8 flex-col">
        <h3 className="text-3xl my-2">CART</h3>
        <div className="flex">
          {/* ==========================SELECTOR  ========================*/}
          <div className="flex flex-col bg-gray-100 w-2/3">
            <div className="flex justify-between p-4 bg-blue-50">
              <div className="flex gap-2">
                <input
                  className="h-5 w-5 cursor-pointer"
                  onChange={(e) => hangleSelectAll(e)}
                  type="checkbox"
                />
                <p>
                  SELECT ALL (
                  {cartItems !== null && cartItems.length > 0
                    ? cartItems.length
                    : null}{" "}
                  ITEM(S))
                </p>
              </div>
              <div className="flex justify-center items-center cursor-pointer">
                <span class="material-symbols-outlined">delete</span> Delete
              </div>
            </div>

            {/* ====================CART ITEMS===================== */}
            {cartItems !== null &&
              cartItems.map((item, index) => {
                return (
                  <div className="w-full flex bg-white p-2 justify-between gap-4 mt-1">
                    <div>
                      <div className="flex items-center justify-center">
                        <input
                        className="h-5 w-5"
                          // ref={(element) => {
                          //   cartItemsRef.current[index] = element;
                          // }}
                          onChange={(e) =>
                            dispatch(toggleCartCheckedOption(item.cart.id))
                          }
                          type="checkbox"
                          checked={cartItems[index].cart.checked}
                          id={item.product.id}
                        />
                        <div>

                        <img
                          className="w-40"
                          src={`http://127.0.0.1:8000${item.image.image}`}
                          alt=""
                        />
                        </div>
                      </div>
                    </div>
                    <div className="w-2/5">
                      <p>{item.product.title}</p>
                      <p>Color : {item.color.color}</p>
                      <p>Stock Available: ({item.stock.stock})</p>
                      {item?.storage && (
                        <>
                          <p>Ram : {item.storage.ram}</p>
                          <p>Ram : {item.storage.rom}</p>
                        </>
                      )}
                    </div>
                    <div className="w-1/5">
                      <p>
                        Rs .{" "}
                        {Number(item.product.offPrice) +
                          Number(item.storage.incrementPrice)}
                      </p>
                      <del>Rs. {item.product.price}</del>
                    </div>
                    <div className="w-1/5">
                      <IncreaseDecrease
                        quantity={item.cart.quantity}
                        id={item.cart.id}
                      />
                    </div>
                    <div>
                      <span
                        onClick={() => handleDelete(item.cart.id)}
                        className={`cursor-pointer material-symbols-outlined`}
                      >
                        close
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* ==================COUNTER============== */}
          <div className="w-4/12">
            <div className="bg-gray-50 p-6">
              <h3>ORDER SUMMARY</h3>
              <div className="flex justify-between my-4">
                <p>Subtotal ({totalSelectedItems} items)</p>
                <p>Rs. {totalPrice}</p>
              </div>
              {totalSelectedItems ? (
                <div className="flex justify-between my-4">
                  <p>Shipping Fee</p>
                  <p>Rs. 119</p>
                </div>
              ) : null}

              <div className="flex justify-between my-4">
                <p>Total</p>
                <p>
                  Rs.{" "}
                  {totalSelectedItems !== 0 ? totalPrice + deliveryPrice : 0}
                </p>
              </div>

              <button className="cursor-pointer w-full bg-blue-400 text-white p-4 border-none">
                PROCEED TO CHECKOUT ({totalSelectedItems})
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
