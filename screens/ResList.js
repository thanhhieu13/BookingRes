import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ScrollView,
} from "react-native";

const App = () => {
  const [restaurants, setRestaurants] = useState([]);

  const fetchRestaurants = async () => {
    const response = await fetch("https://localhost:8000/restaurants");
    const data = await response.json();
    setRestaurants(data);
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/icon.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Food Ordering App</Text>
      </View>
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
        />
      </View>
      <ScrollView>
        {restaurants.map((restaurant, index) => (
          <View key={index} style={styles.restaurant}>
            <Image
              source={restaurant.image}
              style={styles.restaurantImage}
            />
            <View style={styles.restaurantInfo}>
              <Text style={styles.restaurantName}>{restaurant.name}</Text>
              <Text style={styles.restaurantAddress}>{restaurant.address}</Text>
            </View>
            <Button
              title="Order"
              style={styles.orderButton}
              onPress={() => {
                // Handle order
              }}
            />
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <Button
          title="See All Restaurants"
          style={styles.seeAllButton}
          onPress={() => {
            // Navigate to restaurant list page
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 60,
    backgroundColor: "#000",
  },
  logo: {
    width: 100,
    height: 50,
    alignSelf: "center",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  searchBar: {
    margin: 10,
  },
  searchInput: {
    width: 200,
    height: 40,
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  restaurant: {
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
  },
  restaurantImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  restaurantAddress: {
    fontSize: 16,
  },
  orderButton: {
    width: 100,
    height: 40,
    borderRadius: 5,
    backgroundColor: "#000",
    color: "#fff",
    fontWeight: "bold",
  },
  seeAllButton: {
    marginLeft: 10,
  },
});

export default App;
