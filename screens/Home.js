import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import Categories from "../components/Categories";
import FeaturedRow from "../components/featureRow";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
// import { featured } from "../constants";
import { Swiper, SwiperItem } from "@nutui/nutui-react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { NoticeBar } from "@nutui/nutui-react-native";



export default function HomeScreen({ navigation, route }) {
  const text =
    "NutUI 是京东风格的移动端组件库，使用 Vue 语言来编写可以在 H5，小程序平台上的应用，帮助研发人员提升开发效率，改善开发体验。";
  // const [selectedCity, setSelectedCity] = useState(
  //   route.params?.selectedCity || "TPHCM"
  // );
  const [selectedCity, setSelectedCity] = useState(
    route.params?.selectedCity || "TPHCM"
  );
  const [featuredData, setFeaturedData] = useState([]);

  useEffect(() => {
    // Fetch featured data from your backend API
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.1.4:8000/api/featured');
        const data = await response.json();
        setFeaturedData(data);
      } catch (error) {
        console.error('Error fetching featured data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView className="bg-white">
      <StatusBar barStyle="dark-content" />
      <NoticeBar text={text} />
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
      <View className="flex-row items-center space-x-2 px-4 pb-2 ">
        <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
          <Icon.Search height="25" width="25" stroke="gray" />
          <TextInput
            placeholder="Resturants"
            className="ml-2 flex-1"
            keyboardType="default"
          />
          <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300">
            <Icon.MapPin height="20" width="20" stroke="gray" />
            <Text className="text-gray-600">New York, NYC</Text>
          </View>
        </View>
        <View
          style={{ backgroundColor: themeColors.bgColor(1) }}
          className="p-3 rounded-full"
        >
          <Icon.Sliders
            height={20}
            width={20}
            strokeWidth="2.5"
            stroke="white"
          />
        </View>
      </View>

      {/* main */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
      >
        {/* categories */}
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
                title={item.name}  // Chú ý thay đổi tên trường nếu cần
                restaurants={item.restaurants}
                description={item.description}
              />
            );
          })}
        </View>
        {/* <View className="mt-5">
          {[featured, featured, featured].map((item, index) => {
            return (
              <FeaturedRow
                key={index}
                title={item.title}
                restaurants={item.restaurants}
                description={item.description}
              />
            );
          })}
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}
