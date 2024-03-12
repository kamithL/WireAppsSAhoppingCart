import {BottomTabScreenProps, createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {RootStackScreenProps} from "./ReduxNavigator.tsx";
import {CompositeScreenProps, useNavigation} from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen.tsx";
import CustomBottomTabs from "../components/CustomBottomTabs.tsx";
import React from "react";
import CartScreen from "../screens/CartScreen.tsx";
import Icons from "react-native-vector-icons/FontAwesome";

export type TabsStackParamList = {
    Home: undefined;
    Cart: undefined;
    Payment: undefined;
    Profile: undefined;
    ProductDetails: { productId: string };

};

const TabsStack = createBottomTabNavigator<TabsStackParamList>();

export type TabsStackScreenProps<T extends keyof TabsStackParamList> =
    CompositeScreenProps<
        BottomTabScreenProps<TabsStackParamList, T>,
        RootStackScreenProps<"TabsStack">
    >;

const TabsNavigator = () => {
    const navigation = useNavigation();
    return (
        <TabsStack.Navigator
            screenOptions={{
                tabBarShowLabel: true,
            }}
            tabBar={

            (props) => <CustomBottomTabs {...props}/> }
        >
            <TabsStack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarIcon(props) {
                        return <Icons name="home" {...props} />;
                    },
                }}
            />
            <TabsStack.Screen
                name="Cart"
                component={CartScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icons name="shopping-cart" color={color} size={size} />

                    ),
                }}
            />

        </TabsStack.Navigator>
    );
};

export default TabsNavigator;
