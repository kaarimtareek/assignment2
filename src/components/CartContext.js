import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../config";

export const cartContext = createContext();

export function CartContextProvider({ children }) {
    const [cartProducts, setCartProducts] = useState([]);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [cartId, setCartId] = useState("");
    const token = localStorage.getItem("tkn");

    async function addProductToCart(productId, qty = 1) {
        try {
            const { data } = await axios.post(
                `${API_BASE_URL}/cart`,
                { productId, quantity: qty },
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );

            await getUserCart();

            return data;
        } catch (e) {
            console.log("error", e);
        }
    }

    async function getProductsByIds(productIds) {
        try {
            const { data } = await axios.get(
                `${API_BASE_URL}/product/products/list/?${productIds
                    .map((id) => `productIds=${id}`)
                    .join("&")}`,
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("tkn"),
                    },
                }
            );

            return data;
        } catch (e) {
            console.log("error", e);
        }
    }

    async function getUserCart() {
        try {
            let { data } = await axios.get(`${API_BASE_URL}/cart`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tkn"),
                },
            });
            console.log(data);

            let { products } = await getProductsByIds(
                data.cart.products.map((p) => p.productId)
            );

            for (let i = 0; i < products.length; ++i) {
                products[i]["qty"] = data.cart.products[i].quantity;
            }

            console.log(products);

            setCartId(data.cart._id);
            setCartProducts(products);
            setNumOfCartItems(products.length);
            setTotalCartPrice(calculateCartTotalPrice(products));

            return data;
        } catch (e) {
            console.log("error", e);
        }
    }

    function calculateCartTotalPrice(products) {
        let total = 0;
        for (let i = 0; i < products.length; i++) {
            total +=
                products[i].price *
                products[i].qty *
                ((100 - products[i].discount) / 100);
        }
        return total;
    }
    async function deleteCartItem(productId) {
        try {
            const { data } = await axios.patch(
                `${API_BASE_URL}/cart/${productId}`,
                {},
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );

            await getUserCart();

            return data;
        } catch (e) {
            console.log("error", e);
        }
    }

    async function updateCartItem(productId, count) {
        try {
            const { data } = await axios.put(
                `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                {
                    count: count,
                },
                {
                    headers: { token: localStorage.getItem("tkn") },
                }
            );

            setNumOfCartItems(data.numOfCartItems);
            setCartProducts(data.data.products);
            setTotalCartPrice(data.data.totalCartPrice);

            return data;
        } catch (e) {
            console.log("error", e);
        }
    }

    async function clearCart() {
        try {
            const { data } = await axios.patch(
                `${API_BASE_URL}/cart`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("tkn")}`,
                    },
                }
            );

            setNumOfCartItems(0);
            setCartProducts([]);
            setTotalCartPrice(0);

            return data;
        } catch (e) {
            console.log("error", e);
        }
    }

    useEffect(function () {
        getUserCart();
    }, []);

    return (
        <cartContext.Provider
            value={{
                getUserCart,
                cartId,
                clearCart,
                updateCartItem,
                addProductToCart,
                deleteCartItem,
                setCartProducts,
                setTotalCartPrice,
                setNumOfCartItems,
                cartProducts,
                totalCartPrice,
                numOfCartItems,
            }}
        >
            {children}
        </cartContext.Provider>
    );
}
