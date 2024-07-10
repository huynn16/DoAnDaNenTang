import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { UserType } from "../UserContext";
import axios from "axios";

const AddAddress = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const { userId, setUserId } = useContext(UserType);
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);
  console.log(userId);
  const handleAddress = () => {
    const address = {
      name,
      mobileNo,
      houseNo,
      street,
    };

    axios
      .post("http://10.0.2.2:8000/addresses", { userId, address })
      .then((response) => {
        Alert.alert("Thêm địa chỉ mới thành công!");
        setName("");
        setMobileNo("");
        setHouseNo("");
        setStreet("");

        setTimeout(() => {
          navigation.goBack();
        }, 500);
      })
      .catch((error) => {
        Alert.alert("Lỗi khi thêm địa chỉ mới!");
        console.log("Lỗi!", error);
      });
  };

  return (
    <ScrollView style={{ padding: 10, backgroundColor: "#FFFFFF" }}>
      <View>
        <Text style={{ padding: 5, marginTop: 5 }}>Họ và tên</Text>
        <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
          style={{
            padding: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 5,
            borderRadius: 10,
          }}
          placeholder="Nhập họ và tên"
        />
        <Text style={{ padding: 5, marginTop: 10 }}>Số điện thoại</Text>
        <TextInput
          value={mobileNo}
          onChangeText={(text) => setMobileNo(text)}
          style={{
            padding: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 5,
            borderRadius: 10,
          }}
          placeholder="Nhập số điện thoại"
        />
        <Text style={{ padding: 5, marginTop: 10 }}>Địa chỉ</Text>
        <TextInput
          value={street}
          onChangeText={(text) => setStreet(text)}
          style={{
            padding: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 5,
            borderRadius: 10,
          }}
          placeholder="Tỉnh/Thành phố, Quận/Huyện, Phường/Xã"
        />
        <Text style={{ padding: 5, marginTop: 10 }}>Địa chỉ chi tiết</Text>
        <TextInput
          value={houseNo}
          onChangeText={(text) => setHouseNo(text)}
          style={{
            padding: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 5,
            borderRadius: 10,
          }}
          placeholder="Tên đường, Tòa nhà, Số nhà"
        />
      </View>
      <TouchableOpacity
        onPress={handleAddress}
        style={{
          backgroundColor: "#1C35AD",
          padding: 15,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <Text style={{ fontWeight: "bold", color: "white", fontSize: 18 }}>
          Hoàn thành
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddAddress;

const styles = StyleSheet.create({});
