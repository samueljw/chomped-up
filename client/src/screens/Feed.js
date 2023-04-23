import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Image } from "react-native-elements";
import {
    background,
    black,
    gray_text,
    light_gray,
    primary,
    pure_white,
    white,
} from "../../assets/colors";
import StarRating from "../components/StarRating";
import ProfilePicture from "../components/ProfilePicture";
import CravingItem from "../components/CravingItem";
import { useContext, useEffect, useState } from "react";
import { link } from "../api/link";
import UserContext from "../contexts/UserContext";
import { convertDate } from "../components/Helper";

const Item = ({
    navigation,
    restaurant,
    user,
    createdAt,
    caption,
    postId,
    id,
    profilePicture,
}) => {
    return (
        <View style={styles.restaurantContainer}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Restaurant", {
                        restaurant,
                    });
                }}
                style={styles.restaurant}>
                <Text style={{ ...styles.restaurantTitle, ...styles.white }}>
                    {restaurant?.title}
                </Text>
                <View style={styles.topRowContainer}>
                    <Text style={{ ...styles.light_gray, ...styles.location }}>
                        {`${restaurant.location} • ${convertDate(createdAt)}`}
                    </Text>
                </View>
            </TouchableOpacity>
            <View style={{ width: 400, height: 300 }}>
                <Image
                    source={{ uri: restaurant?.photo }}
                    style={styles.image}
                />
            </View>
            <View style={styles.bottomContainer}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Profile", { id });
                    }}
                    style={styles.accountContainer}>
                    <ProfilePicture source={profilePicture} />
                    <View style={styles.nameContainer}>
                        <View>
                            <Text style={styles.white}>{user?.username}</Text>
                            <StarRating style={styles.ratingBar} />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Entry", {
                            restaurant,
                            user,
                            createdAt,
                            caption,
                            postId,
                            profilePicture,
                        });
                    }}>
                    <Text style={styles.white}>{caption}</Text>
                    <Text style={styles.comment}>Add a comment...</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const Feed = ({ navigation }) => {
    const contextValue = useContext(UserContext);
    const [friendsPost, setFriendsPost] = useState({});
    const [cravings, setCravings] = useState({});

    console.log("crave", cravings?.data);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${link}/getFriendsCraving`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        access_token: contextValue,
                    },
                });
                const data = await response.json();
                if (data.statusCode !== 200) {
                    throw { name: data };
                } else {
                    setCravings(data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [contextValue]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${link}/getFriendsPosts`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        access_token: contextValue,
                    },
                });
                const data = await response.json();
                if (data.statusCode !== 200) {
                    throw { name: data };
                } else {
                    setFriendsPost(data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [contextValue]);

    console.log(friendsPost?.data);

    return (
        <View style={styles.mainContainer}>
            <ScrollView style={styles.subContainer}>
                <Text style={{ ...styles.cravingText, ...styles.white }}>
                    What your friends have been craving
                </Text>
                <FlatList
                    data={cravings?.data}
                    renderItem={({ item }) => (
                        <CravingItem
                            navigation={navigation}
                            restaurant={item.Restaurant}
                            id={item.id}
                            profilePicture={item.profilePicture}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    horizontal={true}
                    style={styles.cravingContainer}
                />
                <View style={{ marginRight: 15 }}>
                    <FlatList
                        data={friendsPost?.data}
                        renderItem={({ item }) => (
                            <Item
                                navigation={navigation}
                                title={item.title}
                                restaurant={item.Restaurant}
                                user={item.User}
                                createdAt={item.createdAt}
                                caption={item.caption}
                                postId={item.id}
                                id={item.id}
                                profilePicture={item.User.profilePicture}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </View>
                <View style={{ width: "100%", height: 150 }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: background,
        flex: 1,
    },
    white: {
        color: pure_white,
    },
    light_gray: {
        color: light_gray,
    },
    gray_text: {
        color: gray_text,
    },
    subContainer: {
        marginLeft: 15,
    },
    restaurantContainer: {
        backgroundColor: black,
        marginTop: 20,
        borderRadius: 15,
    },
    restaurant: {
        padding: 15,
    },
    restaurantTitle: {
        fontFamily: "Lora_700Bold",
        fontSize: 22,
    },
    location: {
        fontSize: 12,
        marginTop: 5,
    },
    topRowContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
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
        width: 400,
        height: 300,
        resizeMode: "cover",
    },
    bottomContainer: {
        margin: 20,
    },
    accountContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    ratingBar: {
        marginTop: 5,
    },
    nameContainer: {
        marginLeft: 15,
    },
    comment: {
        marginTop: 5,
        color: gray_text,
    },
    cravingText: {
        fontFamily: "Lora_600SemiBold",
        fontSize: 18,
        marginTop: 20,
    },
    cravingContainer: {
        marginTop: 15,
        height: 180,
    },
});

export default Feed;
