// src/reducers/index.ts

import {combineReducers} from 'redux';
import productsReducer from './productReducer.ts';
import cartReducer from "./cartReducer.ts";

export interface RootState {
  products: ReturnType<typeof productsReducer>; // Correct type for products reducer
  cart:ReturnType<typeof cartReducer>;
  // Add other slices of state here
}

const rootReducer = combineReducers({
  products: productsReducer,
  cart:cartReducer

  // Add other reducers here
});

export default rootReducer;
