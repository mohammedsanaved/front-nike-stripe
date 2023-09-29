import CartItem from "@/components/CartItem";
import Wrapper from "@/components/Wrapper";
// import { addToCart, savetoLocalStorage } from "@/store/cartSlice";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { makePaymentRequest } from "@/utils/api";


const Cart = () => {
  const [loading, setLoading] = useState(false)
  const {cartItems} = useSelector(state => state.cart);
  // const dispatch = useDispatch();
  const subTotal = useMemo(() => {
    return cartItems.reduce(
        (total, val) => total + val.attributes.price,
        0
    );
}, [cartItems]);


  // // Function to retrieve cart data from localStorage
  // const getCartFromLocalStorage = () => {
  //   const cartData = localStorage.getItem("cart");
  //   return cartData ? JSON.parse(cartData) : [];
  // };

  // // Load cart data from localStorage when the component mounts
  // useEffect(() => {
  //   const localStorageCart = getCartFromLocalStorage();
  //   // You can do further processing with localStorageCart if needed
  // }, []);


const handlePayment = async () => {
  try {
    setLoading(true);
  let stripePromise = null;
  const getStripe = ()=> {
    if(!stripePromise) {
      stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
    }
    return stripePromise
  }
      const stripe = await getStripe();
      const res = await makePaymentRequest("/api/stripeids", {
          products: cartItems,
      });
      await stripe.redirectToCheckout({
        sessionId: res.stripeSession.id,
      });
  } catch (err) {
      setLoading(false);
      console.log(err);
  }
};

  return (
    <div className="w-full md:py-20">
      <Wrapper>
        {cartItems.length > 0 &&
          <>
          {/* HEADING AND PARAGRAPH START */}
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Shopping Cart
          </div>
        </div>
        {/* HEADING AND PARAGRAPH END */}
        {/* CART CONTENT START */}
        <div className="flex flex-col lg:flex-row gap-12 py-10">
          {/* CART ITEMS START */}
          <div className="flex-[2]">
            <div className="text-lg font-bold">Cart Items</div>
            {cartItems.map((item) => (
              <CartItem key={item.id} data={item} />
            ))}
            
          </div>
          {/* CART ITEMS END */}

          {/* SUMMARY START */}
          <div className="flex-[1]">
            <div className="text-lg font-bold">Summary</div>

            <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
              {/* ROW START */}
              <div className="flex justify-between">
                {/* HEADING */}
                <div className="uppercase text-md md:text-lg font-medium text-black">
                  Subtotal
                </div>

                {/* PRICE */}
                <div className="text-md md:text-lg font-medium text-black">
                  &#8377; {subTotal}
                </div>
              </div>
              {/* ROW END */}

              {/* MSG */}
              <div className="text-sm md:text-md py-5 border-t mt-5">
                The subtotal reflects the total price of your order, including
                duties and taxes, before any applicable discounts. It does not
                include delivery costs and international transaction fees.
              </div>
            </div>

            {/* BUTTON START */}
            <button className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center justify-center gap-3" onClick={handlePayment}>
              Checkout
              {loading && <img src="/spinner.svg" />}
            </button>
            {/* BUTTON END */}
          </div>
          {/* SUMMARY END */}
        </div>
        {/* CART CONTENT END */}
          </>

        }
        
        {/* Only display this when cart is Empty */}
        {cartItems.length < 1 && <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
          <Image
            src={"/empty-cart.jpg"}
            width={300}
            height={300}
            className="w-[300px] md:w-[400px]"
          />
          <span className="text-xl font-bold"> Your Cart Is Empty</span>
          <span className="text-lg font-urbanist mt-2 mb-2 sm:text-sm">
            There are no items in your bag.
          </span>
          <Link
            href={"/"}
            className="w-[35%] py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center justify-center gap-3"
          >
            Continue Shopping Here
          </Link>
        </div>}
      </Wrapper>
    </div>
  );
};

export default Cart;
