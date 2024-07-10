import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Payment = ({ navigation }) => {
  const selectPaymentMethod = async (paymentmethod) => {
    try {
      await AsyncStorage.setItem('selectedPaymentMethod', paymentmethod);
      navigation.navigate('Thanh toán');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1, padding: 10 }}>
      <TouchableOpacity
        onPress={() => selectPaymentMethod("CoD (Thanh toán khi nhận hàng)")}
        style={{ padding: 10, borderRadius: 20, marginBottom: 10, borderWidth: 1 }}
      >
        <Text style={{ padding: 10, fontSize: 18 }}>CoD (Thanh toán khi nhận hàng)</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => selectPaymentMethod("Thẻ ngân hàng")}
        style={{ padding: 10, borderRadius: 20, marginBottom: 10, borderWidth: 1 }}
      >
        <Text style={{ padding: 10, fontSize: 18 }}>Thẻ ngân hàng</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Payment;
