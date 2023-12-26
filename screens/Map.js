import React, { useState, useEffect } from 'react';
import { View, Image, SafeAreaView, TextInput, Button, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import { themeColors } from '../theme';
import MapPrepare from './MapPrepare';
import { API_URL } from "@env";
import * as Location from 'expo-location';

export default function Map() {
  const [restaurants, setRestaurants] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [searchLocation, setSearchLocation] = useState({ latitude: 0, longitude: 0 });
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/restaurants`);
        setRestaurants(response.data);
      } catch (error) {
        console.log(`${API_URL} /restaurants`);
        console.error('Error fetching restaurants:', error);
      }
    };

    const loadImage = async () => {
      await new Promise(resolve => setTimeout(resolve, 3000));
      setImageLoaded(true);
    };

    const getUserLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          setUserLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
          console.log(location.coords.latitude, location.coords.longitude);
        } else {
          console.log('Permission to access location was denied');
        }
      } catch (error) {
        console.error('Error getting user location:', error);
      }
    };

    fetchData();
    loadImage();
    getUserLocation();
  }, []);

  const handleSearch = () => {
    setUserLocation({
      latitude: searchLocation.latitude,
      longitude: searchLocation.longitude,
    });
  };

  if (!imageLoaded || !userLocation) {
    return <MapPrepare />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
        <TextInput
          style={{ flex: 1, marginRight: 10, borderBottomWidth: 1 }}
          placeholder="Enter Latitude"
          keyboardType="numeric"
          onChangeText={(text) => setSearchLocation({ ...searchLocation, latitude: parseFloat(text) || 0 })}
        />
        <TextInput
          style={{ flex: 1, marginRight: 10, borderBottomWidth: 1 }}
          placeholder="Enter Longitude"
          keyboardType="numeric"
          onChangeText={(text) => setSearchLocation({ ...searchLocation, longitude: parseFloat(text) || 0 })}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        mapType="standard"
      >
        <Marker
          coordinate={userLocation}
          title="Your Location"
          pinColor={themeColors.bgColor(1)}
        >
          <Image
            source={require('../assets/img/tracking.png')}
            style={{ width: 40, height: 40 }}
            resizeMode="cover"
          />
        </Marker>

        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant._id}
            coordinate={{
              latitude: restaurant.location.coordinates[1],
              longitude: restaurant.location.coordinates[0],
            }}
            title={restaurant.name}
            onPress={() => setSelectedRestaurant(restaurant)}
          >
            <Image
              source={require('../assets/img/restaurant.png')}
              style={{ width: 40, height: 40 }}
              resizeMode="cover"
            />
          </Marker>
          
        ))}
      </MapView>
      {selectedRestaurant && (
    <View style={{ padding: 10, backgroundColor: 'white' }}>
      <Text style={{ fontWeight: 'bold' }}>{selectedRestaurant.name}</Text>
      <Text>{/* Hiển thị các thông tin khác về nhà hàng */}</Text>
      {/* Bạn có thể thêm các thành phần UI khác để hiển thị thông tin đặt hàng */}
    </View>
  )}
    </SafeAreaView>
  );
}
