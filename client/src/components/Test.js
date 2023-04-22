import React, { useContext } from "react";
import { Text, View } from "react-native";
import UserContext from "../contexts/UserContext";

const Test = () => {
    const contextValue = useContext(UserContext);

    return (
        <View>
            <Text>{contextValue}</Text>
        </View>
    );
};

export default Test;
