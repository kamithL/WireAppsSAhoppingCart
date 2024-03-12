import React, { useEffect } from 'react';
import { enableScreens } from 'react-native-screens';
import SplashScreen from 'react-native-splash-screen'; // Import SplashScreen
enableScreens();
import ReduxNavigator from './navigation/ReduxNavigator';
import {Platform} from "react-native"; // Import your Redux navigation component

const App: React.FC = () => {
  useEffect(() => {
    // Hide splash screen when component mounts
    if (Platform.OS === 'android')
    SplashScreen.hide();
  }, []);

  return <ReduxNavigator />;
};

export default App;
