import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

export default function App() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    // Thay đổi địa chỉ API của bạn
    const apiUrl = 'http://localhost:8000/restaurants';

    // Gọi API để lấy thông tin về nhà hàng
    axios.get(apiUrl)
      .then(response => {
        setRestaurants(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh sách nhà hàng</Text>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.restaurantItem}>
            <Text style={styles.restaurantName}>{item.name}</Text>
            <Text>{item.description}</Text>
            {/* Hiển thị các thông tin khác về nhà hàng */}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  restaurantItem: {
    marginBottom: 16,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
