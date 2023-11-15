import React, { useEffect, useState } from "react";
import Slider from "../components/Slider";
import Products from "../components/Products";
import { useLoaderData } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const productData = useLoaderData();
  useEffect(() => {
    setProducts(productData.data);
  }, [productData]);

  return (
    <div>
      <Slider />
      <Products products={products} />
    </div>
  );
};

export default Home;
