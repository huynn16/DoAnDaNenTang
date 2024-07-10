import React, { useContext } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";
import Register from "../screens/Register";
import Login from "../screens/Login";
import ProductInfo from "../screens/ProductInfo";
import Address from "../screens/Address";
import AddAddress from "../screens/AddAddress";
import Cart from "../screens/Cart";
import ProductList from "../screens/ProductList";
import { Feather } from "@expo/vector-icons";
import Category from "../screens/Category";
import Checkout from "../screens/Checkout";
import SelectDeliAddress from "../screens/SelectDeliAddress";
import Payment from "../screens/Payment";
import DeliMethod from "../screens/DeliMethod";
import Order from "../screens/Order";
import SearchResult from "../screens/SearchResult";
import MyProducts from "../screens/MyProducts";
import MyOrders from "../screens/MyOrders";
import EditAddress from "../screens/EditAddress";
import MyFavorites from "../screens/MyFavorites";
import { useSelector } from "react-redux";
import { UserType } from "../UserContext";
import OrderInfo from "../screens/OrderInfo";
import Inbox from "../screens/message/Inbox";
import AdminScreen from "../screens/admin/AdminScreen";
import ShipperScreen from "../screens/ShipperScreen";
import AdminTabNavigator from "./AdminTabNavigator";
import AdminProductInfo from "../screens/admin/AdminProductInfo";

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  const { userId, setUserId } = useContext(UserType);
  const cart = useSelector((state) => state.cart.cart[userId]);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Giỏ hàng"
          component={Cart}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Danh mục sản phẩm"
          component={ProductList}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Tất cả sản phẩm"
          component={Category}
          options={({ navigation }) => ({
            headerShown: true,
            headerRight: () => (
              <TouchableOpacity
                style={{
                  paddingRight: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
                onPress={() => navigation.navigate("Giỏ hàng")}
              >
                <Feather name="shopping-cart" size={30} color="#1C35AD" />
                {cart && cart.length > 0 && (
                  <View
                    style={{
                      position: "absolute",
                      height: 20,
                      width: 20,
                      borderRadius: 15,
                      backgroundColor: "red",
                      right: 15,
                      top: -5,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      {cart.length}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Chi tiết sản phẩm"
          component={ProductInfo}
          options={({ navigation }) => ({
            headerShown: true,
            headerRight: () => (
              <TouchableOpacity
                style={{
                  paddingRight: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
                onPress={() => navigation.navigate("Giỏ hàng")}
              >
                <Feather name="shopping-cart" size={30} color="#1C35AD" />
                {cart && cart.length > 0 && (
                  <View
                    style={{
                      position: "absolute",
                      height: 20,
                      width: 20,
                      borderRadius: 15,
                      backgroundColor: "red",
                      right: 15,
                      top: -5,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      {cart.length}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Địa chỉ nhận hàng"
          component={Address}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Thêm địa chỉ nhận hàng"
          component={AddAddress}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Thanh toán"
          component={Checkout}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Chọn địa chỉ nhận hàng"
          component={SelectDeliAddress}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Chọn phương thức vận chuyển"
          component={DeliMethod}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Chọn phương thức thanh toán"
          component={Payment}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Order"
          component={Order}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Sản phẩm đã tìm kiếm"
          component={SearchResult}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Sản phẩm của tôi"
          component={MyProducts}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Đơn hàng của tôi"
          component={MyOrders}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Sửa địa chỉ nhận hàng"
          component={EditAddress}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Sản phẩm đã thích"
          component={MyFavorites}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Chi tiết đơn hàng"
          component={OrderInfo}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Inbox"
          component={Inbox}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="AdminScreen"
          component={AdminTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdminProductInfo"
          component={AdminProductInfo}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="SellerScreen"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ShipperScreen"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
