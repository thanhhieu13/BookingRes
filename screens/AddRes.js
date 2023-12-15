import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AddRestaurantScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    type: '',
    description: '',
    openingHours: '',
    image: '',
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleAddRestaurant = () => {
    // Make a POST request to your server with the formData
    fetch('http://localhost:8000/add-restaurants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Restaurant added successfully:', data);
        // Reset the form if needed
        setFormData({
          name: '',
          address: '',
          phone: '',
          type: '',
          description: '',
          openingHours: '',
          image: '',
        });
      })
      .catch(error => {
        console.error('Error adding restaurant:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Restaurant</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={formData.name}
        onChangeText={text => handleInputChange('name', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Address"
        value={formData.address}
        onChangeText={text => handleInputChange('address', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={formData.phone}
        onChangeText={text => handleInputChange('phone', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Type"
        value={formData.type}
        onChangeText={text => handleInputChange('type', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        value={formData.description}
        onChangeText={text => handleInputChange('description', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Opening Hours"
        value={formData.openingHours}
        onChangeText={text => handleInputChange('openingHours', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={formData.image}
        onChangeText={text => handleInputChange('image', text)}
      />

      <Button title="Add Restaurant" onPress={handleAddRestaurant} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
});

export default AddRestaurantScreen;
