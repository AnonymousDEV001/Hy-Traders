import React from "react";

function Product(props) {
  return (
    <div
      style={{ border: "1px solid lightgray" }}
      className="h-96 flex justify-center items-center hover:shadow-lg hover:-translate-y-3 flex-col p-4 rounded-md cursor-pointer transition-all"
    >
      <img className="w-52 h-52 object-cover" src={props.img} alt="" />
      <div className="my-2">
        {/* <h4>{props.heading}</h4> */}
        <p className="my-4 text-gray-600">
          {`${props.heading.split("").slice(0, 40).join("")}...`}
        </p>
        <h4 style={{ color: "#00C2FF" }} className="mt-2">
          RS {props.price}
        </h4>
      </div>
    </div>
  );
}

export default Product;
