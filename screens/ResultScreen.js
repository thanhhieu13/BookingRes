import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import ResHor from "../components/ResHor";


const ResultScreen = ({navigation,route}) => {
  return (
    <View>
       <ResHor route={route} />
    </View>
  );
};

export default ResultScreen;
