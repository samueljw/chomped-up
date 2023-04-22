import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Alert,
} from "react-native";
import axios from "axios";
import { Image } from "react-native-elements";
import {
    pure_white,
    bright_yellow,
    input_background,
    gray,
    gray_text,
} from "../../assets/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "../components/CustomInput";
import { useState } from "react";

const Register = ({ navigation }) => {
    // user
    const [userData, setUserData] = useState({
        email: "",
        password: "",
        username: "",
    });

    const updateEmail = (newEmail) => {
        setUserData({
            ...userData,
            email: newEmail,
        });
    };

    const updateUserName = (newUserName) => {
        setUserData({
            ...userData,
            username: newUserName,
        });
    };

    const updatePassword = (newPassword) => {
        setUserData({
            ...userData,
            password: newPassword,
        });
    };

    // //error toggle
    // const [error, setError] = useState({
    //     email: false,
    //     password: false,
    //     username: false,
    // });

    // const updateErrorEmail = (newErrorEmail) => {
    //     setError({
    //         ...error,
    //         email: newErrorEmail,
    //     });
    // };

    // //error text
    // const [errorText, setErrorText] = useState({
    //     email: "",
    //     password: "",
    //     username: "",
    // });

    // const updateErrorEmailText = (newErrorEmailText) => {
    //     setErrorText({
    //         ...errorText,
    //         email: newErrorEmailText,
    //     });
    // };

    return (
        <View style={styles.outerWrapper}>
            <View style={styles.backdropWrapper}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require("../../assets/register-bg.png")}
                        style={styles.backdropImage}
                    />
                </View>
            </View>
            <SafeAreaView style={styles.mainContainer}>
                <View style={styles.subContainer}>
                    <Text style={{ ...styles.welcomeTitle, ...styles.white }}>
                        You're on to a{" "}
                        <Text
                            style={{
                                ...styles.yellow,
                                ...styles.welcomeTitleSpan,
                            }}>
                            {`\t\t\t\t\tDelicious`}
                        </Text>{" "}
                        Start!
                    </Text>
                    <CustomInput
                        data={userData.email}
                        setData={updateEmail}
                        text="Email"
                    />
                    <CustomInput
                        data={userData.username}
                        setData={updateUserName}
                        text="Username"
                    />
                    <CustomInput
                        data={userData.password}
                        setData={updatePassword}
                        text="Password"
                        password={true}
                    />
                    <TouchableOpacity
                        style={styles.mainButton}
                        onPress={async () => {
                            try {
                                const response = await fetch(
                                    "https://7ce0-169-232-83-79.ngrok.io/register",
                                    {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify(userData),
                                    }
                                );
                                const data = await response.json();
                                if (data.statusCode !== 200) {
                                    throw { name: data };
                                } else {
                                    setUserData({
                                        email: "",
                                        password: "",
                                        username: "",
                                    });
                                    navigation.navigate("Login");
                                }
                            } catch (error) {
                                Alert.alert(
                                    "Alert",
                                    error.name.error.message,
                                    [
                                        {
                                            text: "Close Alert",
                                            onPress: () =>
                                                console.log("OK Pressed"),
                                        },
                                    ],
                                    { cancelable: false }
                                );
                                setUserData({
                                    ...userData,
                                    password: "",
                                });
                            }
                        }}>
                        <Text style={styles.mainButtonText}>Register</Text>
                    </TouchableOpacity>
                    <View style={styles.loginContainer}>
                        <Text
                            style={{
                                ...styles.loginText,
                                ...styles.white,
                            }}>
                            {`Have an account already? `}
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("Login");
                            }}>
                            <Text
                                style={{
                                    ...styles.loginButton,
                                    ...styles.yellow,
                                }}>
                                Log In
                            </Text>
                        </TouchableOpacity>
                        <Text
                            style={{
                                ...styles.loginText,
                                ...styles.white,
                            }}>
                            {" "}
                            here
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    outerWrapper: {
        width: "100%",
        flex: 1,
    },
    mainContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "#000000",
        flex: 1,
    },
    white: {
        color: pure_white,
    },
    yellow: {
        color: bright_yellow,
    },
    subContainer: {
        marginLeft: 30,
        marginRight: 30,
        flex: 1,
        top: -240,
    },
    backdropWrapper: {
        position: "relative",
        width: "100%",
        height: 590,
    },
    imageContainer: {
        height: "100%",
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
    },
    backdropImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    welcomeTitle: {
        fontFamily: "Lora_500Medium",
        fontSize: 36,
        textAlign: "center",
    },
    welcomeTitleSpan: {
        fontFamily: "Lora_600SemiBold",
    },
    taglines: {
        fontFamily: "Inter_400Regular",
        fontSize: 14,
        textAlign: "center",
        lineHeight: 24,
        marginTop: 30,
    },
    mainButton: {
        backgroundColor: bright_yellow,
        width: "100%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        marginTop: 30,
    },
    mainButtonText: {
        fontFamily: "Lora_700Bold",
        fontSize: 18,
    },
    loginText: {
        fontFamily: "Lora_400Regular",
        fontSize: 14,
        marginTop: 15,
    },
    loginButton: {
        fontFamily: "Lora_600SemiBold",
        textDecorationLine: "underline",
        marginTop: 15,
    },
    loginContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default Register;
