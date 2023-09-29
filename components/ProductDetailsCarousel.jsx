import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
// import Image from "next/image";

const ProductDetailsCarousel = ({ images }) => {
  return (
    <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
      <Carousel
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        thumbWidth={60}
        className="productCarousel"
      >
        {images.map((img) => (
          <img
            key={img.id}
            src={img.attributes.url}
            alt={img.attributes.name}
          />
        ))}
        {/* <img src="/p1.png" alt="p1" />
        <img src="/p2.png" alt="p2" />
        <img src="/p3.png" alt="p3" />
        <img src="/p4.png" alt="p4" />
        <img src="/p5.png" alt="p5" />
        <img src="/p6.png" alt="p6" />
        <img src="/p1.png" alt="p7" /> */}
      </Carousel>
    </div>
  );
};

export default ProductDetailsCarousel;
