import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import { useNavigation } from "@react-navigation/native";

const SearchResults = ({ route }) => {
  const navigation = useNavigation();
  const { query } = route.params;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://10.0.2.2:8000/products/search?keyword=${query}`
        );
        if (response.data.length === 0) {
          Alert.alert("Thông báo!", "Không tìm thấy sản phẩm nào phù hợp!");
        } else {
          setProducts(response.data);
        }
      } catch (error) {
        Alert.alert(
          "Thông báo!",
          "Không tìm thấy sản phẩm nào phù hợp!",
          [
            {
              text: "OK",
              onPress: () => navigation.goBack(),
            },
          ],
          { cancelable: false }
        );
      }
    };

    fetchProducts();
  }, [query]);

  return (
    <ScrollView
      style={{ backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        {products.map((item, index) => (
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
          >
            <ProductItem item={item} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default SearchResults;

const styles = StyleSheet.create({});
