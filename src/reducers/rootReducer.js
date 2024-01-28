import { combineReducers  } from "redux";
import productsSlice from "./productsSlice";
import filtersSlice from "./filtersSlice";

const rootReducer = combineReducers({
    products: productsSlice,
    filters: filtersSlice
})

export default rootReducer
