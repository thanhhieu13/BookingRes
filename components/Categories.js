import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import axios from 'axios'; // Import axios

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    // Function to fetch categories
    const fetchCategories = async () => {
      try {
        // Replace 'http://your-api-url' with your actual API endpoint
        const response = await axios.get('http://192.168.1.4:8000/categories');
        const fetchedCategories = response.data;
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    // Call the function to fetch categories when the component mounts
    fetchCategories();
  }, []); // Empty dependency array to ensure the effect runs only once when the component mounts

  return (
    <View className="mt-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      >
        {categories?.map((category, index) => {
          let isActive = category.id == activeCategory;
          let btnClass = isActive ? ' bg-gray-600' : ' bg-gray-200';
          let textClass = isActive ? ' font-semibold text-gray-800' : ' text-gray-500';
          return (
            <View key={index} className="flex justify-center items-center mr-6">
              <TouchableOpacity
                onPress={() => setActiveCategory(category.id)}
                className={"p-1 rounded-full shadow bg-gray-400" + btnClass}
              >
                <Image style={{ width: 45, height: 45 }} source={{ uri: category.image }} />
              </TouchableOpacity>
              <Text className={"text-sm " + textClass}>{category.name}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
