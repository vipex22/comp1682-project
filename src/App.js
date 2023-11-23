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

import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";

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
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/products",
        element: <AllProduct />,
      },
      {
        path: "/contact",
        element: <Contact />,
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
