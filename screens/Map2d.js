import React, { useEffect, useState, useCallback } from 'react';
import { View, Image, SafeAreaView, TextInput, Button, Text, TouchableOpacity, FlatList, StyleSheet, Keyboard } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import MapView, { Marker } from 'react-native-maps';
import { themeColors } from '../theme';
import MapPrepare from './MapPrepare';
import { API_URL, GOOGLE_MAPS_API_KEY } from "@env";
import { useNavigation } from '@react-navigation/native';

const App = () => {
  const navigation = useNavigation();
  
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);
  const [searchAddress, setSearchAddress] = useState('');


  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const getUserLocation = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } else {
        console.log('Permission to access location was denied');
      }
    } catch (error) {
      console.error('Error getting user location:', error);
    }
  }, []);

  const fetchDataAndCalculateDistances = useCallback(async () => {
    try {
      if (!userLocation) {
        await getUserLocation();
      }

      if (userLocation) {
        const response = await axios.get(
          `${API_URL}/nearby-restaurants`,
          {
            params: {
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            },
          }
        );

        const restaurantsWithDistance = response.data.nearbyRestaurants.map((restaurant) => {
          const distance = calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            restaurant.location.coordinates[1],
            restaurant.location.coordinates[0],
          ).toFixed(2);
          return { ...restaurant, distance };
        });

        setNearbyRestaurants(restaurantsWithDistance);
      }
    } catch (error) {
      console.error('Error fetching or calculating distances:', error);
    }
  }, [userLocation, getUserLocation]);

  const handleSearch = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          searchAddress
        )}&key=${GOOGLE_MAPS_API_KEY}`
      );

      if (response.data.results.length > 0) {
        const location = response.data.results[0].geometry.location;
        setUserLocation({
          latitude: location.lat,
          longitude: location.lng,
        });
      } else {
        console.log('No results found for the provided address');
      }
    } catch (error) {
      console.error('Error searching address:', error);
    }
  }, [searchAddress]);

  useEffect(() => {
    fetchDataAndCalculateDistances();
  }, [fetchDataAndCalculateDistances]);

  return (
    <SafeAreaView>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
        <TextInput
          style={{ flex: 1, marginRight: 10, borderBottomWidth: 1 }}
          placeholder="Nhập địa chỉ"
          onChangeText={(text) => setSearchAddress(text)}
        />
        <Button title="Tìm kiếm" onPress={handleSearch} />
      </View>
      <Text>Latitude: {userLocation?.latitude}</Text>
      <Text>Longitude: {userLocation?.longitude}</Text>
      <Button title="Get Nearby Restaurants" onPress={fetchDataAndCalculateDistances} />
      <FlatList
        data={nearbyRestaurants}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Text>
            {item.name} - Distance: {item.distance} km
          </Text>
        )}
      />

    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    width: 300,
  },
});
