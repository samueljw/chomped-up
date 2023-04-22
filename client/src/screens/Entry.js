import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Image } from "react-native-elements";
import {
    background,
    black,
    gray,
    gray_text,
    light_gray,
    pure_white,
} from "../../assets/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import StarRating from "../components/StarRating";
import Line from "../components/Line";
import ProfilePicture from "../components/ProfilePicture";

const persons = [
    {
        id: "1",
        name: "yo mom",
    },
    {
        id: "2",
        name: "yo mom",
    },
    {
        id: "3",
        name: "yo mom",
    },
    {
        id: "4",
        name: "yo mom",
    },
    {
        id: "5",
        name: "yo mom",
    },
    {
        id: "6",
        name: "yo mom",
    },
];

const Entry = () => {
    return (
        <>
            <SafeAreaView style={styles.mainContainer}>
                <ScrollView>
                    <View style={styles.subContainer}>
                        <View style={styles.topRowContainer}>
                            <ProfilePicture width={80} height={80} />
                            <View style={styles.nameContainer}>
                                <View style={styles.topRowName}>
                                    <Text style={styles.name}>Jane Doe</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.restaurantName}>
                                Republique
                            </Text>
                            <Text style={styles.light_gray}>
                                Los Angeles, Westwood • April 18
                            </Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Image
                                source={require("../../assets/download.jpeg")}
                                style={styles.buttonStyle}
                            />
                        </View>
                        <View style={styles.starContainer}>
                            <StarRating size={30} />
                        </View>
                    </View>
                    <View style={styles.lineContainer}>
                        <Line />
                    </View>
                    <View style={styles.commentContainer}>
                        <View>
                            {persons.map((person) => {
                                return (
                                    <View style={styles.accountContainer}>
                                        <ProfilePicture />
                                        <View
                                            style={
                                                styles.bottomCommentContainer
                                            }>
                                            <View>
                                                <View style={styles.flexRow}>
                                                    <Text
                                                        style={
                                                            styles.accountName
                                                        }>
                                                        {person.name}
                                                    </Text>
                                                    <Text
                                                        style={
                                                            styles.gray_text
                                                        }>
                                                        Today, 10:11 AM
                                                    </Text>
                                                </View>

                                                <Text style={styles.white}>
                                                    omg it looks so good
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: background,
        flex: 1,
    },
    flexRow: {
        flexDirection: "row",
    },
    white: {
        color: pure_white,
    },
    gray: {
        color: gray,
    },
    gray_text: {
        color: gray_text,
    },
    buttonContainer: {
        marginTop: 20,
    },
    buttonStyle: {
        height: 260,
        resizeMode: "cover",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: gray,
    },
    commentContainer: {
        marginLeft: 30,
        marginRight: 30,
    },
    subContainer: {
        marginTop: 10,
        marginLeft: 30,
        marginRight: 30,
    },
    restaurantContainer: {
        marginLeft: 15,
    },
    restaurant: {
        padding: 15,
    },
    topRowContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    topRowName: {
        marginBottom: 12,
    },
    topRowText: {
        flexDirection: "row",
        marginBottom: 8,
    },
    accountName: {
        fontWeight: "600",
        color: pure_white,
        marginRight: 15,
    },
    bold: {
        fontWeight: "bold",
    },
    light_gray: {
        color: light_gray,
    },
    inputContainerStyle: {
        fontSize: 16,
        paddingTop: 7,
        paddingBottom: 10,
        paddingHorizontal: 15,
        backgroundColor: black,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: gray,
        color: pure_white,
        borderRadius: 10,
        height: 120,
    },
    bottomCommentContainer: {
        marginLeft: 15,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    ratingText: {
        marginLeft: 5,
        color: pure_white,
    },
    image: {
        width: 142,
        height: 200,
        resizeMode: "cover",
        borderRadius: 20,
    },
    profileImage: {
        width: 45,
        height: 45,
        borderRadius: 999,
        resizeMode: "cover",
    },
    bottomContainer: {
        margin: 20,
    },
    accountContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
    },
    lineContainer: {
        marginLeft: 10,
        marginRight: 10,
    },
    starContainer: {
        marginTop: 20,
        marginBottom: 20,
    },
    nameContainer: {
        marginLeft: 20,
    },
    name: {
        color: pure_white,
        fontSize: 25,
    },
    text: {
        color: pure_white,
        marginRight: 30,
    },
    restaurantName: {
        color: pure_white,
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 5,
    },
    iconStyle: {
        marginBottom: 15,
    },
});

export default Entry;
