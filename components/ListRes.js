import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from "@gorhom/bottom-sheet";



const ListRes = ({ nearbyRestaurants, navigation, refresh }) => {
  const listRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (refresh) {
      scrollListTop();
    }
  }, [refresh]);

  const scrollListTop = () => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const renderRes = ({ item: restaurant }) => (
    <TouchableOpacity
      key={restaurant?._id}
      onPress={() => navigation.navigate("Restaurant", { ...restaurant })}
    >
      <View className="m-2 p-2 mt-4 flex-row justify-between rounded-xl">
        <View className=" w-3/12 items-center">
          <Image
            source={{
              uri: restaurant?.image || "default_image_url",
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
                {restaurant?.rating} |{" "}
                <Text style={{ color: "#FF7F27", fontWeight: "bold" }}>$$</Text>
              </Text>
            </View>
            <View className="flex-row items-center">
              <Entypo name="map" size={24} color="#3D9DC3" />
              <Text className="ml-2 w-full">{restaurant?.distance}km</Text>
            </View>
          </View>
        </View>

        <View className="w-9/12 ml-8">
          <Text className="text-lg text-gray-950 font-bold">
            {restaurant?.name}
          </Text>
          <View className="flex-row">
            <Text style={{ width: 200 }} className="text-gray-500 ml-1">
              {restaurant?.address}
            </Text>
          </View>

          <View className=" mt-2">
            <TouchableOpacity >
              <Text className="w-1/3 text-center p-1 border-[#A2A2A2] border rounded-sm">
                Đặt chỗ
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#FDFFFF" }}>
      <BottomSheetFlatList
        renderItem={renderRes}
        data={loading ? [] : nearbyRestaurants}
        ref={listRef}
        ListHeaderComponent={
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              marginTop: 4,
            }}
          >
            {nearbyRestaurants.length} homes
          </Text>
        }
      />
    </View>
  );
};

export default ListRes;
