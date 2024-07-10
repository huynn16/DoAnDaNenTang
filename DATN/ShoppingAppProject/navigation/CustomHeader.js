import React, { useRef, useState, useContext } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { UserType } from "../UserContext";

export default function CustomHeader() {
  const navigation = useNavigation();
  const MyInputRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  const { userId, setUserId } = useContext(UserType);
  const cart = useSelector((state) => state.cart.cart[userId]);

  const handleSearch = () => {
    if (!searchQuery) {
      Alert.alert("Thông báo!", "Vui lòng nhập từ khóa để tìm kiếm!");
    } else {
      navigation.navigate("Sản phẩm đã tìm kiếm", { query: searchQuery });
    }
  };

  return (
    <>
      <SafeAreaView
        style={{
          marginTop: -30,
          marginBottom: 5,
          backgroundColor: "white",
        }}
      >
        <View style={styles.container}>
          <TouchableOpacity
            style={{
              paddingLeft: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("Danh mục sản phẩm")}
          >
            <Entypo name="list" size={30} color="#1C35AD" />
          </TouchableOpacity>

          <View style={styles.searchBar}>
            <AntDesign
              style={{ paddingLeft: 10 }}
              name="search1"
              size={24}
              color="#1C35AD"
              onPress={handleSearch}
            />
            <TextInput
              style={{ flex: 1, paddingLeft: 10 }}
              ref={MyInputRef}
              placeholder="Tìm kiếm sản phẩm"
              onChangeText={(text) => setSearchQuery(text)}
            />
          </View>

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
              <View style={styles.cartBadge}>
                <Text style={styles.cartItemCount}>{cart.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    height: 40,
    flex: 0.8,
    borderWidth: 1,
  },
  cartBadge: {
    position: 'absolute',
    height: 20,
    width: 20,
    borderRadius: 15,
    backgroundColor: 'red',
    right: 15,
    top: -5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartItemCount: {
    color: 'white',
    fontWeight: 'bold',
  },
});
