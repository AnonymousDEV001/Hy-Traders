import React from "react";
import DashboardHeading from "./DashboardHeading";
import ProjectManagementOptions from "./ProjectManagementOptions";
import ProductsDetails from "./ProductsDetails";
import ProductsFilter from "./ProductsFilter";

function ProductManagementView() {
  return (
    <div className="my-2 mx-8">
      <DashboardHeading />
      <ProjectManagementOptions />
      <ProductsDetails />
      <div className="my-5 flex gap-4">
        <ProductsFilter options={['Stock Status','In Stock','Out Of Stock','Low Inventory']} />
        <ProductsFilter options={['Product Category','All Products',]} />
        <ProductsFilter options={['Additional Options','Last Modified','Date Added','Last Viewed','Average Rating','Popularity']} />

      </div>
    </div>
  );
}

export default ProductManagementView;
