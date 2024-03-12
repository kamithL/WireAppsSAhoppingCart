import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import {RootState} from "../redux/reducers";
import CartItemListWithScrollView from "../components/CartItemView/CartItemListWithScrollView.tsx";

const CartScreen: React.FC = () => {
    const cartItems = useSelector((state: RootState) => state.cart);

    return (
        <View>
            <CartItemListWithScrollView   items={cartItems}/>
        </View>
    );
};

export default CartScreen;
