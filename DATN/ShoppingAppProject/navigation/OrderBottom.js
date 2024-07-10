import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { cleanCart } from "../redux/CartActions";
import { UserType } from "../UserContext";
import jwt_decode from "jwt-decode";

const OrderBottom = ({
  selectedAddress,
  selectedMethod,
  selectedPaymentMethod,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [deliveryFee, setDeliveryFee] = useState(0);
  const { userId, setUserId } = useContext(UserType);
  const cart = useSelector((state) => state.cart.cart[userId]);
  const subtotal = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  const tax = subtotal * 0.01;
  const total = subtotal + tax + deliveryFee;

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      console.log("Token:", token);
      if (token) {
        const decodedToken = jwt_decode(token);
        console.log("Decoded Token:", decodedToken);
        const userId = decodedToken.userId;
        setUserId(userId);
      } else {
        console.log("Token không tồn tại!");
      }
    };

    fetchUser();
  }, []);

  const handleOrder = async () => {
    try {
      const orderData = {
        userId: userId,
        cartItems: cart,
        total: total,
        DeliAddress: selectedAddress,
        DeliMethod: selectedMethod,
        paymentMethod: selectedPaymentMethod,
      };
      const response = await axios.post(
        "http://10.0.2.2:8000/orders",
        orderData
      );
      if (response.status === 200) {
        navigation.navigate("Order");
        dispatch(cleanCart(userId));

        // Tăng số lượng mua của mỗi sản phẩm trong giỏ hàng
        for (const item of cart) {
          await axios.put(
            `http://10.0.2.2:8000/products/${item._id}/purchase`,
            { quantity: item.quantity }
          );
        }

        console.log("Tạo đơn hàng thành công!", response.data);
      } else {
        console.log("Tạo đơn hàng thất bại!", response.data);
      }
    } catch (error) {
      console.log("Lỗi!", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const getDeliveryMethod = async () => {
        try {
          const method = await AsyncStorage.getItem("selectedDeliMethod");
          updateDeliveryFee(method);
        } catch (error) {
          console.log(error);
        }
      };

      getDeliveryMethod();
    }, [])
  );

  const updateDeliveryFee = (method) => {
    if (method.includes("Hỏa tốc")) {
      setDeliveryFee(100000);
    } else if (method.includes("Giao hàng nhanh")) {
      setDeliveryFee(50000);
    } else if (method.includes("Giao hàng tiết kiệm")) {
      setDeliveryFee(30000);
    }
  };

  return (
    <View style={{ borderWidth: 0 }}>
      <View
        style={{
          backgroundColor: "white",
          borderColor: "#D0D0D0",
          borderWidth: 1,
        }}
      >
        <View
          style={{
            padding: 10,
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Text>Tổng tiền hàng: {subtotal}đ</Text>
          <Text>Thuế (1%): {tax}đ</Text>
          <Text>Phí vận chuyển: {deliveryFee}đ</Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Tổng thanh toán: {subtotal + tax + deliveryFee}đ
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleOrder}
          style={{
            backgroundColor: "#C70039",
            padding: 10,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 30,
            marginVertical: 20,
          }}
        >
          <Text style={{ color: "white" }}>Đặt hàng ({cart.length})</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderBottom;
