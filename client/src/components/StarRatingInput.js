import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Stars from "react-native-stars";
import { white } from "../../assets/colors";

const StarRatingInput = ({ size = 12, rating = 5, style }) => {
    const halfStar = rating % 1 === 0.5;
    const fullStars = halfStar ? rating - 0.5 : rating;

    return (
        <View style={{ alignItems: "center" }}>
            <Stars
                default={2.5}
                count={5}
                half={true}
                starSize={50}
                fullStar={<Icon name={"star"} style={[styles.myStarStyle]} />}
                emptyStar={
                    <Icon
                        name={"star-outline"}
                        style={[styles.myStarStyle, styles.myEmptyStarStyle]}
                    />
                }
                halfStar={
                    <Icon name={"star-half"} style={[styles.myStarStyle]} />
                }
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
