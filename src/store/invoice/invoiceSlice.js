import { createSlice } from "@reduxjs/toolkit"

export const initialState = {
  invoices: [],
};

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState: initialState,
  reducers: {
    add: (state, action) => {
      state.invoices = [...state.invoices, action.payload]
    },
  },
})


export const { add } = invoiceSlice.actions

export default invoiceSlice.reducer
