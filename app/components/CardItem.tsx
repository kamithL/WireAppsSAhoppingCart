import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icons from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from "react-redux";
import {Product} from "../redux/types";
import {addToCartSuccess} from "../redux/actions/cartActions.ts";

interface Props {
    index: number;
    product: Product;
    colors: { primary: string; background: string; card: string; text: string; border: string; notification: string };
}

// @ts-ignore
const CardItem: React.FC<Props> = ({ index, product, colors }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handlePress = () => {
        // @ts-ignore
        navigation.navigate(`ProductDetails`, { productId: product.id });
    };

    const handleAddToCart = () => {
        // Dispatch action to add item to cart
        dispatch(addToCartSuccess(product));
    };

    const formatPrice = (amount: string, currency: string) => {
        if (currency === 'GBP') {
            return `£${amount}`;
        }
        return `${currency} ${amount}`;
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={{ padding: 6 }}>
                <View style={{ padding: 6 }}>
                    <View style={{ borderRadius: 16, overflow: "hidden", elevation: 4, backgroundColor: "#fff" }}>
                        <View
                            style={{
                                aspectRatio: index === 0 ? 1 : 2 / 3,
                                position: "relative",
                                overflow: "hidden",
                                borderRadius: 16,
                            }}
                        >
                            <Image
                                source={{
                                    uri: product.mainImage,
                                }}
                                resizeMode="center"
                                style={StyleSheet.absoluteFill}
                            />
                            <View style={[StyleSheet.absoluteFill, { padding: 12 }]}>
                                <View style={{ flexDirection: "row", gap: 8, padding: 4 }}>
                                    <Text
                                        style={{
                                            flex: 1,
                                            fontSize: 12,
                                            fontWeight: "300",
                                            color: "#1a53ff",
                                            textShadowColor: "rgba(0,0,0,0.2)",
                                            textShadowOffset: {
                                                height: 1,
                                                width: 0,
                                            },
                                            textShadowRadius: 4,
                                        }}
                                    >
                                        {product.name}
                                    </Text>
                                    <View
                                        style={{
                                            backgroundColor: colors.card,
                                            borderRadius: 100,
                                            height: 32,
                                            aspectRatio: 1,
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Icons
                                            name="heart"
                                            size={20}
                                            color={colors.text}
                                        />
                                    </View>
                                </View>
                                <View style={{ flex: 1 }} />
                                <View
                                    style={{
                                        flexDirection: "row",
                                        backgroundColor: "rgba(0,0,0,0.5)",
                                        alignItems: "center",
                                        padding: 6,
                                        borderRadius: 100,
                                        overflow: "hidden",
                                    }}
                                >
                                    <Text
                                        style={{
                                            flex: 1,
                                            fontSize: 16,
                                            fontWeight: "600",
                                            color: "#fff",
                                            marginLeft: 8,
                                        }}
                                        numberOfLines={1}
                                    >
                                        {formatPrice(product.price.amount,product.price.currency)}
                                    </Text>
                                    <TouchableOpacity
                                        style={{
                                            paddingHorizontal: 12,
                                            paddingVertical: 8,
                                            borderRadius: 100,
                                            backgroundColor: "#fff",
                                        }}
                                        onPress={handleAddToCart}
                                    >
                                        <Icons name="shopping-cart" size={18} color="#000" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default CardItem;
