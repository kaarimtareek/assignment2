import axios from "axios";
import React from "react";
import { ColorRing } from "react-loader-spinner";
import { useQuery } from "react-query";
import { API_BASE_URL } from "../config";
import { Link } from "react-router-dom";

export function SubCategories() {
    function getAllSubsubCategories() {
        return axios.get(`${API_BASE_URL}/category/subcategories/all`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("tkn")}`,
            },
        });
    }
    const { isLoading, data } = useQuery(
        "allSubsubCategories",
        getAllSubsubCategories
    );
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
                <div className="row gy-4 pt-5 ">
                    {data?.data.subCategories.map((subCategory) => {
                        return (
                            <div key={subCategory._id} className="col-md-4">
                                <div className="subCategories border">
                                    <img
                                        style={{ height: "300px" }}
                                        src={subCategory.image.secure_url}
                                        className="w-100"
                                        alt={subCategory.name}
                                    />
                                    <Link
                                        to={`/productsBySubCategory/${subCategory._id}`}
                                    >
                                        <h4 className="text-success text-center py-3">
                                            {subCategory.name}
                                        </h4>
                                    </Link>
                                    <h6 className="text-success text-center py-3">
                                        {subCategory.categoryId?.name}
                                    </h6>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
