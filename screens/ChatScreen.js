import { View, Text } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import {
    GiftedChat,
  } from "react-native-gifted-chat";

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Xin chào quý khách hàng đã tin tưởng và ủng hộ ứng dụng đặt bàn của chúng tôi !! Nếu quý khách có thắc mắc gì xin hãy đặt câu hỏi, chúng tôi sẽ phản hồi trong thời gian sớm nhất",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://static.vecteezy.com/system/resources/previews/020/429/953/non_2x/admin-icon-vector.jpg",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);




  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
     
    />
  );
};

export default ChatScreen;
