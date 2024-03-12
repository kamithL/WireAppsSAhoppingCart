import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

interface SizeButtonProps {
    children: React.ReactNode;
    shoeSize: string;
    bgColor?: string;
    color?: string;
    selected: boolean;
    handleSize: (size: string) => void;
}

const SizeButton: React.FC<SizeButtonProps> = (props) => {
    const containerStyle: ViewStyle[] = [
        styles.container,
        { backgroundColor: props.selected ? '#1a53ff' : props.bgColor || '#FFF' },
    ];

    const textStyle = [
        styles.text,
        { color: props.selected ? '#FFF' : (props.color || '#1a53ff') }, // Change color to black if not selected
    ];

    const onPressHandler = () => {
        props.handleSize(props.shoeSize); // Invoke the handleSize function when button is pressed
    };

    return (
        <TouchableOpacity
            style={containerStyle}
            onPress={onPressHandler}
            activeOpacity={0.8} // Set the opacity when the button is pressed
        >
            <Text style={textStyle}>
                {props.children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 150,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: '#E6E6E6',
        borderWidth: 3,
        marginHorizontal: 10,
    },
    text: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 18,
    },
});

export default SizeButton;
