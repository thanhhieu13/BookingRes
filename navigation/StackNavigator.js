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
import ResList from "../screens/ResList";
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

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="home" size={24} color="#008E97" />
              ) : (
                <AntDesign name="home" size={24} color="black" />
              ),
          }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={({ navigation }) => ({
           
            headerStyle: { backgroundColor: "red" },
            title: "Tìm kiếm",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <FontAwesome name="search" size={24} color="#008E97" />
              ) : (
                <FontAwesome name="search" size={24} color="black" />
              ),
            headerTitleAlign: "center",
            headerTitle: () => (
              <View style={{}}>
                <View
                  style={{
                    borderRadius: 100,
                    color: "#008E97",
                    alignItems: "center",
                    justifyContent: "space-around",
                    padding: 10,
                    flexDirection: "row",
                    // flex: 1,
                  }}
                >

                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={30} color="white" />
                  </TouchableOpacity>
                  <Icon.Search
                    style={{
                      position: "absolute",
                      left: 60,
                      zIndex: 2,
                    }}
                    height="20"
                    width="20"
                    stroke="gray"
                  />
                  <TextInput
                    placeholder="Tìm kiếm"
                    style={{
                      zIndex: 1,
                      position: "relative",
                      borderRadius: 100,
                      backgroundColor: "white",
                      width: 320,
                      height: 35,
                      paddingLeft: 40,
                      marginLeft: 30,
                    }}
                    // className="text-red-500"
                    keyboardType="default"
                  />
                </View>
              </View>
            ),
          })}
        />
        <Tab.Screen
          name="Map"
          component={Map}
          options={{
            tabBarLabel: "Map",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="map" size={24} color="#008E97" />
              ) : (
                <Entypo name="map" size={24} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="ResList"
          component={AccountScreen}
          options={{
            title: "Tài khoản",
            headerStyle: { backgroundColor: "red" },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
        
            tabBarLabel: "Tài khoản",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: true,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialCommunityIcons name="account" size={24} color="#008E97" />
              ) : (
                <MaterialCommunityIcons name="account" size={24} color="black" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }

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
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Restaurant"
          component={RestaurantDetail}
          options={{ headerShown: false }}
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
