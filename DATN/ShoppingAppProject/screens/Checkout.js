import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState, useCallback } from "react";
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from "@react-navigation/native";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../redux/CartActions";
import { useDispatch, useSelector } from "react-redux";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import OrderBottom from "../navigation/OrderBottom";

const Checkout = () => {
  const route = useRoute();
  const product = route.params && route.params.product;
  const { userId, setUserId } = useContext(UserType);
  const userCart = useSelector((state) => state.cart.cart[userId]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const increaseQuantity = (item) => {
    dispatch(incrementQuantity({ userId, product: item }));
  };

  const decreaseQuantity = (item) => {
    dispatch(decrementQuantity({ userId, product: item }));
  };

  const deleteItem = (item) => {
    dispatch(removeFromCart({ userId, product: item }));
  };
  const [selectedAddress, setSelectedAddress] = useState("");
  useFocusEffect(
    useCallback(() => {
      const fetchSelectedAddress = async () => {
        try {
          const address = await AsyncStorage.getItem("selectedAddress");
          if (address !== null) {
            setSelectedAddress(JSON.parse(address));
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchSelectedAddress();
    }, [])
  );

  const [selectedMethod, setSelectedMethod] = useState("");
  useFocusEffect(
    useCallback(() => {
      const fetchSelectedMethod = async () => {
        try {
          const method = await AsyncStorage.getItem("selectedDeliMethod");
          if (method !== null) {
            setSelectedMethod(method);
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchSelectedMethod();
    }, [])
  );

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  useFocusEffect(
    useCallback(() => {
      const fetchSelectedMethod = async () => {
        try {
          const paymentmethod = await AsyncStorage.getItem(
            "selectedPaymentMethod"
          );
          if (paymentmethod !== null) {
            setSelectedPaymentMethod(paymentmethod);
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchSelectedMethod();
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={{ flex: 1, marginTop: 10 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Chọn địa chỉ nhận hàng")}
            style={{
              backgroundColor: "white",
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderWidth: 1,
              borderStyle: "solid",
              borderRadius: 15,
              margin: 10,
            }}
          >
            <Text style={{ padding: 10, alignItems: "center" }}>
              Chọn địa chỉ nhận hàng
            </Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#D0D0D0",
              padding: 20,
              gap: 5,
              marginVertical: 5,
              borderRadius: 20,
              marginHorizontal: 20,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 15 }}>Địa chỉ đã chọn</Text>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {selectedAddress?.name}
            </Text>

            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {selectedAddress?.mobileNo}
            </Text>

            <Text style={{ fontSize: 15 }}>{selectedAddress?.houseNo}</Text>

            <Text style={{ fontSize: 15 }}>{selectedAddress?.street}</Text>
          </View>

          <Text style={{ padding: 15, fontSize: 20, fontWeight: "bold" }}>
            Sản phẩm trong giỏ hàng
          </Text>

          {userCart?.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                backgroundColor: "white",
                marginVertical: 5,
                borderColor: "#F0F0F0",
                borderWidth: 3,
                marginHorizontal: 5,
                borderRadius: 15,
              }}
            >
              {/* Container chứa ảnh sản phẩm */}
              <View
                style={{
                  flex: 1,
                  marginLeft: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{
                    width: 120,
                    height: 120,
                    resizeMode: "contain",
                    marginVertical: 5,
                  }}
                  source={{ uri: item?.image }}
                />
              </View>

              {/* Container chứa thông tin sản phẩm và các nút */}
              <View
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  marginLeft: 20,
                  flex: 2,
                  justifyContent: "space-between",
                }}
              >
                {/* Container chứa tên sản phẩm và nút xóa */}
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {item?.name}
                </Text>

                {/* Container chứa giá sản phẩm */}
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                    {item?.price}đ
                  </Text>
                  <TouchableOpacity onPress={() => deleteItem(item)}>
                    <Text
                      style={{
                        color: "red",
                        marginRight: 35,
                      }}
                    >
                      Xóa
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Container chứa số lượng và các nút tăng giảm số lượng */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontSize: 12 }}>Số lượng:</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: 80,
                      marginRight: 10,
                    }}
                  >
                    <TouchableOpacity onPress={() => decreaseQuantity(item)}>
                      <FontAwesome name="minus" size={18} color="black" />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 12 }}>{item?.quantity}</Text>
                    <TouchableOpacity onPress={() => increaseQuantity(item)}>
                      <FontAwesome name="plus" size={18} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}

          <TouchableOpacity
            onPress={() => navigation.navigate("Chọn phương thức vận chuyển")}
            style={{
              backgroundColor: "white",
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderWidth: 1,
              borderStyle: "solid",
              borderRadius: 15,
              margin: 10,
            }}
          >
            <Text style={{ padding: 10, alignItems: "center" }}>
              Chọn phương thức vận chuyển
            </Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderWidth: 1,
              borderColor: "#D0D0D0",
              padding: 20,
              gap: 5,
              marginVertical: 5,
              borderRadius: 20,
              marginHorizontal: 20,
              marginBottom: 10,
            }}
          >
            <Text>{selectedMethod}</Text>
            <Entypo name="check" size={24} color="black" />
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("Chọn phương thức thanh toán")}
            style={{
              backgroundColor: "white",
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderWidth: 1,
              borderStyle: "solid",
              borderRadius: 15,
              margin: 10,
            }}
          >
            <Text style={{ padding: 10, alignItems: "center" }}>
              Chọn phương thức thanh toán
            </Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderWidth: 1,
              borderColor: "#D0D0D0",
              padding: 20,
              gap: 5,
              marginVertical: 5,
              borderRadius: 20,
              marginHorizontal: 20,
              marginBottom: 10,
            }}
          >
            <Text>{selectedPaymentMethod}</Text>
            <Entypo name="check" size={24} color="black" />
          </View>
        </View>
      </ScrollView>
      <OrderBottom
        selectedAddress={selectedAddress}
        selectedMethod={selectedMethod}
        selectedPaymentMethod={selectedPaymentMethod}
      />
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({});
