import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserType } from "../UserContext";
import { API_URL } from "@env";
import { Image } from "react-native";

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

  // console.log("hi")
  console.log(orders);
  // console.log(restaurants, "fetch thanh cong");

  return (
    <View style={styles.container}>
      {orders.map((order) => (
        <View key={order._id} style={styles.orderContainer}>
          {restaurants[order.restaurant] && (
            <Image
              source={{ uri: restaurants[order.restaurant].image }}
              style={styles.restaurantImage}
            />
          )}
          <View style={styles.orderDetails}>
            <Text style={styles.restaurantName}>
              {restaurants[order.restaurant]?.name || "khong co nha hang"}
            </Text>
            <Text style={styles.orderId}>Order ID: {order._id}</Text>
          </View>
        </View>
      ))}

      
    </View>
  );
};

export default HistoryOrder;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  orderContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  restaurantImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 5,
  },
  orderDetails: {
    flex: 1,
    justifyContent: "center",
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  orderId: {
    fontSize: 14,
  },
});
