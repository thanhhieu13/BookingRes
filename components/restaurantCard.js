import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";

export default function RestaurantCard({ item }) {
  const navigation = useNavigation();
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + "...";
    }
    return text;
  };
  const handlePress = () => {
    navigation.navigate("Restaurant", { ...item });
    navigation.setParams({ headerTitle: item.name });
  };

  return (
    <TouchableWithoutFeedback
      // onPress={() => navigation.navigate('Restaurant', { ...item })}
      onPress={handlePress}
    >
      <View
        style={{ shadowColor: themeColors.bgColor(0.2), shadowRadius: 7 }}
        className="mr-6 bg-white rounded-3xl shadow-lg"
      >
        <Image
          className="h-36 w-64 rounded-t-3xl"
          source={{ uri: item.image }}
        />
        <View className="px-3 pb-4 space-y-2">
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="text-lg font-bold pt-2"
          >
            {truncateText(item.name, 28)}
          </Text>
          <View className="flex-row items-center space-x-1">
            <Image
              source={require("../assets/img/star.png")}
              className="h-4 w-4"
            />
            <Text className="text-xs">
              <Text className="text-green-700">{item.rating}</Text>
              <Text className="text-gray-700"> đánh giá </Text>
            </Text>
          </View>
          <View className="flex-row items-center space-x-1">
            <Icon.MapPin color="gray" width={15} height={15} />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="text-gray-700 text-xs"
            >
              Địa chỉ · {truncateText(item.address, 30)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
