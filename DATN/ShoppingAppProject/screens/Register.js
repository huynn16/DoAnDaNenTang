import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigation();

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };

    axios
      .post("http://10.0.2.2:8000/register", user)
      .then(async (response) => {
        console.log(response);
        Alert.alert(
          "Đăng ký thành công!",
          "Bạn đã đăng ký tài khoản thành công!"
        );
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        Alert.alert("Lỗi!", "Có lỗi xảy ra khi đăng ký!");
        console.log("Lỗi!", error);
      });
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
                marginTop: 12,
                color: "#041E42",
              }}
            >
              Đăng ký tài khoản mới
            </Text>
          </View>

          <View style={{ marginTop: 70 }}>
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
                name="ios-person-sharp"
                size={24}
                color="#7D7C7C"
              />
              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                style={{
                  marginLeft: 10,
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: name ? 16 : 16,
                }}
                placeholder="Nhập tên của bạn"
              />
            </View>

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
                  marginLeft: 10,
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: password ? 16 : 16,
                }}
                placeholder="Nhập Email"
              />
            </View>
          </View>

          <View>
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
                  fontSize: email ? 16 : 16,
                }}
                placeholder="Nhập mật khẩu"
              />
            </View>
          </View>

          <View style={{ marginTop: 80 }} />

          <TouchableOpacity
            onPress={handleRegister}
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
              Đăng ký
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
              Đã có tài khoản?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
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
                Đăng nhập
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({});
