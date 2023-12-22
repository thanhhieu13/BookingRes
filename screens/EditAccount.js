import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { UserType } from "../UserContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
// import RNPickerSelect from "react-native-picker-select";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Icon from 'react-native-feather';
import { themeColors } from '../theme';
import { API_URL } from "@env";

const AddressScreen = () => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [mobileNo, setMobileNo] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [occupation, setOccupation] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const pickerItems = [
    { label: "Nam", value: "Nam" },
    { label: "Nữ", value: "Nữ" },
    { label: "Khác", value: "Khác" },
  ];

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    setDateOfBirth(date.toISOString().split("T")[0]);
    hideDatePicker();
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${API_URL}/address/${userId}`);
      const userData = response.data; // Adjust this based on your API response structure
      // Update state with fetched user data
      setName(userData.name);
      setAvatar(userData.avatar);
      setMobileNo(userData.mobileNo);
      setStreet(userData.street);
      setCity(userData.city);
      setOccupation(userData.occupation);
      setGender(userData.gender);
      setDateOfBirth(userData.dateOfBirth);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  
  const handleUpdateAddress = () => {
    const updatedAddress = {
      name,
      avatar,
      mobileNo,
      street,
      city,
      occupation,
      gender,
      dateOfBirth,
    };
    axios
      .put(`http://localhost:8000/address/${userId}`, updatedAddress)
      .then((response) => {
        Alert.alert("Success", "Address updated successfully");
        fetchUserData();
        setTimeout(() => {
          navigation.goBack();
        }, 500);
      })
      .catch((error) => {
        Alert.alert("Error", "Failed to update address");
        console.log("error", error);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.personalInfoText}>Thông tin cá nhân</Text>
      <View style={styles.header} />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
      </TouchableOpacity>
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Họ và tên</Text>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.input}
            placeholder="Nhập tên của bạn"
            placeholderTextColor="gray"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Số điện thoại</Text>
          <TextInput
            value={mobileNo}
            onChangeText={(text) => setMobileNo(text)}
            style={styles.input}
            placeholder="Nhập số điện thoại"
            placeholderTextColor="gray"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Địa chỉ nhà</Text>
          <TextInput
            value={street}
            onChangeText={(text) => setStreet(text)}
            style={styles.input}
            placeholder="Nhập địa chỉ"
            placeholderTextColor="gray"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Thành phố</Text>
          <TextInput
            value={city}
            onChangeText={(text) => setCity(text)}
            style={styles.input}
            placeholder="vd: TP.HCM"
            placeholderTextColor="gray"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nghề nghiệp</Text>
          <TextInput
            value={occupation}
            onChangeText={(text) => setOccupation(text)}
            style={styles.input}
            placeholder="vd: IT, Tiktoker,..."
            placeholderTextColor="gray"
          />
        </View>

        {/* <View style={styles.inputContainer}>
          <Text style={styles.label}>Gender</Text>
          <RNPickerSelect
            onValueChange={(itemValue) => setGender(itemValue)}
            items={pickerItems}
            style={{
              inputAndroid: styles.input,
              iconContainer: {
                top: 10,
                right: 12,
              },
            }}
            useNativeAndroidPickerStyle={false}
            placeholder={{ label: 'Chọn giới tính', value: null }}
            value={gender}
            textInputProps={{ underlineColorAndroid: 'rgba(0,0,0,0)' }}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Ngày sinh</Text>
          <Pressable
            onPress={showDatePicker}
            style={styles.datePickerButton}
          >
            <Text>{dateOfBirth || "Chọn ngày sinh của bạn"}</Text>
          </Pressable>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
          />
        </View> */}

        <Pressable
          onPress={handleUpdateAddress}
          style={styles.addButton}
        >
          <Text style={styles.buttonText}>Cập nhập</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  header: {
    height: 20,
  },
  content: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    padding: 10,
    borderColor: "#D0D0D0",
    borderWidth: 1,
    marginTop: 5,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: "#f97316",
    padding: 15,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  personalInfoText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 11,
    textShadowColor: '#ffa500',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 2,
  },
  backButton: {
    position: 'absolute',
    top: 5,
    left: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default AddressScreen;
