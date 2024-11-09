import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../type";

interface UserInfo {
  id: string;
  name: string;
  email: string;
  password: number;
}

interface initialState {
  cart: Product[];
  favourite: Product[];
  orderData: Product[];
  userInfo: UserInfo | null;
}

const initialState: initialState = {
  cart: [],
  favourite: [],
  userInfo: null,
  orderData: [],
};

export const counterSlice = createSlice({
  name: "shopper",
  initialState,
  reducers: {
    addToCsrt: (state, action) => {
      const existingProduct = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push(action.payload);
      }
    },
    incressQuantity: (state, action) => {
      const existingProduct = state.cart.find(
        (item) => item._id === action.payload
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      }
    },
    deceressQuantity: (state, action) => {
      const existingProduct = state.cart.find(
        (item) => item._id === action.payload
      );
      if (existingProduct) {
        existingProduct.quantity -= 1;
      }
    },
    singeDelete: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
    },

    allRemove: (state) => {
      state.cart = [];
    },

    // addToFavourite: (state, action) => {
    //   const existingProduct = state.favourite.find(
    //     (item) => item._id === action.payload._id
    //   );
    //   state.favourite.push(action.payload);
    // },
    removeFavourite: (state) => {
      state.favourite = [];
    },
    addUser: (state, action) => {
      state.userInfo = action.payload;
    },
    removeUser: (state) => {
      state.userInfo = null;
    },
    saveOrder: (state, action) => {
      state.orderData = action.payload;
    },
    resetOrder: (state) => {
      state.orderData = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addToCsrt,
  incressQuantity,
  deceressQuantity,
  singeDelete,
  allRemove,

  removeFavourite,
  addUser,
  removeUser,
  saveOrder,
  resetOrder,
} = counterSlice.actions;

export default counterSlice.reducer;
