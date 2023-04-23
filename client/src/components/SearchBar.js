import React, { useState, useRef, useContext } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Image, Text} from "react-native";
import {
    background,
    black,
    gray_text,
    primary,
    pure_white,
} from "../../assets/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import {API_ENDPOINT} from "@env"
import UserContext from "../contexts/UserContext";

const SearchBar = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const searchInputRef = useRef(null);
    const token = useContext(UserContext);

    const handleSearch = async () => {
        try {
            const response = await fetch(
                `${API_ENDPOINT}/getAllResto`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        access_token: token,
                    },
                });
            const data = await response.json();
            setSearchResults(data.data);
        } catch (error) {
            console.error(error);
          }
    };

    const handleIconPress = () => {
        searchInputRef.current.focus();
    };

    return (
        <View style={styles.container}>
            <TextInput
                ref={searchInputRef}
                style={[
                    styles.input,
                    isFocused && styles.inputFocused, // Apply inputFocused style when isFocused is true
                ]}
                placeholder="Search restaurant"
                placeholderTextColor={gray_text}
                onChangeText={setSearchText}
                value={searchText}
                onSubmitEditing={handleSearch}
                onFocus={() => setIsFocused(true)} // Set isFocused to true when input is focused
                onBlur={() => setIsFocused(false)} // Set isFocused to false when input is blurred
            />
            <TouchableOpacity style={styles.icon} onPress={handleIconPress}>
                <Icon
                    name="search"
                    type="evilicon"
                    color={isFocused ? primary : gray_text}
                    size={23}
                />
            </TouchableOpacity>
            {searchResults.map((item, index) => (
                <View key={index}>
                    <Image source={{ uri: item.photo }} style={{ width: 200, height: 200 }} />
                    <Text>{item.title}</Text>
              </View>
            ))}   
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "relative",
        backgroundColor: "transparent",
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
});

export default SearchBar;
