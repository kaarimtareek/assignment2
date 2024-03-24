import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "./authen";
import { cartContext } from "./CartContext";

export function NavLogin() {
    const { token, setToken } = useContext(authContext);
    const { numOfCartItems } = useContext(cartContext);
    const navFun = useNavigate();

    function logout() {
        localStorage.removeItem("tkn");
        setToken(null);
        navFun("/login");
    }

    return (
        <>
            <nav
                className="navbar navbar-expand-lg bg-body-tertiary"
                style={{
                    position: "fixed",
                }}
            >
                <div className="container d-flex justify-content-between">
                    <Link className="navbar-brand" to={"/home"}>
                        <i className="fa-solid fa-cart-shopping d-inline-block align-text-top text-success fs-1"></i>
                        <span className="fw-bold">Fresh Cart</span>
                    </Link>
                    <div
                        className="collapse navbar-collapse d-flex justify-content-around"
                        id="navbarNav"
                    >
                        {token ? (
                            <>
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link active"
                                            aria-current="page"
                                            to={"/home"}
                                        >
                                            Home
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={"/cart"}>
                                            Cart
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link"
                                            to={"/wishlist"}
                                        >
                                            Wishlist
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link"
                                            to={"/products"}
                                        >
                                            Products
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link"
                                            to={"/categories"}
                                        >
                                            Categories
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link"
                                            to={"/subcategories"}
                                        >
                                            Sub-Categories
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link"
                                            to={"/brands"}
                                        >
                                            Brands
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link"
                                            to={"/orders"}
                                        >
                                            My Orders
                                        </Link>
                                    </li>
                                </ul>
                            </>
                        ) : (
                            ""
                        )}

                        {token ? (
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to={"/cart"}>
                                        <i className="position-relative fa-solid fa-cart-shopping d-inline-block align-text-top text-dark fs-3">
                                            <span className=" fs-6 position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                                                {numOfCartItems}
                                                <span className="visually-hidden">
                                                    unread messages
                                                </span>
                                            </span>
                                        </i>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link onClick={logout} className="nav-link">
                                        Logout
                                    </Link>
                                </li>
                            </ul>
                        ) : (
                            <div
                                className="collapse navbar-collapse d-flex justify-content-end"
                                id="navbarNav"
                            >
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link active"
                                            aria-current="page"
                                            to={"/register"}
                                        >
                                            Register
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link"
                                            to={"/login"}
                                        >
                                            Login
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}
