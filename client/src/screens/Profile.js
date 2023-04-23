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

const dummy_data = [
    {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "Manpuku Japanese BBQ",
        rating: 4.5,
        image: "https://firebasestorage.googleapis.com/v0/b/chomped-up.appspot.com/o/restaurants%2Fmanpuku.jpeg?alt=media&token=560c171d-cc88-4362-a3d1-7962ed305b05",
    },
    {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        title: "Tsujita Artisan Noodles",
        rating: 2,
        image: "https://firebasestorage.googleapis.com/v0/b/chomped-up.appspot.com/o/restaurants%2Ftsujitaartisan.jpg?alt=media&token=338af239-80a5-4ecc-9f29-5284f6c3aeee",
    },
    {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        title: "Sea Salt Poke",
        rating: 5,
        image: "https://firebasestorage.googleapis.com/v0/b/chomped-up.appspot.com/o/restaurants%2Fseasaltpoke.jpeg?alt=media&token=efc28f96-d245-4810-a523-9dcc40221da9",
    },
];

const RestaurantCard = ({ navigation, restaurant }) => (
    <TouchableOpacity
        onPress={() => {
            navigation.navigate("Restaurant");
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

    console.log("user", user);

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
                    source={user?.data?.ProfilePicture}
                    width={80}
                    height={80}
                />
                <View style={styles.bioContainer}>
                    <View style={styles.topRowName}>
                        <Text style={styles.name}>{user?.data?.username}</Text>
                    </View>
                    <View style={styles.topRowText}>
                        <Text style={styles.text}>
                            <Text style={styles.bold}>15 </Text> friends
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.bold}>32 </Text> restaurant
                            entries
                        </Text>
                    </View>
                    <View style={styles.topRowText}>
                        <Text style={styles.text}>
                            <Text style={styles.bold}>102 </Text> in wishlist
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.bold}>20 </Text> this year
                        </Text>
                    </View>
                    <View style={styles.topRowText}>
                        <Text style={styles.light_gray}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nam imperdiet, tellus in mattis fermentum,
                            justo enim posuere ipsum.
                        </Text>
                    </View>
                </View>
            </View>
            <Line />
            <ScrollView>
                <View style={styles.subContainer}>
                    <Text style={styles.heading}>Current craving</Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Restaurant");
                        }}>
                        <ImageBackground
                            source={{
                                uri: "https://firebasestorage.googleapis.com/v0/b/chomped-up.appspot.com/o/restaurants%2Ffuraibo.jpeg?alt=media&token=a8bba8bb-8988-4c65-94a0-4663f6e8e30d",
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
                                Furaibo
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
                            <RestaurantCard
                                title={item.title}
                                rating={item.rating}
                                navigation={navigation}
                                image={item.image}
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
        marginBottom: 12,
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
