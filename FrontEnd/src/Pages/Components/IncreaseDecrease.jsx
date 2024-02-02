import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeQuantity } from "../../Redux/Cart/cartSlice";

function IncreaseDecrease(props) {
  const accessTokens = useSelector((state) => state.userCreds.accessTokens);
  const [quantity, setQuantity] = useState(Number(props.quantity));
  const [id, setId] = useState(Number(props.id));
  const dispatch = useDispatch();

  useEffect(() => {
    if (id != props.id) {
      setQuantity(props.quantity);
      setId(props.id);
    } else if (accessTokens !== null && quantity !== props.quantity) {
      dispatch(changeQuantity({ id: props.id, quantity: quantity }));

      console.log(quantity);
      const updateQuantity = async () => {
        const url = "http://127.0.0.1:8000/api/cart/";
        let response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(accessTokens.access),
          },
          body: JSON.stringify({
            id: props.id,
            quantity: quantity,
          }),
        });
        response = await response.json();
      };
      updateQuantity();
    }
  }, [accessTokens, quantity, props.id]);

  return (
    <div className="flex">
      <div
        className={`p-4 bg-blue-300 text-white cursor-pointer rounded-[0.6rem_0_0_0.6rem]`}
        id="decrease"
        onClick={() => {
          if (quantity <= 0) {
            return;
          }
          setQuantity(quantity - 1);
        }}
      >
        -
      </div>
      <input
        className="focus:outline-none text-center w-12 border-[1px] border-gray-100"
        onChange={(e) => setQuantity(Number(e.target.value))}
        value={quantity}
      />
      <div
        className={`p-4 bg-blue-300 text-white cursor-pointer rounded-[0_0.6rem_0.6rem_0]`}
        id="increase"
        onClick={() => {
          setQuantity(quantity + 1);
        }}
      >
        +
      </div>
    </div>
  );
}

export default IncreaseDecrease;
