import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { API_URL } from "@env"
import RestaurantCard from '../components/restaurantCard';

const SearchScreen = () => {
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [location, setLocation] = useState("TPHCM"); // Added state for location
console.log(API_URL)
  useEffect(() => {
    let isMounted = true;

    const handleSearch = async (searchKeyword) => {
      try {
        // Only perform the search if the keyword is not empty
        if (searchKeyword.trim() !== "") {
          const response = await fetch(
            `${API_URL}/restaurants/search/${searchKeyword}`
          );

          if (response.ok) {
            const data = await response.json();

            // Check if the component is still mounted before updating the state
            if (isMounted) {
              setSearchResults(data);
            }
          } else {
            console.error("Error fetching search results");
          }
        } else {
          // If keyword is empty, clear the search results
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Error fetching search results", error);
      }
    };

    // Trigger the search when the keyword changes
    handleSearch(keyword);

    return () => {
      // Set isMounted to false when the component is unmounted
      isMounted = false;
    };
  }, [keyword]);

  return (
    <View>
      <View style={{ alignItems: "center", marginTop: 20 }}>
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
      </View>
      {/* Input for keyword search */}
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          margin: 10,
          padding: 10,
        }}
        placeholder="Enter keyword"
        value={keyword}
        onChangeText={(text) => setKeyword(text)}
      />
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

      <ScrollView>
        <View className="flex-row justify-between items-center w-10/12 mt-4">
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
      </ScrollView>
      <View>
        <Text className="uppercase text-xl font-bold mt-6">Được đề xuất</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 15,
          }}
          className="overflow-visible py-5"
        >
          {
            searchResults.map((restaurant, index) => {
              return (
                <RestaurantCard
                  item={restaurant}
                  key={index}

                />
              )
            })
          }
        </ScrollView>
      </View>
    </View>
  );
};

export default SearchScreen;
