import React, { useState, useEffect } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { storage, firestore } from "../firebase";
import { toast } from "react-toastify";

const EditProduct = ({ product, onClose }) => {
  const [title, setTitle] = useState(product ? product.title || "" : "");
  const [price, setPrice] = useState(product ? product.price || "" : "");
  const [category, setCategory] = useState(
    product ? product.category || "" : ""
  );
  const [description, setDescription] = useState(
    product ? product.description || "" : ""
  );
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (product) {
      setTitle(product.title || "");
      setPrice(product.price || "");
      setCategory(product.category || "");
      setDescription(product.description || "");
    }
  }, [product]);

  const handleEditProduct = async () => {
    try {
      if (title && price && category && description) {
        let imageUrl = product.image;

        if (image) {
          const storageRef = ref(storage, `images/${image.name}`);
          await uploadBytes(storageRef, image);
          imageUrl = await getDownloadURL(storageRef);
        }

        const productDocRef = doc(firestore, "products", product.id);
        await updateDoc(productDocRef, {
          title,
          price,
          category,
          description,
          image: imageUrl,
        });

        toast.success("Product updated successfully");
        onClose();
      } else {
        alert("Please fill in all required fields");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white w-80 p-4 mt-12 rounded-lg">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
          <button
            onClick={onClose}
            className="bg-gray-300 rounded-full w-6 h-6 justify-center items-center"
          >
            X
          </button>
        </div>
        <form>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-600"
            >
              Product Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-600"
            >
              Price
            </label>
            <input
              type="text"
              id="price"
              name="price"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-600"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Shirt">Shirt</option>
              <option value="Pant">Pant</option>
              <option value="Hat">Hat</option>
              <option value="Shoes">Shoes</option>
              <option value="Hoodie">Hoodie</option>
              <option value="Bag">Bag</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600"
            >
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-600"
            >
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              onChange={handleImageChange}
              accept="image/*"
              required
            />
          </div>
          <button
            type="button"
            onClick={handleEditProduct}
            className="bg-blue-500 text-white py-2 px-3 active:bg-blue-500 hover:bg-blue-400 mx-auto rounded flex justify-center items-center"
          >
            Edit Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
