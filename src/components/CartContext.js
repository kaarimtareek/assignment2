import axios from "axios";
import { createContext, useEffect, useState } from "react";



export const cartContext = createContext();

export function CartContextProvider({ children }) {

    const [cartProducts, setCartProducts] = useState(null);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [cartId, setCartId] = useState(null);




    async function addProductToCart(productId) {

        try {
            const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/cart',
                { 'productId': productId },
                {
                    headers: { token: localStorage.getItem('tkn') }
                });

                getUserCart();


            return data;
        }
        catch (e) {

            console.log('error', e);

        }
    };

    async function getUserCart() {
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
                headers: {
                    token: localStorage.getItem('tkn')
                }
            }); 

            setNumOfCartItems(data.numOfCartItems);
            setCartProducts(data.data.products);
            setTotalCartPrice(data.data.totalCartPrice);
            setCartId(data.data._id);


            return data;


        }
        catch (e) {

            console.log('error', e);

        }
    };

    async function deleteCartItem(productId) { 

        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
                headers: { token: localStorage.getItem('tkn') }
            });

            setNumOfCartItems(data.numOfCartItems);
            setCartProducts(data.data.products);
            setTotalCartPrice(data.data.totalCartPrice);

            return data;

        } catch (e) {

            console.log('error', e);

        }
    }

    async function updateCartItem(productId, count) {

        try {
            const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
                'count':count}, 
            {
                headers: {token: localStorage.getItem('tkn')}
            });

            setNumOfCartItems(data.numOfCartItems);
            setCartProducts(data.data.products);
            setTotalCartPrice(data.data.totalCartPrice);

            return data;

        } catch (e) {

            console.log('error', e);

        }
    }

    async function clearCart() {
        try {
            const { data } = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {
                headers: {
                    token: localStorage.getItem('tkn')
                }
            });

            setNumOfCartItems(0);
            setCartProducts([]);
            setTotalCartPrice(0);

            return data;


        }
        catch (e) {

            console.log('error', e);

        }
    };
    

    useEffect(function () {
        getUserCart();
    }, []);

    return <cartContext.Provider value={{ getUserCart, cartId, clearCart, updateCartItem, addProductToCart, deleteCartItem,setCartProducts,setTotalCartPrice,setNumOfCartItems, cartProducts, totalCartPrice, numOfCartItems }}>

        {children}

    </cartContext.Provider>
}