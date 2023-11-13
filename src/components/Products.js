import React from "react";
import ProductItem from "./ProductItem";

const Products = ({products}) => {
  return (
    <div className="pt-10">
      <div className="max-w-screen-xl mx-auto text-7xl font-bold font-titleFont drop-shadow-[3px_3px_3px_rgba(255,0,0)]">
      TRENDING
      </div>
      <div className="pt-10 max-w-screen-xl mx-auto grid grid-cols-4">
        {
          products.map((item)=>(
            <ProductItem key={item.id} product={item}/>
          ))
        }
      </div>
    </div>
  );
};

export default Products;
