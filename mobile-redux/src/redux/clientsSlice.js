import { createSlice } from "@reduxjs/toolkit";

import clientsArr from "../clientsArr.json";

const initialState = {
  clients: clientsArr,
};

export const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {

    delClient: (state, action) => {
      const index = state.clients.findIndex( (v) => v.id === action.payload);
      state.clients.splice(index, 1);
    },

    addClient: (state, action) => {
      state.clients.push(action.payload);
    },

    changeClient: (state, action) => {
      const index = state.clients.findIndex( (v) => v.id === action.payload.currentClientId);
      state.clients[index] = {...state.clients[index], ...action.payload.newClientData};
    },
  },
});

export const { delClient, addClient, changeClient } = clientsSlice.actions;
export default clientsSlice.reducer;