import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import {
    gray_text,
    input_background,
    primary,
    pure_white,
} from "../../assets/colors";

const CustomInput = ({ text = "Input" }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <>
            <Text style={styles.inputTitle}>{text}</Text>
            <View
                style={[
                    styles.inputContainerStyle,
                    isFocused ? styles.inputFocused : null,
                ]}>
                <TextInput
                    style={styles.input}
                    editable
                    multiline
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    inputTitle: {
        marginTop: 10,
        color: gray_text,
    },
    inputContainerStyle: {
        width: "100%",
        fontSize: 16,
        paddingTop: 7,
        paddingBottom: 10,
        paddingHorizontal: 15,
        backgroundColor: input_background,
        borderRadius: 5,
        color: pure_white,
        borderRadius: 10,
        height: 40,
        borderWidth: 1,
    },
    inputFocused: {
        borderColor: primary,
    },
    input: {
        color: pure_white,
    },
});

export default CustomInput;
