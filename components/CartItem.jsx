import { removeCartItem, updateCart } from "@/store/cartSlice";
import Image from "next/image";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
const CartItem = ({data}) => {
  const p = data.attributes;
  const dispatch = useDispatch();

  const updatedCartItem = (e, key)=> {
    let payload = {
      key,
      val: key === 'quantity' ? parseInt(e.target.value) : e.target.value,
      id: data.id
    }
    dispatch(updateCart(payload))
    // dispatch(removeCartItem(payload))
  }
  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      {/* IMAGE START */}
      <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
        <Image src={p.thumbnail.data.attributes.url} width={120} height={120} alt={p.name} />
      </div>
      {/* IMAGE END */}
      {/* DETAIL START */}
      <div className="w-full flex flex-col">
        {/* ROW START */}
        <div className="flex flex-col md:flex-row justify-between">
          {/* PRODUCT TITLE */}
          <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
            {p.name}
          </div>

          {/* PRODUCT TITLE */}
          <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
            {p.subtitle}
          </div>

          {/* PRODUCT SUBTITLE */}
          <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
            &#8377; {p.price}
          </div>
        </div>
        {/* PRODUCT subTitle */}
        <div className="text-sm md:text-md font-medium text-black/[0.5]">
          {p.subtitle}
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
            {/* SIZE SELECTION START */}
            <div className="flex items-center gap-1">
              <div className="font-semibold">Size:</div>
              <select className={'hover:text-black p-1'} onChange={(e)=> updatedCartItem(e, 'seletedSize')}>
                {p.size.data.map((item, i)=> (
                <option 
                key={i}
                selected={data.selectedSize === item.size}
                disabled = {!item.enabled} value={item.size}>{item.size}</option>
                ))}
                {/* <option value="1">UK 6</option>
                 */}
              </select>
            </div>
            {/* QUANTITY */}
            <div className="flex items-center gap-1">
              <div className="font-semibold">Quantity:</div>
              <select className="hover:text-black p-1" onChange={(e)=> updatedCartItem(e, 'quantity')}>
                {Array.from({length: 10}, (_, i)=> i+1).map((q,i)=> (
                  <option key={i} selected= {data.quantity === q}value={q}>{q}</option>
                ))}
              </select>
            </div>
          </div>
          <RiDeleteBin6Line className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]" onClick={() => {
                            dispatch(removeCartItem({ id: data.id }));
                        }} />
        </div>
      </div>
      {/* DEATAIL END */}
    </div>
  );
};

export default CartItem;
