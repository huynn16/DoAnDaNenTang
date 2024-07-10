import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useContext, useState, useCallback } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserType } from "../UserContext";

const Address = () => {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const { userId, setUserId } = useContext(UserType);
  useEffect(() => {
    fetchAddresses();
  }, []);
  const deleteAddress = async (id) => {
    Alert.alert("Xóa địa chỉ", "Bạn có chắc chắn muốn xóa địa chỉ này không?", [
      {
        text: "Hủy",
        style: "cancel",
      },
      {
        text: "Xóa",
        onPress: async () => {
          try {
            const response = await axios.delete(
              `http://10.0.2.2:8000/addresses/${userId}/${id}`
            );
            if (response.status !== 200) {
              throw new Error("API returned an error");
            }

            // Xóa địa chỉ khỏi database
            setAddresses((prevAddresses) =>
              prevAddresses.filter((address) => address._id !== id)
            );
          } catch (error) {
            console.log("error", error);
          }
        },
      },
    ]);
  };
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

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 7,
            }}
          >
            <View style={{ alignItems: "center", flex: 1 }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Sửa địa chỉ nhận hàng", {
                    addressId: item._id,
                  })
                }
                style={{
                  backgroundColor: "#FFC72C",
                  paddingHorizontal: 50,
                  paddingVertical: 15,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 10,
                }}
              >
                <Text style={{ color: "white" }}>Sửa</Text>
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center", flex: 1 }}>
              <TouchableOpacity
                onPress={() => deleteAddress(item._id)}
                style={{
                  backgroundColor: "#E31837",
                  paddingHorizontal: 50,
                  paddingVertical: 15,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 10,
                }}
              >
                <Text style={{ color: "white" }}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default Address;

const styles = StyleSheet.create({});
