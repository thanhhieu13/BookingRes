import React, { useState, useEffect } from 'react';
import { View, Image, SafeAreaView, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import { themeColors } from '../theme';
import MapPrepare from './MapPrepare';
import { API_URL, GOOGLE_MAPS_API_KEY } from "@env";
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

export default function Map() {
  const navigation = useNavigation();
  const [restaurants, setRestaurants] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [searchAddress, setSearchAddress] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  console.log(selectedRestaurant)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/restaurants`);
        // const response = await axios.get(`http://localhost:8000/restaurants`);
        setRestaurants(response.data);
      } catch (error) {
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

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          searchAddress
        )}&key=${GOOGLE_MAPS_API_KEY}`
      );
      console.log('Geocoding API Response:', response.data);

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
  };

  if (!imageLoaded || !userLocation) {
    return <MapPrepare />;
  }

  const handleOrderNow = () => {
    if (selectedRestaurant) {
      // Navigate to the "Restaurant" screen and pass the selected restaurant data
      navigation.navigate('Restaurant', { ...selectedRestaurant });
    }
  };
  const handleClose = () => {
    // Đặt lại giá trị của selectedRestaurant thành null hoặc thực hiện các hành động khác cần thiết để ẩn thông tin nhà hàng
    setSelectedRestaurant(null);
  };


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
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        mapType="standard"
      >
        {/* Your existing markers */}
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
        <View style={{ padding: 10, backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#ccc' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <TouchableOpacity onPress={handleClose}>
              {/* <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 12 }}>đóng</Text> */}
              <Image source={require('../assets/img/close.png')} style={{ width: 20, height: 20, marginRight: 5 }} />
            </TouchableOpacity>
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 5 }}>{selectedRestaurant.name}</Text>
          <Text style={{ color: '#666', marginBottom: 10 }}>{selectedRestaurant.address}</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: themeColors.primaryColor, fontWeight: 'bold', fontSize: 16 }}>
              <TouchableOpacity onPress={handleOrderNow}>
                <View style={{ backgroundColor: themeColors.primaryColor, borderRadius: 5, marginTop: 10 }}>
                  <Text style={{ color: 'orange', fontWeight: 'bold' }}>Đặt bàn ngay</Text>
                </View>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
