import React, { useEffect, useState, useContext, useCallback } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import axios from "axios";
import { UserType } from "../UserContext";
import { useNavigation } from "@react-navigation/native";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const { userId } = useContext(UserType);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://10.0.2.2:8000/orders/${userId}`);
      setOrders(response.data.orders);
    } catch (error) {}
    setIsLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={{ flex: 1, paddingHorizontal: 14, backgroundColor: "#fff" }}
      >
        {isLoading ? (
          <Text>Đang tải...</Text>
        ) : orders.length === 0 ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text
              style={{
                paddingTop: 300,
                fontSize: 20,
              }}
            >
              Bạn chưa có đơn hàng nào!
            </Text>
          </View>
        ) : (
          orders.map((order, index) => (
            <TouchableOpacity
              key={index}
              style={{
                borderWidth: 1,
                borderColor: "#000",
                borderRadius: 10,
                padding: 14,
                marginVertical: 10,
              }}
              onPress={() =>
                navigation.navigate("Chi tiết đơn hàng", { order })
              }
            >
              <Text style={{ marginBottom: 6 }}>
                Mã vận đơn:{" "}
                <Text style={{ fontWeight: "bold" }}>{order._id}</Text>
              </Text>
              <Text style={{ marginBottom: 6 }}>
                Số điện thoại:{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {order.DeliAddress.mobileNo}
                </Text>
              </Text>
              <Text style={{ marginBottom: 6 }}>
                Tổng thanh toán:{" "}
                <Text style={{ fontWeight: "bold" }}>{order.total}đ</Text>
              </Text>
              <Text style={{ marginBottom: 6 }}>
                Địa chỉ giao hàng:{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {order.DeliAddress.houseNo}, {order.DeliAddress.street}
                </Text>
              </Text>
              <View
                style={{
                  height: 1,
                  backgroundColor: "#000",
                  marginVertical: 10,
                }}
              />
              <Text style={{ fontWeight: "bold", margin: 10 }}>
                Nội dung hàng{" "}
              </Text>
              {order.products.map((product, productIndex) => (
                <View
                  key={productIndex}
                  style={{
                    padding: 6,
                    marginBottom: 8,
                    borderColor: "#F0F0F0",
                    borderWidth: 1,
                    borderRadius: 12,
                  }}
                >
                  <Text style={{ marginBottom: 6 }}>
                    Tên sản phẩm:{" "}
                    <Text style={{ fontWeight: "bold" }}>{product.name}</Text>
                  </Text>
                  <Text style={{ marginBottom: 6 }}>
                    Giá:{" "}
                    <Text style={{ fontWeight: "bold" }}>{product.price}đ</Text>
                  </Text>
                  <Text style={{ marginBottom: 6 }}>
                    Số lượng:{" "}
                    <Text style={{ fontWeight: "bold" }}>
                      {product.quantity}
                    </Text>
                  </Text>
                </View>
              ))}
              <View
                style={{
                  height: 1,
                  backgroundColor: "#000",
                  marginVertical: 10,
                }}
              />
              <Text>Phương thức giao hàng: {order.DeliMethod}</Text>
              <Text>Phương thức thanh toán: {order.paymentMethod}</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default MyOrders;
