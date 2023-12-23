import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const RestaurantUI = ({ restaurantData, navigation }) => {
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
          {restaurantData?.name}
        </Text>
        <View className="flex-row">
          <Ionicons name="location-sharp" size={24} color="red" />
          <Text style={{ width: 200 }} className="text-gray-500 ml-2">
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
        <Text className="text-gray-500 mt-2">{restaurantData?.type}</Text>
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

export default RestaurantUI;