import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { themeColors } from '../theme';
import { featured } from '../constants';
import * as Icon from "react-native-feather";
import MapPrepare from './MapPrepare'

export default function Map() {
  const navigation = useNavigation();
  const restaurant = featured.restaurants[0];
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const loadImage = async () => {
      // Simulate a 3-second delay before loading the image
      await new Promise(resolve => setTimeout(resolve, 3000));
      setImageLoaded(true);
    };

    loadImage();
  }, []);

  if (!imageLoaded){
    return <MapPrepare />
  }
  return (
    <View style={{ flex: 1 }}>
      {imageLoaded ? (
        <Image
          source={require('../assets/img/mapload.gif')}
          style={{ flex: 1, position: 'absolute', width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      ) : null}

      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        style={{ flex: 1 }}
        mapType="standard"
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.lng,
          }}
          title={restaurant.title}
          description={restaurant.description}
          pinColor={themeColors.bgColor(1)}
        />
      </MapView>
    </View>
  );
}
