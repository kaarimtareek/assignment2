/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "./authen";
import { cartContext } from "./CartContext";
import { Categories } from "./Categories";
import axios from "axios";
import { useQuery } from "react-query";
import { API_BASE_URL } from "../config";

export function NavLogin() {
  const navFun = useNavigate();
  const { token, setToken } = useContext(authContext);
  const { numOfCartItems } = useContext(cartContext);
  const [dataInfo, setDataInfo] = useState(numOfCartItems);

  function getAllCategories() {
    return axios.get(`${API_BASE_URL}/category`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tkn")}`,
      },
    });
  }
  const { isLoading, data } = useQuery("allCategories", getAllCategories);
  if (isLoading) {
    return "Loading...";
  }

  const categories = data.data.categories;
  function logout() {
    localStorage.removeItem("tkn");
    setToken(null);
    navFun("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid d-flex justify-content-center p-3">
          <Link style={{}} className="navbar-brand" to={"/home"}>
            {/* <i className="fa-solid fa-cart-shopping d-inline-block align-text-top text-success fs-1"></i>
                        <span className="fw-bold">Fresh Cart</span> */}
            <img src={require("../assets/images/image.png")} alt="logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse d-flex justify-content-around"
            id="navbarNav"
          >
            {token ? (
              <ul
                className="navbar-nav me-auto mb-2 mb-lg-0"
                style={{ fontWeight: 500 }}
              >
                <li className="nav-item" style={{ fontWeight: 500 }}>
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
                  <Link className="nav-link" to={"/wishlist"}>
                    Wishlist
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/products"}>
                    Products
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Categories
                  </Link>
                  <Categories categories={categories} />
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to={"/subcategories"}>
                    Sub-Categories
                  </Link>
                </li>
              </ul>
            ) : (
              ""
            )}

            {token ? (
              <ul className="navbar-nav text-secondary">
                <li
                  className="nav-item  shopping-cart position-relative"
                  data-cart-items-count={numOfCartItems}
                >
                  <Link to={"/cart"}>
                    <i className="position-relative fa-solid fa-cart-shopping d-inline-block align-text-top text-dark fs-3">
                      {/* <span className=" fs-6 position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                                                {numOfCartItems}
                                                <span className="visually-hidden">
                                                    unread messages
                                                </span>
                                            </span> */}
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
                    <Link className="nav-link" to={"/login"}>
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
