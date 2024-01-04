import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { API_URL } from "@env";
import RestaurantCard from "../components/restaurantCard";
import ResHor from "../components/ResHor";
import { UserType } from "../UserContext";
import { Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const SearchScreen = ({ route, navigation }) => {
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [nearbyResults, setNearbyResults] = useState([]);
  const [location, setLocation] = useState("TPHCM");

  const handleSearch = async (searchKeyword) => {
    try {
      if (searchKeyword.trim() !== "") {
        const response = await fetch(
          `${API_URL}/restaurants/search/${searchKeyword}`
        );

        if (response.ok) {
          const data = await response.json();

          setSearchResults(data);
        } else {
          console.error("Error fetching search results");
        }
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching search results", error);
    }
  };

  const getNearbyRestaurants = async () => {
    try {
      const nearbyResponse = await fetch(
        `${API_URL}/nearby-restaurants/${user?._id}`
      );

      if (nearbyResponse.ok) {
        const nearbyData = await nearbyResponse.json();

        setNearbyResults(nearbyData); // Save nearby restaurants data
      } else {
        console.error("Error fetching nearby restaurants");
      }
    } catch (error) {
      console.error("Error fetching nearby restaurants", error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    // Trigger the search when the keyword changes
    handleSearch(keyword);

    return () => {
      // Set isMounted to false when the component is unmounted
      isMounted = false;
    };
  }, [keyword]);

  useEffect(() => {
    let isMounted = true;

    // Call getNearbyRestaurants when the component mounts
    getNearbyRestaurants();

    return () => {
      isMounted = false;
    };
  }, []);

  const { user } = useContext(UserType);

  console.log("Nearby Results:", nearbyResults);

  return (
    <View style={{ padding: 10 }}>
      <Text>{user?._id}</Text>
      {/* <View style={{ alignItems: "center", marginTop: 20 }}>
        <TouchableOpacity
          style={{
            width: "90%",
            height: 40,
            borderRadius: 20,
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "red",
          }}
        >
          <Ionicons
            name="location-sharp"
            size={24}
            color="gray"
            style={{ padding: 10 }}
          />
          <Text style={{ fontSize: 16 }}>Khu vực tìm kiếm: </Text>
          <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: "bold" }}>
            {location}
          </Text>
        </TouchableOpacity>
      </View> */}
      {/* Input for keyword search */}
      <View
        style={{
          borderWidth: 2,
          borderColor: "#E5E5E5",
          height: 60,
          borderRadius: 10,
          paddingHorizontal: 15,
          marginBottom: 20,
          justifyContent: "center",
        }}
      >
        <TextInput
          style={
            {
              // height: 40,
              // borderColor: "gray",
              // borderWidth: 1,
              // margin: 10,
              // padding: 10,
            }
          }
          placeholder="Enter keyword"
          value={keyword}
          onChangeText={(text) => setKeyword(text)}
        />
      </View>
      <Text
        style={{
          textTransform: "uppercase",
          marginLeft: 10,
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        Từ khóa
      </Text>

      {/* <ScrollView> */}
        <View className="mt-4 flex-row">
          {searchResults.map((restaurant) => (
            <TouchableOpacity
              key={restaurant._id}
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                width: "80%",
                margin: 10,
              }}
            >
              <FontAwesome5 name="search" size={17} color="gray" />
              <Text className="w-5/6 max-h-20 border-b border-b-gray-200 p-2">
                {restaurant.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      {/* </ScrollView> */}

      <View>
        <Text className="uppercase text-xl font-bold mt-6">Được đề xuất</Text>
        {searchResults.length > 0 ? (
          <>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 15,
              }}
              className="overflow-visible py-5"
            >
              {searchResults.map((restaurant, index) => (
                <RestaurantCard item={restaurant} key={index} />
              ))}
            </ScrollView>
          </>
        ) :(
        nearbyResults.map((restaurant) => (
          <TouchableOpacity
            key={restaurant?._id}
            onPress={() => navigation.navigate("Restaurant", { ...restaurant })}
          >
            <View className="m-2 mt-2 p-2 flex-row justify-between rounded-xl">
              <View className=" w-4/12 items-center">
                <Image
                  source={{
                    uri: restaurant.image || "default_image_url",
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
                      {restaurant.rating} |{" "}
                      <Text style={{ color: "#FF7F27", fontWeight: "bold" }}>
                        $$
                      </Text>
                    </Text>
                  </View>
                  <View className="flex-row items-center ml-4">
                    <Entypo name="map" size={24} color="#3D9DC3" />
                    <Text className="ml-2 w-full"> 4.2 Km</Text>
                  </View>
                </View>
              </View>

              <View className="w-8/12">
                <Text className="text-lg text-gray-950 font-bold">
                  {restaurant.name}
                </Text>
                <View className="flex-row">
                  <Text style={{ width: 200 }} className="text-gray-500 ml-1">
                    {restaurant.address}
                  </Text>
                </View>

                <View className=" mt-2">
                  <TouchableOpacity onPress={() => navigation.navigate("City")}>
                    <Text className="w-1/3 text-center p-1 border-[#A2A2A2] border rounded-sm">
                      Đặt chỗ
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )))}
      </View>
    </View>
  );
};

export default SearchScreen;
