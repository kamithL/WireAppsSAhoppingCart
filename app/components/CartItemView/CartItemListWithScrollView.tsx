import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import CartItemView from './CartItemView';
import {CartItem} from "../../redux/types";

interface Props {
    items?: CartItem[];
}
const CartItemListWithScrollView: React.FC<Props> = ({ items }) => {
    return (
        <ScrollView>
            <CartItemView  items={items} />
        </ScrollView>
    );
};

export default CartItemListWithScrollView;
