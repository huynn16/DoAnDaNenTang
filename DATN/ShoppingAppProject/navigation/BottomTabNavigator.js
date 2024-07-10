import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Entypo,
  AntDesign,
  Ionicons,
  FontAwesome,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Home from "../screens/Home";
import PostProduct from "../screens/PostProduct";
import Profile from "../screens/Profile";
import { UserType } from "../UserContext";
import { useSelector } from "react-redux";
import Chat from "../screens/message/Chat";
import ChatbotAI from "../screens/ChatbotAI";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { userId, setUserId } = useContext(UserType);
  const cart = useSelector((state) => state.cart.cart[userId]);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "",
          tabBarLabelStyle: { color: "#1C35AD" },
          headerShown: false,
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
        name="Chat bot AI"
        component={ChatbotAI}
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
                  name="logo-snapchat"
                  size={30}
                  color="#1C35AD"
                />
              ) : (
                <MaterialCommunityIcons
                  style={{ marginTop: 2 }}
                  name="snapchat"
                  size={30}
                  color="black"
                />
              )}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Đăng bán sản phẩm"
        component={PostProduct}
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
                <FontAwesome
                  style={{ marginTop: 4 }}
                  name="cloud-upload"
                  size={30}
                  color="#1C35AD"
                />
              ) : (
                <Feather
                  style={{ marginTop: 2 }}
                  name="upload-cloud"
                  size={30}
                  color="black"
                />
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
        name="Tài khoản"
        component={Profile}
        options={({ navigation }) => ({
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
                <Ionicons name="person" size={30} color="#1C35AD" />
              ) : (
                <Ionicons name="person-outline" size={30} color="black" />
              )}
            </View>
          ),
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity
              style={{
                paddingRight: 20,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
              onPress={() => navigation.navigate("Giỏ hàng")}
            >
              <Feather name="shopping-cart" size={30} color="#1C35AD" />
              {cart && cart.length > 0 && (
                <View
                  style={{
                    position: "absolute",
                    height: 20,
                    width: 20,
                    borderRadius: 15,
                    backgroundColor: "red",
                    right: 15,
                    top: -5,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    {cart.length}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
