import {Product} from "../sagas/types.ts";

export enum ProductActionTypes {
    FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST',
    FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS',
    FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE',
}

interface FetchProductsRequestAction {
    type: typeof ProductActionTypes.FETCH_PRODUCTS_REQUEST;
}

interface FetchProductsSuccessAction {
    type: typeof ProductActionTypes.FETCH_PRODUCTS_SUCCESS;
    payload: Product[];
}

interface FetchProductsFailureAction {
    type: typeof ProductActionTypes.FETCH_PRODUCTS_FAILURE;
    payload: string;
}

export type ProductAction =
    | FetchProductsRequestAction
    | FetchProductsSuccessAction
    | FetchProductsFailureAction;
