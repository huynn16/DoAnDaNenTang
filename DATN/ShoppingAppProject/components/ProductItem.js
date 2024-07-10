import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ProductItem = ({ item }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={{
        marginHorizontal: 20,
        marginVertical: 25,
        borderRadius: 20,
      }}
      onPress={() => navigation.navigate("Chi tiết sản phẩm", { item: item })}
    >
      <Image
        style={{ flex: 1, width: 150, height: 150, resizeMode: "contain" }}
        source={{ uri: item?.image }}
      />

      <Text style={{ width: 150, marginTop: 10 }}>{item?.name}</Text>

      <View
        style={{
          marginTop: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>{item?.price}đ</Text>
        <Text style={{ color: "#FFC72C", fontWeight: "bold" }}>
          {item?.rate} <AntDesign name="star" size={13} color="#FFC72C" />
        </Text>
      </View>
      <Text style={{ fontSize: 12 }}>Đã bán: {item?.count}</Text>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
