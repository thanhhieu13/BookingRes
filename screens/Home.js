import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect, useContext } from "react";
import Categories from "../components/Categories";
import FeaturedRow from "../components/featureRow";
import * as Icon from "react-native-feather";
import { Swiper, SwiperItem } from "@nutui/nutui-react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { API_URL } from "@env";
import { UserType } from "../UserContext";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


export default function HomeScreen({ navigation, route }) {
  const { userId, setUserId, user, updateUser } = useContext(UserType);
  const [address, setAddress] = useState([]);

  const [selectedCity, setSelectedCity] = useState(
    route.params?.selectedCity || "TPHCM"
  );
  const [featuredData, setFeaturedData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/api/featured`);
      // const response = await fetch("http://192.168.1.7:8000/api/featured");
      const data = await response.json();
      setFeaturedData(data);
    } catch (error) {
      console.error("Error fetching featured data:", error);
    }
  };

  useEffect(() => {
   

    fetchData();
    fetchAddress();

  }, []);

  const fetchAddress = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
      await fetchAddressData(userId);
    } catch (error) {
      console.log("Error fetching address", error);
    }
  };


  const fetchAddressData = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/address/${userId}`);
      const addressData = response.data;
      updateUser(addressData);
      console.log(addressData, "user fetch");
    } catch (error) {
      console.log(`${API_URL} /address/${userId}`);
      console.log("Error fetching address data", error);
    }
  };


  return (
    <SafeAreaView className="bg-white">
      <StatusBar barStyle="dark-content" />
      <Text>Xin chào {user?.name}</Text>
      <View className="justify-between p-4 flex-row items-center max-w-full h-14">
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("City", { selectedCity, setSelectedCity })
          }
        >
          <View className="flex-row">
            <Ionicons name="location-sharp" size={24} color="red" />
            <Text
              style={{
                textTransform: "uppercase",
                fontSize: 17,
                marginLeft: 10,
                fontWeight: "bold",
                marginRight: 5,
              }}
            >
              {selectedCity}
            </Text>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="gray" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
          <EvilIcons name="bell" size={30} color="black" />
        </TouchableOpacity>
      </View>
      {/* search bar */}
      <TouchableOpacity onPress={() => navigation.navigate("Search")}>
        <View className="flex-row items-center space-x-2 px-4 pb-2">
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              padding: 3,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "gray",
            }}
            onPress={() => navigation.navigate("Search")}
          >
            <Icon.Search height="25" width="25" stroke="gray" />
            <Text style={{ marginLeft: 5, flex: 1 }}>Tìm nhà hàng</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {/* main */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {/* categories */}
        {/* <Text className="text-xl pl-4 mt-2">Xin chào <Text className="text-3xl font-bold">{user?.name}</Text></Text> */}
        <Text className="font-bold text-xl pl-4 mt-2">Danh mục</Text>
        {/* <Text>Search Keyword: {searchKeyword}</Text> */}
        {/* <Text onPress={()=>{navigation.navigate('OrderSuccess')}}>helo</Text> */}
        <Categories />

        <Swiper
          style={{ marginTop: 35 }}
          width="100%"
          height={150}
          paginationColor="#426543"
          paginationBgColor="#426ddd"
          autoPlay={3000}
          initPage={0}
          paginationVisible
        >
          <SwiperItem>
            <Image
              source={{
                uri: "https://pastaxi-manager.onepas.vn/Photo/ShowPhotoBannerVsSlide?Id=5AC03585-1C3B-4F28-B708-01337E3904E9&2023-12-18%2016:12:30",
              }}
              style={{
                width: "100%",
                height: 150,
              }}
            />
          </SwiperItem>
          <SwiperItem>
            <Image
              source={{
                uri: "https://pastaxi-manager.onepas.vn/Photo/ShowPhotoBannerVsSlide?Id=DBEFFE71-6DCE-4F40-8A31-6D4F72A30B90&2023-12-18%2016:12:30",
              }}
              style={{
                width: "100%",
                height: 150,
              }}
            />
          </SwiperItem>
          <SwiperItem>
            <Image
              source={{
                uri: "https://pastaxi-manager.onepas.vn/Photo/ShowPhotoBannerVsSlide?Id=FC15E6C4-5E82-42E6-8A1D-C724DA4E6E36&2023-12-18%2016:12:30",
              }}
              style={{
                width: "100%",
                height: 150,
              }}
            />
          </SwiperItem>
          <SwiperItem>
            <Image
              source={{
                uri: "https://pastaxi-manager.onepas.vn/Photo/ShowPhotoBannerVsSlide?Id=7F14089A-CF08-4FA4-B04F-9FAA31B9CE02&2023-12-18%2016:12:30",
              }}
              style={{
                width: "100%",
                height: 150,
              }}
            />
          </SwiperItem>
        </Swiper>
        <View className="mt-5">
          {featuredData.map((item, index) => {
            return (
              <FeaturedRow
                key={index}
                title={item.name}
                restaurants={item.restaurants}
                description={item.description}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
