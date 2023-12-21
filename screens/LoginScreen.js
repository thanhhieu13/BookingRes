import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useRef, useContext } from "react";
import BackBtn from "../components/BackBtn";
import Button from "../components/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants/theme";
import styles from "./login.style";
import LottieView from "lottie-react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
//   import { LoginContext } from "../context/LoginContext";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 character")
    .required("Required"),
  email: Yup.string()
    .email("Provide a valid email address")
    .required("Required"),
});

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState(""); // Add this line
  const [password, setPassword] = useState(""); // Add this line
  const animation = useRef(null);
  const [loader, setLoader] = useState(false);
  const [obsecureText, setObsecureText] = useState(true);
  // const { login, setLogin } = useContext(LoginContext);

  const inValidForm = () => {
    Alert.alert("Invalid Form", "Please provide all required fields", [
      {
        text: "Cancel",
        onPress: () => {},
      },
      {
        text: "Continue",
        onPress: () => {},
      },
      { defaultIndex: 1 },
    ]);
  };



  const handleLogin = async (values) => {
    setLoader(true);
    try {
      const user = {
        email: values.email,
        password: values.password,
      };

      const response = await axios.post("http://10.45.22.167:8000/login", user);

      if (response.status === 200) {
        setLoader(false);
        // setLogin(true);

        console.log(response.data);

        await AsyncStorage.setItem("authToken", response.data.token);
        navigation.replace("Main");
      } else {
        // setLogin(false);

        Alert.alert("Error Logging in", "Please provide valid credentials", [
          {
            text: "Cancel",
            onPress: () => {},
          },
          {
            text: "Continue",
            onPress: () => {},
          },
          { defaultIndex: 1 },
        ]);
      }
    } catch (error) {
      setLogin(false);
      Alert.alert(
        "Error",
        "Oops, Error logging in. Try again with correct credentials",
        [
          {
            text: "Cancel",
            onPress: () => {},
          },
          {
            text: "Continue",
            onPress: () => {},
          },
          { defaultIndex: 1 },
        ]
      );
    } finally {
      setLoader(false);
    }
  };

  // hàm cũ
  //   const handleLogin = () => {
  //     const user = {
  //       email: email,
  //       password: password,
  //     };

  //     axios
  //     .post("http://192.168.1.4:8000/login", user)
  //       .then((response) => {
  //         console.log(response);
  //         const token = response.data.token;
  //         AsyncStorage.setItem("authToken", token);
  //         navigation.replace("Main");
  //       })
  //       .catch((error) => {
  //         Alert.alert("Lỗi đăng nhập", "Tài khoản và mật khẩu không hợp lệ");
  //         console.log(error);
  //       });
  //   };

  //   const login = async (values) => {
  //     setLoader(true);
  //     try {
  //       await firebase
  //         .auth()
  //         .signInWithEmailAndPassword(values.email, values.password).then(() => navigation.navigate('home')).catch((error) => {
  //           Alert.alert("Error Login", error.message, [
  //             {
  //               text: "Back",
  //               onPress: () => {
  //                 setLoader(false);
  //               },
  //             },
  //             {
  //               text: "Continue",
  //               onPress: () => {},
  //             },
  //             { defaultIndex: 1 },
  //           ]);
  //         });
  //     } catch (error) {
  //       Alert.alert("Error Login", error.message, [
  //         {
  //           text: "Back",
  //           onPress: () => {
  //             setLoader(false);
  //           },
  //         },
  //         {
  //           text: "Continue",
  //           onPress: () => {},
  //         },
  //         { defaultIndex: 1 },
  //       ]);
  //     }
  //   };

  //   const loginFunc = async (values) => {
  //     setLoader(true);

  //     try {
  //       const endpoint = "http://localhost:6002/login";
  //       const data = values;

  //       console.log(data);

  //       const response = await axios.post(endpoint, data);
  //       if (response.status === 200) {
  //         setLoader(false);
  //         setLogin(true);

  //         console.log(response.data);

  //         await AsyncStorage.setItem("id", JSON.stringify(response.data._id));
  //         await AsyncStorage.setItem("token", JSON.stringify(response.data.userToken));

  //       } else {
  //         setLogin(false);

  //         Alert.alert("Error Logging in ", "Please provide valid credentials ", [
  //           {
  //             text: "Cancel",
  //             onPress: () => {},
  //           },
  //           {
  //             text: "Continue",
  //             onPress: () => {},
  //           },
  //           { defaultIndex: 1 },
  //         ]);
  //       }
  //     } catch (error) {
  //       setLogin(false);
  //       Alert.alert(
  //         "Error ",
  //         "Oops, Error logging in try again with correct credentials",
  //         [
  //           {
  //             text: "Cancel",
  //             onPress: () => {},
  //           },
  //           {
  //             text: "Continue",
  //             onPress: () => {},
  //           },
  //           { defaultIndex: 1 },
  //         ]
  //       );
  //     } finally {
  //       setLoader(false);
  //     }
  //   };
  return (
    <ScrollView style={{ backgroundColor: COLORS.white }}>
      <View style={{ marginHorizontal: 20, marginTop: 50 }}>
        {/* <BackBtn onPress={() => navigation.goBack()} /> */}
        <LottieView
          autoPlay
          ref={animation}
          style={{ width: "100%", height: SIZES.height / 3.2 }}
          source={require("../assets/lottie/login.json")}
        />

        <Text style={styles.titleLogin}>Booking Res</Text>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => handleLogin(values)}
        >
          {({
            handleChange,
            handleBlur,
            touched,
            handleSubmit,
            values,
            errors,
            isValid,
            setFieldTouched,
          }) => (
            <View>
              <View style={styles.wrapper}>
                <Text style={styles.label}>Email</Text>
                <View
                  style={styles.inputWrapper(
                    touched.email ? COLORS.secondary : COLORS.offwhite
                  )}
                >
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={20}
                    color={COLORS.gray}
                    style={styles.iconStyle}
                  />

                  <TextInput
                    placeholder="Enter email"
                    onFocus={() => {
                      setFieldTouched("email");
                    }}
                    onBlur={() => {
                      setFieldTouched("email", "");
                    }}
                      value={values.email}
                      onChangeText={handleChange("email")}
                    // value={email}
                    // onChangeText={(text) => setEmail(text)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={{ flex: 1 }}
                  />
                </View>
                {touched.email && errors.email && (
                  <Text style={styles.errorMessage}>{errors.email}</Text>
                )}
              </View>

              <View style={styles.wrapper}>
                <Text style={styles.label}>Password</Text>
                <View
                  style={styles.inputWrapper(
                    touched.password ? COLORS.secondary : COLORS.offwhite
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
                    onFocus={() => {
                      setFieldTouched("password");
                    }}
                    onBlur={() => {
                      setFieldTouched("password", "");
                    }}
                    value={values.password}
                    onChangeText={handleChange("password")}
                    // value={password}
                    // onChangeText={(text) => setPassword(text)}
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
                {touched.password && errors.password && (
                  <Text style={styles.errorMessage}>{errors.password}</Text>
                )}
              </View>

              <Button
                loader={loader}
                title={"L O G I N"}
                onPress={isValid ? handleSubmit : inValidForm}
                isValid={isValid}
              />

              {/* <Button
                loader={loader}
                title={"L O G I N"}
                onPress={() => {
                  if (isValid) {
                    handleSubmit();
                  } else {
                    inValidForm(isValid);
                  }
                }}
                isValid={isValid}
              /> */}

              <Text
                style={styles.registration}
                onPress={() => navigation.navigate("Register")}
              >
                {" "}
                Register{" "}
              </Text>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default LoginPage;
