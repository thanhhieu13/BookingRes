import { View, Text } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import {
    Bubble,
    GiftedChat,
    InputToolbar,
    Send,
    Time
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

  const renderTime = props => {
    return (
      <Time
        {...props}
        timeTextStyle={{
          left: {
            color: '#3c3c434d',
            fontSize: 10,
            textAlign: 'right', // or position: 'right'
          },
          right: {color: '#3c3c434d', fontSize: 10, },
        }}
        containerStyle={{ left: { alignSelf: 'flex-end', flex: 1, }, }}
      />
    );
  };


  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
      messagesContainerStyle={{
        backgroundColor: '#FFFFFF'
      }}
      renderTime={renderTime}
      renderBubble={props => {
        return (
          <Bubble
            {...props}
            textStyle={{
              right: {
                color: 'black',
              },
            }}
            wrapperStyle={{
              right: {
                backgroundColor: '#A2F8B1',
              },
              left : {
                marginBottm: "20px"
              }
            }}
          />
        );
      }}
     
    />
  );
};

export default ChatScreen;
