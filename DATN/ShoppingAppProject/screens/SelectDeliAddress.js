import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useContext, useState, useCallback } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SelectDeliAddress = () => {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const { userId, setUserId } = useContext(UserType);
  const selectAddress = async (address) => {
    try {
      await AsyncStorage.setItem("selectedAddress", JSON.stringify(address));
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };
  console.log("userId", userId);
  useEffect(() => {
    fetchAddresses();
  }, []);
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:8000/addresses/${userId}`
      );
      const { addresses } = response.data;

      setAddresses(addresses);
    } catch (error) {
      console.log("error", error);
    }
  };
  // Làm mới lại địa chỉ khi cập nhật thêm địa chỉ mới
  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, [])
  );
  console.log("addresses", addresses);
  
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={{ paddingTop: 15 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Thêm địa chỉ nhận hàng")}
          style={{
            padding: 10,
            marginHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderWidth: 1,
            borderRadius: 15,
          }}
        >
          <Text>Thêm địa chỉ nhận hàng mới</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={{ padding: 15, fontSize: 20, fontWeight: "bold" }}>
        Địa chỉ của tôi
      </Text>
      {addresses?.map((item) => (
        <View
          key={item._id}
          style={{
            borderWidth: 1,
            borderColor: "#D0D0D0",
            padding: 20,
            gap: 5,
            marginVertical: 10,
            marginHorizontal: 10,
            borderRadius: 20,
          }}
        >
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>{item?.name}</Text>

          <Text style={{ fontSize: 25, fontWeight: "bold" }}>
            {item?.mobileNo}
          </Text>

          <Text style={{ fontSize: 20 }}>{item?.houseNo}</Text>

          <Text style={{ fontSize: 20 }}>{item?.street}</Text>

          <View style={{ alignItems: "center", marginTop: 7 }}>
            <TouchableOpacity
              onPress={() => selectAddress(item)}
              style={{
                backgroundColor: "#1C35AD",
                paddingHorizontal: 100,
                paddingVertical: 15,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <Text style={{ color: "white" }}>Chọn</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default SelectDeliAddress;

const styles = StyleSheet.create({});
