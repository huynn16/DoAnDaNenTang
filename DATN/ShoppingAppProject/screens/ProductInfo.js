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
import React, { useState, useRef, useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartActions";
import { UserType } from "../UserContext";
import { addToFavorites, removeFromFavorites } from "../redux/CartActions";
import Swiper from "react-native-swiper";

const ProductInfo = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { userId, setUserId } = useContext(UserType);
  const addItemToCart = (item) => {
    dispatch(addToCart({ userId, product: item }));
  };
  const buyNow = (item) => {
    dispatch(addToCart({ userId, product: item })); // Thêm sản phẩm vào giỏ hàng tạm thời
    navigation.navigate("Thanh toán");
  };
  const favorites = useSelector((state) => state.cart.favorites[userId]) || [];
  const handleFavorite = (item) => {
    const isFavorite = favorites.some(
      (favoriteItem) => favoriteItem._id === item._id
    );
    if (isFavorite) {
      dispatch(removeFromFavorites({ userId, product: item }));
    } else {
      dispatch(addToFavorites({ userId, product: item }));
    }
  };
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
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <AntDesign
              name={
                favorites.some(
                  (favoriteItem) => favoriteItem._id === product._id
                )
                  ? "heart"
                  : "hearto"
              }
              size={24}
              color={
                favorites.some(
                  (favoriteItem) => favoriteItem._id === product._id
                )
                  ? "red"
                  : "black"
              }
              style={{ marginRight: 20 }}
              onPress={() => handleFavorite(product)}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ marginLeft: 20, marginVertical: 10 }}>
            Đã bán: {product.count}
          </Text>
          <Text
            style={{
              color: "#FFC72C",
              fontWeight: "bold",
              marginLeft: 50,
              marginVertical: 10,
            }}
          >
            {product.rate} <AntDesign name="star" size={12} color="#FFC72C" />
          </Text>
        </View>
        <View style={{ padding: 10, margin: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            Thông tin sản phẩm
          </Text>
          <Text style={{ fontSize: 15 }}>{product.description}</Text>
        </View>
      </ScrollView>
      {/* Khung tương tác giỏ hàng */}
      <Pressable
        style={{
          backgroundColor: "#FFC72C",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 30,
          marginTop: 20,
        }}
        onPress={handleAddToCart}
      >
        <Text>Thêm vào giỏ hàng</Text>
      </Pressable>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              padding: 20,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "white" }}>Đã thêm vào giỏ hàng</Text>
          </View>
        </View>
      </Modal>

      <Pressable
        onPress={() => buyNow(product)}
        style={{
          backgroundColor: "#E31837",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 30,
          marginVertical: 20,
        }}
      >
        <Text>Mua ngay</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProductInfo;
