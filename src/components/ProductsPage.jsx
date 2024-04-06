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
            <h3
                style={{
                    textAlign: "center",
                    marginTop: "40px",
                    marginBottom: "40px",
                    textTransform: "capitalize",
                    color: "#224f34",
                    fontWeight: "700",
                }}
            >
                All Products
            </h3>
            <Products products={products}></Products>
        </>
    );
}
