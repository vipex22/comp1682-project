import React, { useState, useEffect } from "react";
import ProductItem from "../components/ProductItem";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

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

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="pt-10">
      <div className="max-w-screen-xl mx-auto text-5xl md:text-7xl lg:text-7xl font-bold font-titleFont drop-shadow-[3px_3px_3px_rgba(255,0,0)] text-center">
        All Products
      </div>

      <div className="pt-10 max-w-screen-xl mx-auto font-titleFont flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-4 md:mb-0 md:flex md:w-1/2 px-3">
          <select
            className="p-2 border border-gray-300 rounded-lg w-44 md:w-48"
            onChange={handleCategoryChange}
            value={selectedCategory}
          >
            <option value="">All Categories</option>
            <option value="Shirt">Shirt</option>
            <option value="Pant">Pant</option>
            <option value="Hat">Hat</option>
            <option value="Shoes">Shoes</option>
            <option value="Hoodie">Hoodie</option>
            <option value="Bag">Bag</option>
          </select>
        </div>
        <div className="md:w-1/2 md:pl-4 px-3">
          <input
            type="search"
            placeholder="Search products..."
            className="border-2 rounded-full py-2 px-4 w-full hover:border-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="pt-10 max-w-screen-xl mx-auto grid lg:grid-cols-4 grid-cols-2">
        {products
          .filter((item) => {
            const titleMatch =
              searchTerm.trim() === "" ||
              item.title.toLowerCase().includes(searchTerm.toLowerCase());

            const categoryMatch =
              selectedCategory === "" || item.category === selectedCategory;

            return titleMatch && categoryMatch;
          })
          .map((item) => (
            <ProductItem key={item.id} product={item} />
          ))}
      </div>
    </div>
  );
};

export default Products;
