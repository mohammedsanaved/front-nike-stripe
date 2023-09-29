import { createSlice } from "@reduxjs/toolkit";
// const loadCartFromLocalStorage = () => {
//   const cartData = localStorage.getItem("cart");
//   return cartData ? JSON.parse(cartData) : [];
// };
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    // cartItems: loadCartFromLocalStorage(),
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.attributes.price = existingItem.oneQuatityPrice * existingItem.quantity;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      // localStorage.setItem('cart', JSON.stringify(state.cartItems));

      // saveCartToLocalStorage(state.cartItems);
    },
    updateCart: (state, action)=> {
      state.cartItems = state.cartItems.map((p)=> {
        if(p.id === action.payload.id) {
          if(action.payload.key === 'quantity') {
            p.attributes.price = p.oneQuatityPrice * action.payload.val
          }
          return {...p, [action.payload.key]: action.payload.val}
        }
        return p;
      })
      // localStorage.setItem('cart', JSON.stringify(state.cartItems));
      // saveCartToLocalStorage(state.cartItems);
    },
    removeCartItem: (state, action)=> {
      const removeItem = state.cartItems.filter((item)=> item.id !== action.payload.id);
      state.cartItems = removeItem;
      // localStorage.setItem('cart', JSON.stringify(state.cartItems));
      // saveCartToLocalStorage(state.cartItems);
    }
  },
});
// export const savetoLocalStorage = (cartItems)=> {
//   localStorage.setItem('cart', JSON.stringify(cartItems))
// }

// Action creators are generated for each case reducer function
export const { addToCart , updateCart, removeCartItem} = cartSlice.actions;



export default cartSlice.reducer;
