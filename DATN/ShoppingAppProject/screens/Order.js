import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Order = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://anhdephd.vn/wp-content/uploads/2022/05/hinh-gif-cam-on-de-thuong.gif" }}
        style={{ width: 180, height: 180, resizeMode: "contain" }}
      />
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Đơn hàng đã được tạo thành công!
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Main")}
      >
        <Text style={styles.buttonText}>Quay lại trang chủ</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  button: {
    marginTop: 20,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
  },
  buttonText: {
    color: "#000",
    marginHorizontal: 12,
  },
});
