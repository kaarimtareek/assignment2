import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authContext } from "./authen";

import { API_BASE_URL } from "../config";

export function Login() {
    const { setToken } = useContext(authContext);

    let user = {
        email: "",
        password: "",
    };

    const [errMsg, setErrMsg] = useState(null);
    const [successMsg, setsuccessMsg] = useState(null);
    const navigate = useNavigate();

    async function loginUser(values) {
        try {
            const { data } = await axios.post(
                `${API_BASE_URL}/auth/logIn`,
                values,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (data.message === "Done") {
                setsuccessMsg("Welcome");
                localStorage.setItem("tkn", data.token);
                setToken(data.token);

                setTimeout(function () {
                    navigate("/home");
                }, 500);
            }
        } catch (err) {
            setErrMsg(err.response.data.globalMessage);
            console.log("error", err.response.data.globalMessage);
        }
    }

    const formikObj = useFormik({
        initialValues: user,

        onSubmit: loginUser,

        validate: function (values) {
            setErrMsg(null);

            const errors = {};

            if (
                values.email.includes("@") === false ||
                values.email.includes(".") === false
            ) {
                errors.email = "This email is invalid";
            }

            if (values.password.length < 8 || values.password.length > 10) {
                errors.password =
                    "password must be betweent 8 characters to 10 characters ";
            }

            return errors;
        },
    });

    return (
        <>
            <div className="mx-5 pt-5">
                {errMsg ? (
                    <div className="alert alert-danger my-3">{errMsg}</div>
                ) : (
                    ""
                )}
                {successMsg ? (
                    <div className="alert alert-success">{successMsg}</div>
                ) : (
                    ""
                )}
                <h1 className="pt-5">Login Now</h1>

                <form onSubmit={formikObj.handleSubmit}>
                    <div className="my-3">
                        <label htmlFor="email" className="form-label">
                            Email :
                        </label>
                        <input
                            onBlur={formikObj.handleBlur}
                            onChange={formikObj.handleChange}
                            value={formikObj.values.email}
                            id="email"
                            type="email"
                            className="form-control"
                        />
                        {formikObj.errors.email && formikObj.touched.email ? (
                            <div className="alert alert-danger">
                                {formikObj.errors.email}
                            </div>
                        ) : (
                            ""
                        )}
                    </div>

                    <label htmlFor="password" className="form-label">
                        Password :
                    </label>
                    <input
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        value={formikObj.values.password}
                        id="password"
                        type="password"
                        className="form-control"
                    />
                    {formikObj.errors.password && formikObj.touched.password ? (
                        <div className="alert alert-danger">
                            {formikObj.errors.password}
                        </div>
                    ) : (
                        ""
                    )}

                    <div
                        onBlur={formikObj.handleBlur}
                        className="d-flex justify-content-between mt-3"
                    >
                        <Link className="passHov text-decoration-none fs-4">
                            forget your password ?
                        </Link>
                        <button
                            type="submit"
                            id="submit"
                            // disabled={
                            //     formikObj.isValid === false ||
                            //     formikObj.dirty === false
                            // }
                            className="btn btn-outline-dark"
                        >
                            Login Now
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
