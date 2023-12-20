import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import StackNavigator from "./navigation/StackNavigator";
import { UserContext } from "./UserContext";
import { useFonts } from 'expo-font';


export default function App() {
  const [fontsLoaded] = useFonts({
    regular: require('./assets/fonts/Poppins-Regular.ttf'),
    light: require('./assets/fonts/Poppins-Light.ttf'),
    bold: require('./assets/fonts/Poppins-Bold.ttf'),
    medium: require('./assets/fonts/Poppins-Medium.ttf'),
    extrabold: require('./assets/fonts/Poppins-ExtraBold.ttf'),
    semibold: require('./assets/fonts/Poppins-SemiBold.ttf'),
  });
  
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    // Return a loading indicator or splash screen while fonts are loading or app is initializing
    return;
  }
  return (
    <>
      <UserContext>
        <StackNavigator />
      </UserContext>
    </>
  );
}
