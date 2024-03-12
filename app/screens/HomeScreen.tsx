import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import MasonryList from "reanimated-masonry-list";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import { fetchProductsRequest } from "../redux/actions/productActions.ts";
import CardItem from "../components/CardItem.tsx";

const CATEGORIES: string[] = [
    "Shoes",
    "Accessories",
    "Accessories 2",
    "Accessories 3",
    "Accessories 4",
];

interface Product {
    mainImage: string;
    name: string;
    price: {
        amount: number;
    };
    brandName: string;
    colours: string[];
}

const HomeScreen: React.FC = () => {
    const { colors } = useTheme();
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const dispatch = useDispatch();

    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [categoryIndex, setCategoryIndex] = useState(0);

    useEffect(() => {
        dispatch(fetchProductsRequest());
        console.log("Dispatched fetchProductsRequest");
    }, [dispatch]);

    const products: Product[] | undefined = useSelector(
        (state: RootState) => state.products.products?.data
    );

    const loading: boolean = useSelector(
        (state: RootState) => state.products.loading
    );
    const error: string | undefined = useSelector(
        (state: RootState) => state.products.error
    );
    const brands: string[] = Array.from(new Set(products?.map(product => product.brandName) || []));

    const filteredProducts = products?.filter(product => {
        if (selectedBrand && product.brandName !== brands[categoryIndex]) return false;
        return true;
    });

    const handleCategoryPress = (index: number) => {
        setCategoryIndex(index);
        setSelectedBrand(brands[index]);
    };

    return (
        <SafeAreaView style={{marginTop:20}}>
            <FlatList
                data={brands}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    gap: 12,
                }}
                renderItem={({ item, index }) => {
                    const isSelected = categoryIndex === index;
                    return (
                        <TouchableOpacity
                            onPress={() => handleCategoryPress(index)}
                            style={{
                                backgroundColor: isSelected ? colors.primary : colors.card,
                                paddingHorizontal: 20,
                                paddingVertical: 12,
                                borderRadius: 100,
                                borderWidth: isSelected ? 0 : 1,
                                borderColor: colors.border,
                            }}
                        >
                            <Text
                                style={{
                                    color: isSelected ? colors.background : colors.text,
                                    fontWeight: "600",
                                    fontSize: 14,
                                    opacity: isSelected ? 1 : 0.5,
                                }}
                            >
                                {item}
                            </Text>
                        </TouchableOpacity>
                    );
                }}
            />

            <ScrollView>
                <View style={{ paddingVertical: 24 }}>
                    {loading ? (
                        <View style={styles.loaderContainer}>
                            <ActivityIndicator size="large" color={colors.primary} />
                        </View>
                    ) : error ? (
                        <Text style={{ marginTop: 20 }}>Error fetching products: {error}</Text>
                    ) : !filteredProducts || filteredProducts.length === 0 ? (
                        <Text style={{ marginTop: 20 }}>No products found</Text>
                    ) : (
                        <MasonryList
                            data={filteredProducts}
                            numColumns={2}
                            contentContainerStyle={{ paddingHorizontal: 12 }}
                            showsVerticalScrollIndicator={true}
                            renderItem={({ item, index }: { item: Product, index: number }) => (
                                <CardItem index={index} product={item} colors={colors} />
                            )}
                            onEndReachedThreshold={0.1}
                        />
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    loaderContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // semi-transparent white background
    },
});

export default HomeScreen;
