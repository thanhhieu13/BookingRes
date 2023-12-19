import { View, Text, Modal, Button } from 'react-native';
import React, { useState } from 'react';
import { CheckBox, Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';

const CityScreen = ({ navigation, route }) => {
  const { selectedCity: initialSelectedCity, setSelectedCity } = route.params;
  const [selectedCity, setLocalSelectedCity] = useState(initialSelectedCity);
  const [modalVisible, setModalVisible] = useState(false);

  const cities = ["Hà Nội", "TPHCM", "Đà Nẵng", "Khánh Hòa"];

  const handleCitySelection = (city) => {
    if (selectedCity === city) {
      setLocalSelectedCity(null);
    } else {
      setLocalSelectedCity(city);
    }
  };

  const handleApply = () => {
    // Apply the selected city
    setSelectedCity(selectedCity);
    setModalVisible(false);
    navigation.goBack();
  };

  return (
    <View>
      {cities.map((city) => (
        <CheckBox
          key={city}
          title={city}
          checkedIcon={
            <Icon
              name="radio-button-checked"
              type="material"
              color="green"
              size={25}
              iconStyle={{ marginRight: 10 }}
            />
          }
          uncheckedIcon={
            <Icon
              name="radio-button-unchecked"
              type="material"
              color="grey"
              size={25}
              iconStyle={{ marginRight: 10 }}
            />
          }
          checked={selectedCity === city}
          onPress={() => handleCitySelection(city)}
        />
      ))}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={{ fontSize: 17, marginVertical: 10, textAlign: "center", color: "blue" }}>
          Áp dụng
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, elevation: 5 }}>
            <Text style={{ fontSize: 20, marginBottom: 10 }}>Chọn thành phố</Text>
            {cities.map((city) => (
              <CheckBox
                key={city}
                title={city}
                checked={selectedCity === city}
                onPress={() => handleCitySelection(city)}
              />
            ))}
            <Button title="Áp dụng" onPress={handleApply} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CityScreen;
