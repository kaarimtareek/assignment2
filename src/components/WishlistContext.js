import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const wishlistContext = createContext();

export function WishlistContextProvider({ children }) {

    const [wishlistProducts, setWishlistProducts] = useState(null);


    async function addProductToWishlist(productId) {

        try {
            const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',
                { 'productId': productId },
                {
                    headers: { token: localStorage.getItem('tkn') }
                });

                getUserWishlist();


            return data;
        }
        catch (e) {

            console.log('error', e);

        }
    };

    async function getUserWishlist() {
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
                headers: {
                    token: localStorage.getItem('tkn')
                }
            });

            setWishlistProducts(data.data);

            getUserWishlist();


            return data;


        }
        catch (e) {

            console.log('error', e);

        }
    };

    async function deleteWishlistItem(productId) {

        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
                headers: { token: localStorage.getItem('tkn') }
            });

            setWishlistProducts(data.data);




            return data;

        } catch (e) {

            console.log('error', e);

        }
    }

    

    useEffect(function () {
        getUserWishlist();
    }, []);

    return <wishlistContext.Provider value={{ getUserWishlist,  addProductToWishlist, deleteWishlistItem, wishlistProducts }}>

        {children}

    </wishlistContext.Provider>
}