import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TextInput, Pressable } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

const BOT = {
  _id: 2,
  name: "Chatbot",
};

const ChatbotAI = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSearchingOrder, setIsSearchingOrder] = useState(false);
  const categories = [
    { key: "pc", display: "Máy tính" },
    { key: "tv", display: "TV" },
    { key: "monitor", display: "Màn hình" },
    { key: "phone", display: "Điện thoại" },
    { key: "laptop", display: "Laptop" },
    { key: "smartwatch", display: "Đồng hồ thông minh" },
  ];
  const [showProductCategories, setShowProductCategories] = useState(false);
  const resetChat = () => {
    setMessages([
      {
        _id: 1,
        text: "Xin chào, tôi là Chatbot có thể hỗ trợ bạn sử dụng ứng dụng",
        createdAt: new Date(),
        user: BOT,
      },
    ]);
    setSelectedProduct(null);
    setShowProductCategories(false);
  };

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Xin chào, tôi là Chatbot có thể hỗ trợ bạn sử dụng ứng dụng",
        createdAt: new Date(),
        user: BOT,
      },
    ]);
  }, []);

  // ... other code remains the same

  const handlePress = (request) => {
    let response = "";
    switch (request) {
      case "Tìm kiếm sản phẩm":
        response =
          "Bạn muốn tìm kiếm sản phẩm nào? Vui lòng chọn một trong các mục sau: PC, TV, Màn hình, Điện thoại, Laptop, Đồng hồ.";
        setSelectedProduct(null);
        setShowProductCategories(true);
        break;
      case "Tìm kiếm đơn hàng":
        response = "Vui lòng cung cấp mã đơn hàng.";
        break;
      default:
        response = "Tôi không hiểu yêu cầu của bạn.";
        break;
    }
    setMessages([
      ...messages,
      {
        _id: messages.length + 1,
        text: response,
        createdAt: new Date(),
        user: BOT,
      },
    ]);
  };

  const handleSend = () => {
    const newMessages = [
      ...messages,
      {
        _id: messages.length + 1,
        text: userMessage,
        createdAt: new Date(),
        user: { _id: 1, name: "User" },
      },
    ];

    const greetings = [
      "chào",
      "hi",
      "hello",
      "chào bạn",
      "alo",
      "lô",
      "lo",
      "ê",
      "e",
    ];
    const userMessageLower = userMessage.toLowerCase();

    if (greetings.some((greeting) => userMessageLower.includes(greeting))) {
      newMessages.push({
        _id: newMessages.length + 1,
        text: "Tôi có thể giúp gì cho bạn?",
        createdAt: new Date(),
        user: BOT,
      });
    } else {
      const searchPhrases = [
        "tôi cần mua",
        "tôi muốn mua",
        "tôi muốn tìm",
        "tôi cần tìm",
        "tôi muốn tìm sản phẩm",
        "tôi muốn mua sản phẩm",
        "tôi cần mua sản phẩm",
        "các sản phẩm hiện tại có trong ứng dụng",
      ];
      const product = categories.find((category) =>
        searchPhrases.some((phrase) =>
          userMessageLower.includes(`${phrase} ${category.key}`)
        )
      );

      if (product) {
        newMessages.push({
          _id: newMessages.length + 1,
          text: `Dưới đây là ${product.display} bạn có thể tìm trong ứng dụng`,
          createdAt: new Date(),
          user: BOT,
        });
        setSelectedProduct(product);
        setShowProductCategories(true);
      } else if (
        searchPhrases.some((phrase) => userMessageLower.includes(phrase))
      ) {
        newMessages.push({
          _id: newMessages.length + 1,
          text: "Bạn muốn tìm kiếm sản phẩm nào? Vui lòng chọn một trong các mục sau: PC, TV, Màn hình, Điện thoại, Laptop, Đồng hồ.",
          createdAt: new Date(),
          user: BOT,
        });
        setSelectedProduct(null);
        setShowProductCategories(true);
      } else {
        newMessages.push({
          _id: newMessages.length + 1,
          text: "Ứng dụng hiện không có sản phẩm bạn đang cần tìm",
          createdAt: new Date(),
          user: BOT,
        });
      }
    }

    setMessages(newMessages);
    setUserMessage("");
  };

  // ... other code remains the same

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: "white",
      }}
    >
      <ScrollView style={{ flex: 1 }}>
        {messages.map((message, index) => (
          <View
            key={index}
            style={{
              flexDirection: "column",
              alignItems:
                message.user._id === BOT._id ? "flex-start" : "flex-end",
            }}
          >
            <Text>
              {message.user._id === BOT._id ? "ChatbotAI: " : "Tôi: "}
            </Text>
            <Text>{message.text}</Text>
          </View>
        ))}

        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            marginTop: 50,
          }}
        >
          {!selectedProduct && (
            <Pressable
              style={{
                backgroundColor: "white",
                borderColor: "#1C35AD",
                borderWidth: 1,
                width: "50%",
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 15,
                marginBottom: 4,
              }}
              android_ripple={{ color: "#1C35AD" }}
              onPress={() => handlePress("Tìm kiếm sản phẩm")}
            >
              <Text style={{ color: "black" }}>Tôi muốn tìm sản phẩm</Text>
            </Pressable>
          )}
          {showProductCategories &&
            categories.map((category, index) => {
              if (
                selectedProduct === null ||
                category.key === selectedProduct.key
              ) {
                return (
                  <Pressable
                    key={index}
                    style={{
                      backgroundColor: "white",
                      borderColor: "#1C35AD",
                      borderWidth: 1,
                      padding: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      width: "50%",
                      borderRadius: 15,
                      marginBottom: 4,
                    }}
                    onPress={() =>
                      navigation.navigate("Tất cả sản phẩm", {
                        category: category.key,
                      })
                    }
                  >
                    <Text style={{ color: "black" }}>{category.display}</Text>
                  </Pressable>
                );
              }
            })}
          {!selectedProduct && (
            <Pressable
              style={{
                backgroundColor: "white",
                borderColor: "#1C35AD",
                borderWidth: 1,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                width: "50%",
                borderRadius: 15,
                marginBottom: 4,
              }}
              android_ripple={{ color: "#1C35AD" }}
              onPress={() => handlePress("Tìm kiếm đơn hàng")}
            >
              <Text style={{ color: "black" }}>Tôi muốn tìm đơn hàng</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
      <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
        <Pressable
          style={{
            backgroundColor: "#1C35AD",
            borderRadius: 20,
            padding: 5,
            marginHorizontal: 4,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={resetChat}
        >
          <MaterialIcons
            style={{ marginHorizontal: 6 }}
            name="autorenew"
            size={28}
            color="black"
          />
        </Pressable>
        <TextInput
          style={{
            flex: 1,
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginRight: 10,
            paddingLeft: 15,
            borderRadius: 20,
          }}
          value={userMessage}
          onChangeText={setUserMessage}
          placeholder="Hãy hỏi hoặc yêu cầu gì đó..."
        />
        <Pressable
          style={{
            backgroundColor: "#1C35AD",
            borderRadius: 20,
            padding: 10,
            marginHorizontal: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={handleSend}
        >
          <Text style={{ color: "white", marginHorizontal: 8 }}>Gửi</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ChatbotAI;
