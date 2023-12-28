import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/Home";
import RestaurantDetail from "../screens/RestaurantDetail";
import Map from "../screens/Map";
import Account from "../screens/Account";
import MapPrepare from "../screens/MapPrepare";
import EditAccount from "../screens/EditAccount";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import OnboardingScreen from "../screens/OnboardingScreen";
import CityScreen from "../screens/CityScreen";
import NotificationScreen from "../screens/NotificationScreen";
import SearchScreen from "../screens/SearchScreen";
import * as Icon from "react-native-feather";
import OrderScreen from "../screens/OrderScreen";
import AccountScreen from "../screens/Account";
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ResultScreen from "../screens/ResultScreen";
import BottomTabNavigator from './bottomTabNavigator';
import AdminTabNavigator from './adminTabNavigator';
import BookingHours from "../screens/BookingHours";
import Success from "../screens/Success";
import Privacy from "../screens/Privacy";
import HistoryOrder from "../screens/HistoryOrder";


const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Privacy"
          component={Privacy}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HistoryOrder"
          component={HistoryOrder}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="City"
          component={CityScreen}
          options={{
            title: "Chọn tỉnh/thành",
            headerStyle: { backgroundColor: "red" },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            title: "Ưu đãi",
            headerStyle: { backgroundColor: "red" },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{
            title: "Kết quả: Nướng(338)",
            headerStyle: { backgroundColor: "red" },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="Order"
          component={OrderScreen}
          options={{
            title: "Thông tin giao dịch",
            headerStyle: { backgroundColor: "red" },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="BookingHours"
          component={BookingHours}
          options={{
            title: "Thông tin giao dịch",
            headerStyle: { backgroundColor: "red" },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="OrderSuccess"
          component={Success}
          options={{
            title: "order tình trạng",
            headerStyle: { backgroundColor: "red" },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Admin"
          component={AdminTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Restaurant"
          component={RestaurantDetail}
          options={{ 
          
            headerShown: true, 
            headerTitleAlign : 'center',
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="Map"
          component={Map}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditAccount"
          component={EditAccount}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
