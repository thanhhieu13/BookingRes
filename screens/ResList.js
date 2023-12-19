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
import React, { useEffect, useContext, useState, useCallback } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome, Feather } from '@expo/vector-icons';
import { Entypo } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserType } from "../UserContext";

const AddAddressScreen = () => {
  const navigation = useNavigation();
  const [address, setAddress] = useState([]);
  const { userId, setUserId } = useContext(UserType);


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
  useEffect(() => {
    fetchAddress();
  }, []);
  const fetchAddress = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/address/${userId}`);
      setAddress(response.address); // Adjust according to your API response structure
    } catch (error) {
      console.log("error", error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchAddress();
    }, [])
  );
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 10 }}>
      <View style={{ padding: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", }}>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <View style={{ width: 40, height: 40, borderRadius: 20, overflow: 'hidden', marginRight: 10 }}>
            <Image
              source={require('../assets/img/Map.png')}
              style={{ width: '100%', height: '100%', aspectRatio: 1, resizeMode: 'cover' }}
            />
          </View>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{address?.name}</Text>
          </View>
          <Feather name="bell" size={24} color="black" />
        </View>
        <Pressable
          onPress={() => navigation.navigate("EditAccount")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 20,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            paddingVertical: 8,
            paddingHorizontal: 5,
          }}
        >
           <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <Feather name="user" size={24} color="black" />
          <Text style={{marginLeft: 10}}>Chỉnh sửa thông tin cá nhân</Text>
          </View>
          <FontAwesome name="edit" size={24} color="black" />
        </Pressable>

        <Pressable
          style={{
            borderWidth: 1,
            borderColor: "#D0D0D0",
            padding: 10,
            flexDirection: "column",
            gap: 5,
            marginVertical: 10,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              {address?.name}
            </Text>
            <Entypo name="location-pin" size={24} color="red" />
          </View>

          <Text style={{ fontSize: 15, color: "#181818" }}>{address?.street}</Text>

          <Text style={{ fontSize: 15, color: "#181818" }}>
            phone No : {address?.mobileNo}
          </Text>
          <Text style={{ fontSize: 15, color: "#181818" }}>
            pin code : {address?.gender}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginTop: 7,
            }}
          >
            <Pressable
              style={{
                backgroundColor: "#F5F5F5",
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 5,
                borderWidth: 0.9,
                borderColor: "#D0D0D0",
              }}
            >
              <Text>Edit</Text>
            </Pressable>

            <Pressable
              style={{
                backgroundColor: "#F5F5F5",
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 5,
                borderWidth: 0.9,
                borderColor: "#D0D0D0",
              }}
            >
              <Text>Remove</Text>
            </Pressable>

            <Pressable
              style={{
                backgroundColor: "#F5F5F5",
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 5,
                borderWidth: 0.9,
                borderColor: "#D0D0D0",
              }}
            >
              <Text>Set as Default</Text>
            </Pressable>
          </View>
        </Pressable>
      </View>
      <Pressable onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </Pressable>
    </ScrollView>
  );
};
export default AddAddressScreen;

const styles = StyleSheet.create({
  logoutButton: {
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