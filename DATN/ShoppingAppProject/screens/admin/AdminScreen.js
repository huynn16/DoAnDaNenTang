import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import axios from "axios";
import AdminProductItem from "./AdminProductItem";

const AdminScreen = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: "white",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
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
            <AdminProductItem item={item} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default AdminScreen;
