import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function MapPrepare() {

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Image source={require('../assets/img/mapload.gif')} style={styles.mapImage} />
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
});
