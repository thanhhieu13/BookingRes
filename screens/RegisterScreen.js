import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import { COLORS, SIZES } from "../constants/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import styles from "./login.style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import BackBtn from "../components/BackBtn";
import Button from "../components/Button";
import { API_URL } from "@env";
const RegisterScreen = () => {
  const animation = useRef(null);
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigation();
  const [obsecureText, setObsecureText] = useState(true);
  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };

    // send a POST  request to the backend API to register the user
    axios
      .post(`${API_URL}/register`, user)
      .then((response) => {
        console.log(response);
        Alert.alert("Thành công", "Chúc mừng bạn đã đăng ký thành công");
        setName("");
        setEmail("");
        setPassword("");
        navigation.navigate("Login")
      })
      .catch((error) => {
        Alert.alert(
          "Thất bại",
          "Bạn hãy nhập lại đầy đủ và chính xác thông tin nhé"
        );
        console.log("registration failed", error);
      });
  };
  return (
    <ScrollView
      style={{
        // flex: 1,
        backgroundColor: "white",
        // alignItems: "center",
        // marginTop: 50,
      }}
    >
      <View style={{ marginHorizontal: 20, marginTop: 50 }}>
        <LottieView
          autoPlay
          ref={animation}
          style={{ width: "100%", height: SIZES.height / 3.2 }}
          source={require("../assets/lottie/login.json")}
        />
        <BackBtn onPress={() => navigation.goBack()} />

        <Text style={styles.titleLogin}>Booking Res</Text>

        <KeyboardAvoidingView>
          <View>
            <View style={styles.wrapper}>
              <Text style={styles.label}>Username</Text>
              <View
                style={styles.inputWrapper(
                  COLORS.offwhite
                  // touched.username ? COLORS.secondary : COLORS.offwhite
                )}
              >
                <MaterialCommunityIcons
                  name="face-man-profile"
                  size={20}
                  color={COLORS.gray}
                  style={styles.iconStyle}
                />

                <TextInput
                  placeholder="Username"
                  // onFocus={() => {
                  //   setFieldTouched("username");
                  // }}
                  // onBlur={() => {
                  //   setFieldTouched("username", "");
                  // }}
                  // value={values.username}
                  // onChangeText={handleChange("username")}
                  onChangeText={(text) => setName(text)}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={{ flex: 1 }}
                />
              </View>
              {/* {touched.username && errors.username && (
              <Text style={styles.errorMessage}>{errors.username}</Text>
            )} */}
            </View>

            <View style={styles.wrapper}>
              <Text style={styles.label}>Email</Text>
              <View
                style={styles.inputWrapper(COLORS.offwhite)}
                // style={styles.inputWrapper(
                //   touched.email ? COLORS.secondary : COLORS.offwhite
                // )}
              >
                <MaterialCommunityIcons
                  name="email-outline"
                  size={20}
                  color={COLORS.gray}
                  style={styles.iconStyle}
                />

                <TextInput
                  placeholder="Enter email"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  // onFocus={() => {
                  //   setFieldTouched("email");
                  // }}
                  // onBlur={() => {
                  //   setFieldTouched("email", "");
                  // }}
                  // value={values.email}
                  // onChangeText={handleChange("email")}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={{ flex: 1 }}
                />
              </View>
              {/* {touched.email && errors.email && (
              <Text style={styles.errorMessage}>{errors.email}</Text>
            )} */}
            </View>

            <View style={styles.wrapper}>
              <Text style={styles.label}>Password</Text>
              <View
                style={styles.inputWrapper(
                  // touched.password ? COLORS.secondary : COLORS.offwhite
                  COLORS.offwhite
                )}
              >
                <MaterialCommunityIcons
                  name="lock-outline"
                  size={20}
                  color={COLORS.gray}
                  style={styles.iconStyle}
                />

                <TextInput
                  secureTextEntry={obsecureText}
                  placeholder="Password"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  // onFocus={() => {
                  //   setFieldTouched("password");
                  // }}
                  // onBlur={() => {
                  //   setFieldTouched("password", "");
                  // }}
                  // value={values.password}
                  // onChangeText={handleChange("password")}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={{ flex: 1 }}
                />

                <TouchableOpacity
                  onPress={() => {
                    setObsecureText(!obsecureText);
                  }}
                >
                  <MaterialCommunityIcons
                    name={obsecureText ? "eye-outline" : "eye-off-outline"}
                    size={18}
                  />
                </TouchableOpacity>
              </View>
              {/* {touched.password && errors.password && (
              <Text style={styles.errorMessage}>{errors.password}</Text>
            )} */}
            </View>

            <Button
              title={"S I G N U P"}
              onPress={handleRegister}
              // onPress={isValid ? handleSubmit : inValidForm}
              loader={loader}
              // isValid={isValid}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;

// const styles = StyleSheet.create({});
