import React, { useState, useContext } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  View,
} from "react-native";
import axios from "axios";
import { UserType } from "../UserContext";
import { Picker } from "@react-native-picker/picker";

const PostProduct = () => {
  const { userId, setUserId } = useContext(UserType);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [count, setCount] = useState("");
  const [rate, setRate] = useState("");
  const [carouselImage1, setCarouselImage1] = useState("");
  const [carouselImage2, setCarouselImage2] = useState("");
  const [carouselImage3, setCarouselImage3] = useState("");

  const handlePostProduct = async () => {
    try {
      // Kiểm tra người dùng đã nhập đủ thông tin chưa
      if (
        !userId ||
        !name ||
        !description ||
        !category ||
        !image ||
        !price ||
        !carouselImage1 ||
        !carouselImage2 ||
        !carouselImage3
      ) {
        Alert.alert("Chưa thể đăng sản phẩm!", "Vui lòng điền đủ thông tin!");
        return;
      }
      // Tạo một sản phẩm mới 
      const product = {
        userId,
        name,
        description,
        category,
        image,
        price: Number(price),
        count: Number(count),
        rate: Number(rate),
        carouselimage: {
          image1: carouselImage1,
          image2: carouselImage2,
          image3: carouselImage3,
        },
      };

      const response = await axios.post(
        "http://10.0.2.2:8000/products",
        product
      );

      if (response.status === 201) {
        console.log("Đã đăng sản phẩm:", response.data);
        setName("");
        setDescription("");
        setCategory("");
        setImage("");
        setPrice("");
        setCount("");
        setRate("");
        setCarouselImage1("");
        setCarouselImage2("");
        setCarouselImage3("");
        Alert.alert("Đăng sản phẩm thành công!");
      } else {
        console.log("Lỗi khi đăng sản phẩm:", response.data.message);
      }
    } catch (error) {
      console.error("Lỗi khi đăng sản phẩm:", error);
    }
  };

  return (
    <ScrollView>
      <View style={{ padding: 15, backgroundColor: "white" }}>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ padding: 5 }}>Tên sản phẩm</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Tên sản phẩm"
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 10,
              padding: 10,
              borderRadius: 10,
            }}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={{ padding: 5 }}>Mô tả</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Mô tả sản phẩm"
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 10,
              padding: 10,
              borderRadius: 10,
            }}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={{ padding: 5 }}>Loại sản phẩm</Text>
          <View
            style={{
              height: 50,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 10,
              borderRadius: 10,
            }}
          >
            <Picker
              selectedValue={category}
              onValueChange={(itemValue) => setCategory(itemValue)}
              style={{ flex: 1 }}
            >
              <Picker.Item label="Chọn loại sản phẩm" value="" />
              <Picker.Item label="Điện thoại" value="phone" />
              <Picker.Item label="Laptop" value="laptop" />
              <Picker.Item label="PC" value="pc" />
              <Picker.Item label="TV" value="tv" />
              <Picker.Item label="Màn hình" value="monitor" />
              <Picker.Item label="Đồng hồ thông minh" value="smartwatch" />
            </Picker>
          </View>
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={{ padding: 5 }}>Thêm URL hình ảnh sản phẩm</Text>
          <TextInput
            value={image}
            onChangeText={setImage}
            placeholder="Thêm một hình ảnh"
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 10,
              padding: 10,
              borderRadius: 10,
            }}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={{ padding: 5 }}>Giá sản phẩm</Text>
          <TextInput
            value={price}
            onChangeText={setPrice}
            placeholder="Giá sản phẩm"
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 10,
              padding: 10,
              borderRadius: 10,
            }}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={{ padding: 5 }}>Thêm 3 URL hình ảnh mô tả chi tiết</Text>
          <TextInput
            value={carouselImage1}
            onChangeText={setCarouselImage1}
            placeholder="Hình ảnh 1"
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 10,
              padding: 10,
              borderRadius: 10}}
          />
          <TextInput
            value={carouselImage2}
            onChangeText={setCarouselImage2}
            placeholder="Hình ảnh 2"
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 10,
              padding: 10,
              borderRadius: 10,
            }}
          />
          <TextInput
            value={carouselImage3}
            onChangeText={setCarouselImage3}
            placeholder="Hình ảnh 3"
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 10,
              padding: 10,
              borderRadius: 10,
            }}
          />
        </View>

        <TouchableOpacity
          onPress={handlePostProduct}
          style={{
            backgroundColor: "#1C35AD",
            padding: 15,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text style={{ color: "white" }}>Đăng bán sản phẩm</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PostProduct;
