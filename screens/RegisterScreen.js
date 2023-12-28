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
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import styles from "../constants/loginStyle";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import BackBtn from "../components/BackBtn";
import Button from "../components/Button";
import { API_URL } from "@env";
const RegisterScreen = () => {
    console.log(API_URL)
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
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <LottieView
                        autoPlay
                        ref={animation}
                        style={{ width: "100%", height: SIZES.height / 3.2 }}
                        source={require("../assets/lottie/login.json")}
                    />
                </View>
                <BackBtn onPress={() => navigation.goBack()} />

                <Text style={styles.titleLogin}>Đặt nhà hàng</Text>

                <KeyboardAvoidingView>
                    <View>
                        <View style={styles.wrapper}>
                        <Text style={styles.label}>Họ và tên</Text>
                            <View
                                style={styles.inputWrapper(
                                    COLORS.offwhite
                                )}
                            >
                                <MaterialCommunityIcons
                                    name="face-man-profile"
                                    size={20}
                                    color={COLORS.gray}
                                    style={styles.iconStyle}
                                />

                                <TextInput
                                    placeholder="Nhập họ và tên"
                                    onChangeText={(text) => setName(text)}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    style={{ flex: 1 }}
                                />
                            </View>
                        </View>

                        <View style={styles.wrapper}>
                            <Text style={styles.label}>Email</Text>
                            <View
                                style={styles.inputWrapper(COLORS.offwhite)}
                            >
                                <MaterialCommunityIcons
                                    name="email-outline"
                                    size={20}
                                    color={COLORS.gray}
                                    style={styles.iconStyle}
                                />

                                <TextInput
                                    placeholder="Nhập email"
                                    value={email}
                                    onChangeText={(text) => setEmail(text)}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    style={{ flex: 1 }}
                                />
                            </View>
                        </View>

                        <View style={styles.wrapper}>
                            <Text style={styles.label}>Mật khẩu</Text>
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
                                    placeholder="Nhập mật khẩu"
                                    value={password}
                                    onChangeText={(text) => setPassword(text)}
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
                        </View>

                        <Button
                            title={"ĐĂNG KÝ"}
                            onPress={handleRegister}
                            loader={loader}
                        />
                    </View>
                </KeyboardAvoidingView>
            </View>
        </ScrollView>
    );
};

export default RegisterScreen;
