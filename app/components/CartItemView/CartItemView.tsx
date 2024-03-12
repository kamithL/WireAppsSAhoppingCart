import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { CartItem } from "../../redux/types";
import Icons from "react-native-vector-icons/FontAwesome";
import {useDispatch, useSelector} from "react-redux";
import {removeFromCart} from "../../redux/actions/cartActions.ts";
import {RootState} from "../../redux/reducers";

interface Props {
    items?: CartItem[]; // Optional array of items
}

const formatPrice = (amount: string, currency: string) => {
    if (currency === 'GBP') {
        return `£${amount}`;
    }
    return `${currency} ${amount}`;
};

const groupItems = (items: CartItem[]) => {
    const groupedItems = new Map<string, CartItem>();
    items.forEach(item => {
        const key = `${item.id}-${item.size}`;
        if (groupedItems.has(key)) {
            const existingItem = groupedItems.get(key)!;
            existingItem.count++;
        } else {
            item.count = 1;
            groupedItems.set(key, item);
        }
    });
    return Array.from(groupedItems.values());
};
const calculateTotalInvoiceValue = (items: CartItem[]) => {
    return items.reduce((total, item) => total + (parseFloat(item.price.amount) * item.count), 0).toFixed(2);
};
const CartItemView: React.FC<Props> = ({ items = [] }) => {
    const [cartItems, setCartItems] = useState(groupItems(items));
    const [totalInvoiceValue, setTotalInvoiceValue] = useState(calculateTotalInvoiceValue(cartItems));

    const dispatch = useDispatch();

    const cartItemsFromStore = useSelector((state: RootState) => state.cart);

    useEffect(() => {
        setCartItems(groupItems(cartItemsFromStore));
        setTotalInvoiceValue(calculateTotalInvoiceValue(cartItemsFromStore));
    }, [cartItemsFromStore]);

    const handleQuantityChange = (item: CartItem, increment: boolean) => {
        let updatedCount = item.count;
        if (increment && updatedCount < 25) {
            updatedCount++;
        } else if (!increment && updatedCount > 0) {
            updatedCount--;
        }
        const updatedItems = cartItems.map(cartItem => {
            if (cartItem.id === item.id && cartItem.size === item.size) {
                return { ...cartItem, count: updatedCount };
            }
            return cartItem;
        });
        setCartItems(updatedItems);
        setTotalInvoiceValue(calculateTotalInvoiceValue(updatedItems));
    };

    const handleRemoveItem = (itemId: string, itemSize: string) => {
        const updatedItems = cartItems.filter(item => !(item.id === itemId && item.size === itemSize));
        setCartItems(updatedItems);
        setTotalInvoiceValue(calculateTotalInvoiceValue(updatedItems));
        dispatch(removeFromCart(itemId, itemSize));
    };


    return (
        <View>
            {cartItems.length === 0 ? (
                    <View style={styles.emptyCartContainer}>
                        <Icons name={'cart-arrow-down'} color={'#1a53ff'} size={40}/>
                        <Text style={styles.emptyCartText}>Your cart is empty</Text>
                    </View>
                ) :
                (cartItems.map((item, index) => (
                <View key={index} style={styles.container}>
                    <View style={styles.image}>
                        <Image
                            source={{ uri: item.mainImage }}
                            resizeMode="center"
                            style={StyleSheet.absoluteFill}
                        />
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.title}>{item.name}</Text>

                        <Text style={styles.description}>Sizes: {item.size}</Text>
                        <Text style={styles.description}>
                            {formatPrice(item.price.amount, item.price.currency)}
                        </Text>
                        <View style={styles.quantityButtons}>
                            <Text style={styles.description}>{'Qty: '}</Text>
                            <TouchableOpacity onPress={() => handleQuantityChange(item, true)}>
                                <Icons name={'plus'} color={'#1a53ff'} size={20}/>
                            </TouchableOpacity>
                            <Text style={styles.quantity}>{item.count}</Text>
                            <TouchableOpacity onPress={() => handleQuantityChange(item, false)}>
                                <Icons name={'minus'} color={'#1a53ff'} size={20}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.footer} onPress={() => handleRemoveItem(item.id, item.size)}>
                        <Icons name={'trash-o'} color={'#1a53ff'} size={40}/>
                    </TouchableOpacity>
                </View>
            )))}
            {cartItems.length > 0 && (
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total Invoice Value: £{totalInvoiceValue}</Text>
            </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        flexDirection: 'row',

    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
    info: {
        marginLeft: 10,
        flex: 1,
    },
    description: {
        fontSize: 14,
        color: "#8e8e93",
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginRight: 10,
    },
    footer: {
        justifyContent: "center",
    },
    quantityButtons: {
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center',
    },
    quantity: {
        fontSize: 16,
        marginHorizontal: 10,
    },
    totalContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    emptyCartContainer: {
        alignItems: 'center',
        justifyContent: 'center',
       // marginTop: 50,
    },
    emptyCartText: {
        fontSize: 16,
        marginTop: 10,
    },

});

export default CartItemView;
