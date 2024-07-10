import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserType } from "../UserContext";
import { Ionicons } from "@expo/vector-icons";

const UserChat = ({ item }) => {
  const { userId, setUserId } = useContext(UserType);
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `http://10.0.2.2:8000/messages/${userId}/${item._id}`
      );
      const data = await response.json();

      if (response.ok) {
        setMessages(data);
      } else {
        console.log("Lỗi hiển thị tin nhắn", response.status.message);
      }
    } catch (error) {
      console.log("Lỗi hiển thị tin nhắn", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);
  console.log(messages);

  const getLastMessage = () => {
    const userMessages = messages.filter(
      (message) => message.messageType === "text"
    );

    const n = userMessages.length;

    return userMessages[n - 1];
  };
  const lastMessage = getLastMessage();
  console.log(lastMessage);
  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        borderColor: "#D0D0D0",
        borderTopWidth: 0.7,
      }}
    >
      <Pressable
        onPress={() =>
          navigation.navigate("Inbox", {
            recipientId: item._id,
          })
        }
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          borderWidth: 0.7,
          borderColor: "#D0D0D0",
          borderTopWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          padding: 10,
        }}
      >
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#D0D4CA",
            borderRadius: 20,
          }}
        >
          <Ionicons name="person-sharp" size={24} color="black" />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>{item?.name}</Text>
          <Text style={{ fontSize: 12 }}>{item?.email}</Text>
          {lastMessage && (
            <Text style={{ marginTop: 3, color: "gray", fontWeight: "500" }}>
              {lastMessage?.message}
            </Text>
          )}
        </View>

        <View>
          <Text style={{ fontSize: 11, fontWeight: "400", color: "grey" }}>
            {lastMessage && formatTime(lastMessage?.timeStamp)}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default UserChat;

const styles = StyleSheet.create({});
