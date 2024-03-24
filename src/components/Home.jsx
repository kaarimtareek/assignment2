import React, { useContext } from "react";
import { authContext } from "./authen";
import { HomeSlider } from "./homeSlider";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Products } from "./Products";

export function Home() {
    const { token } = useContext(authContext);

    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <>
            <div className="container">
                <div className="row ">
                    <div className="col-sm-9 ">
                        <div className="mt-5 ms-5">
                            <Slider {...settings}>
                                <div>
                                    <img
                                        style={{
                                            width: "50%",
                                            height: "400px",
                                        }}
                                        src={require("../images/XCM_Manual_1396328_4379574_Egypt_EG_BAU_GW_DC_SL_Jewelry_379x304_1X._SY304_CB650636675_.jpg")}
                                    />
                                </div>
                                <div>
                                    <img
                                        style={{
                                            width: "50%",
                                            height: "400px",
                                        }}
                                        src={require("../images/41nN4nvKaAL._AC_SY200_.jpg")}
                                    />
                                </div>
                                <div>
                                    <img
                                        style={{
                                            width: "50%",
                                            height: "400px",
                                        }}
                                        src={require("../images/61cSNgtEISL._AC_SY200_.jpg")}
                                    />
                                </div>
                            </Slider>
                        </div>
                    </div>

                    <div className="col-sm-3 mt-5">
                        <img
                            style={{ width: "100%", height: "200px" }}
                            src={require("../images/bags.jpg")}
                            alt=""
                        />
                        <img
                            style={{ width: "100%", height: "200px" }}
                            src={require("../images/giutar.jpg")}
                            alt=""
                        />
                    </div>
                </div>
                <HomeSlider />
            </div>

            <Products />
        </>
    );
}
