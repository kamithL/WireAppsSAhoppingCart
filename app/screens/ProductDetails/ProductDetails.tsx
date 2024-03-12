import React, { useState } from 'react';
import {View, Text, ScrollView, Image, StyleSheet, Alert} from 'react-native';
import { RootState } from '../../redux/reducers';
import {useDispatch, useSelector} from 'react-redux';
import SizeButton from '../../components/SizeButton';
import Button from "../../components/Button";
import {addToCartSuccess} from "../../redux/actions/cartActions.ts";
import {useNavigation} from "@react-navigation/native";

interface ProductDetailsProps {
    route: {
        params: {
            productId: string;
        };
    };
}


const ProductDetails: React.FC<ProductDetailsProps> = ({ route }) => {
    const { productId } = route.params;
    const products = useSelector((state: RootState) => state.products.products?.data);
    const product = products?.find((product: { id: string }) => product.id === productId);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null); // Update initial value to null
    const dispatch = useDispatch();
    const navigation = useNavigation();
    if (!product) {
        return (
            <View style={styles.container}>
                <Text>Product not found</Text>
            </View>
        );
    }

    // Function to format price with currency
    const formatPrice = (amount: string, currency: string) => {
        if (currency === 'GBP') {
            return `£${amount}`;
        }
        // Add more currency formatting logic as needed
        return `${currency} ${amount}`;
    };

    const handleBuy = () => {
        if (selectedSize) {
            dispatch(addToCartSuccess({ ...product, size: selectedSize })); // Dispatch action to add item to cart with selected size
            Alert.alert(
                'Success',
                `Item added to cart: ${product.name} (${selectedSize})`,
                [{ text: 'OK', onPress: () => navigation.navigate('Home') }]
            );
        } else {
            Alert.alert('Error', 'Please select a size before buying');
        }
    };
    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: product.mainImage }} style={styles.image} resizeMode="cover" />

            <View>
                <Text style={[styles.title, { fontSize: 20 }]}>{formatPrice(product.price.amount, product.price.currency)}</Text>
                <Text style={[styles.title, { fontSize: 24 }]}>{product.name}</Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {product.sizes.map((size: string) => (
                        <SizeButton
                            key={size}
                            shoeSize={size}
                            selected={selectedSize === size} // Pass selected state to SizeButton
                            handleSize={() => setSelectedSize(size)}
                        >{size}
                        </SizeButton>
                    ))}
                </ScrollView>

                <View>
                    <Text style={styles.textTitle}>{product.name}</Text>
                    <Text style={styles.textContent}>{product.description}</Text>
                    <Text style={styles.textList}>- Colour: {product.colour}</Text>
                    <Text style={styles.textList}>- Category: {product.brandName}</Text>
                    <Text style={styles.textList}>- Stock Status: {product.stockStatus}</Text>
                </View>

                 <Button  onPress={handleBuy} />

                <View style={styles.line} />

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#FFF',
    },
    image: {
        marginTop: 30,
        width: '100%',
        height: 230,
    },
    title: {
        fontFamily: 'Anton_400Regular',
        paddingHorizontal: '2%',
    },
    dotContainer: {
        flexDirection: 'row',
        marginVertical: '7%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContent: {
        fontSize: 14,
        lineHeight: 20,
        marginVertical: '2%',
        paddingHorizontal: '2%',
    },
    textTitle: {
        fontSize: 20,
        marginVertical: '2%',
        marginHorizontal: '2%',
    },
    textList: {
        fontSize: 16,
        lineHeight: 25,
        marginHorizontal: '2%',
    },
    line: {
        borderWidth: 1,
        borderBottomColor: '#DDD',
        marginVertical: '2%',
    },
});

export default ProductDetails;
