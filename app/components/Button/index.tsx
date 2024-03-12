import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


interface ButtonProps {
    onPress: () => void;
}
const Button: React.FC<ButtonProps> = ( {onPress}) => {
    return (
        <View style={styles.container} >
            <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
                <Text style={styles.title}>BUY</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnContainer:{
        width: '90%',
        height: 50,
        backgroundColor: '#1a53ff',
        borderRadius: 5,
        marginVertical: '5%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 17,
        color: '#FFF'
    }
});

export default Button;
