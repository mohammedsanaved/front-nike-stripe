import ProductDetailsCarousel from "@/components/ProductDetailsCarousel";
import RelatedProducts from "@/components/RelatedProducts";
import { toastSuccess } from "@/components/UI/Toast";
import Wrapper from "@/components/Wrapper";
import { addToCart } from "@/store/cartSlice";
import { fetchData } from "@/utils/api";
import { getDiscountPrice } from "@/utils/helper";
import React, { useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

const ProductDetails = ({ product, products }) => {
  const [selectedSize, setSelectedSize] = useState();
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const p = product?.data?.[0]?.attributes;
  return (
    <div className="w-full md:py-20">
      <Wrapper>
        <ToastContainer />
        <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
            <ProductDetailsCarousel images={p?.image?.data} />
          </div>
          <div className="flex-[1] py-3">
            {/* PRODUCT TITLE */}
            <div className="text-[34px] font-semibold mb-2 leading-tight">
              {p.name}
            </div>

            {/* PRODUCT SUBTITLE */}
            <div className="text-lg font-semibold mb-5">{p.subtitle}</div>

            {/* PRODUCT PRICE */}
            <div className="flex items-center">
              <p className="mr-2 text-lg font-semibold">
                MRP : &#8377; {p.price}
              </p>
              {p.original_price && (
                <>
                  <p className="text-lg font-medium line-through text-slate-400">
                    &#8377;{p.original_price}
                  </p>
                  <p className="ml-auto text-lg font-medium text-green-500">
                    {getDiscountPrice(p.original_price, p.price)}% Off
                  </p>
                </>
              )}
            </div>

            {/* TAX MSG */}
            <div className="text-md font-medium text-black/[0.5]">
              incl. of taxes
            </div>
            {/* TAX MSG */}
            <div className="text-md font-medium text-black/[0.5] mb-20">
              {`(Also includes all applicable duties)`}
            </div>
            {/* PRODUCT SIZE RANGE START */}
            <div className="mb-10">
              {/* HEADING START */}
              <div className="flex justify-between mb-2">
                <div className="text-md font-semibold">Select Size</div>
                <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                  Select Guide
                </div>
              </div>
              {/* HEADING END */}
              {/* SIZE START */}
              <div id="sizesGrid" className="grid grid-cols-3 gap-2">
                {/* SIZE NUMBER START */}

                {p?.size?.data?.map((item, i) => (
                  <div
                    key={i}
                    className={`border rounded-md text-center py-3 font-medium ${
                      item.enabled
                        ? "hover:border-black cursor-pointer"
                        : "bg-black/[0.2] cursor-not-allowed"
                    } ${selectedSize === item.size ? "border-black" : ""}`}
                    onClick={() => {
                      setSelectedSize(item.size);
                      setError(false);
                    }}
                  >
                    {item.size}
                  </div>
                ))}
                {/* SIZE NUMBER END */}
              </div>
              {/* SIZE END */}
              {/* ERROR START */}
              {error && (
                <div className="text-red-600 mt-1">
                  Size selection is required
                </div>
              )}
              {/* ERROR END */}
              {/* PRODUCT SIZE RANGE END */}
            </div>
            {/* ADD TO CART BUTTON START */}
            <button
              className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
              onClick={() => {
                if (!selectedSize) {
                  setError(true);
                  // document.getElementById("sizeGrid").scrollIntoView({
                  //   block: "center",
                  //   behavior: "smooth",
                  // });
                } else {
                  dispatch(
                    addToCart({
                      ...product?.data?.[0],
                      selectedSize,
                      oneQuatityPrice: p.price,
                    })
                  );
                  toastSuccess("Item added to Cart");
                }
              }}
            >
              Add to Cart
            </button>
            {/* ADD TO CART BUTTON END */}
            {/* WHISHLIST BUTTON START */}
            <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10">
              Whishlist
              <IoMdHeartEmpty size={20} />
            </button>
            {/* WHISHLIST BUTTON END */}
            {/* PRODUCT DETAILS START */}
            <div>
              <div className="text-lg font-bold mb-5">Product Details</div>
              <div className="markdown text-md mb-5">
                <ReactMarkdown>{p.description}</ReactMarkdown>
              </div>
            </div>
            {/* PRODUCT DETAILS END */}
          </div>
        </div>
        <RelatedProducts products={products} />
      </Wrapper>
    </div>
  );
};

export default ProductDetails;

export async function getStaticPaths() {
  const product = await fetchData("/api/products?populate=*");

  const paths = product?.data?.map((p) => ({
    params: {
      slug: p.attributes.slug,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params: { slug } }) {
  const product = await fetchData(
    `/api/products?populate=*&filters[slug][$eq]=${slug}`
  );
  const category = product?.data?.[0]?.attributes?.categories?.data[0]?.attributes?.slug;
  const products = await fetchData(
    `/api/products?populate=*&[filters][categories][slug][$eq]=${category}&[filters][slug][$ne]=${slug}`
  );
  // const products = await fetchData(
  //   `/api/products?populate=*&[filters][slug][$ne]=${slug}`
  // );

  return {
    props: {
      product,
      products,
    },
  };
}
