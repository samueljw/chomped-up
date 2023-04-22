import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { primary } from "../../assets/colors";

const StarRating = ({ size = 15 }) => {
    return (
        <View style={styles.star}>
            <Icon name="grade" type="evilicon" color={primary} size={size} />
            <Icon name="grade" type="evilicon" color={primary} size={size} />
            <Icon name="grade" type="evilicon" color={primary} size={size} />
            <Icon name="grade" type="evilicon" color={primary} size={size} />
            <Icon name="grade" type="evilicon" color={primary} size={size} />
        </View>
    );
};

const styles = StyleSheet.create({
    star: {
        flexDirection: "row",
    },
});

export default StarRating;
