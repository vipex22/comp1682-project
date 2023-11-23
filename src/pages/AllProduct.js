import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import ProductItem from "../components/ProductItem";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(firestore, "products");
        const productsSnapshot = await getDocs(productsCollection);
        const productsData = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="pt-10">
      <div className="max-w-screen-xl mx-auto text-7xl font-bold font-titleFont drop-shadow-[3px_3px_3px_rgba(255,0,0)]">
        All Products
      </div>

      <div className="pt-10 max-w-screen-xl mx-auto font-titleFont">
        <input
          type="search"
          placeholder=" Search products..."
          className="border-2 rounded-full py-2 px-2 w-full hover:border-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="pt-10 max-w-screen-xl mx-auto grid grid-cols-4">
        {products
          .filter((item) => {
            return searchTerm.toLowerCase() === ""
              ? item
              : item.title.toLowerCase().includes(searchTerm);
          })
          .map((item) => (
            <ProductItem key={item.id} product={item} />
          ))}
      </div>
    </div>
  );
};

export default Products;
