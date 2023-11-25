import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, firestore, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, getDoc, deleteDoc, collection, addDoc } from "firebase/firestore";
import { AdminIcon } from "../assets";
import { toast, ToastContainer } from "react-toastify";
import EditProduct from "../components/EditProduct";
import { onSnapshot } from "firebase/firestore";

const ManageProducts = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const getUserDetail = async (uid, field) => {
    try {
      const docRef = doc(firestore, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data()[field];
      }

      return "";
    } catch (error) {
      console.error("Error getting user details:", error);
      return "";
    }
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        const isAdminValue = await getUserDetail(user.uid, "isAdmin");
        setIsAdmin(isAdminValue === true);
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  });

  useEffect(() => {
    const delay = 1000;

    const timeoutId = setTimeout(() => {
      if (!isAdmin) {
        navigate("/404");
      }
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [isAdmin, navigate]);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = () => {
      const productsRef = collection(firestore, "products");

      const unsubscribe = onSnapshot(productsRef, (snapshot) => {
        const productsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      });

      return unsubscribe;
    };

    fetchProducts();
  }, []);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const CreateProductModal = ({ onClose }) => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    const handleCreateProduct = async () => {
      try {
        if (title && price && category && description && image) {
          const storageRef = ref(storage, `images/${image.name}`);
          await uploadBytes(storageRef, image);
          const imageUrl = await getDownloadURL(storageRef);
          const productsCollection = collection(firestore, "products");
          await addDoc(productsCollection, {
            title,
            price,
            category,
            description,
            image: imageUrl,
          });
          toast.success("Product created successfully");
          onClose();
        } else {
          alert("Please fill in all required fields");
        }
      } catch (error) {
        console.error("Error creating product:", error);
      }
    };
    const handleCloseModal = () => {
      onClose();
    };
    const handleImageChange = (e) => {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-white w-80 p-4 mt-12 rounded-lg ">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold mb-4">Create Product</h2>
            <button
              onClick={handleCloseModal}
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
              onClick={handleCreateProduct}
              className="bg-green-500 text-white py-2 px-3 active:bg-green-500 hover:bg-green-400 mx-auto rounded flex justify-center items-center"
            >
              Create Product
            </button>
          </form>
        </div>
      </div>
    );
  };

  //Edit product
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };
  //

  //Delete product
  const handleDeleteProduct = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {
      try {
        const productRef = doc(firestore, "products", productId);
        await deleteDoc(productRef);
        toast.success("Product deleted successfully");
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  //showdetail
  const handleProductDetail = (product) => {
    const productId = product.id;
    navigate(`/product/${productId}`, {
      state: {
        items: product,
      },
    });
  };

  //category filter

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div className="min-h-[650px]">
      {isAdmin && (
        <div className="max-w-screen-xl mx-auto py-10">
          <div className="flex">
            <h2 className="mr-auto text-3xl font-bold font-titleFont drop-shadow-[3px_3px_3px_rgba(255,0,0)] pl-2">
              Manage Products ({products.length}) items
            </h2>
            
          </div>

          <div className="my-8 pl-2">
            <select
              className="p-2 border border-gray-300 rounded-lg w-48 mr-2"
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
            <button
              className="w-1/8 bg-green-500 text-white py-2 px-3 active:bg-green-500 hover:bg-green-400 rounded mt-4"
              onClick={() => setCreateModalOpen(true)}
            >
              Create Product
            </button>
          </div>

          <div className="max-h-96 my-10 min-h-[650px] overflow-y-auto border-2 border-gray-400">
            {filteredProducts.length === 0 ? (
              <div className="max-w-screen-xl mx-auto py-20 items-center flex flex-col justify-center">
                <img className="w-28 mt-36" src={AdminIcon} alt="cartImg"></img>
                <p className="text-2xl font-semibold font-titleFont text-gray-300 mt-10">
                  No products has been made!
                </p>
              </div>
            ) : (
              <table className="table-auto w-full font-titleFont">
                <thead className="sticky top-0">
                  <tr>
                    <th className="border px-4 py-2 bg-gray-200">Image</th>
                    <th className="border px-4 py-2 bg-gray-200">Title</th>
                    <th className="border px-4 py-2 bg-gray-200">Price</th>
                    <th className="border px-4 py-2 bg-gray-200">Category</th>
                    <th className="border px-4 py-2 bg-gray-200">
                      Description
                    </th>
                    <th className="border px-4 py-2 bg-gray-200">Operation</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="border px-4 py-2 w-40 text-center">
                        <img
                          onClick={() => handleProductDetail(product)}
                          className="px-2 py-2 object-cover cursor-pointer"
                          src={product.image}
                          alt="ProductImage"
                        />
                      </td>
                      <td className="border px-4 py-2 w-40 text-center">
                        {product.title}
                      </td>
                      <td className="border px-4 py-2 w-20 text-center">
                        ${product.price}
                      </td>
                      <td className="border px-4 py-2 w-20 text-center">
                        {product.category}
                      </td>
                      <td className="border px-4 py-2 w-80 text-center">
                        {product.description}
                      </td>
                      <td className="border px-4 py-2 w-32 text-center">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="bg-blue-500 text-white py-2 px-3  active:bg-blue-500 hover:bg-blue-400 rounded mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="bg-red-500 text-white py-2 px-3  active:bg-red-500 hover:bg-red-400 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
      {isCreateModalOpen && (
        <CreateProductModal onClose={() => setCreateModalOpen(false)} />
      )}
      {isEditModalOpen && (
        <EditProduct
          product={selectedProduct}
          onClose={() => setEditModalOpen(false)}
        />
      )}
      <ToastContainer position="top-right" autoClose={5000} theme="light" />
    </div>
  );
};
export default ManageProducts;
