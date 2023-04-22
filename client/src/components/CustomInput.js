import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import {
    gray_text,
    input_background,
    primary,
    pure_white,
    red,
} from "../../assets/colors";

const CustomInput = ({
    text = "Input",
    data,
    setData,
    password,
    toggleError,
    errorText,
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <View>
            <Text style={styles.inputTitle}>{text}</Text>
            <View
                style={[
                    styles.inputContainerStyle,
                    isFocused ? styles.inputFocused : null,
                ]}>
                <TextInput
                    secureTextEntry={password ? true : false}
                    value={data}
                    onChangeText={(text) => setData(text)}
                    style={styles.input}
                    autoCapitalize="none"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </View>
            {/* {toggleError ? (
                <Text style={styles.errorStyle}>{errorText}</Text>
            ) : (
                <></>
            )} */}
        </View>
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
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: input_background,
        borderRadius: 5,
        color: pure_white,
        borderRadius: 10,
        borderWidth: 1,
    },
    inputFocused: {
        borderColor: primary,
    },
    input: {
        color: pure_white,
    },
    errorStyle: {
        position: "absolute",
        color: red,
        bottom: -13,
        fontSize: 10,
    },
});

export default CustomInput;
