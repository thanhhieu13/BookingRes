import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { API_URL } from "@env";
import RestaurantUI from "./ResHorUI";
import { useNavigation, useRoute } from "@react-navigation/native";

const ResHor = ({ route }) => {
  const navigation = useNavigation();

  const [restaurantData, setRestaurantData] = useState(null);

  console.log(API_URL)
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy giá trị selectedCategory từ params của route
        const { selectedCategory } = route.params || {};
  
        if (selectedCategory) {
          const response = await fetch(
            `${API_URL}/restaurants/categories/${selectedCategory}`
          );
          const data = await response.json();
  
          if (Array.isArray(data) && data.length > 0) {
            // Lưu dữ liệu nhà hàng vào state
            setRestaurantData(data);
            console.log("Restaurant Data:", data);
            console.log(data.length)

            navigation.setOptions({
              headerTitle: () => (
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{ fontWeight: "bold", fontSize: 18, color: "white" }}
                >
                  {`Kết quả: ${data.length}`}
                </Text>
              ),
            });

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
   
  }, [route.params, navigation]);
  
  // console.log(restaurantData);
  


  // const defaultImage = "https://pastaxi-manager.onepas.vn/Photo/ShowPhotoBannerVsSlide?Id=5AC03585-1C3B-4F28-B708-01337E3904E9&2023-12-18%2016:12:30"

  return <RestaurantUI restaurantData={restaurantData} />;

};

export default ResHor;
