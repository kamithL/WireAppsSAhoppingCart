import React from 'react';
import { Provider } from 'react-redux';
import {
    createNativeStackNavigator,
    NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import store from '../redux/store';
import { NavigationContainer } from '@react-navigation/native';
import TabsNavigator from "./TabsNavigator.tsx";
import ProductDetails from "../screens/ProductDetails/ProductDetails.tsx";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {StackNavigationProp} from "@react-navigation/stack";
import CartIcon from "../screens/ProductDetails/CartIcon.tsx";
const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackScreenProps<T extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, T>;

type ProductDetailsScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'ProductDetails'
>;

type Props = {
    navigation: ProductDetailsScreenNavigationProp;
};

const ReduxNavigator: React.FC = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="TabsStack"
                        component={TabsNavigator}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="ProductDetails"
                        component={ProductDetails}
                        options={({ navigation }) => ({

                            headerRight: () => <CartIcon navigation={navigation} />,
                            headerLeft: () => (
                                <TouchableOpacity
                                    style={{ marginLeft: 2 }}
                                    onPress={() => navigation.goBack()}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Icon name="chevron-left" color={'black'} size={24} />
                                        <Text style={{ marginLeft: 5 }}>Back</Text>
                                    </View>
                                </TouchableOpacity>
                            ),
                        })}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default ReduxNavigator;
