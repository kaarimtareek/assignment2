import axios from "axios";
import React, { useContext } from "react";
import { ColorRing } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { cartContext } from "./CartContext";
import { wishlistContext } from "./WishlistContext";
import { API_BASE_URL } from "../config";
export function Products() {
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
    // products = products.filter(
    //     (product) =>
    //         product.categoryId.id === "65d0a284a2bcca8d1b12747a"
    // );
    // console.log(products);

    return (            
        <>
            <div className="container py-5">
                <div className="row gy-4 mt-5">
                    {products?.map((product) => {
                        return (
                            <div key={product._id} className="col-md-3">
                                <div className="product px-3">
                                    <Link
                                        to={`/productDetailes/${product._id}`}
                                    >
                                        <img
                                            src={product.mainImage.secure_url}
                                            className="w-auto"
                                            alt={""}
                                            height="150px"
                                        />
                                        <h6 className="text-success">
                                            Category: {product.categoryId?.name}
                                        </h6>
                                        <h6 className="text-success">
                                            SubCategory:{" "}
                                            {product.subCategoryId?.name}
                                        </h6>
                                        <h6 className="text-success">
                                            Brand: {product.brandId?.name}
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
