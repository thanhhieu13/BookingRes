import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function MapPrepare() {
  const navigation = useNavigation();
  const bounceArrow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const navigateToMap = () => {
      navigation.navigate('Map');
    };

    // Create bounce animation for arrow
    const bounceArrowAnimation = Animated.timing(bounceArrow, {
      toValue: 1,
      duration: 1000,
      easing: Easing.bounce,
      useNativeDriver: true,
    });

    // Run the bounce animation
    bounceArrowAnimation.start();

    // Navigate to the map after a delay
    const timeout = setTimeout(navigateToMap, 3000);

    // Clear timeout when the component is unmounted to avoid memory leaks
    return () => clearTimeout(timeout);
  }, []);

  const interpolatedBounceArrow = bounceArrow.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1.2, 1],
  });

  const animatedStyleArrow = {
    transform: [{ scale: interpolatedBounceArrow }],
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Image source={require('../assets/img/Map.png')} style={styles.mapImage} />
        <Animated.Image
          source={require('../assets/img/placeholder.png')}
          style={[styles.arrowImage, animatedStyleArrow]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    position: 'relative',
  },
  mapImage: {
    height: 200,
    width: 200,
    borderRadius: 10,
  },
  arrowImage: {
    height: 50,
    width: 50,
    position: 'absolute',
    top: 150, // Adjust the position based on your design
    left: 150, // Adjust the position based on your design
  },
});
