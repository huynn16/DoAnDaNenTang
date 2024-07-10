import { Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

const OrderInfo = () => {
  const route = useRoute();
  const order = route.params.order;

  return (
    <ScrollView style={{ flex: 1, padding: 14, backgroundColor: "#fff" }}>
      <Text style={{ marginBottom: 6 }}>
        Mã vận đơn: <Text style={{ fontWeight: "bold" }}>{order._id}</Text>
      </Text>
      <Text style={{ marginBottom: 6 }}>
        Số điện thoại:{" "}
        <Text style={{ fontWeight: "bold" }}>{order.DeliAddress.mobileNo}</Text>
      </Text>
      <Text style={{ marginBottom: 6 }}>
        Địa chỉ giao hàng:{" "}
        <Text style={{ fontWeight: "bold" }}>
          {order.DeliAddress.houseNo}, {order.DeliAddress.street}
        </Text>
      </Text>
      <View
        style={{ height: 1, backgroundColor: "#000", marginVertical: 10 }}
      />
      <Text style={{ margin: 10, fontWeight: "bold", fontSize: 16 }}>Nội dung hàng </Text>
      {order.products.map((product, productIndex) => (
        <View
          key={productIndex}
          style={{
            flexDirection: "row",
            marginBottom: 10,
            borderColor: "#F0F0F0",
            borderWidth: 3,
            borderRadius: 15,
          }}
        >
          <Image
            source={{ uri: product.image }}
            style={{ width: 120, height: 120, margin: 12 }}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={{ padding: 10 }}>{product.name}</Text>

            <Text style={{ padding: 10 }}>Giá: {product.price}đ</Text>

            <Text style={{ padding: 10 }}>x {product.quantity}</Text>
          </View>
        </View>
      ))}
      <Text style={{ marginBottom: 6, fontSize: 18 }}>
        Thành tiền:{" "}
        <Text style={{ fontWeight: "bold" }}>{order.total}đ</Text>
      </Text>
      <View
        style={{ height: 1, backgroundColor: "#000", marginVertical: 10 }}
      />
      <Text>Thời gian đặt hàng: {order.createdAt}</Text>
      <Text>Phương thức giao hàng: {order.DeliMethod}</Text>
      <Text>Phương thức thanh toán: {order.paymentMethod}</Text>
    </ScrollView>
  );
};

export default OrderInfo;
