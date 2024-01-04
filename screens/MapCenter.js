import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  View,
  Text,
  Modal,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Keyboard } from "react-native";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy,
} from "expo-location";
import BottomSheet from "@gorhom/bottom-sheet";

import MapView, { Circle, Marker } from "react-native-maps";
import Geocoding from "react-native-geocoding";
import { API_URL, GOOGLE_MAPS_API_KEY } from "@env";

const MapCenter = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("loading...");
  const [markerCoordinate, setMarkerCoordinate] = useState(null);
  const [selectedLatitude, setSelectedLatitude] = useState(null);
  const [selectedLongitude, setSelectedLongitude] = useState(null);
  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);

  const mapRef = useRef(null);
  // ref
  const bottomSheetRef = useRef(null);

  // variables
  //   const snapPoints = useMemo(() => ["55%", "20%"], []);
  const snapPoints = useMemo(() => ["30%", "80%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  async function requestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
      setMarkerCoordinate({
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
      });
    }
  }

  const handleRegionChangeComplete = (region) => {
    if (region) {
      setMarkerCoordinate({
        latitude: region.latitude,
        longitude: region.longitude,
      });
      // Fetch data from the server using the new coordinates
      fetchDataFromServer(region.latitude, region.longitude);
    }
  };

  const fetchDataFromServer = async (latitude, longitude) => {
    // Perform your API request here with the new coordinates
    const radius = 4; // Assuming a fixed radius for this example

    try {
      const response = await fetch(
        `${API_URL}/restaurants-in-circle?latitude=${latitude}&longitude=${longitude}&radius=${radius}`
      );
      const data = await response.json();
      // Handle the fetched data as needed
      // console.log(data);
      setNearbyRestaurants(data);
      console.log(nearbyRestaurants);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    requestLocationPermissions();
  }, []);

  useEffect(() => {
    if (location) {
      watchPositionAsync(
        {
          accuracy: LocationAccuracy.Highest,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (response) => {
          if (response && response.coords) {
            setLocation(response);
            mapRef.current?.animateCamera({
              pitch: 40,
              center: response.coords,
            });
          }
        }
      );
    }
  }, []);

  Geocoding.init(GOOGLE_MAPS_API_KEY);
  const getAddressFromCoords = async (latitude, longitude) => {
    try {
      const result = await Geocoding.from(latitude, longitude);
      if (result.status === "OK" && result.results.length > 0) {
        const address = result.results[0].formatted_address;
        return address;
      } else {
        return "Address not found";
      }
    } catch (error) {
      console.error("Error performing reverse geocoding:", error);
      return "Unable to fetch address.";
    }
  };

  const convertToAddress = async () => {
    if (selectedLatitude && selectedLongitude) {
      const address = await getAddressFromCoords(
        selectedLatitude,
        selectedLongitude
      );
      setSelectedAddress(address);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Expo location demo</Text>
      {location && location.coords && (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          onPress={(event) => {
            const { latitude, longitude } = event.nativeEvent.coordinate;
            setMarkerCoordinate({ latitude, longitude });
            fetchDataFromServer(latitude, longitude);
          }}
          onRegionChangeComplete={handleRegionChangeComplete}
        >
          {markerCoordinate && (
            <>
              <Circle
                center={{
                  latitude: markerCoordinate.latitude,
                  longitude: markerCoordinate.longitude,
                }}
                radius={200} // Assuming your radius is in meters, adjust accordingly
                strokeWidth={1}
                strokeColor="rgba(255, 0, 0, 0.5)" // Light red color with 50% opacity
                fillColor="rgba(255, 0, 0, 0.2)" // Light red color with 20% opacity
              />
              <Marker
                coordinate={markerCoordinate}
                // onPress={() => {
                //   if (location.coords) {
                //     setSelectedLatitude(markerCoordinate.latitude);
                //     setSelectedLongitude(markerCoordinate.longitude);
                //     setModalVisible(true);
                //   }
                // }}
              />
            </>
          )}
        </MapView>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Latitude: {selectedLatitude}</Text>
            <Text style={styles.modalText}>Longitude: {selectedLongitude}</Text>
            <Button title="Convert to Address" onPress={convertToAddress} />
            <Text style={styles.modalText}>
              Converted Address: {selectedAddress}
            </Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
          <ScrollView>
            {nearbyRestaurants.map((restaurant, index) => (
              // <RestaurantCard item={restaurant} key={index} />
              <TouchableOpacity
                key={restaurant?._id}
                onPress={() =>
                  navigation.navigate("Restaurant", { ...restaurant })
                }
              >
                <View className="m-2 p-2 mt-4 flex-row justify-between rounded-xl">
                  <View className=" w-3/12 items-center">
                    <Image
                      source={{
                        uri: restaurant.image || "default_image_url",
                      }}
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 5,
                      }}
                    />
                    <View className="items-center w-2/3 mt-1">
                      <View className="flex-row items-center">
                        <AntDesign name="star" size={24} color="#DDBC37" />
                        <Text className="ml-2">
                          {restaurant.rating} |{" "}
                          <Text
                            style={{ color: "#FF7F27", fontWeight: "bold" }}
                          >
                            $$
                          </Text>
                        </Text>
                      </View>
                      <View className="flex-row items-center">
                        <Entypo name="map" size={24} color="#3D9DC3" />
                        <Text className="ml-2 w-full">
                          {restaurant.distance}km
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View className="w-9/12 ml-8">
                    <Text className="text-lg text-gray-950 font-bold">
                      {restaurant.name}
                    </Text>
                    <View className="flex-row">
                      <Text
                        style={{ width: 200 }}
                        className="text-gray-500 ml-1"
                      >
                        {restaurant.address}
                      </Text>
                    </View>

                    <View className=" mt-2">
                      <TouchableOpacity
                        onPress={() => navigation.navigate("City")}
                      >
                        <Text className="w-1/3 text-center p-1 border-[#A2A2A2] border rounded-sm">
                          Đặt chỗ
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Button
            title="Current Location"
            onPress={() => {
              if (location.coords) {
                setMarkerCoordinate({
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                });
                mapRef.current?.animateToRegion({
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                });
              }
            }}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

export default MapCenter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  map: {
    flex: 1,
    width: "100%",
  },
  text: {
    marginTop: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end", // Hiển thị modal ở phía dưới của màn hình
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    width: "80%",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
});
