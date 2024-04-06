import React from "react";
import { Products } from "./Products";
import axios from "axios";
import { Spinner } from "./Spinner";
import { Link } from "react-router-dom";

import { API_BASE_URL } from "../config";
import { useQuery, useQueries } from "react-query";
import { Brands } from "./Brands";

const token = localStorage.getItem("tkn");
const getAllProducts = () => {
    return axios.get(`${API_BASE_URL}/product`);
};

const getAllBrands = () => {
    return axios.get(`${API_BASE_URL}/brand`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export function Home() {
    const queries = useQueries([
        { queryKey: "products", queryFn: getAllProducts },
        { queryKey: "brands", queryFn: getAllBrands },
    ]);

    const isLoading = queries.some((query) => query.isLoading);
    const [productsQuery, brandsQuery] = queries;

    if (isLoading) {
        return <Spinner />;
    }

    const products = productsQuery.data.data.products;
    const brands = brandsQuery.data.data.brand;

    console.log({ brands, products });

    return (
        <>
            <div className="landing">
                <div className="row">
                    <div className="col-lg-6 col-md-12 p-5">
                        <div className="landing-text">
                            <p className="landing-title">
                                Discover and Find Your Own Fashion!
                            </p>
                            <p className="landing-paragraph">
                                Explore our curated collection of stylish
                                clothing and accessories tailored to your unique
                                taste.
                            </p>
                        </div>
                        <Link
                            to={"/products"}
                            className="btn btn-secondary text-light"
                            style={{
                                borderRadius: 0,
                                padding: "10px 20px",
                                width: "200px",
                                fontWeight: 500,
                                color: "wthie",
                            }}
                        >
                            EXPLORE NOW
                        </Link>
                    </div>
                    <div className="model-photo-container col-lg-6 p-5">
                        <img
                            src={require("../assets/model.png")}
                            alt="model"
                            style={{ height: "500px", width: "auto" }}
                        />
                    </div>
                </div>
            </div>
            <div className="recommended-products-section ">
                <h3 className="recommended-products-title section-heading">
                    Recommended Products
                </h3>
                <p className="recommended-products-text section-text">
                    Get in on the trend with our curated selection of
                    recommended products.
                </p>
                <Products products={products.slice(1, 4)} />
                <Link
                    to="/products"
                    className="btn btn-outline-info"
                    style={{
                        display: "block",
                        margin: "20px auto",
                        width: "fit-content",
                        padding: "10px 20px",
                        borderRadius: 0,
                    }}
                >
                    SEE MORE
                </Link>
            </div>
            <div className="feedback-section">
                <h3 className="feedback-section-title section-heading">
                    Feedback Corner
                </h3>
                <div className="feedback-section-container">
                    <div className="feedback-item">
                        <h5 className="feedback-author">Emily Wilson</h5>
                        <div className="feedback-content">
                            The customer experience was exceptional from start
                            to finish. The website is user-friendly, the
                            checkout process was smooth, and the clothes I
                            ordered fit perfectly. I'm beyond satisfied!
                        </div>
                    </div>
                    <div className="feedback-item">
                        <h5 className="feedback-author">Sarah Thompson</h5>
                        <div className="feedback-content">
                            I absolutely love the quality and style of the
                            clothing I purchased from this website. customer
                            service was outstanding, and I received my order
                            quickly. Highly recommended!
                        </div>
                    </div>
                    <div className="feedback-item">
                        <h5 className="feedback-author">David Hanks</h5>
                        <div className="feedback-content">
                            I absolutely love the quality and style of the
                            clothing I purchased from this website. customer
                            service was outstanding, and I received my order
                            quickly. Highly recommended!
                        </div>
                    </div>
                </div>
            </div>

            <div className="brands-section" style={{ marginBottom: "150px" }}>
                <h3 className="brands-section-title section-heading">
                    Our Brands
                </h3>
                <p className="brands-section-text section-text ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Totam optio reiciendis fugit non quisquam est, itaque
                    incidunt odio hic. Molestiae!
                </p>
                <Brands brands={brands.slice(0, 3)} />
            </div>
        </>
    );
}
