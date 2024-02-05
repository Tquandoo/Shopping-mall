
import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../redux-toolkit/productsSlice";
import filtersSlice from "../redux-toolkit/filtersSlice";
import cartSlice from "../redux-toolkit/cartSlice";
import orderSlice from "../redux-toolkit/orderSlice";
const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    filters: filtersSlice.reducer,
    cart: cartSlice.reducer,
    orders: orderSlice.reducer
  }
})
export default store