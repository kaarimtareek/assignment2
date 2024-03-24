import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

export function Register() {
    let user = {
        userName: "",
        email: "",
        password: "",
        cPassword: "",
    };

    const [errMsg, setErrMsg] = useState(null);
    const [successMsg, setsuccessMsg] = useState(null);
    const navigate = useNavigate();

    async function regesterNewUser(values) {
        
        console.log("submit", values);

        try {
            const { data } = await axios.post(
                `${API_BASE_URL}/auth/signUp`,
                values,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (data.message === "Done") {
                setsuccessMsg("Account has created successfully");

                setTimeout(function () {
                    navigate("/login");
                }, 1000);
            }
        } catch (err) {
            console.log("error", err.response.data.details);
            setErrMsg(err.response.data.details);
        }
    }

    const formikObj = useFormik({
        initialValues: { ...user, role: "User" },
        onSubmit: regesterNewUser,

        validate: function (values) {
            setErrMsg(null);

            const errors = {};

            if (values.userName.length < 3) {
                errors.userName = "Username must be at least 3 letters";
            }

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

            if (values.cPassword !== values.password) {
                errors.cPassword = "the password doesn't match";
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

                <h1 className="pt-5">Register Now</h1>

                <form onSubmit={formikObj.handleSubmit}>
                    <label htmlFor="userName" className="form-label">
                        Username :
                    </label>
                    <input
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        id="userName"
                        value={formikObj.values.userName}
                        className="form-control"
                        type="text"
                        aria-label="default input example"
                    />
                    {formikObj.errors.userName && formikObj.touched.userName ? (
                        <div className="alert alert-danger">
                            {formikObj.errors.userName}
                        </div>
                    ) : (
                        ""
                    )}

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

                    <div className="my-3">
                        <label htmlFor="cPassword" className="form-label">
                            Re-password :
                        </label>
                        <input
                            onBlur={formikObj.handleBlur}
                            onChange={formikObj.handleChange}
                            value={formikObj.values.cPassword}
                            id="cPassword"
                            type="password"
                            className="form-control"
                        />
                        {formikObj.errors.cPassword &&
                        formikObj.touched.cPassword ? (
                            <div className="alert alert-danger">
                                {formikObj.errors.cPassword}
                            </div>
                        ) : (
                            ""
                        )}
                    </div>

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
                            className="btn btn-outline-dark"
                        >
                            Register Now
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
