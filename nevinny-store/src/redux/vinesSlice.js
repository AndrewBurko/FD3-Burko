import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataLoadState: 0, //0 - not loaded, 1 - is loading, 2 - loaded, 3 - error
  dataLoadError: null,
  initialData: null,
  data: null,
  cart: [],
};

export const vinesSlice = createSlice({
  name: "vines",
  initialState,
  reducers: {

    updateLoadState: (state, action) => {
      state.dataLoadState = action.payload.state;
      state.dataLoadError = action.payload.error;
    },

    updateData: (state, action) => {
      state.initialData = action.payload;
      state.data = [...state.initialData];
    },

    addItemToCart: (state, action) => {
      state.cart.push(action.payload);
    },

    changeItemAmount: (state, action) => {
      state.cart.forEach( v => {
        if (v.item.id === action.payload.currentItemId) {
          v.amount = action.payload.currentAmount;
        }
      });
    },

    deleteItemFromCart: (state, action) => {
      const index = state.cart.findIndex( v => v.item.id === action.payload);
      state.cart.splice(index, 1);
    },

    clearCart: (state, action) => {
      state.cart = [];
    },

    updateCart: (state, action) => {
      state.cart = action.payload;
    },

  },
});

export const { updateLoadState, updateData, addItemToCart, changeItemAmount, deleteItemFromCart, clearCart, updateCart } = vinesSlice.actions;
export default vinesSlice.reducer;