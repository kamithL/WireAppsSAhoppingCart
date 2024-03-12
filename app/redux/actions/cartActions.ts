import { CartActionTypes, CartItem } from '../types';
export const addToCartSuccess = (item: CartItem) => ({
    type: CartActionTypes.ADD_TO_CART_SUCCESS,
    payload: item,
});

export const removeFromCart = (itemId: string, itemSize: string) => ({
    type: 'REMOVE_FROM_CART',
    payload: { itemId, itemSize }
});
