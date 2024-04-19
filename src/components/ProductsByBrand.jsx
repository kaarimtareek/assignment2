import axios from "axios";
import React, { useContext } from "react";
import { ColorRing } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { cartContext } from "./CartContext";
import { wishlistContext } from "./WishlistContext";
import { Products } from "./Products";
import { API_BASE_URL } from "../config";
import { Spinner } from "./Spinner";
export function ProductsByBrand() {
  const { addProductToCart } = useContext(cartContext);
  const { addProductToWishlist } = useContext(wishlistContext);

  const { id } = useParams();

  async function addProduct(id) {
    const res = await addProductToCart(id);

    if (res.status === "success") {
      toast.success(res.message, {
        position: "top-right",
      });
    }
  }

  async function wishProduct(id) {
    const res = await addProductToWishlist(id);

    if (res.status === "success") {
      toast.success(res.message, {
        position: "top-right",
      });
    }
  }

  function getAllProducts() {
    return axios.get(`${API_BASE_URL}/product`);
  }
  const { isLoading, data } = useQuery("allProducts", getAllProducts);
  console.log(data);

  if (isLoading) {
    return <Spinner />;
  }

  let products = data.data.products;
  products = products?.filter((product) => product.brandId?._id === id);
  let brandName =products? products[0]?.brandId?.name : "";

  console.log(products);

  return (
    <>
      <h3
        style={{
          textAlign: "center",
          marginTop: "40px",
          marginBottom: "40px",
          textTransform: "capitalize",
          color: "#224f34",
          fontWeight: "700",
        }}
      >
        {brandName}
      </h3>
      <Products products={products} />
    </>
  );
}
