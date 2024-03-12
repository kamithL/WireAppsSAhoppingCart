import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import Icons from "react-native-vector-icons/FontAwesome";
import { useSelector } from 'react-redux';
import {RootState} from "../redux/reducers";
import {CartItem} from "../redux/types";

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

const CustomBottomTabs: React.FC<BottomTabBarProps> = (props) => {
    const { colors } = useTheme();
    const cartItems = useSelector((state: RootState) => state.cart);
    const cartItemCount = groupItems(cartItems) ? groupItems(cartItems).length : 0;


    return (
        <View style={[styles.container, { borderBottomColor: colors.border ,borderTopColor:colors.border}]}>
            {props.state.routes.map((route, i) => {
                const isActive = i === props.state.index;
                const itemCount = route.name === "Cart" ? cartItemCount : undefined;
                return (
                    <TabItem
                        key={i}
                        isActive={isActive}
                        routeName={route.name}
                        navigation={props.navigation}
                        cartItemCount={itemCount}
                    />
                );
            })}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderTopWidth:2
    },
});
export default CustomBottomTabs;

interface TabItemProps {
    routeName: string;
    isActive: boolean;
    navigation: any;
    cartItemCount?: number;

}

const TabItem: React.FC<TabItemProps> = ({
                                             routeName,
                                             isActive,
                                             navigation,
                                             cartItemCount,
                                         }) => {
    const { colors } = useTheme();

    const onTap = () => {
        navigation.navigate(routeName);
    };

    return (
        <Pressable
            onPress={onTap}
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                paddingVertical: 8,
            }}
        >
            <View
                style={{
                    width: 36,
                    height: 36,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 32,
                    backgroundColor: isActive ? colors.primary : "transparent",
                }}
            >
                <Icons
                    name={
                        routeName === "Home"
                            ? "home"
                            : routeName === "Cart"
                                ? "shopping-cart"
                                : routeName === "Payment"
                                    ? "account-balance-wallet"
                                    : "person"
                    }
                    size={24}
                    color={isActive ? colors.card : colors.text}
                    style={{
                        opacity: isActive ? 1 : 0.5,
                    }}
                />
                {cartItemCount !== undefined && (
                    <View style={{ position: 'absolute', top: -5, right: -5, backgroundColor: 'red', borderRadius: 10, paddingHorizontal: 5 }}>
                        <Text style={{ color: 'white' }}>{cartItemCount}</Text>
                    </View>
                )}
            </View>
            {isActive && (
                <Text
                    style={{
                        marginLeft: 4,
                        fontSize: 12,
                        fontWeight: "600",
                        color: colors.text,
                    }}
                >
                    {routeName}
                </Text>
            )}
        </Pressable>
    );
};
