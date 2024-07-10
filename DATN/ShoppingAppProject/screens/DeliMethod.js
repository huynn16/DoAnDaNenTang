import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DeliMethod = ({ navigation, style }) => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const selectMethod = async (method) => {
    try {
      await AsyncStorage.setItem("selectedDeliMethod", method);
      setSelectedMethod(method);
      navigation.navigate("Thanh toán");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ ...style, backgroundColor: "white", flex: 1, padding: 10 }}>
      <TouchableOpacity
        onPress={() => selectMethod("Hỏa tốc (phí +100000đ)")}
        style={{ padding: 10, borderRadius: 20, marginBottom: 10, borderWidth: 1 }}
      >
        <Text style={{ padding: 10, fontSize: 18 }}>Hỏa tốc (phí +100000đ)</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => selectMethod("Giao hàng nhanh (phí + 50000đ)")}
        style={{ padding: 10, borderRadius: 20, marginBottom: 10, borderWidth: 1 }}
      >
        <Text style={{ padding: 10, fontSize: 18 }}>Giao hàng nhanh (phí + 50000đ)</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => selectMethod("Giao hàng tiết kiệm (phí + 30000đ)")}
        style={{ padding: 10, borderRadius: 20, marginBottom: 10, borderWidth: 1 }}
      >
        <Text style={{ padding: 10, fontSize: 18 }}>Giao hàng tiết kiệm (phí + 30000đ)</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DeliMethod;
