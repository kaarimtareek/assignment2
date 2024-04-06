import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const divStyle = {
    backgroundSize: "contain",
    backgroundPoistion: "center",
    height: "400px",
    width: "auto",
};

export const Slideshow = (slideImages) => {
    return (
        <div className="slide-container">
            <Slide>
                {slideImages.map((slideImage, index) => (
                    <div key={index}>
                        <div
                            style={{
                                ...divStyle,
                                backgroundImage: `url(${slideImage.secure_url})`,
                            }}
                        ></div>
                    </div>
                ))}
            </Slide>
        </div>
    );
};
