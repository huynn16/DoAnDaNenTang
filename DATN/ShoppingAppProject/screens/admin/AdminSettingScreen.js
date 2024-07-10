import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const AdminSettingScreen = () => {
  const navigation = useNavigation();

  const logout = () => {
    Alert.alert(
      "Bạn có chắc muốn đăng xuất?",
      "",
      [
        {
          text: "Không",
          style: "cancel",
        },
        {
          text: "Có",
          onPress: async () => {
            await clearAuthToken();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const clearAuthToken = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      console.log("Xóa token thành công");
    } catch (err) {
      console.log("Lỗi xóa token", err);
    }
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutButtonText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdminSettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logoutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#E31837',
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});