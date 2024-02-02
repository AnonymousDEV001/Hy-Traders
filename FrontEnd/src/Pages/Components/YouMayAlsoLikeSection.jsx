import React from "react";
import Card from "./Card";

function YouMayAlsoLikeSection() {
  return (
    <div className="m-8 text-xl">
      <h3 className="text-xl">You May Also Like</h3>
      <div className="flex my-4 flex-wrap">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default YouMayAlsoLikeSection;
