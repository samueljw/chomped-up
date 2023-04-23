import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { white } from "../../assets/colors";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";

const CravingItem = ({ navigation, restaurant, id }) => {
    console.log("user id", id);

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("Profile", { id })}
            style={styles.wrapper}>
            <ImageBackground
                source={require("../../assets/download.jpeg")}
                resizeMode={"cover"}
                imageStyle={{ borderRadius: 10 }}
                style={styles.backdrop}>
                <LinearGradient
                    colors={["transparent", "rgba(0, 0, 0, 0.9)"]}
                    style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: "100%",
                        height: "100%",
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                    }}
                />
                <View style={styles.container}>
                    <Image
                        source={require("../../assets/download.jpeg")}
                        style={styles.profile}
                    />
                    <Text style={styles.restaurant}>{restaurant?.title}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: 120,
        height: "100%",
        borderRadius: 20,
        marginRight: 15,
    },
    backdrop: {
        width: "100%",
        height: "100%",
    },
    container: {
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 20,
        justifyContent: "space-between",
        flex: 1,
    },
    profile: {
        borderRadius: 100 / 2,
        borderWidth: 1,
        borderColor: white,
        width: 50,
        height: 50,
        resizeMode: "cover",
    },
    restaurant: {
        fontSize: 18,
        fontFamily: "Lora_700Bold",
        color: white,
    },
});

export default CravingItem;
