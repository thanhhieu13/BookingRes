import { View, TextInput, TouchableOpacity, Text } from "react-native";
import React from "react";
import HomeScreen from "../screens/Home";
import Statistical from "../screens/admin/Statistical";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import SearchScreen from "../screens/SearchScreen";
import * as Icon from "react-native-feather";

import AccountScreen from "../screens/Account";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeAdmin from "../screens/admin/HomeAdmin";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Customers from "../screens/admin/Customers";
import { useNavigation } from "@react-navigation/native";
import Orders from "../screens/admin/Orders";
import DetailOrders from "../screens/admin/DetailOrders";
const Drawer = createDrawerNavigator();

const AdminTabNavigator = () => {
  const navigation = useNavigation();

  return (

      <Drawer.Navigator screenOptions={{ headerShown: true }}>
        <Drawer.Screen
          name="Dashboard"
          component={HomeAdmin}
          options={{
            headerTitleAlign: "center",
            drawerIcon: ({ color, size }) => (
              <AntDesign name="home" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Customers"
          component={Customers}
          options={{
            headerTitleAlign: "center",
            drawerIcon: ({ color, size }) => (
              <AntDesign name="home" size={size} color={color} />
            ),
            headerLeft: ({ onPress, tintColor }) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Dashboard");
                }}
              >
                <View
                  style={{
                    marginLeft: 5,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="chevron-back" size={35} color="#037AFF" />
                  <Text
                    style={{
                      color: "#58A7FF",
                      fontSize: 17,
                      fontWeight: "bold",
                    }}
                  >
                    Home
                  </Text>
                </View>
              </TouchableOpacity>
            ),
            // Thêm dòng này nếu bạn muốn hiển thị tiêu đề "Home"
          }}
        />
        <Drawer.Screen
          name="Orders"
          component={Orders}
          options={{
            headerTitleAlign: "center",
            drawerIcon: ({ color, size }) => (
              <AntDesign name="home" size={size} color={color} />
            ),
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: "#1C212D" },
            headerLeft: ({ onPress, tintColor }) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Dashboard");
                }}
              >
                <View
                  style={{
                    marginLeft: 5,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="chevron-back" size={35} color="#34DBA1" />
                  {/* #037AFF */}
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 17,
                      fontWeight: "bold",
                    }}
                  >
                    {/* #58A7FF */}
                    Home
                  </Text>
                </View>
              </TouchableOpacity>
            ),
            // Thêm dòng này nếu bạn muốn hiển thị tiêu đề "Home"
          }}
        />
        <Drawer.Screen
          name="DetailOrders"
          component={DetailOrders}
          options={{
            headerTitleAlign: "center",
            drawerIcon: ({ color, size }) => (
              <AntDesign name="home" size={size} color={color} />
            ),
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: "#1C212D" },
            headerLeft: ({ onPress, tintColor }) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Orders");
                }}
              >
                <View
                  style={{
                    marginLeft: 5,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="chevron-back" size={35} color="#34DBA1" />
                  {/* #037AFF */}
                </View>
              </TouchableOpacity>
            ),
            // Thêm dòng này nếu bạn muốn hiển thị tiêu đề "Home"
          }}
        />
      </Drawer.Navigator>

  );
};

export default AdminTabNavigator;
