// src/sagas/productsSaga.ts

import { call, put, takeLatest } from 'redux-saga/effects';

import {
  fetchProductsFailure,
  fetchProductsSuccess,
} from '../actions/productActions'; // Remove the .ts extension from the import

import axios from 'axios';
import { API_PRODUCT, BASE_URL } from '../../constants';
import {ProductActionTypes} from "../types";


// Example function to fetch products from an API
function* fetchProducts(): Generator<any, void, any> {
  try {
    // Make API request to fetch products
    const url = `${BASE_URL}${API_PRODUCT}`;
    const response = yield call(axios.get, url);
    yield put(fetchProductsSuccess(response.data));
  } catch (error) {
    yield put(fetchProductsFailure('Failed to fetch products'));
  }
}

// Saga watcher
function* productsSaga() {
  yield takeLatest(ProductActionTypes.FETCH_PRODUCTS_REQUEST, fetchProducts);
}

export default productsSaga;
