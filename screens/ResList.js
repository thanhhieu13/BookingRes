import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  Alert
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useContext, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome, Feather } from '@expo/vector-icons';
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserType } from "../UserContext";
import jwt_decode from "jwt-decode";
import { SafeAreaView } from "react-native-safe-area-context";

const AddAddressScreen = () => {
  const navigation = useNavigation();
  const [address, setAddress] = useState([]);
  const { userId, setUserId } = useContext(UserType);

  console.log(address);
  const handleLogout = async () => {
    try {
      // Clear the authentication token from AsyncStorage
      await AsyncStorage.removeItem('authToken');
      // Navigate to the login screen
      navigation.replace('Login');
    } catch (error) {
      console.error('Error logging out:', error);
      Alert.alert('Logout Error', 'An error occurred while logging out.');
    }
  };


  const fetchAddress = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);

      // Call fetchAddressData after setUserId completes
      await fetchAddressData(userId);
    } catch (error) {
      console.log("Error fetching address", error);
    }
  };

  useEffect(() => {
    // Fetch address data when the component mounts
    fetchAddress();
  }, []);

  const fetchAddressData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8000/address/${userId}`);
      const addressData = response.data;
      setAddress(addressData); // Thay đổi tùy thuộc vào cấu trúc phản hồi của API của bạn
      console.log('Address data:', response.data);
    } catch (error) {
      console.log("Error fetching address data", error);
    }
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.iconContainer}>
                <Image
                  source={require('../assets/img/Map.png')}
                  style={styles.icon}
                />
              </View>
              <Text style={styles.headerText}>{address?.userDetails?.name}</Text>
            </View>
            <Feather name="bell" size={24} color="black" />
          </View>
          <Pressable
            onPress={() => navigation.navigate("EditAccount")}
            style={styles.editProfileContainer}
          >
            <View style={styles.editProfileContent}>
              <Feather name="user" size={24} color="black" />
              <Text style={styles.editProfileText}>Chỉnh sửa thông tin cá nhân</Text>
            </View>
            <FontAwesome name="edit" size={24} color="black" />
          </Pressable>

          <Pressable style={styles.addressContainer}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>

              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                địa chỉ nhà: {address?.userDetails?.street}
              </Text>
              <Entypo name="location-pin" size={24} color="red" />
            </View>

            <Text style={{ fontSize: 15, color: "#181818" }}>thành phố{address?.userDetails?.city}</Text>

            <Text style={{ fontSize: 15, color: "#181818" }}>
              phone No : {address?.userDetails?.mobileNo}
            </Text>
            <Text style={{ fontSize: 15, color: "#181818" }}>
              giứoi tính : {address?.userDetails?.gender}
            </Text>
            <Text style={{ fontSize: 15, color: "#181818" }}>
              Nghề nghiệp : {address?.userDetails?.occupation}
            </Text>
            <Text style={{ fontSize: 15, color: "#181818" }}>
              Ngày sinh: {address?.userDetails?.dateOfBirth}
            </Text>
          </Pressable>
        </View>
        <Pressable onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};
export default AddAddressScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 30,
    overflow: 'hidden',
    marginRight: 15,
  },
  icon: {
    width: '100%',
    height: '100%',
    aspectRatio: 1,
    resizeMode: 'cover',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  editProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 25,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingVertical: 15,
    paddingHorizontal: 7,
  },
  editProfileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editProfileText: {
    fontSize: 18,
    marginLeft: 20,
  },
  addressContainer: {
    borderWidth: 1,
    borderColor: '#D0D0D0',
    padding: 10,
    flexDirection: 'column',
    gap: 5,
    marginVertical: 10,
  },
  logoutButton: {
    width: 170,
    backgroundColor: '#FF0000', // Use your desired color
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
