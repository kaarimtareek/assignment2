import React, { useContext } from "react";
import { cartContext } from "./CartContext";
import { Link, useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { toast } from "react-hot-toast";

export function Cart() {
    let {
        cartProducts,
        clearCart,
        totalCartPrice,
        numOfCartItems,
        deleteCartItem,
    } = useContext(cartContext);
    if (cartProducts === null) {
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

    if (cartProducts.length === 0) {
        return (
            <>
                <div className="bg-light container py-5">
                    <h1 className="pt-5">Cart Shop</h1>
                    <h3>your cart is empty</h3>
                </div>
            </>
        );
    }

    async function clearCartItems() {
        

        const res = await clearCart();
        console.log(res);

        if (res.message === "Done") {
            toast.success("cart has been cleared");
        } else {
            toast.error("Error occurred");
        }

        cartProducts = [];
        numOfCartItems = 0;
        totalCartPrice = 0;
    }

    async function deleteItem(id) {
        const res = await deleteCartItem(id);
        console.log(res);
        if (res.message === "Done") {
            toast.success("product Removed Successfully");
        } else {
            toast.error("Error occurred");
        }
    }

    const displayDiscount = (product) => {
        if (product.discount !== 0) {
            return <h6>Discount:{product.discount}%</h6>;
        }
    };

    return (
        <>
            <div className="container pt-5 bg-light">
                <div className="row pt-5">
                    <div className="d-flex align-items-center justify-content-between pt-5">
                        <div>
                            <h2>Cart Shop</h2>
                            <h5 className="text-success py-2">
                                Total Price: {totalCartPrice}
                                {" EGP"}
                            </h5>
                        </div>
                        <div>
                            <Link to="/checkout" className="btn btn-primary  ">
                                {" "}
                                Check Out
                            </Link>
                            <h5 className="text-success py-3">
                                Total Number of Items: {numOfCartItems}{" "}
                            </h5>
                        </div>
                    </div>

                    {cartProducts?.map((product) => {
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
                                            <h4>
                                                {product.name
                                                    .split(" ")
                                                    .slice(0 - 2)
                                                    .join(" ")}
                                            </h4>
                                            <h5>{product.price} EGP</h5>
                                            <h6>Quantity: {product.qty}</h6>
                                            {displayDiscount(product)}
                                            <Link
                                                onClick={() =>
                                                    deleteItem(product._id)
                                                }
                                                className="text-danger"
                                            >
                                                {" "}
                                                <i className="fa-solid fa-trash-can "></i>{" "}
                                                Remove{" "}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    <button
                        onClick={clearCartItems}
                        className="btn btn-outline-success m-auto w-25 my-5"
                    >
                        {" "}
                        Clear Cart
                    </button>
                </div>
            </div>
        </>
    );
}
