import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import axios from 'axios';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:8000/restaurants');
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);

  const renderDishItem = ({ item: dish }) => (
    <View>
      <Text>Dish Name: {dish.name}</Text>
      <Text>Dish Description: {dish.description}</Text>
      <Text>Dish Price: {dish.price}</Text>
      <Image source={{ uri: dish.image }} style={{ width: 100, height: 75 }} />
    </View>
  );

  const renderRestaurantItem = ({ item }) => (
    <View>
      <Text>Name: {item.name}</Text>
      <Text>Description: {item.description}</Text>
      <Text>Address: {item.address}</Text>
      <Text>Rating: {item.rating}</Text>
      <Text>Reviews: {item.reviews}</Text>
      <Image source={{ uri: item.image }} style={{ width: 200, height: 150 }} />
      <Text>Latitude: {item.lat}</Text>
      <Text>Longitude: {item.lng}</Text>
      <Text>
        Category Type ID: <Text>{item.type}</Text> {/* Display the actual category name instead of the ID */}
      </Text>
      <Text>Dishes:</Text>
      <FlatList
        data={item.dishes}
        keyExtractor={(dish) => dish._id?.toString() || Math.random().toString()}
        renderItem={renderDishItem}
      />
    </View>
  );
  

  return (
    <View>
      <Text>Restaurant List</Text>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item._id?.toString() || Math.random().toString()}
        renderItem={renderRestaurantItem}
      />
    </View>
  );
};

export default RestaurantList;
