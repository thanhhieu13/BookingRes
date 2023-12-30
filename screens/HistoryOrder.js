import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { UserType } from "../UserContext";
import { API_URL } from "@env";
import { Image } from "react-native";
// import { BottomSheet } from "react-native-btr";
import { MaterialIcons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { Feather } from "@expo/vector-icons";
import Status from "../components/Status";
import PopUp from "../components/PopUp";

const HistoryOrder = () => {
  const [orders, setOrders] = useState([]);
  const [restaurants, setRestaurants] = useState({});

  const { user } = useContext(UserType);


  const userId = user._id;
  // console.log(userId);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await fetch(`${API_URL}/api/orders/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setOrders(data.orders);


          const restaurantIds = Array.from(
            new Set(data.orders.map((order) => order.restaurant))
          );

          const restaurantPromises = restaurantIds.map(async (restaurantId) => {
            const restaurantResponse = await fetch(
              `${API_URL}/restaurants/${restaurantId}`
            );
            const restaurantData = await restaurantResponse.json();

            if (restaurantResponse.ok) {
              setRestaurants((prevRestaurants) => ({
                ...prevRestaurants,
                [restaurantId]: restaurantData.restaurant,
              }));
            } else {
              console.error(
                "khong lay duoc id nha hang",
                restaurantData.message
              );
            }
          });

          await Promise.all(restaurantPromises);
        } else {
          console.error("khong lay duoc order cua user", data.message);
        }
      } catch (error) {
        console.error("loi fetch data:", error.message);
      }
    };

    fetchUserOrders();
  }, [userId]);

  console.log("hi")
  console.log(orders);

  // console.log(restaurants, "fetch thanh cong");
  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };

    return new Date(dateString).toLocaleDateString("vi-VN", options);
  };

 

  return (
    <View style={styles.container}>
    

      <View className="mt-2">
      {orders.map((order) => (
          <View
            key={order._id}
            style={{
              backgroundColor: "#FFFFFF",
              padding: 10,
              borderWidth: 1,
              borderColor: "#DEDEDE",
              borderRadius: 5,
              marginTop: 5,
            }}
          >
            <View
              className="flex-row"
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                paddingBottom: 10,
              }}
            >
              <View className="mr-3">
                {restaurants[order.restaurant] && (
                  <Image
                    source={{
                      uri: restaurants[order.restaurant].image,
                    }}
                    style={{
                      width: 85,
                      height: 85,
                      borderRadius: 5,
                      objectFit: "cover",
                    }}
                  />
                )}
              </View>
              <View className="flex-column">
                <View className="flex-row justify-between w-3/4">
                  <Text style={{ color: "#A1A1A1" }}>
                    ID : {order._id.substring(0, 11)}
                  </Text>
                  <Text style={{ color: "#A1A1A1" }}>
                    {formatDate(order.date)}
                  </Text>
                </View>
                <Text
                  style={{
                    color: "#262626",
                    fontSize: 17,
                    fontWeight: "bold",
                    marginBottom: 7,
                    marginTop: 7,
                  }}
                >
                  {restaurants[order.restaurant]?.name || "khong co nha hang"}
                </Text>
                <Text style={{ color: "#4A4A4A" }}>
                  Thời gian đến : {formatDate(order.date)} {order.selectedHour}
                </Text>
              </View>
            </View>
            <View className="flex-row justify-between mt-2">
              <Text className="text-base">Đã hủy</Text>
              <Text
                style={{
                  backgroundColor: "red",
                  color: "white",
                  padding: 5,
                  width: 70,
                  borderRadius: 3,
                  textAlign: "center",
                }}
              >
                Đặt lại
              </Text>
            </View>
          </View>
        ))}
      </View>

    </View>
  );
};

export default HistoryOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#F2F2F2",
  },
  button: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderRadius: 50,
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
});
