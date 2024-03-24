import React from "react";
import { Button, Table } from "react-bootstrap";
import { API_BASE_URL } from "../config";
import axios from "axios";
import { useQuery } from "react-query";
import { toast } from "react-hot-toast";

import { ColorRing } from "react-loader-spinner";

export const Orders = () => {
    async function getAllOrders() {
        return await axios.get(`${API_BASE_URL}/order/orders/myOrders`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("tkn"),
            },
        });
    }
    const { isLoading, data } = useQuery("allProducts", getAllOrders);
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

    const handleCancelOrder = async (orderId) => {
        debugger;
        try {
            const { data } = await axios.patch(
                `${API_BASE_URL}/order/${orderId}/canceled`,
                {},
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("tkn"),
                    },
                }
            );

            toast.success("Order has been canceled successfully");
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (e) {
            toast.error("error occured");
        }
    };

    let orders = data.data.order;

    return (
        <Table
            striped
            bordered
            hover
            style={{
                position: "absolute",
                top: "100px",
            }}
        >
            <thead>
                <tr>
                    <th>Products</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Payment Type</th>
                    <th>Final Price</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {orders?.map((order) => (
                    <tr key={order._id}>
                        <td>
                            <ul>
                                {order.products.map((product, index) => (
                                    <li key={index}>
                                        {product.name} - Quantity:{" "}
                                        {product.quantity}
                                    </li>
                                ))}
                            </ul>
                        </td>
                        <td>{order.address}</td>
                        <td>{order.phone.join(", ")}</td>
                        <td>{order.paymentTypes}</td>
                        <td>{order.finalPrice}</td>
                        <td>{order.status}</td>
                        <td>
                            {order.status === "waitForPayment" && (
                                <Button
                                    variant="danger"
                                    onClick={() => handleCancelOrder(order._id)}
                                >
                                    Cancel Order
                                </Button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};
