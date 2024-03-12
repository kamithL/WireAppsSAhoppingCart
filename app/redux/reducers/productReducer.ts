import {ProductActionTypes, ProductState} from '../types';
import { ProductAction } from '../types';

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

const productReducer = (
    state = initialState,
    action: ProductAction,
): ProductState => {
  switch (action.type) {
    case ProductActionTypes.FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ProductActionTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: null,
      };
    case ProductActionTypes.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
