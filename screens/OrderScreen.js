import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { InputNumber } from "@nutui/nutui-react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment-timezone";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";

const OrderScreen = () => {
  const [inputState, setInputState] = useState({
    val1: 1,
  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // Function to update the current time in Vietnam timezone
    const updateCurrentTime = () => {
      const now = moment().tz("Asia/Ho_Chi_Minh");
      const futureTime = now.add(5, "minutes"); // Add 5 minutes to the current time
      const formattedTime = futureTime.format("HH:mm");

      setCurrentTime(formattedTime);
    };

    // Call the function to initially set the current time
    updateCurrentTime();

    // Update the current time every minute
    const intervalId = setInterval(updateCurrentTime, 60000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    // console.warn("A date has been picked: ", date);
    setSelectedDate(date);
    hideDatePicker();
  };

  return (
    <>
      <ScrollView style={styles.container}>
        {/* THONG TIN DON HANG  */}
        <View style={{ margin: 15 }}>
          <Text className="font-medium text-lg py-4">Đặt chỗ đến</Text>
          <View className="border p-2 flex-row justify-between rounded-xl">
            <Image
              source={{
                uri: "https://pastaxi-manager.onepas.vn/Photo/ShowPhotoBannerVsSlide?Id=7F14089A-CF08-4FA4-B04F-9FAA31B9CE02&2023-12-18%2016:12:30",
              }}
              style={{
                width: 100,
                height: 100,
              }}
            />
            <View className="w-2/3">
              <Text className="text-lg text-gray-950">
                Galbi House - Mega Market Hiệp Phú
              </Text>
              <Text className="text-gray-500">
                Đường Lê Văn Khương, QL1A, P.Hiệp Phú, Q.12
              </Text>
            </View>
          </View>
          <Text className="py-4 text-lg font-medium">Thông tin đơn hàng</Text>
          <View className="flex-row border-b p-4 border-b-zinc-300 items-center">
            <FontAwesome5 name="user" size={24} color="black" />
            <View className="flex-row justify-around  items-center  w-9/12">
              <Text className="ml-0">Số người lớn :</Text>
              <InputNumber  modelValue={inputState.val1} />
            </View>
          </View>
          <View className="flex-row border-b p-4 border-b-zinc-300 items-center">
            <MaterialIcons name="child-care" size={24} color="black" />
            <View className="flex-row justify-around  items-center  w-9/12">
              <Text className="mr-4">Số trẻ em :</Text>
              <InputNumber modelValue={inputState.val1} />
            </View>
          </View>
          <View className="flex-row border-b p-4 border-b-zinc-300 items-center">
            <AntDesign name="calendar" size={24} color="black" />
            <View className="flex-row justify-around  items-center w-9/12">
              <Text className="mr-4">Ngày đến :</Text>
              <TouchableOpacity
                onPress={showDatePicker}
                className="flex-row items-center "
              >
                <Text className="relative">
                  {selectedDate
                    ? selectedDate.toLocaleDateString("vi-VN", {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                      })
                    : "Chọn ngày"}
                </Text>
                <MaterialIcons
                  style={{ position: "absolute", right: -100 }}
                  name="keyboard-arrow-down"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-row border-b p-4 border-b-zinc-300 items-center">
            <AntDesign name="clockcircleo" size={24} color="black" />
            <View className="flex-row justify-around  items-center w-9/12">
              <Text className="mr-14">Giờ đến :</Text>
              <TouchableOpacity className="flex-row items-center ">
                <Text className="relative">{currentTime}</Text>
                <MaterialIcons
                  style={{ position: "absolute", right: -100 }}
                  name="keyboard-arrow-down"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{ backgroundColor: "#EAEAEA", height: 10, width: "100%" }}
        ></View>
        {/* THONG TIN KHACH HANG  */}
        <View style={{ margin: 15 }}>
          <Text className="font-medium text-lg py-2">Thông tin khách hàng</Text>
          <View className="flex-row p-5  items-center">
            <View className="flex-row items-center w-2/4 justify-start">
              <FontAwesome5 name="user-circle" size={24} color="black" />
              <Text className="ml-4">Tên liên lạc</Text>
            </View>
            <Text className="w-2/4">Nguyễn Hoàng Khoa</Text>
          </View>
          <View className="flex-row p-5  items-center">
            <View className="flex-row items-center w-2/4 justify-start">
              <Feather name="phone" size={24} color="black" />

              <Text className="ml-4">Số điện thoại</Text>
            </View>
            <Text className="w-2/4">0123456789</Text>
          </View>
          <View className="flex-row p-5  items-center">
            <View className="flex-row items-center w-2/4 justify-start">
              <FontAwesome name="envelope" size={24} color="black" />
              <Text className="ml-4">Email</Text>
            </View>
            <Text className="w-2/4">khoahoang151@gmail.com</Text>
          </View>
        </View>
        <View
          style={{ backgroundColor: "#EAEAEA", height: 10, width: "100%" }}
        ></View>

        {/* GHI CHU  */}
        <View style={{ margin: 15, height: 80 }}>
          <View className="flex-row p-5  items-center">
            <View className="flex-row w-2/5 h-14 justify-around items-center ">
              <Foundation name="clipboard-notes" size={24} color="black" />
              <Text className="mr-14">Ghi chú</Text>
            </View>
            <View className="w-3/5 h-14">
              <TextInput
                placeholder="nhập ghi chú"
                className="ml-2 p-2 flex-1 rounded-xl border border-slate-200"
                keyboardType="default"
              />
            </View>
          </View>
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </ScrollView>
      <View style={styles.popupContainer}>
        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => {
            navigation.navigate("Order");
          }}
        >
          <Text style={styles.applyButtonText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    // margin: 15,
    // backgroundColor: "#FFFFFF",
    // height: 1000,
    flex: 1,

    backgroundColor: "#fff",
  },
  applyButton: {
    backgroundColor: "red",
    width: "90%",
    marginTop: 20,
    padding: 17,
    borderRadius: 5,
  },
  applyButtonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  popupContainer: {
    backgroundColor: "white",
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    width: "100%",
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
});
