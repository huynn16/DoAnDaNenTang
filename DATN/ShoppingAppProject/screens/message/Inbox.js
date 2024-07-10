import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from "react-native";
import React, {
  useState,
  useContext,
  useLayoutEffect,
  useEffect,
  useRef,
} from "react";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import EmojiSelector from "react-native-emoji-selector";
import { UserType } from "../../UserContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { io } from "socket.io-client";

const Inbox = () => {
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [recipientData, setRecipientData] = useState();
  const navigation = useNavigation();
  const route = useRoute();
  const { recipientId } = route.params;
  const [message, setMessage] = useState("");
  const { userId, setUserId } = useContext(UserType);

  const scrollViewRef = useRef(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    const fetchRecipientData = async () => {
      try {
        const response = await fetch(
          `http://10.0.2.2:8000/user/${recipientId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRecipientData(data);
      } catch (error) {
        console.error("Lỗi", error);
      }
    };

    fetchRecipientData();
  }, []);

  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("http://10.0.2.2:3000");

    socketRef.current.on("connect", () => {
      console.log("Connected to the Socket.IO server");
    });

    socketRef.current.on("receiveMessage", (newMessage) => {
      console.log("new Message", newMessage);

      //update the state to include new message
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // This function will be called when the component unmounts
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = async () => {
    socketRef.current.emit("sendMessage", {
      senderId: userId,
      recipientId,
      message: message,
    });
    setMessage("");
    setMessages((prevMessages) => [
      ...prevMessages,
      { senderId: userId, recipientId, message: message },
    ]);
  };

  useEffect(() => {
    fetchMessages();
  }, [userId, recipientId]);

  const fetchMessages = async () => {
    try {
      const senderId = route?.params?.senderId;
      const recipientId = route?.params?.recipientId;
      const response = await fetch(
        `http://10.0.2.2:8000/messages/${userId}/${recipientId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Lỗi", error);
    }
  };

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  };

  const handleSend = async () => {
    if (message.trim() === "") {
      // Không gửi tin nhắn rỗng
      return;
    }
    try {
      const formData = new FormData();
      formData.append("senderId", userId);
      formData.append("recipientId", recipientId);
      formData.append("messageType", "text");
      formData.append("messageText", message);

      const response = await fetch("http://10.0.2.2:8000/messages", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage("");
        fetchMessages();
      }
    } catch (error) {
      console.log("Lỗi", error);
    }
  };

  const handleEmojiPress = () => {
    setShowEmojiSelector(!showEmojiSelector);
  };

  const handleContentSizeChange = () => {
    scrollToBottom();
  };

  console.log("messages", selectedMessages);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={24}
            color="black"
          />

          {selectedMessages.length > 0 ? (
            <View>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                {selectedMessages.length}
              </Text>
            </View>
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons name="person-sharp" size={24} color="black" />
              </View>

              <Text style={{ marginLeft: 5, fontSize: 15, fontWeight: "bold" }}>
                {recipientData?.name}
              </Text>
            </View>
          )}
        </View>
      ),
    });
  }, [recipientData, selectedMessages]);

  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };

  const handleSelectMessage = (message) => {
    const isSelected = selectedMessages.includes(message._id);

    if (isSelected) {
      setSelectedMessages((previousMessages) =>
        previousMessages.filter((id) => id !== message._id)
      );
    } else {
      setSelectedMessages((previousMessages) => [
        ...previousMessages,
        message._id,
      ]);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ flexGrow: 1 }}
        onContentSizeChange={handleContentSizeChange}
      >
        {messages.map((item, index) => {
          if (item.messageType === "text") {
            const isSelected = selectedMessages.includes(item._id);
            return (
              <Pressable
                onLongPress={() => handleSelectMessage(item)}
                key={index}
                style={[
                  item?.senderId?._id === userId
                    ? {
                        alignSelf: "flex-end",
                        backgroundColor: "#87C4FF",
                        padding: 8,
                        maxWidth: "60%",
                        borderRadius: 7,
                        margin: 10,
                      }
                    : {
                        alignSelf: "flex-start",
                        backgroundColor: "#D0D4CA",
                        padding: 8,
                        margin: 10,
                        borderRadius: 7,
                        maxWidth: "60%",
                      },

                  isSelected && { width: "100%", backgroundColor: "#F0FFFF" },
                ]}
              >
                <Text
                  style={{
                    fontSize: 13,
                    textAlign: isSelected ? "right" : "left",
                  }}
                >
                  {item?.message}
                </Text>
                <Text
                  style={{
                    textAlign: "right",
                    fontSize: 9,
                    color: "gray",
                    marginTop: 5,
                  }}
                >
                  {formatTime(item.timeStamp)}
                </Text>
              </Pressable>
            );
          }
        })}
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: "#dddddd",
          marginBottom: showEmojiSelector ? 0 : 25,
        }}
      >
        <Entypo
          onPress={handleEmojiPress}
          style={{ marginHorizontal: 8 }}
          name="emoji-happy"
          size={24}
          color="gray"
        />

        <TextInput
          value={message}
          onChangeText={(text) => setMessage(text)}
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: "#dddddd",
            borderRadius: 20,
            paddingHorizontal: 10,
          }}
          placeholder="Nhập tin nhắn"
        />

        <Pressable
          onPress={handleSend}
          style={{
            backgroundColor: "#007FFF",
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 20,
            marginLeft: 10,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Gửi</Text>
        </Pressable>
      </View>

      {showEmojiSelector && (
        <EmojiSelector
          onEmojiSelected={(emoji) => {
            setMessage((prevMessage) => prevMessage + emoji);
          }}
          style={{ height: 250 }}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default Inbox;

const styles = StyleSheet.create({});
