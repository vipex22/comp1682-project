import axios from "axios";

export async function productData() {
  const products = await axios.get("https://fakestoreapi.com/products");
  return products;
}
export async function categoryData() {
  const categories = await axios.get("https://fakestoreapi.com/products/categories");
  return categories;
}
