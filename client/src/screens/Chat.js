import React, { useContext, useRef, useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from "react-native";
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
import Icon from "react-native-vector-icons/MaterialIcons";
import { link } from "../api/link";
import AnimatedLoader from "react-native-animated-loader";

const Chat = ({ navigation }) => {
    const token = useContext(UserContext);
    const [isFocused, setIsFocused] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState({});
    const searchInputRef = useRef(null);

    const [visible, setVisible] = useState(false);

    const handleSearch = () => {
        setVisible(true);
        fetch(`${link}/googleSearch`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                access_token: token,
            },
            body: JSON.stringify({ query: searchText }),
        })
            .then((response) => response.json())
            .then((data) => {
                setSearchText("");
                if (data.statusCode !== 200) {
                    throw { name: data };
                } else {
                    setSearchResults(data);
                }
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setVisible(false);
            });
    };

    const handleIconPress = () => {
        searchInputRef.current.focus();
    };

    return (
        <View style={styles.mainContainer}>
            <View style={{ margin: 30 }}>
                <AnimatedLoader
                    visible={visible}
                    overlayColor="rgba(255,255,255,0.75)"
                    animationStyle={styles.lottie}
                    speed={1}>
                    <Text>Typing...</Text>
                </AnimatedLoader>
                <Text style={styles.white}>{searchResults?.data}</Text>
            </View>
            <View style={{ position: "absolute", width: "100%", bottom: 0 }}>
                <View style={styles.container}>
                    <TextInput
                        ref={searchInputRef}
                        style={[
                            styles.input,
                            isFocused && styles.inputFocused, // Apply inputFocused style when isFocused is true
                        ]}
                        placeholderTextColor={gray_text}
                        onChangeText={setSearchText}
                        value={searchText}
                        onSubmitEditing={handleSearch}
                        onFocus={() => setIsFocused(true)} // Set isFocused to true when input is focused
                        onBlur={() => setIsFocused(false)} // Set isFocused to false when input is blurred
                    />
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={handleIconPress}>
                        <Icon
                            name="search"
                            type="evilicon"
                            color={isFocused ? primary : gray_text}
                            size={23}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
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
    white: {
        color: pure_white,
    },
    text: {
        fontSize: 16,
        lineHeight: 40,
        color: pure_white,
    },
    container: {
        position: "relative",
        backgroundColor: "transparent",
        margin: 20,
    },
    input: {
        height: 50,
        borderRadius: 8,
        backgroundColor: black,
        paddingHorizontal: 16,
        color: pure_white,
        borderWidth: 1, // Add border width
        borderColor: black, // Set initial border color
    },
    icon: {
        position: "absolute",
        top: 14,
        right: 18,
        width: 20,
        height: 20,
        resizeMode: "contain",
    },
    inputFocused: {
        borderColor: primary, // Set border color to primary color when focused
    },
    image: {
        width: "100%",
        height: 200,
        resizeMode: "cover",
        borderRadius: 20,
    },
    restaurantContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    imageText: {
        position: "absolute",
        margin: 10,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    names: {
        color: "#fff",
    },
    lottie: {
        width: 40,
        height: 40,
    },
});

export default Chat;
