import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: "400px",
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
