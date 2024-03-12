
import {Product} from '../sagas/types';
import {ProductActionTypes} from "../types/actionTypes.ts";



export const fetchProductsRequest = () => ({
  type: ProductActionTypes.FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = (products: Product[]) => ({
  type: ProductActionTypes.FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProductsFailure = (error: string) => ({
  type: ProductActionTypes.FETCH_PRODUCTS_FAILURE,
  payload: error,
});
