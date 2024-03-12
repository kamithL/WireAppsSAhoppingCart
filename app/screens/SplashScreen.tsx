import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';

// @ts-ignore
const SplashScreen = ({navigation}) => {
  useEffect(() => {
    // Navigate to the next screen after a delay (e.g., 2 seconds)
    const timer = setTimeout(() => {
      navigation.navigate('Cart');
    }, 2000);

    // Clean up the timer
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>aaa</Text>
      {/*<FastImage*/}
      {/*  style={styles.image}*/}
      {/*  source={require('../../assets/images/shopping_bags.gif')}*/}
      {/*  resizeMode={FastImage.resizeMode.contain}*/}
      {/*/>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // White background
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default SplashScreen;
