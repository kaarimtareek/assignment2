import axios from "axios";
import React, { useContext } from "react";
import { ColorRing } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { cartContext } from "./CartContext";
import { wishlistContext } from "./WishlistContext";
import { API_BASE_URL } from "../config";
export function ProductsBySubCategory() {
    const { addProductToCart } = useContext(cartContext);
    const { addProductToWishlist } = useContext(wishlistContext);

    const { id } = useParams();

    async function addProduct(id) {
        const res = await addProductToCart(id);

        if (res.status === "success") {
            toast.success(res.message, {
                position: "top-right",
            });
        }
    }

    async function wishProduct(id) {
        const res = await addProductToWishlist(id);

        if (res.status === "success") {
            toast.success(res.message, {
                position: "top-right",
            });
        }
    }

    function getAllProducts() {
        return axios.get(`${API_BASE_URL}/product`);
    }
    const { isLoading, data } = useQuery("allProducts", getAllProducts);
    console.log(data);

    if (isLoading) {
        return (
            <div className=" vh-100 d-flex align-items-center justify-content-center">
                <ColorRing
                    visible={true}
                    hight="80"
                    width="80"
                    arialLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={[
                        "#e15b64",
                        "#f47e60",
                        "#f8b26a",
                        "#abbd81",
                        "#849b87",
                    ]}
                />
            </div>
        );
    }

    let products = data.data.products;
    products = products?.filter((product) => product.subCategoryId?._id === id);
    console.log(products);

    return (
        <>
            <div className="container py-5">
                <div className="row gy-4">
                    <input
                        type="text"
                        id="search"
                        className="form-control mt-5"
                        placeholder="search"
                    />

                    {products?.map((product) => {
                        return (
                            <div key={product._id} className="col-md-3">
                                <div className="product px-3">
                                    <Link
                                        to={`/productDetailes/${product._id}`}
                                    >
                                        <img
                                            src={product.mainImage.secure_url}
                                            className="w-100"
                                            alt={product.name}
                                        />
                                        <h6 className="text-success">
                                            Category: {product.categoryId?.name}
                                        </h6>
                                        <h6 className="text-success">
                                            SubCategory:{" "}
                                            {product.subCategoryId.name}
                                        </h6>
                                        <h6 className="text-success">
                                            Brand: {product.brandId.name}
                                        </h6>
                                        <h5 className="py-3">
                                            TITLE:{" "}
                                            {product.name
                                                .split(" ")
                                                .slice(0 - 2)
                                                .join(" ")}
                                        </h5>
                                        <div className="d-flex justify-content-between ">
                                            PRICE: <p>{product.price} EGP</p>
                                            {/* <p>
                                                {" "}
                                                <span>
                                                    <i className="fa-solid fa-star text-warning"></i>
                                                </span>
                                                {product.ratingsAverage}
                                            </p> */}
                                        </div>
                                        <Link
                                            onClick={() =>
                                                wishProduct(product._id)
                                            }
                                        >
                                            <i className="pointer fa-solid fa-heart d-flex justify-content-end fs-3"></i>
                                        </Link>
                                    </Link>
                                    <button
                                        onClick={() => addProduct(product._id)}
                                        className="btn btn-success mb-2"
                                    >
                                        {" "}
                                        + Add
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
