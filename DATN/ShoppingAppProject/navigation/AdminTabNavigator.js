import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import {
  Entypo,
  AntDesign,
  Ionicons,
  FontAwesome,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AdminScreen from "../screens/admin/AdminScreen";
import AdminSettingScreen from "../screens/admin/AdminSettingScreen";
import Chat from "../screens/message/Chat";

const Tab = createBottomTabNavigator();

const AdminTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Trang chủ"
        component={AdminScreen}
        options={{
          tabBarLabel: "",
          tabBarLabelStyle: { color: "#1C35AD" },
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                marginTop: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {focused ? (
                <Entypo name="home" size={30} color="#1C35AD" />
              ) : (
                <AntDesign name="home" size={30} color="black" />
              )}
            </View>
          ),
        }}
      />
      
      <Tab.Screen
        name="Tin nhắn"
        component={Chat}
        options={{
          tabBarLabel: "",
          tabBarLabelStyle: { color: "#1C35AD" },
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                marginTop: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {focused ? (
                <Ionicons
                  style={{ marginTop: 2 }}
                  name="chatbubbles"
                  size={30}
                  color="#1C35AD"
                />
              ) : (
                <Ionicons
                  style={{ marginTop: 2 }}
                  name="chatbubbles-outline"
                  size={30}
                  color="black"
                />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Cài đặt"
        component={AdminSettingScreen}
        options={{
          tabBarLabel: "",
          tabBarLabelStyle: { color: "#1C35AD" },
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                marginTop: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {focused ? (
                <Ionicons name="settings" size={30} color="#1C35AD" />
              ) : (
                <AntDesign name="setting" size={30} color="black" />
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AdminTabNavigator;