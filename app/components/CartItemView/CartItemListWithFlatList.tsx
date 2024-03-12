import React from 'react';
import { FlatList, Text, View } from 'react-native';
import CartItemView from './CartItemView';

const CartItemListWithFlatList: React.FC<Props> = ({ cartItems }) => {
    return (
        <FlatList
            data={cartItems}
            renderItem={({ item }) => <CartItemView item={item} />}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={() => (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Your cart is empty</Text>
                </View>
            )}
        />
    );
};

export default CartItemListWithFlatList;
