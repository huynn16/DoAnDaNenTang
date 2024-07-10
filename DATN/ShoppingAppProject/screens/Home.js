import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import CustomHeader from "../navigation/CustomHeader";
import { Alert } from "react-native";
import { UserType } from "../UserContext";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const images = [
    "https://www.xtsmart.vn/vnt_upload/news/02_2021/cover_baner_web.jpg",
    "https://file.hstatic.net/200000722513/file/4_29498e6fbf9f4be79322626134dd4274.jpg",
    "https://file.hstatic.net/200000722513/file/laptop_gaming_97e45ab085d0430fa8fc8c7d15e4699d.png",
  ];
  const offers = [
    {
      image:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/t/e/tecno-camon-20-1.png",
    },
    {
      image:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/2/_/2.12_1.png",
    },
    {
      image:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/3/_/3_51_2.png",
    },
    {
      image:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/t/e/template_dongho_final_7_1.jpg",
    },
  ];
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const { userId, setUserId } = useContext(UserType);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://10.0.2.2:8000/products");
        setProducts(response.data);
      } catch (error) {
        console.log("error message", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);

  const cart = useSelector((state) => state.cart.cart);

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "white",
          paddingTop: 15,
        }}
      >
        <CustomHeader navigation={navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Swiper
            autoplay
            loop
            showsPagination
            dotColor="#000"
            activeDotColor="#fff"
            style={{ height: 200}}
          >
            {images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={{ width: "100%", height: 200 }}
                resizeMode="cover"
              />
            ))}
          </Swiper>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#F3B23A",
            }}
          >
            <Text
              style={{
                paddingHorizontal: 10,
                fontSize: 18,
                fontWeight: "bold",
                marginVertical: 10,
                marginLeft: 10,
              }}
            >
              Giảm giá sốc !!!
            </Text>

            <TouchableOpacity
              onPress={() =>
                Alert.alert("Thông báo", "Chương trình khuyến mãi đã kết thúc")
              }
            >
              <Text
                style={{
                  marginRight: 10,
                  color: "#007FFF",
                  fontWeight: "500",
                  padding: 10,
                }}
              >
                Xem tất cả
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {offers.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  Alert.alert(
                    "Thông báo",
                    "Chương trình khuyến mãi đã kết thúc"
                  )
                }
                style={{
                  marginVertical: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={{ width: 150, height: 150, resizeMode: "contain" }}
                  source={{ uri: item?.image }}
                />
                <View
                  style={{
                    backgroundColor: "#E31837",
                    paddingVertical: 5,
                    width: 130,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Giảm giá cực sốc!
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/*Hiển thị vài sản phẩm mỗi loại */}
          <View
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 15,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                marginVertical: 10,
                marginLeft: 10,
                padding: 10,
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              Điện thoại nổi bật
            </Text>

            <TouchableOpacity onPress={() => navigation.navigate("Điện thoại")}>
              <Text
                style={{
                  marginRight: 10,
                  color: "#007FFF",
                  fontWeight: "500",
                  padding: 10,
                }}
              >
                Xem tất cả
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {products
              .filter((item) => item.category === "phone")
              .slice(0, 4)
              .map((item, index) => (
                <TouchableOpacity
                  style={{
                    width: "47%",
                    marginVertical: 5,
                    marginHorizontal: 5,
                    padding: 5,
                    borderWidth: 0.5,
                    borderRadius: 10,
                  }}
                  key={index}
                  onPress={() =>
                    navigation.navigate("Chi tiết sản phẩm", { item: item })
                  }
                >
                  <ProductItem item={item} />
                </TouchableOpacity>
              ))}
          </View>

          <View
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 15,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                marginVertical: 10,
                marginLeft: 10,
                padding: 10,
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              Laptop
            </Text>

            <TouchableOpacity onPress={() => navigation.navigate("Laptop")}>
              <Text
                style={{
                  marginRight: 10,
                  color: "#007FFF",
                  fontWeight: "500",
                  padding: 10,
                }}
              >
                Xem tất cả
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {products
              .filter((item) => item.category === "laptop")
              .slice(0, 4)
              .map((item, index) => (
                <TouchableOpacity
                  style={{
                    width: "47%",
                    marginVertical: 5,
                    marginHorizontal: 5,
                    padding: 5,
                    borderWidth: 0.5,
                    borderRadius: 10,
                  }}
                  key={index}
                  onPress={() =>
                    navigation.navigate("Chi tiết sản phẩm", { item: item })
                  }
                >
                  <ProductItem item={item} />
                </TouchableOpacity>
              ))}
          </View>

          <View
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 15,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                marginVertical: 10,
                marginLeft: 10,
                padding: 10,
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              PC
            </Text>

            <TouchableOpacity onPress={() => navigation.navigate("PC")}>
              <Text
                style={{
                  marginRight: 10,
                  color: "#007FFF",
                  fontWeight: "500",
                  padding: 10,
                }}
              >
                Xem tất cả
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {products
              .filter((item) => item.category === "pc")
              .slice(0, 4)
              .map((item, index) => (
                <TouchableOpacity
                  style={{
                    width: "47%",
                    marginVertical: 5,
                    marginHorizontal: 5,
                    padding: 5,
                    borderWidth: 0.5,
                    borderRadius: 10,
                  }}
                  key={index}
                  onPress={() =>
                    navigation.navigate("Chi tiết sản phẩm", { item: item })
                  }
                >
                  <ProductItem item={item} />
                </TouchableOpacity>
              ))}
          </View>

          <View
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 15,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                marginVertical: 10,
                marginLeft: 10,
                padding: 10,
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              Đồng hồ thông minh
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate("Đồng hồ thông minh")}
            >
              <Text
                style={{
                  marginRight: 10,
                  color: "#007FFF",
                  fontWeight: "500",
                  padding: 10,
                }}
              >
                Xem tất cả
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {products
              .filter((item) => item.category === "smartwatch")
              .slice(0, 4)
              .map((item, index) => (
                <TouchableOpacity
                  style={{
                    width: "47%",
                    marginVertical: 5,
                    marginHorizontal: 5,
                    padding: 5,
                    borderWidth: 0.5,
                    borderRadius: 10,
                  }}
                  key={index}
                  onPress={() =>
                    navigation.navigate("Chi tiết sản phẩm", { item: item })
                  }
                >
                  <ProductItem item={item} />
                </TouchableOpacity>
              ))}
          </View>

          <View
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 15,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                marginVertical: 10,
                marginLeft: 10,
                padding: 10,
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              Màn hình
            </Text>

            <TouchableOpacity onPress={() => navigation.navigate("Màn hình")}>
              <Text
                style={{
                  marginRight: 10,
                  color: "#007FFF",
                  fontWeight: "500",
                  padding: 10,
                }}
              >
                Xem tất cả
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {products
              .filter((item) => item.category === "monitor")
              .slice(0, 4)
              .map((item, index) => (
                <TouchableOpacity
                  style={{
                    width: "47%",
                    marginVertical: 5,
                    marginHorizontal: 5,
                    padding: 5,
                    borderWidth: 0.5,
                    borderRadius: 10,
                  }}
                  key={index}
                  onPress={() =>
                    navigation.navigate("Chi tiết sản phẩm", { item: item })
                  }
                >
                  <ProductItem item={item} />
                </TouchableOpacity>
              ))}
          </View>

          <View
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 15,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                marginVertical: 10,
                marginLeft: 10,
                padding: 10,
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              TV
            </Text>

            <TouchableOpacity onPress={() => navigation.navigate("TV")}>
              <Text
                style={{
                  marginRight: 10,
                  color: "#007FFF",
                  fontWeight: "500",
                  padding: 10,
                }}
              >
                Xem tất cả
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {products
              .filter((item) => item.category === "tv")
              .slice(0, 4)
              .map((item, index) => (
                <TouchableOpacity
                  style={{
                    width: "47%",
                    marginVertical: 5,
                    marginHorizontal: 5,
                    padding: 5,
                    borderWidth: 0.5,
                    borderRadius: 10,
                  }}
                  key={index}
                  onPress={() =>
                    navigation.navigate("Chi tiết sản phẩm", { item: item })
                  }
                >
                  <ProductItem item={item} />
                </TouchableOpacity>
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: "flex-start",
    padding: 10,
    margin: 20,
    borderRadius: 10,
    borderWidth: 1,
    width: 160,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    alignSelf: "flex-start",
    backgroundColor: "white",
    padding: 15,
    margin: 10,
    borderRadius: 10,
    maxHeight: "38%",
    borderWidth: 1,
  },
  itemText: {
    padding: 10,
    borderRadius: 10,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 0.5,
    borderRadius: 10,
  },
});
