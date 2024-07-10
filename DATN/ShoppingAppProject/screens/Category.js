import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, } from 'react-native';
import axios from 'axios';
import ProductItem from '../components/ProductItem';

const Category = ({ navigation, route }) => {
  const [products, setProducts] = useState([]);
  const { category } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(category ? `http://10.0.2.2:8000/products/category/${category}` : "http://10.0.2.2:8000/products");
        setProducts(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [category]);

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
            onPress={() =>
              navigation.navigate("Chi tiết sản phẩm", { item: item })
            }
          >
            <ProductItem item={item} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

export default Category;

const styles = StyleSheet.create({});