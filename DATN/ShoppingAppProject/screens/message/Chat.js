import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserType } from "../../UserContext";
import UserChat from "../../components/UserChat";

const Chat = () => {
  const [users, setUsers] = useState([]);
  const { userId, setUserId } = useContext(UserType);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://10.0.2.2:8000/users");
        const data = await response.json();

        if (response.ok) {
          const filteredUsers = data.filter((user) => user._id !== userId);
          setUsers(filteredUsers);
        }
      } catch (error) {
        console.log("Lỗi", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <ScrollView
      style={{ backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
    >
      <Pressable>
        {users.map((item, index) => (
          <UserChat key={index} item={item} />
        ))}
      </Pressable>
    </ScrollView>
  );
};

export default Chat;

const styles = StyleSheet.create({});
