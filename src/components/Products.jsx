/* eslint-disable jsx-a11y/alt-text */
import axios from "axios";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { cartContext } from "./CartContext";
import { wishlistContext } from "./WishlistContext";
import { API_BASE_URL } from "../config";
export function Products(props) {
    const { addProductToCart } = useContext(cartContext);
    const { addProductToWishlist } = useContext(wishlistContext);

    async function addProduct(id) {
        const res = await addProductToCart(id);
        if ((res.message = "Done")) {
            toast.success("product was added to cart");
        } else {
            toast.error("error occured");
        }
    }
    async function wishProduct(id) {
        const res = await addProductToWishlist(id);
    }

    let { products } = props;

    return (
        <>
            <div className="container py-5">
                <div className="row justify-content-center d-flex gy-5">
                    {products?.map((product) => {
                        return (
                            <div
                                key={product._id}
                                className="col-lg-3 col-md-4 col-sm-6"
                            >
                                <div
                                    data-discount={product.discount + "% OFF"}
                                    className="product-card card mx-3"
                                >
                                    <Link
                                        to={`/productDetailes/${product._id}`}
                                    >
                                        <img
                                            src={product.mainImage.secure_url}
                                            className="product-image card-img-top img-fluid"
                                            style={{
                                                maxWidth: "100%",
                                                height: "auto",
                                                objectFit: "cover",
                                            }}
                                        />
                                        <div className="card-body ">
                                            <div className="card-title">
                                                <h5
                                                    className="py-1 text-center text-uppercase text"
                                                    color=""
                                                    style={{
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {product.name
                                                        .split(" ")
                                                        .slice(0 - 2)
                                                        .join(" ")}
                                                </h5>
                                                <div
                                                    className="tags d-flex flex-wrap flex-start"
                                                    style={{
                                                        color: "lightgrey",
                                                        fontWeight: 100,
                                                    }}
                                                >
                                                    <span class="tag badge rounded-pill bg-info">
                                                        {
                                                            product?.categoryId
                                                                ?.name
                                                        }
                                                    </span>
                                                    <span class="tag badge rounded-pill bg-info ">
                                                        {
                                                            product
                                                                ?.subCategoryId
                                                                ?.name
                                                        }
                                                    </span>
                                                    <span class="tag badge rounded-pill bg-info">
                                                        {product?.brandId?.name}
                                                    </span>
                                                </div>
                                                <div className="d-flex justify-content-between mt-3">
                                                    PRICE{" "}
                                                    <span
                                                        className="bg-light"
                                                        style={{
                                                            padding: "5px 10px",
                                                            fontWeight: "500",
                                                        }}
                                                    >
                                                        {product.price} EGP
                                                    </span>
                                                    {/* <p>
                                                {" "}
                                                <span>
                                                    <i className="fa-solid fa-star text-warning"></i>
                                                </span>
                                                {product.ratingsAverage}
                                            </p> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="card-footer d-flex justify-content-between"
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                backgroundColor:
                                                    "red !important",
                                            }}
                                        >
                                            <button
                                                onClick={() =>
                                                    addProduct(product._id)
                                                }
                                                className="btn btn-outline-danger mb-2"
                                            >
                                                {" "}
                                                + Add
                                            </button>
                                            <Link
                                                onMouseEnter={(e) =>
                                                    e.target.classList.add(
                                                        "fa-solid"
                                                    )
                                                }
                                                onMouseLeave={(e) =>
                                                    e.target.classList.remove(
                                                        "fa-solid"
                                                    )
                                                }
                                                onClick={() =>
                                                    wishProduct(product._id)
                                                }
                                            >
                                                <i className="pointer fa-regular fa-heart d-flex justify-content-end fs-3"></i>
                                            </Link>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
