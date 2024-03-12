// src/sagas/index.ts

import {all} from 'redux-saga/effects';
import productsSaga from './productSaga.ts';

// Root saga
export default function* rootSaga() {
  yield all([
    productsSaga(),
    // Add other sagas here
  ]);
}
