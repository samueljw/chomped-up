import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import StarRating from "react-native-star-rating-widget";
import { icon_unselected, primary, white } from "../../assets/colors";
import { useState } from "react";

const StarRatingInput = ({ rating, setRating }) => {
    return (
        <View style={{ alignItems: "center" }}>
            <StarRating
                rating={rating}
                onChange={setRating}
                starSize={40}
                color={primary}
                emptyColor={icon_unselected}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    star: {
        flexDirection: "row",
    },
});

export default StarRatingInput;
