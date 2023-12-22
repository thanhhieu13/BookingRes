import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import LottieView from "lottie-react-native";
import { Audio } from "expo-av";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OnboardingScreen = ({ navigation }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [sound, setSound] = useState();

  useEffect(() => {
    let isUnmounted = false; // Thêm biến để kiểm tra xem component có bị unmount không

    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/music.mp3"),
        { shouldPlay: isPlaying, positionMillis: 27000 }
      );

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          sound.replayAsync();
        }
      });

      if (!isUnmounted) {
        setSound(sound);
      }
    };

    if (isPlaying) {
      loadSound();
    }

    return () => {
      isUnmounted = true; // Đặt biến isUnmounted thành true khi component unmount
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [isPlaying]);
  // Không thêm isPlaying vào dependencies để tránh gọi useEffect khi isPlaying thay đổi

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.lottieContainer}>
        <LottieView
          style={[styles.lottie, styles.leftLottie]}
          source={require("../assets/lottie/christmas.json")}
          autoPlay={true}
          loop={true}
        />
        <LottieView
          style={[styles.lottie, styles.rightLottie]}
          source={require("../assets/lottie/christmas.json")}
          autoPlay={true}
          loop={true}
        />
      </View>
      <View style={styles.center}>
        <LottieView
          style={{ width: 300, height: 300, marginTop: 70 }}
          source={require("../assets/lottie/food-vlogger.json")}
          autoPlay={true}
          loop={true}
        />
      </View>

      <View style={{ width: 400, height: 200 }}>
        <MaterialCommunityIcons
          style={styles.quoteLeft}
          name="format-quote-open"
          size={24}
          color="#fbc4ab"
        />
        <Text style={styles.logan}>
          Top nhà hàng ngon, ấm cúng & có ưu đãi hấp dẫn gợi ý mùa Giáng Sinh
          2023
        </Text>
        <MaterialCommunityIcons
          style={styles.quoteRight}
          name="format-quote-close"
          size={24}
          color="#fbc4ab"
        />
      </View>
      {/* <LottieView
        style={{
          marginBottom: 60,
          padding : 12,
          width: 1,
          height: 50,
          justifyContent: "center",
        }}
        source={require("../assets/lottie/line.json")}
      /> */}
      <TouchableOpacity
        style={styles.beginButton}
        onPress={async () => { 
          setIsPlaying(false);
          if (sound) {
            sound.unloadAsync();
          }
          const token = await AsyncStorage.getItem("authToken");
          if(token == null){
            navigation.navigate("Login");
          }
          else {
            navigation.navigate("Main");
          }
        }}
      >
        <Text style={styles.beginButtonText}>Bắt đầu</Text>
        <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFE8D1",
    position: "relative",
  },
  lottieContainer: {
    flexDirection: "row",
  },
  logan: {
    position: "relative",
    padding: 25,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#826251",
    fontStyle: "italic",
    lineHeight: 40,
  },
  leftLottie: {
    top: -30,
    left: -5,
  },
  rightLottie: {
    top: -30,
    right: 0,
  },
  lottie: {
    position: "absolute",
    width: 300,
    height: 300,
  },
  quoteLeft: {
    position: "absolute",
    top: 20,
    left: 10,
  },
  quoteRight: {
    position: "absolute",
    bottom: 120,
    right: 5,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  playPauseButton: {
    padding: 20,
    position: "absolute",
    bottom: 300,
    left: -2,
  },
  beginButton: {
    // backgroundColor: "#AD40AF",
    // backgroundColor: "#68C3D4",
    // backgroundColor: "#ffdab9",
    // backgroundColor: "#fbc4ab",
    // backgroundColor: "#f8ad9d",
    backgroundColor: "#f4978e",
    padding: 20,
    width: "90%",
    borderRadius: 10,
    marginBottom: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  beginButtonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  iconImage: {
    width: 50,
    height: 50,
  },
});
