import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Pressable,
  Modal,
} from "react-native";
import React, { useState, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import Swiper from "react-native-swiper";

const AdminProductInfo = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const product = route.params.item;
  const swiperRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    product.carouselimage.image1,
    product.carouselimage.image2,
    product.carouselimage.image3,
  ];
  const handleThumbnailPress = (index) => {
    swiperRef.current.scrollBy(index - currentImageIndex);
    setCurrentImageIndex(index);
  };
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddToCart = () => {
    addItemToCart(product);
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 1500);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        {/* Khung ảnh */}
        <Swiper
          ref={swiperRef}
          loop={false}
          onIndexChanged={setCurrentImageIndex}
          style={{ height: 300, justifyContent: "center" }}
          activeDotColor="#000"
        >
          {images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              style={{
                width: "100%",
                height: "100%",
                borderWidth: 0.1,
                borderColor: "#000",
                borderRadius: 5,
              }}
              resizeMode="contain"
            />
          ))}
        </Swiper>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {images.map((image, index) => (
            <Pressable
              key={index}
              onPress={() => handleThumbnailPress(index)}
            >
              <Image
                source={{ uri: image }}
                style={{
                  width: 137,
                  height: 137,
                  borderWidth: 0.1,
                  borderColor: "#000",
                  borderRadius: 5,
                }}
                resizeMode="cover"
              />
            </Pressable>
          ))}
        </ScrollView>

        {/* Khung thông tin sản phẩm */}
        <Text
          style={{
            padding: 10,
            marginLeft: 10,
            fontWeight: "bold",
            fontSize: 20,
            justifyContent: "center",
          }}
        >
          {product.name}
        </Text>
        <View
          style={{
            marginHorizontal: 10,
            paddingHorizontal: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              Giá chỉ: {product.price} đ
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ marginLeft: 20, marginVertical: 10 }}>
            Đã bán: {product.count}
          </Text>
        </View>
        <View style={{ padding: 10, margin: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            Thông tin sản phẩm
          </Text>
          <Text style={{ fontSize: 15 }}>{product.description}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AdminProductInfo;