import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import * as Icon from "react-native-feather";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const SearchScreen = () => {
  return (
    <View className="">
      <View className="items-center mt-4">
        <TouchableOpacity className="w-11/12 h-12 rounded-full flex-row items-center border-solid border border-red-500">
          <Ionicons
            style={{ padding: 10 }}
            name="location-sharp"
            size={24}
            color="gray"
          />
          <Text className="text-base">Khu vực tìm kiếm: </Text>
          <Text className="ml-4 text-xl font-bold">TPHCM</Text>
        </TouchableOpacity>
      </View>
      <Text className="uppercase mt-8 ml-2 text-xl font-medium">Từ khóa</Text>
      <View className="flex-row justify-between items-center w-10/12 mt-4">
        <TouchableOpacity className="flex-row justify-around items-center">
          <FontAwesome5 name="search" size={17} color="gray" />
          <Text className="w-3/6 max-h-20 border-b border-b-gray-300 p-2">
            Bò lế rồ trần khánh dư khu đô thị vạn phúc
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row justify-around items-center">
          <FontAwesome5 name="search" size={17} color="gray" />
          <Text className="w-3/6 max-h-20 border-b border-b-gray-300 p-2">
            lẩu bò vi vu Bò lê văn sỹ
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between items-center w-10/12 mt-4">
        <TouchableOpacity className="flex-row justify-around items-center">
          <FontAwesome5 name="search" size={17} color="gray" />
          <Text className="w-3/6 max-h-20 border-b border-b-gray-300 p-2">
            Bò lế rồ trần khánh dư
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row justify-around items-center">
          <FontAwesome5 name="search" size={17} color="gray" />
          <Text className="w-3/6 max-h-20 border-b border-b-gray-300 p-2">
            lẩu bò vi vu Bò lê văn sỹ
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between items-center w-10/12 mt-4">
        <TouchableOpacity className="flex-row justify-around items-center">
          <FontAwesome5 name="search" size={17} color="gray" />
          <Text className="w-3/6 max-h-20 border-b border-b-gray-300 p-2">
            Bò lế rồ trần khánh dư
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row justify-around items-center">
          <FontAwesome5 name="search" size={17} color="gray" />
          <Text className="w-3/6 max-h-20 border-b border-b-gray-300 p-2">
            lẩu bò vi vu Bò lê văn sỹ
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between items-center w-10/12 mt-4">
        <TouchableOpacity className="flex-row justify-around items-center">
          <FontAwesome5 name="search" size={17} color="gray" />
          <Text className="w-3/6 max-h-20 border-b border-b-gray-300 p-2">
            Bò lế rồ trần khánh dư
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row justify-around items-center">
          <FontAwesome5 name="search" size={17} color="gray" />
          <Text className="w-3/6 max-h-20 border-b border-b-gray-300 p-2">
            lẩu bò vi vu Bò lê văn sỹ
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text className="uppercase text-xl font-bold mt-6">Được đề xuất</Text>
      </View>
      <View>
        
      </View>
    </View>
  );
};

export default SearchScreen;
