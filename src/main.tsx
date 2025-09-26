import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// layouts
import MainLayout from "@layouts/MainLayout/MainLayout";

// pages
import Home from "@pages/Home";
import Categories from "@pages/Categories";
import Error from "@pages/Error";
import Products from "@pages/Products";
import AboutUs from "@pages/AboutUs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "products/:id",
        element: <Products />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);
