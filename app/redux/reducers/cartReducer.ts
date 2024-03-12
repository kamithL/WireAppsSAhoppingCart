import {CartActionTypes, CartItem} from '../types';

const initialState: CartItem[] = [];

const cartReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case CartActionTypes.ADD_TO_CART_SUCCESS:
            return [...state, action.payload];
        case 'REMOVE_FROM_CART':
            const updatedItems = state.filter(
                item => !(item.id === action.payload.itemId && item.size === action.payload.itemSize)
            );
            return updatedItems;
        default:
            return state;
    }
};

export default cartReducer;
