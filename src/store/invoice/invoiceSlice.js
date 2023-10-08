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
    remove: (state, action) => {
      state.invoices = state.invoices.filter((invoice) => invoice.invoiceNumber !== action.payload)
    },
    edit: (state, action) => {
      state.invoices = state.invoices.map((invoice) => {
        if (invoice.invoiceNumber === action.payload.invoiceNumber) {
          return action.payload
        }
        return invoice
      })
    },
  },
})


export const { add, remove, edit } = invoiceSlice.actions

export default invoiceSlice.reducer
