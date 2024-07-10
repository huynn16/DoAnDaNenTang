import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import React, { useContext } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../redux/CartActions";
import { useNavigation } from "@react-navigation/native";

import { UserType } from "../UserContext";

const Cart = () => {
  const { userId, setUserId } = useContext(UserType);
  const cart = useSelector((state) => state.cart.cart[userId]);
  const subtotal = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert(
        "Giỏ hàng trống",
        "Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán."
      );
    } else {
      navigation.navigate("Thanh toán");
    }
  };
  
  const userCart = useSelector((state) => state.cart.cart[userId]);
  console.log(userCart);
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

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <Text
          style={{
            marginVertical: 10,
            marginHorizontal: 10,
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          Chốt đơn ngay để nhận những ưu đãi hấp dẫn!
        </Text>
        <View
          style={{
            height: 1,
            borderColor: "#D0D0D0",
            borderWidth: 1,
          }}
        />
        <View style={{ marginHorizontal: 10 }}>
          {userCart?.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate("Chi tiết sản phẩm", { item })}
            >
              <View
                style={{
                  backgroundColor: "white",
                  marginVertical: 10,
                  borderColor: "#F0F0F0",
                  borderWidth: 3,
                  marginHorizontal: 5,
                  borderRadius: 15,
                }}
                key={index}
              >
                <View numberOfLines={1} style={{ padding: 10 }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 20,
                      marginLeft: 10,
                      marginTop: 5,
                    }}
                  >
                    {item?.name}
                  </Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View>
                    <Image
                      style={{
                        width: 140,
                        height: 140,
                        resizeMode: "contain",
                        marginLeft: 5,
                      }}
                      source={{ uri: item?.image }}
                    />
                  </View>

                  <View style={{ flexDirection: "column" }}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        marginLeft: 40,
                      }}
                    >
                      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                        {item?.price}đ
                      </Text>
                    </View>
                    <Text style={{ marginLeft: 40 }}>Số lượng: </Text>
                    <View
                      style={{
                        marginTop: 15,
                        marginBottom: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          paddingHorizontal: 10,
                          paddingVertical: 2,
                          borderRadius: 7,
                          marginLeft: 30,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => decreaseQuantity(item)}
                          style={{
                            backgroundColor: "#D8D8D8",
                            padding: 10,
                            borderRadius: 8,
                          }}
                        >
                          <FontAwesome name="minus" size={24} color="black" />
                        </TouchableOpacity>

                        <View
                          style={{
                            backgroundColor: "white",
                            paddingHorizontal: 18,
                            paddingVertical: 6,
                          }}
                        >
                          <Text>{item?.quantity}</Text>
                        </View>

                        <TouchableOpacity
                          onPress={() => increaseQuantity(item)}
                          style={{
                            backgroundColor: "#D8D8D8",
                            padding: 10,
                            borderRadius: 8,
                          }}
                        >
                          <FontAwesome name="plus" size={24} color="black" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => deleteItem(item)}
                  style={{
                    backgroundColor: "#E31837",
                    marginVertical: 10,
                    marginHorizontal: 100,
                    paddingHorizontal: 8,
                    paddingVertical: 10,
                    borderRadius: 20,
                    borderColor: "#C0C0C0",
                    borderWidth: 0.6,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "white" }}>Xóa khỏi giỏ hàng</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={{ backgroundColor: "white" }}>
        <View
          style={{
            height: 1,
            borderColor: "#D0D0D0",
            borderWidth: 1,
          }}
        />
        <View
          style={{ padding: 20, flexDirection: "row", alignItems: "center" }}
        >
          <Text style={{ fontSize: 18, fontWeight: "400", marginLeft: 15 }}>
            Tổng tiền hàng:{" "}
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{subtotal}đ</Text>
        </View>

        <Pressable
          onPress={handleCheckout}
          style={{
            backgroundColor: "#FFC72C",
            padding: 10,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 30,
          }}
        >
          <Text>Mua hàng ({cart.length})</Text>
        </Pressable>

        <Text
          style={{
            height: 1,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 16,
          }}
        />
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({});
