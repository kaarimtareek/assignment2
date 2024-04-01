import axios from "axios";
import React, { useContext } from "react";
import { ColorRing } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { cartContext } from "./CartContext";
import { wishlistContext } from "./WishlistContext";
import { API_BASE_URL } from "../config";
import { Spinner } from "./Spinner";
import { Products } from "./Products";
export function ProductsBySubCategory() {
    const { addProductToCart } = useContext(cartContext);
    const { addProductToWishlist } = useContext(wishlistContext);

    const { id } = useParams();

    function getAllProducts() {
        return axios.get(`${API_BASE_URL}/product`);
    }
    const { isLoading, data } = useQuery("allProducts", getAllProducts);
    console.log(data);

    if (isLoading) {
        return <Spinner />;
    }

    let products = data.data.products;
    products = products?.filter((product) => product.subCategoryId?._id === id);
    console.log(products);

    return (
        <>
            <Products products={products} />
        </>
    );
}
