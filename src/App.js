import React from "react";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductDetail from "./components/ProductDetail";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import AllProduct from "./pages/AllProduct";
import AdminLogin from "./pages/AdminLogin";
import ManageOrders from "./pages/ManageOrders";
import NotFound from "./pages/NotFound";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import ManageProducts from "./pages/ManageProducts";

const Layout = () => {
  return (
    <div>
      <Header />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product/:id",
        element: <ProductDetail />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/adminlogin",
        element: <AdminLogin />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/products",
        element: <AllProduct />,
      },
      {
        path: "/manageorders",
        element: <ManageOrders />,
      },
      {
        path: "/manageproducts",
        element: <ManageProducts />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/404",
        element: <NotFound />,
      },
      {
        path: "*",
        element: <Navigate to="/404" />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
