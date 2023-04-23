import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
} from "react-native";
import { Image } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

import {
    background,
    gray_text,
    light_gray,
    primary,
    pure_white,
    white,
} from "../../assets/colors";
import StarRating from "../components/StarRating";
import Line from "../components/Line";
import ProfilePicture from "../components/ProfilePicture";
import Overlay from "../components/Overlay";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import { link } from "../api/link";

const PastPost = ({ navigation, restaurant }) => (
    <TouchableOpacity
        onPress={() => {
            navigation.navigate("Restaurant", { restaurant });
        }}
        style={styles.restaurantContainer}>
        <Image source={{ uri: restaurant?.photo }} style={styles.image} />
        <Overlay bottom={true} borderRadius={20} alpha={0.7} />
        <View style={styles.imageText}>
            <Text style={{ ...styles.itemText, ...styles.white }}>
                {restaurant?.title}
            </Text>
            {true && (
                <StarRating
                    size={10}
                    style={{ marginVertical: 5 }}
                    rating={5}
                />
            )}
        </View>
    </TouchableOpacity>
);

const RestaurantCard = ({ navigation, restaurant }) => (
    <TouchableOpacity
        onPress={() => {
            navigation.navigate("Restaurant", { restaurant });
        }}
        style={styles.restaurantContainer}>
        <Image source={{ uri: restaurant?.photo }} style={styles.image} />
        <Overlay bottom={true} borderRadius={20} alpha={0.7} />
        <View style={styles.imageText}>
            <Text style={{ ...styles.itemText, ...styles.white }}>
                {restaurant?.title}
            </Text>
            {true && (
                <StarRating
                    size={10}
                    style={{ marginVertical: 5 }}
                    rating={5}
                />
            )}
        </View>
    </TouchableOpacity>
);

const Profile = ({ navigation, route }) => {
    const parameter = route.params;
    const [user, setUser] = useState({});
    const contextValue = useContext(UserContext);

    useEffect(() => {
        if (parameter !== undefined) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`${link}/getOneUser`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            access_token: contextValue,
                        },
                        body: JSON.stringify({ UserId: parameter.id }),
                    });
                    const data = await response.json();
                    if (data.statusCode !== 200) {
                        throw { name: data };
                    } else {
                        setUser(data);
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData();
        } else {
            const fetchData = async () => {
                try {
                    const response = await fetch(`${link}/getPersonalData`, {
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
                        setUser(data);
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData();
        }
    }, [contextValue]);

    return (
        <View style={styles.mainContainer}>
            <View style={styles.topRowContainer}>
                <ProfilePicture
                    source={user?.data?.profilePicture}
                    width={80}
                    height={80}
                />
                <View style={styles.bioContainer}>
                    <View style={styles.topRowName}>
                        <Text style={styles.name}>{user?.data?.username}</Text>
                    </View>
                    <View style={styles.topRowText}>
                        <Text style={styles.light_gray}>{user?.data?.bio}</Text>
                    </View>
                </View>
            </View>
            <Line />
            <ScrollView>
                <View style={styles.subContainer}>
                    <Text style={styles.heading}>Current craving</Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Restaurant", {
                                restaurant: user?.data?.Restaurant,
                            });
                        }}>
                        <ImageBackground
                            source={{
                                uri: user?.data?.Restaurant?.photo,
                            }}
                            style={styles.cravingImage}
                            imageStyle={{ borderRadius: 20 }}>
                            <Overlay
                                bottom={true}
                                borderRadius={20}
                                alpha={0.9}
                            />
                            <Text
                                style={{
                                    ...styles.cravingRestaurant,
                                    ...styles.white,
                                }}>
                                {user?.data?.Restaurant?.title}
                            </Text>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
                <View style={styles.subContainer}>
                    <Text style={styles.heading}>
                        Recent restaurant entries
                    </Text>
                    <FlatList
                        horizontal
                        data={user?.pastPost}
                        renderItem={({ item }) => (
                            <PastPost
                                navigation={navigation}
                                restaurant={item}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </View>
                <View style={styles.subContainer}>
                    <Text style={styles.heading}>Restaurant wishlist</Text>
                    <FlatList
                        horizontal
                        data={user?.wishlist}
                        renderItem={({ item }) => (
                            <RestaurantCard
                                navigation={navigation}
                                restaurant={item.Restaurant}
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
    heading: {
        color: pure_white,
        fontSize: 20,
        fontFamily: "Lora_600SemiBold",
        marginBottom: 15,
    },
    subContainer: {
        marginTop: 30,
        marginLeft: 15,
    },
    restaurantContainer: {
        marginRight: 15,
        width: 142,
        height: 200,
    },
    topRowContainer: {
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 20,
        marginHorizontal: 15,
        width: "100%",
    },
    topRowName: {
        marginBottom: 6,
    },
    topRowText: {
        flexDirection: "row",
        marginBottom: 8,
    },
    bold: {
        fontWeight: "bold",
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
        width: "100%",
        height: "100%",
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
        marginBottom: 15,
    },
    starContainer: {
        flexDirection: "row",
    },
    star: {
        flexDirection: "row",
    },
    comment: {
        marginTop: 5,
    },
    imageText: {
        position: "absolute",
        margin: 10,
        bottom: 0,
    },
    bioContainer: {
        marginLeft: 20,
        flex: 1,
        alignItems: "stretch",
    },
    name: {
        color: pure_white,
        fontSize: 26,
        fontFamily: "Lora_600SemiBold",
    },
    text: {
        color: pure_white,
        marginRight: 15,
    },
    cravingImage: {
        width: "100%",
        height: 120,
        flex: 1,
        justifyContent: "flex-end",
        paddingLeft: 15,
        paddingBottom: 15,
    },
    cravingRestaurant: {
        fontSize: 22,
        fontFamily: "Lora_600SemiBold",
    },
    itemText: {
        fontFamily: "Lora_700Bold",
        fontSize: 16,
    },
});

export default Profile;
