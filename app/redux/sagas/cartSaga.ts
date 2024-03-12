import {all, put, takeLatest} from 'redux-saga/effects';

import { addToCartSuccess } from '../actions/cartActions';
import {CartActionTypes} from "../types";

function* addToCartSaga(action: any) {
    try {
        yield put(addToCartSuccess(action.payload.item));
    } catch (error) {
        // Handle error
    }
}

function* watchAddToCart() {
    yield takeLatest(CartActionTypes.ADD_TO_CART_SUCCESS, addToCartSaga);
}

export default function* cartSaga() {
    yield all([
        watchAddToCart(),
        // Add other sagas as needed
    ]);
}
