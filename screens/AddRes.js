// App.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const AddRestaurantScreen = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState('');
  const [menu, setMenu] = useState('');
  const [openingHours, setOpeningHours] = useState('');

  const addRestaurant = async () => {
    try {
      const response = await axios.post('http://localhost:8000/add-restaurants', {
        name,
        address,
        phone,
        type,
        menu,
        openingHours,
      });

      console.log('Restaurant added successfully:', response.data);
      // Handle success (e.g., navigate to another screen)
    } catch (error) {
      console.error('Error adding restaurant:', error);
      // Handle error (e.g., show error message to the user)
    }
  };

  return (
    <View style={styles.container}>
      <Text>Add Restaurant</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
      />
      <TextInput
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
      />
      <TextInput
        placeholder="Type"
        value={type}
        onChangeText={setType}
        style={styles.input}
      />
      <TextInput
        placeholder="Menu"
        value={menu}
        onChangeText={setMenu}
        style={styles.input}
      />
      <TextInput
        placeholder="Opening Hours"
        value={openingHours}
        onChangeText={setOpeningHours}
        style={styles.input}
      />
      <Button title="Add Restaurant" onPress={addRestaurant} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '80%',
  },
});

export default AddRestaurantScreen;
