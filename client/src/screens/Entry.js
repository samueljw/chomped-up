import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
} from "react-native";
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
import BackButton from "../components/BackButton";
import { convertDate, convertTimeTo12HourFormat } from "../components/Helper";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import { link } from "../api/link";

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

const Entry = ({ navigation, route }) => {
    const contextValue = useContext(UserContext);
    const { restaurant, user, createdAt, caption, postId, profilePicture } =
        route.params;

    const [comments, setComments] = useState({});
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${link}/getComment`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        access_token: contextValue,
                    },
                    body: JSON.stringify({ PostId: postId }),
                });
                const data = await response.json();
                if (data.statusCode !== 200) {
                    throw { name: data };
                } else {
                    setComments(data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [contextValue]);

    const handleInputSubmit = async () => {
        try {
            const response = await fetch(`${link}/postComment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    access_token: contextValue,
                },
                body: JSON.stringify({ PostId: postId, comment: newComment }),
            });
            const data = await response.json();
            if (data.statusCode !== 200) {
                throw { name: data };
            } else {
                setNewComment("");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <SafeAreaView style={styles.mainContainer}>
                <View style={styles.backContainer}>
                    <BackButton navigation={navigation} marginLeft={30} />
                </View>
                <ScrollView>
                    <View style={styles.subContainer}>
                        <View style={styles.topRowContainer}>
                            <ProfilePicture
                                source={profilePicture}
                                width={80}
                                height={80}
                            />
                            <View style={styles.nameContainer}>
                                <View style={styles.topRowName}>
                                    <Text style={styles.name}>
                                        {user?.username}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.restaurantName}>
                                {restaurant?.title}
                            </Text>
                            <Text style={styles.light_gray}>
                                {`${restaurant.location} • ${convertDate(
                                    createdAt
                                )}`}
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
                            {comments?.data?.map((comment, i) => {
                                console.log("dasda", comment);
                                return (
                                    <View
                                        key={i}
                                        style={styles.accountContainer}>
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
                                                        nama orang
                                                    </Text>
                                                    <Text
                                                        style={
                                                            styles.gray_text
                                                        }>
                                                        {convertDate(createdAt)}
                                                        ,{" "}
                                                        {convertTimeTo12HourFormat(
                                                            createdAt
                                                        )}
                                                    </Text>
                                                </View>

                                                <Text style={styles.white}>
                                                    {comment?.comment}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.inputBottom}>
                    <View style={styles.inputContainerStyle}>
                        <TextInput
                            placeholder="Add a comment..."
                            placeholderTextColor={gray}
                            style={styles.white}
                            value={newComment}
                            onChangeText={setNewComment}
                            returnKeyType="done"
                            onSubmitEditing={handleInputSubmit}
                        />
                    </View>
                </View>
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
    backContainer: {
        marginLeft: 20,
        marginBottom: 10,
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
    inputBottom: {
        marginHorizontal: 30,
    },
    inputContainerStyle: {
        fontSize: 16,
        paddingTop: 15,
        paddingHorizontal: 15,
        backgroundColor: black,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: gray,
        color: pure_white,
        borderRadius: 10,
        height: 50,
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
