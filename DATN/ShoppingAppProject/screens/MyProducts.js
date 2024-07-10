import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import { UserType } from "../UserContext";
import { useNavigation } from "@react-navigation/native";
import Dialog from "react-native-dialog";

const MyProducts = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const { userId } = useContext(UserType);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://10.0.2.2:8000/products/${userId}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm của người dùng!", error);
      }
    };

    fetchProducts();
  }, []);
  // Thêm một hàm để xóa một sản phẩm theo id
  const deleteProduct = (productId) => {
    // Hiển thị hộp thoại xác nhận
    Alert.alert(
      "Xóa sản phẩm",
      "Bạn có chắc chắn muốn xóa sản phẩm này không?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              // Gọi endpoint DELETE để xóa sản phẩm
              await axios.delete(`http://10.0.2.2:8000/products/${productId}`);

              // Cập nhật lại danh sách sản phẩm
              const newProducts = products.filter(
                (product) => product._id !== productId
              );
              setProducts(newProducts);

              // Hiển thị thông báo thành công
              Alert.alert("Xóa thành công!", "Sản phẩm đã được xóa thành công.");
            } catch (error) {
              console.error("Lỗi khi xóa sản phẩm!", error);
              alert("Lỗi khi xóa sản phẩm!");
            }
          },
        },
      ]
    );
  };

  // Trong component state của bạn, thêm một trạng thái mới để kiểm soát việc hiển thị hộp thoại
  const [dialogVisible, setDialogVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newCarouselImage1, setNewCarouselImage1] = useState("");
  const [newCarouselImage2, setNewCarouselImage2] = useState("");
  const [newCarouselImage3, setNewCarouselImage3] = useState("");

  // Khi người dùng nhấn nút "Sửa", hiển thị hộp thoại và lưu lại sản phẩm hiện tại
  const showUpdateDialog = (product) => {
    setCurrentProduct(product);
    setNewName(product.name);
    setNewDescription(product.description);
    setNewCategory(product.category);
    setNewImage(product.image);
    setNewPrice(product.price.toString());
    setNewCarouselImage1(product.carouselimage.image1);
    setNewCarouselImage2(product.carouselimage.image2);
    setNewCarouselImage3(product.carouselimage.image3);
    setDialogVisible(true);
  };

  // Khi người dùng nhấn "OK" trong hộp thoại, cập nhật sản phẩm và ẩn hộp thoại
  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://10.0.2.2:8000/products/${currentProduct._id}`,
        {
          name: newName,
          description: newDescription,
          category: newCategory,
          price: newPrice,
          image: newImage,
          carouselimage: {
            image1: newCarouselImage1,
            image2: newCarouselImage2,
            image3: newCarouselImage3,
          },
        }
      );

      const updatedProduct = response.data;
      const newProducts = products.map((product) =>
        product._id === currentProduct._id ? updatedProduct : product
      );
      setProducts(newProducts);

      alert("Sản phẩm đã được cập nhật thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm!", error);
      alert("Lỗi khi cập nhật sản phẩm!");
    }

    setDialogVisible(false);
  };

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={{ paddingTop: 15, paddingBottom: 15 }}>
        {products.map((product) => (
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
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <TouchableOpacity
                onPress={() => showUpdateDialog(product)}
                style={{
                  backgroundColor: "#FFC72C",
                  paddingHorizontal: 50,
                  paddingVertical: 15,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 10,
                }}
              >
                <Text style={{ color: "white" }}>Sửa</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => deleteProduct(product._id)}
                style={{
                  backgroundColor: "#E31837",
                  paddingHorizontal: 50,
                  paddingVertical: 15,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 10,
                }}
              >
                <Text style={{ color: "white" }}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <Dialog.Container visible={dialogVisible}>
        <Dialog.Title>Cập nhật sản phẩm</Dialog.Title>
        <Dialog.Input label="Tên mới" onChangeText={setNewName} />
        <Dialog.Input label="Mô tả mới" onChangeText={setNewDescription} />
        <Dialog.Input label="Loại mới" onChangeText={setNewCategory} />
        <Dialog.Input label="Giá mới" onChangeText={setNewPrice} />
        <Dialog.Input label="Hình ảnh mô tả mới" onChangeText={setNewImage} />
        <Dialog.Input
          label="Hình ảnh mô tả chi tiết mới 1"
          onChangeText={setNewCarouselImage1}
        />
        <Dialog.Input
          label="Hình ảnh mô tả chi tiết mới 2"
          onChangeText={setNewCarouselImage2}
        />
        <Dialog.Input
          label="Hình ảnh mô tả chi tiết mới 3"
          onChangeText={setNewCarouselImage3}
        />
        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          <Dialog.Button label="Hủy" onPress={() => setDialogVisible(false)} />
          <Dialog.Button label="OK" onPress={handleUpdate} />
        </View>
      </Dialog.Container>
    </ScrollView>
  );
};

export default MyProducts;
