import { View, StyleSheet } from "react-native";
import { line_color } from "../../assets/colors";

const Line = () => {
    return (
        <View style={styles.lineContainer}>
            <View style={styles.lineStyle}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    lineContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    lineStyle: {
        width: "90%",
        borderBottomWidth: 1,
        borderBottomColor: line_color,
    },
});

export default Line;
