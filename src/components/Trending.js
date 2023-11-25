import React, { useState, useEffect } from "react";
import ProductItem from "./ProductItem";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(firestore, "products");
        const productsSnapshot = await getDocs(productsCollection);
        const productsData = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const shuffledProducts = productsData.sort(() => Math.random() - 0.5);

        const selectedProducts = shuffledProducts.slice(0, 8);

        setProducts(selectedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="py-10">
      <div className="max-w-screen-xl mx-auto text-5xl md:text-7xl lg:text-7xl font-bold font-titleFont drop-shadow-[3px_3px_3px_rgba(255,0,0)] text-center">
        TRENDING
      </div>
      <div className="pt-10 max-w-screen-xl mx-auto grid lg:grid-cols-4 grid-cols-2">
        {products.map((item) => (
          <ProductItem key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default Products;
