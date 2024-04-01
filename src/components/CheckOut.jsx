import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { cartContext } from "./CartContext";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../config";

export function CheckOut() {
    const {
        cartId,
        getUserCart,
        setCartProducts,
        setTotalCartPrice,
        setNumOfCartItems,
        clearCart,
    } = useContext(cartContext);
    const [errMsg, setErrMsg] = useState(null);
    const [successMsg, setsuccessMsg] = useState(null);
    const navigate = useNavigate();

    async function confirmPayment(values) {
        console.log("submit", values);

        try {
            const cartData = await getUserCart();
            const products = cartData.cart.products.map((p) => {
                return { productId: p.productId, quantity: p.quantity };
            });
            const token = localStorage.getItem("tkn");

            values = { ...values, products };
            const phone = values.phone;
            values.phone = [phone];
            if (values.couponName === null || values.couponName === "") {
                delete values.couponName;
            }
            console.log(values);
           
            const { data } = await axios.post(`${API_BASE_URL}/order`, values, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (data.message === "Done") {
                toast.success("order placed successfully");

                await clearCart();

                window.open(data.session.url, "_self");
            }
        } catch (err) {
            toast.error(err.response.data.globalMessage);
            console.log("error", err);
        }
    }

    const formikObj = useFormik({
        initialValues: { paymentTypes: "card" },

        onSubmit: confirmPayment,

        validate: function (values) {
            setErrMsg(null);

            const errors = {};

            if (values && values.address && values.address.length < 20) {
                errors.address = "address must be at least 20 letters";
            }

            if (
                values &&
                values.phone &&
                !values.phone.match(/^(02)?01[0125][0-9]{8}$/)
            ) {
                errors.phone = "phone not valid";
            }

            return errors;
        },
    });

    return (
        <>
            <div className="container pt-5">
                {errMsg ? (
                    <div className="alert alert-danger">{errMsg}</div>
                ) : (
                    ""
                )}
                {successMsg ? (
                    <div className="alert alert-success">{successMsg}</div>
                ) : (
                    ""
                )}

                <h1 className="pt-5">Order Now</h1>

                <form onSubmit={formikObj.handleSubmit}>
                    <label htmlFor="address" className="form-label">
                        Address :
                    </label>
                    <input
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        id="address"
                        value={formikObj.values.address}
                        className="form-control"
                        type="text"
                        aria-label="default input example"
                    />
                    {formikObj.errors.address && formikObj.touched.address ? (
                        <div className="alert alert-danger">
                            {formikObj.errors.address}
                        </div>
                    ) : (
                        ""
                    )}

                    <label htmlFor="phone" className="form-label">
                        Phone :
                    </label>
                    <input
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        id="phone"
                        value={formikObj.values.phone}
                        className="form-control"
                        type="text"
                        aria-label="default input example"
                    />
                    {formikObj.errors.phone && formikObj.touched.phone ? (
                        <div className="alert alert-danger">
                            {formikObj.errors.phone}
                        </div>
                    ) : (
                        ""
                    )}

                    <label htmlFor="couponName" className="form-label">
                        Coupon Name :
                    </label>
                    <input
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        id="couponName"
                        value={formikObj.values.couponName}
                        className="form-control"
                        type="text"
                        aria-label="default input example"
                    />
                    <div
                        onBlur={formikObj.handleBlur}
                        className="d-flex justify-content-end mt-3"
                    >
                        <button
                            type="submit"
                            id="submit"
                            disabled={
                                formikObj.isValid === false ||
                                formikObj.dirty === false
                            }
                            className="btn btn-outline-primary w-100"
                        >
                            Place Order
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
