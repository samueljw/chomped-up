import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Image } from "react-native-elements";
import {
    background,
    black,
    gray,
    gray_text,
    light_gray,
    primary,
    pure_white,
    red,
} from "../../assets/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import StarRating from "../components/StarRating";
import Line from "../components/Line";
import ProfilePicture from "../components/ProfilePicture";
import BackButton from "../components/BackButton";
import CustomButton from "../components/CustomButton";
import { clearStorage } from "../utils/AsyncStorage";
import UserContext from "../contexts/UserContext";

const Chat = ({ navigation }) => {
    const token = useContext(UserContext);

    return <SafeAreaView style={styles.mainContainer}></SafeAreaView>;
};

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: background,
        flex: 1,
    },
    backContainer: {
        marginLeft: 20,
    },
    centerContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 220,
    },
    buttonContainer: {
        marginHorizontal: 40,
    },
    yellow: {
        color: primary,
    },
    text: {
        fontSize: 16,
        lineHeight: 40,
        color: pure_white,
    },
});

export default Chat;
