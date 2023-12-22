import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import { themeColors } from '../theme';
import MapPrepare from './MapPrepare';

export default function Map() {
  const [restaurants, setRestaurants] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.1.180:8000/restaurants');
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    const loadImage = async () => {
      await new Promise(resolve => setTimeout(resolve, 3000));
      setImageLoaded(true);
    };

    fetchData();
    loadImage();
  }, []);

  if (!imageLoaded) {
    return <MapPrepare />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require('../assets/img/mapload.gif')}
        style={{ flex: 1, position: 'absolute', width: '100%', height: '100%' }}
        resizeMode="cover"
      />

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 10.8314335,
          longitude: 106.7216491,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        mapType="standard"
      >
        <Marker
          coordinate={{
            latitude: 10.8314335,
            longitude: 106.7216491,
          }}
          title="Vị trí của bạn"
          pinColor={themeColors.bgColor(1)}
        >
          <Image
            source={require('../assets/img/tracking.png')} 
            style={{ width: 40, height: 40 }} 
            resizeMode="cover"
          />
        </Marker>

        {restaurants.map(restaurant => (
          <Marker
            key={restaurant._id}
            coordinate={{
              latitude: restaurant.lat,
              longitude: restaurant.lng,
            }}
            title={restaurant.name}
          >
            <Image
              source={require('../assets/img/restaurant.png')}
              style={{ width: 40, height: 40 }}
              resizeMode="cover"
            />
          </Marker>
        ))}
      </MapView>
    </View>
  );
}
