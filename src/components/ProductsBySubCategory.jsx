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
    products = products?.filter(
        (product) => product?.subCategoryId?._id === id
    );
    const subCategoryName = products[0]?.subCategoryId?.name;
    console.log(products);

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
                {subCategoryName}
            </h3>
            <Products products={products} />
        </>
    );
}
