import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        // Gọi API để lấy danh sách nhà hàng
        const response = await fetch('http://localhost:8000/restaurants');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Chuyển đổi dữ liệu JSON từ phản hồi
        const data = await response.json();

        // Cập nhật trạng thái với danh sách nhà hàng
        setRestaurants(data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    // Gọi hàm để lấy danh sách nhà hàng khi component được tạo ra
    fetchRestaurants();
  }, []); // useEffect sẽ chỉ chạy một lần khi component được tạo ra

  return (
    <View>
      <Text>Restaurant List:</Text>
      {restaurants.map((restaurant) => (
        <View key={restaurant._id}>
          <Text>{restaurant.name}</Text>
          <Text>{restaurant.address}</Text>
          {/* Thêm các trường khác của nhà hàng nếu cần */}
        </View>
      ))}
    </View>
  );
};

export default RestaurantList;
