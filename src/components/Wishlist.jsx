import React, { useContext } from "react";
import { ColorRing } from "react-loader-spinner";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { wishlistContext } from "./WishlistContext";
import { cartContext } from "./CartContext";

export function Wishlist() {
    const { wishlistProducts, deleteWishlistItem } =
        useContext(wishlistContext);
    const { addProductToCart } = useContext(cartContext);

    if (wishlistProducts === null) {
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

    if (wishlistProducts.length === 0) {
        return (
            <>
                <div className="bg-light container py-5">
                    <h1 className="pt-5"> Wishlist</h1>
                    <h3>your Wishlist is empty</h3>
                </div>
            </>
        );
    }

    async function addProduct(id) {
        const res = await addProductToCart(id);

        if (res.message === "Done") {
            toast.success("product was added to cart", {
                position: "top-right",
            });
        } else {
            toast.error("error occured");
        }
    }

    async function deleteWish(id) {
        const res = await deleteWishlistItem(id);
        if (res.message === "remove to Wishlist") {
            toast.success("product Removed Successfully");
        } else {
            toast.error("Error occurred");
        }
    }

    return (
        <>
            <div className="container pt-5 bg-light">
                <div className="row pt-5">
                    <div className="d-flex align-items-center justify-content-between p-5">
                        <h2>My wish List</h2>
                    </div>

                    {wishlistProducts?.map((product) => {
                        return (
                            <div
                                key={product._id}
                                className="row border-bottom border-3  p-2"
                            >
                                <div className="d-flex justify-content-between">
                                    <div className=" d-flex align-items-center">
                                        <img
                                            className="w-25"
                                            src={product.mainImage?.secure_url}
                                            alt={product.name}
                                        />

                                        <div className="px-4">
                                            <h4>{product.name}</h4>
                                            <h6 className="text-success">
                                                {product.price} EGP
                                            </h6>
                                            <Link
                                                onClick={() =>
                                                    deleteWish(product._id)
                                                }
                                                className="text-danger"
                                            >
                                                {" "}
                                                <i className="fa-solid fa-trash-can "></i>{" "}
                                                Remove{" "}
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center">
                                        <button
                                            onClick={() =>
                                                addProduct(product._id)
                                            }
                                            className="btn btn-outline-success w-100 "
                                        >
                                            {" "}
                                            Add To Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
