import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../config";

export const wishlistContext = createContext();

export function WishlistContextProvider({ children }) {
    const [wishlistProducts, setWishlistProducts] = useState(null);
    const token = localStorage.getItem("tkn");

    async function addProductToWishlist(productId) {
        
        try {
            const { data } = await axios.patch(
                `${API_BASE_URL}/user/addToWishList/${productId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            getUserWishlist();

            return data;
        } catch (e) {
            console.log("error", e);
        }
    }

    async function getUserWishlist() {
        try {
            const { data } = await axios.get(
                "https://ecommerce.routemisr.com/api/v1/wishlist",
                {
                    headers: {
                        token: localStorage.getItem("tkn"),
                    },
                }
            );

            setWishlistProducts(data.data);

            getUserWishlist();

            return data;
        } catch (e) {
            console.log("error", e);
        }
    }

    async function deleteWishlistItem(productId) {
        try {
            const { data } = await axios.patch(
                `${API_BASE_URL}/user/removeFromWishList/${productId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setWishlistProducts(data.data);

            return data;
        } catch (e) {
            console.log("error", e);
        }
    }

    useEffect(function () {
        getUserWishlist();
    }, []);

    return (
        <wishlistContext.Provider
            value={{
                getUserWishlist,
                addProductToWishlist,
                deleteWishlistItem,
                wishlistProducts,
            }}
        >
            {children}
        </wishlistContext.Provider>
    );
}
