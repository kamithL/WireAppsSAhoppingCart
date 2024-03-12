import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import {RootState} from "../../redux/reducers";


// @ts-ignore
const CartIcon = ({ navigation }) => {
    const cartItems = useSelector((state: RootState) => state.cart);
    const cartItemCount = cartItems.length;

    return (
        <TouchableOpacity style={{ marginRight: 25 }} onPress={() => navigation.navigate('Cart')}>
            <View>
                <Icon name="shopping-cart" color={'black'} size={24} />
                {cartItemCount > 0 && (
                    <View style={{ position: 'absolute', top: -5, right: -5, backgroundColor: 'red', borderRadius: 10, paddingHorizontal: 5 }}>
                        <Text style={{ color: 'white' }}>{cartItemCount}</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};

export default CartIcon;
