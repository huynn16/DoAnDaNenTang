import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserType } from "../UserContext";
import { Alert } from "react-native";

const Profile = () => {
  const { userId, setUserId } = useContext(UserType);
  const navigation = useNavigation();
  const logout = () => {
    Alert.alert(
      "Bạn có chắc muốn đăng xuất?",
      "",
      [
        {
          text: "Không",
          style: "cancel",
        },
        {
          text: "Có",
          onPress: async () => {
            await clearAuthToken();
          },
        },
      ],
      { cancelable: false }
    );
  };
  const clearAuthToken = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("selectedAddress");
      await AsyncStorage.removeItem("selectedDeliMethod");
      await AsyncStorage.removeItem("selectedPaymentMethod");
      console.log("Xóa token thành công");
    } catch (err) {
      console.log("Lỗi xóa token", err);
    }
    navigation.replace("Login");
  };

  const [user, setUser] = useState();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://10.0.2.2:8000/profile/${userId}`
        );
        const { user } = response.data;
        setUser(user);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ScrollView>
        <View
          style={{
            borderWidth: 0.5,
            backgroundColor: "#D3D3D3",
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Ionicons name="md-person-circle-outline" size={80} color="white" />
          <Text>Xin chào {user?.name}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Đơn hàng của tôi")}
          style={{
            backgroundColor: "white",
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 0.5,
            borderStyle: "solid",
            borderRadius: 15,
            margin: 10,
          }}
        >
          <Feather
            style={{ paddingLeft: 10 }}
            name="shopping-bag"
            size={30}
            color="black"
          />
          <Text style={{ padding: 10, alignItems: "center" }}>
            Đơn hàng của tôi
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Địa chỉ nhận hàng")}
          style={{
            backgroundColor: "white",
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 0.5,
            borderStyle: "solid",
            borderRadius: 15,
            margin: 10,
          }}
        >
          <Ionicons
            style={{ paddingLeft: 10 }}
            name="location-outline"
            size={30}
            color="black"
          />
          <Text style={{ padding: 10, alignItems: "center" }}>
            Địa chỉ nhận hàng
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Sản phẩm của tôi")}
          style={{
            backgroundColor: "white",
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 0.5,
            borderStyle: "solid",
            borderRadius: 15,
            margin: 10,
          }}
        >
          <SimpleLineIcons
            style={{ paddingLeft: 10 }}
            name="note"
            size={30}
            color="black"
          />
          <Text style={{ padding: 10, alignItems: "center" }}>
            Sản phẩm của tôi
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Sản phẩm đã thích")}
          style={{
            backgroundColor: "white",
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 0.5,
            borderStyle: "solid",
            borderRadius: 15,
            margin: 10,
          }}
        >
          <AntDesign
            style={{ paddingLeft: 10 }}
            name="hearto"
            size={30}
            color="black"
          />
          <Text style={{ padding: 10, alignItems: "center" }}>
            Sản phẩm đã thích
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 200,
          }}
        >
          <TouchableOpacity
            onPress={logout}
            style={{
              backgroundColor: "#E31837",
              padding: 10,
              borderRadius: 10,
              borderWidth: 0.5,
              borderStyle: "solid",
              width: 200,
              height: 50,
              justifyContent: "center",
            }}
          >
            <Text style={{ textAlign: "center", color: "white" }}>
              Đăng xuất
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
