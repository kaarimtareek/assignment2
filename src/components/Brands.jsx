import axios from "axios";
import React from "react";
import { ColorRing } from "react-loader-spinner";
import { useQuery } from "react-query";
import { API_BASE_URL } from "../config";
import { Link } from "react-router-dom";

export function Brands() {
    const token = localStorage.getItem("tkn");
    function getAllBrands() {
        return axios.get(`${API_BASE_URL}/brand`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
    const { isLoading, data } = useQuery("allBrands", getAllBrands);
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
    return (
        <>
            <div className="container py-5">
                <h1 className="text-success text-center py-5">All Brands</h1>

                <div className="row gy-4 ">
                    {data?.data.brand.map((b) => {
                        return (
                            <div key={b._id} className="col-md-3 ">
                                <div className="brand border">
                                    <img
                                        style={{ height: "200px" }}
                                        src={b.image?.secure_url}
                                        className="w-100"
                                        alt={b.name}
                                    />

                                    <Link to={`/productsByBrand/${b._id}`}>
                                        <h5 className=" text-center py-3">
                                            {b.name}
                                        </h5>
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
