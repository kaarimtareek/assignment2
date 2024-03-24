import { Component } from "react";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Brands } from "./components/Brands";
import { Products } from "./components/Products";
import { Wishlist } from "./components/Wishlist";
import { Home } from "./components/Home";
import { Categories } from "./components/Categories";
import { AuthContextProvider } from "./components/authen";
// import { ProtectedRoute } from "./components/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import { ProductDetails } from "./components/ProductDetails";
import { Toaster } from "react-hot-toast";
import { CartContextProvider } from "./components/CartContext";
import { Cart } from "./components/Cart";
import { WishlistContextProvider } from "./components/WishlistContext";
import { CheckOut } from "./components/CheckOut";
import { SubCategories } from "./components/Subcategories";
import { ProductsByCategory } from "./components/ProductsByCategory";
import { ProductsBySubCategory } from "./components/ProductsBySubCategory";
import { ProductsByBrand } from "./components/ProductsByBrand";
import { Orders } from "./components/Orders";

const router = createHashRouter([
    {
        path: "",
        element: <Layout />,
        children: [
            { path: "/", element: <Login /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "Home", element: <Home /> },
            { path: "checkout", element: <CheckOut /> },
            { path: "cart", element: <Cart /> },
            { path: "wishlist", element: <Wishlist /> },
            { path: "productDetailes/:id", element: <ProductDetails /> },
            // {index:true ,element:<Home />},
            { path: "products", element: <Products /> },
            { path: "categories", element: <Categories /> },
            { path: "brands", element: <Brands /> },
            { path: "subcategories", element: <SubCategories /> },
            { path: "productsByCategory/:id", element: <ProductsByCategory /> },
            {
                path: "productsBySubCategory/:id",
                element: <ProductsBySubCategory />,
            },
            { path: "productsByBrand/:id", element: <ProductsByBrand /> },
            { path: "orders", element: <Orders /> },

            {
                path: "*",
                element: (
                    <h1 className="d-flex vh-100 justify-content-center align-items-center">
                        Not Found
                        <br /> Error 404
                    </h1>
                ),
            },
        ],
    },
]);

export class App extends Component {
    render() {
        let queryClient = new QueryClient();
        {
            return (
                <>
                    <QueryClientProvider client={queryClient}>
                        <CartContextProvider>
                            <WishlistContextProvider>
                                <AuthContextProvider>
                                    <RouterProvider router={router} />
                                </AuthContextProvider>
                            </WishlistContextProvider>
                        </CartContextProvider>
                        <Toaster />
                    </QueryClientProvider>
                </>
            );
        }
    }
}
