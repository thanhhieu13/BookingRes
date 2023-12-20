import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";

export default function RestaurantDetail() {
  const { params } = useRoute();
  const navigation = useNavigation();
  let item = params;
  return (
    <View style={styles.container}>
      <ScrollView>
        <View className="relative">
          <Image className="w-full h-72" source={{ uri: item.image }} />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-14 left-4 bg-gray-50 p-2 rounded-full shadow"
          >
            <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
          </TouchableOpacity>
        </View>
        <View
          style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
          className="bg-white -mt-12 pt-6"
        >
          <View className="px-5">
            <Text className="text-3xl font-bold">{item.title}</Text>
            {/* copy this code from restaurant card */}
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <Image
                  source={require("../assets/img/star.png")}
                  className="h-4 w-4"
                />
                <Text className="text-xs">
                  <Text className="text-green-700">{item.rating}</Text>
                  <Text className="text-gray-700"> (4.6k review){" "}</Text> 
                  <Text className="font-semibold text-gray-700">
                    {item.address}
                  </Text>
                </Text>
              </View>
              <View className="flex-row items-center space-x-1">
                <Icon.MapPin color="gray" width={15} height={15} />
                <Text className="text-gray-800 text-xs">
                  {" "}
                  Nearby · {item.address}
                </Text>
              </View>
            </View>
            <Text className="text-gray-500 mt-2">{item.description}</Text>
          </View>
        </View>
        <View className="pb-36 bg-white">
          <Text className="px-4 py-4 text-2xl font-bold">Menu</Text>
          {/* dishes */}
        </View>
      </ScrollView>

      <View style={styles.popupContainer}>
        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => {
            navigation.navigate("Order");
          }}
        >
          <Text style={styles.applyButtonText}>Đặt chỗ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  applyButton: {
    backgroundColor: "red",
    width: "90%",
    marginTop: 20,
    padding: 17,
    borderRadius: 5,
  },
  applyButtonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  popupContainer: {
    backgroundColor: "white",
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    width: "95%",
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
});
