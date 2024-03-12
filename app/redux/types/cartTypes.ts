export enum CartActionTypes {
    ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS',
    REMOVE_FROM_CART = 'REMOVE_FROM_CART'
}

export interface CartState {
    cartItems: CartItem[];
}


export interface CartItem {
    id: string;
    name: string;
}
