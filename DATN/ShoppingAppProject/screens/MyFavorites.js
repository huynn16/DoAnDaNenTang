import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { UserType } from "../UserContext";
import { useNavigation } from "@react-navigation/native";

const MyFavorites = () => {
  const { userId } = useContext(UserType);
  const favorites = useSelector((state) => state.cart.favorites[userId]) || [];
  const navigation = useNavigation();

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={{ paddingTop: 15, paddingBottom: 15 }}>
        {favorites.map((product) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Chi tiết sản phẩm", { item: product })
            }
            key={product._id}
            style={{
              backgroundColor: "white",
              marginVertical: 10,
              marginHorizontal: 10,
              borderWidth: 0.8,
              borderRadius: 20,
            }}
          >
            <View numberOfLines={1} style={{ padding: 10 }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  marginTop: 6,
                  marginLeft: 10,
                }}
              >
                {product.name}
              </Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={{ uri: product.image }}
                style={{
                  width: 120,
                  height: 120,
                  resizeMode: "contain",
                  marginVertical: 16,
                  marginHorizontal: 10,
                }}
              />
              <View style={{ flexDirection: "column", marginLeft: 40 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {product.price}đ
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default MyFavorites;
