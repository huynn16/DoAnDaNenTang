import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../UserContext";
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const role = await AsyncStorage.getItem("role"); // Lấy vai trò từ AsyncStorage
        console.log('Stored role:', role);
        if (token) {
          if (role === 'admin') {
            navigation.replace("AdminScreen"); // Chuyển hướng đến màn hình quản trị viên
          } else {
            navigation.replace("Main"); // Chuyển hướng đến màn hình người dùng
          }
        }
      } catch (err) {
        console.log("Lỗi!", err);
      }
    };
    checkLoginStatus();
  }, []);
  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios
      .post("http://10.0.2.2:8000/login", user)
      .then(async (response) => {
        console.log(response);
        const token = response.data.token;
        const role = response.data.role;
        await AsyncStorage.setItem("authToken", token);
        await AsyncStorage.setItem("role", role);
        const userId = response.data.userId; // Giả sử rằng máy chủ trả về ID của người dùng
        dispatch({ type: "SET_CURRENT_USER", payload: userId }); // Gửi hành động SET_CURRENT_USER với payload là ID của người dùng
        setUserId(userId); // Cập nhật userId trong context
        await fetchUserProfile(); // Tải hồ sơ người dùng và danh sách yêu thích
        if (role === 'admin') {
          navigation.replace("AdminScreen"); // Nếu người dùng là admin, chuyển hướng đến màn hình quản trị viên
        } else {
          navigation.replace("Main"); // Nếu không, chuyển hướng đến màn hình người dùng
        }
      })
      .catch((error) => {
        Alert.alert(
          "Đăng nhập không thành công",
          "Sai tài khoản hoặc mật khẩu"
        );
        console.log(error);
      });
  };
  const { userId, setUserId } = useContext(UserType);
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:8000/profile/${userId}`
      );
      const { user } = response.data;
      setUserId(user);

      // Tải danh sách yêu thích từ AsyncStorage
      const favorites = await AsyncStorage.getItem("favorites");
      if (favorites) {
        dispatch({
          type: SET_FAVORITES,
          payload: JSON.parse(favorites),
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
      }}
    >
      <ScrollView>
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 80,
          }}
        >
          <Image
            style={{ width: 120, height: 120 }}
            source={require("../assets/logo.png")}
          />
        </View>

        <KeyboardAvoidingView>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                marginTop: 20,
                color: "#041E42",
              }}
            >
              Đăng nhập vào tài khoản của bạn
            </Text>
          </View>

          <View style={{ marginTop: 68 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#D0D0D0",
                paddingVertical: 5,
                borderRadius: 20,
                marginTop: 30,
              }}
            >
              <Ionicons
                style={{ marginLeft: 12 }}
                name="ios-mail"
                size={24}
                color="#7D7C7C"
              />

              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={{
                  color: "gray",
                  marginLeft: 10,
                  marginVertical: 10,
                  width: 300,
                  fontSize: email ? 16 : 16,
                }}
                placeholder="Nhập Email"
              />
            </View>
          </View>

          <View style={{ marginTop: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#D0D0D0",
                paddingVertical: 5,
                borderRadius: 20,
                marginTop: 30,
              }}
            >
              <Ionicons
                style={{ marginLeft: 12 }}
                name="md-lock-closed"
                size={24}
                color="#7D7C7C"
              />

              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                style={{
                  marginLeft: 10,
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: password ? 16 : 16,
                }}
                placeholder="Nhập mật khẩu"
              />
            </View>
          </View>

          <View style={{ marginTop: 80 }} />

          <TouchableOpacity
            onPress={handleLogin}
            style={{
              width: 200,
              backgroundColor: "#1C35AD",
              borderRadius: 10,
              marginLeft: "auto",
              marginRight: "auto",
              padding: 15,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Đăng nhập
            </Text>
          </TouchableOpacity>

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text
              style={{
                marginTop: 15,
                textAlign: "center",
                color: "gray",
                fontSize: 16,
              }}
            >
              Chưa có tài khoản?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Register")}
              style={{ marginTop: 15 }}
            >
              <Text
                style={{
                  marginLeft: 4,
                  textAlign: "center",
                  color: "#1C35AD",
                  fontSize: 16,
                }}
              >
                Đăng ký ngay
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
