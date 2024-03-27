/* eslint-disable jsx-a11y/alt-text */
import axios from "axios";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { cartContext } from "./CartContext";
import { wishlistContext } from "./WishlistContext";
import { Spinner } from "./Spinner";
import { API_BASE_URL } from "../config";
import { Products } from "./Products";
export function ProductsPage() {
    debugger;
    function getAllProducts() {
        return axios.get(`${API_BASE_URL}/product`);
    }

    const { isLoading, data } = useQuery("allProducts", getAllProducts);
    console.log(data);

    if (isLoading) {
        return <Spinner />;
    }

    let products = data.data.products;

    return (
        <>
            <Products products={products}></Products>
        </>
    );
}
