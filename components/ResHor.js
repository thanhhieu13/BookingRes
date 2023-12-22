import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { API_URL } from "@env";

const ResHor = ({ navigation, route }) => {
  const [restaurantData, setRestaurantData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy giá trị selectedCategory từ params của route
        const { selectedCategory } = route.params || {};

        if (selectedCategory) {
          const response = await fetch(
            `${API_URL}/restaurants/${selectedCategory}`
          );
          const data = await response.json();

          if (Array.isArray(data) && data.length > 0) {
            // Lưu dữ liệu nhà hàng vào state
            setRestaurantData(data[0]);
            console.log("Restaurant Data:", data[0]);
          } else {
            console.error("Invalid or empty data returned from the server");
          }
        } else {
          console.error("selectedCategory is undefined or null");
        }
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    fetchData();
  }, [route.params]);

  const defaultImage = "https://pastaxi-manager.onepas.vn/Photo/ShowPhotoBannerVsSlide?Id=5AC03585-1C3B-4F28-B708-01337E3904E9&2023-12-18%2016:12:30"

  return (
    <View className="m-2 mt-2 p-2 flex-row justify-between rounded-xl">
      <Image
        source={{
            uri: restaurantData?.image || "default_image_url",
        }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 5,
        }}
      />
      <View className="w-2/3">
        <Text className="text-lg text-gray-950 font-bold">
          {/* Yaki Yaki Yo - Tây Thạnh */}
          {restaurantData?.name}
        </Text>
        <View className="flex-row">
          <Ionicons name="location-sharp" size={24} color="red" />
          <Text style={{ width: 200 }} className="text-gray-500 ml-2">
            {/* Số 165 đường Tây Thạnh, P.Tây Thạnh, Q. Tân Phú */}
            {restaurantData?.address}
          </Text>
        </View>
        <View className="flex-row items-center w-2/3 mt-1">
          <View className="flex-row items-center">
            <AntDesign name="star" size={24} color="#DDBC37" />
            <Text className="ml-2">{restaurantData?.rating}</Text>
          </View>
          <View className="flex-row items-center ml-4">
            <Entypo name="map" size={24} color="#3D9DC3" />
            <Text className="ml-2">4.2 Km</Text>
          </View>
        </View>
        <Text className="text-gray-500 mt-2">Buffet nướng lẩu hàn quốc</Text>
        <View className=" mt-2">
          <TouchableOpacity onPress={() => navigation.navigate("City")}>
            <Text className="w-1/3 text-center p-1 border-[#A2A2A2] border rounded-sm">
              Đặt chỗ
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ResHor;
