import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

const Success = () => {
  const navigation = useNavigation();
  const navigateToHome = () => {
    navigation.navigate("Home");
  };
  return (
    <View style={styles.container}>
      <LottieView
        style={{ width: 200, height: 200, marginTop: 100 }}
        source={require("../assets/lottie/orders1.json")}
        autoPlay={true}
        loop={true}
      />
      <Text style={{ marginTop: 120 }} className="text-2xl font-bold">
        Đặt hành thành công
      </Text>
      <Text className="text-center m-5 text-lg">
        Cảm ơn quý khách đã tin tưởng BookingRes và trải nghiệm dịch vụ . Nếu có mọi thắc mắc gì xin hãy liên hệ với chúng tôi !!!
      </Text>

      <View style={styles.button}>
        <Text
          style={{
            backgroundColor: "red",
            color: "#ffffff",
            fontSize: 17,
            padding: 20,
            borderRadius: 10,
          }}
          onPress={navigateToHome}
        >
          Tiếp tục đặt bàn
        </Text>
      </View>
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    // position: "relative",
  },
  button: {
    marginTop: 50,

    // width: 200,
    // height: 50,
    textAlign: "center",
    alignItems: "center",
  },
});
