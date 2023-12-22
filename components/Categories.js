import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import axios from 'axios'; // Import axios
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "@env";

export default function Categories() {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    // Function to fetch categories
    const fetchCategories = async () => {
      try {
        // Replace 'http://your-api-url' with your actual API endpoint
        const response = await axios.get(`${API_URL}/categories`);
        const fetchedCategories = response.data;
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    // Call the function to fetch categories when the component mounts
    fetchCategories();
  }, []); // Empty dependency array to ensure the effect runs only once when the component mounts
// console.log(categories)
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
                onPress={() => {
                  setActiveCategory(category._id);
                  console.log("Selected Category ID:", category._id); // Thêm console log ở đây
                  navigation.navigate('Result', { selectedCategory: category._id });
                }}
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
