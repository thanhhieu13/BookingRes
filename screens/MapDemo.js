import React, { useEffect, useState, useCallback } from 'react';
import { View, Image, SafeAreaView, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import MapView, { Marker, Polyline, Circle } from 'react-native-maps';
import { themeColors } from '../theme';
import { API_URL, GOOGLE_MAPS_API_KEY } from "@env";
import { useNavigation } from '@react-navigation/native';

const App = () => {
  const navigation = useNavigation();
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);
  const [searchAddress, setSearchAddress] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
console.log(selectedRestaurant);
  const handleOrderNow = () => {
    if (selectedRestaurant) {
      navigation.navigate('Restaurant', { ...selectedRestaurant });
    }
  };

  const handleClose = () => {
    setSelectedRestaurant(null);
  };

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
          // `${API_URL}/nearby-restaurants`, 
          `http://localhost:8000/nearby-restaurants`,// Use API_URL variable from environment
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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
        <TextInput
          style={{ flex: 1, marginRight: 10, borderBottomWidth: 1 }}
          placeholder="Nhập địa chỉ"
          onChangeText={(text) => setSearchAddress(text)}
        />
        <Button title="Tìm kiếm" onPress={handleSearch} />
      </View>
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: userLocation?.latitude,
          longitude: userLocation?.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        mapType="standard"
      >
        <Polyline
          coordinates={[
            { latitude: 10.797710, longitude: 106.689680 },
            { latitude: 10.7976848, longitude: 106.6866966 },
            { latitude: 10.798382, longitude: 106.687995 },
            { latitude: 10.7985185, longitude: 106.6847898 },
          ]}
          strokeWidth={2}
          strokeColor="red"
        />
         {userLocation && (
          <Circle
            center={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            radius={2000} // Radius in meters (2 km)
            strokeWidth={2}
            strokeColor="rgba(255, 0, 0, 0.5)" // Red color with 50% opacity
            fillColor="rgba(255, 0, 0, 0.2)" // Red color with 20% opacity
          />
        )}
        <Marker
          coordinate={userLocation}
          title="Vị trí của bạn"
          pinColor={themeColors.bgColor(1)}
        >
          <Image
            source={require('../assets/img/tracking.png')}
            style={{ width: 40, height: 40 }}
            resizeMode="cover"
          />
        </Marker>

        {nearbyRestaurants.map((restaurant) => (
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
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 10, backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#ccc' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <TouchableOpacity onPress={handleClose}>
              <Image source={require('../assets/img/close.png')} style={{ width: 20, height: 20, marginRight: 5 }} />
            </TouchableOpacity>
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 5 }}>{selectedRestaurant.name}</Text>
          <Text style={{ color: '#666', marginBottom: 10 }}>{selectedRestaurant.address}</Text>
          <Text style={{ color: '#0362fc', marginBottom: 10 }}>{selectedRestaurant.distance} km</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <TouchableOpacity onPress={handleOrderNow}>
              <View style={{ backgroundColor: themeColors.primaryColor, borderRadius: 5, marginTop: 10 }}>
                <Text style={{ color: 'orange', fontWeight: 'bold', padding: 10 }}>Đặt bàn ngay</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default App;
