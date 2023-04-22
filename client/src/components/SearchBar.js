import React, { useState, useRef } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import {
    background,
    black,
    gray_text,
    primary,
    pure_white,
} from "../../assets/colors";
import Icon from "react-native-vector-icons/MaterialIcons";

const SearchBar = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [searchText, setSearchText] = useState("");
    const searchInputRef = useRef(null);

    const handleSearch = () => {};

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
