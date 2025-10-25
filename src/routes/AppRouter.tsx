import { lazy, Suspense } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
// layouts
const MainLayout = lazy(() => import("@layouts/MainLayout/MainLayout"));

// pages
const Home = lazy(() => import("@pages/Home"));
const Categories = lazy(() => import("@pages/Categories"));
const Error = lazy(() => import("@pages/Error"));
const Products = lazy(() => import("@pages/Products"));
const AboutUs = lazy(() => import("@pages/AboutUs"));
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));
const Cart = lazy(() => import("@pages/Cart"));
const Wishlist = lazy(() => import("@pages/Wishlist"));

const LoadingFallback = () => <div>Loading...</div>;

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<LoadingFallback />}>
          <MainLayout />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "categories",
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <Categories />
            </Suspense>
          ),
        },
        {
          path: "categories/products/:prefix",
          loader: ({ params }) => {
            if (typeof params.prefix !== "string" || !/^[a-z]+$/i.test(params.prefix)) {
              throw new Response("Bad Request", {
                statusText: "Category not found",
                status: 400,
              });
            }
            return true;
          },
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <Products />
            </Suspense>
          ),
          errorElement: <Error />,
        },
        {
          path: "about-us",
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <AboutUs />
            </Suspense>
          ),
        },
        {
          path: "login",
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <Login />
            </Suspense>
          ),
        },
        {
          path: "register",
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <Register />
            </Suspense>
          ),
        },
        {
          path: "cart",
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <Cart />
            </Suspense>
          ),
        },
        {
          path: "wishlist",
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <Wishlist />
            </Suspense>
          ),
        },
        {
          path: "*",
          element: <Error />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRouter;
