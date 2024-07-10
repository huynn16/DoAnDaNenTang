import React from 'react';
import { ScrollView, Pressable, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, Entypo, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'; 

const ProductListScreen = () => {
  const navigation = useNavigation();

  const categories = [
    { name: 'Tất cả sản phẩm', category: null, icon: <FontAwesome name="th-list" size={40} color="black" /> },
    { name: 'Laptop', category: 'laptop', icon: <Entypo name="laptop" size={40} color="black" /> },
    { name: 'PC', category: 'pc', icon: <MaterialCommunityIcons name="desktop-tower" size={40} color="black" /> },
    { name: 'Điện thoại', category: 'phone', icon: <Ionicons name="ios-phone-portrait" size={40} color="black" /> },
    { name: 'Màn hình', category: 'monitor', icon: <MaterialCommunityIcons name="desktop-mac-dashboard" size={40} color="black" /> },
    { name: 'Đồng hồ thông minh', category: 'smartwatch', icon: <Ionicons name="ios-watch" size={40} color="black" /> },
    { name: 'TV', category: 'tv', icon: <Ionicons name="ios-tv" size={40} color="black" /> },
  ];

  return (
    <ScrollView
      style={{ backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
    >
      {categories.map((item, index) => (
        <Pressable
          key={index}
          onPress={() => navigation.navigate("Tất cả sản phẩm", { category: item.category })}
          style={({ pressed }) => ({
            flexDirection: "row",
            margin: 10,
            backgroundColor: "white",
            borderWidth: 1,
            borderRadius: 20,
            elevation: pressed ? 30 : 0,
          })}
        >
          <View
            style={{
              flex: 1,
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {item.icon}
          </View>
          <View
            style={{
              flexDirection: "row",
              flex: 4,
              marginLeft: 20,
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
              }}
            >
              {item.name}
            </Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

export default ProductListScreen;