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
} from '../../assets/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import StarRating from '../components/StarRating';
import ProfilePicture from '../components/ProfilePicture';
import CravingItem from '../components/CravingItem';

const craving_data = [
    {
        id: '1',
        restaurant: 'Kazunori',
    },
    {
        id: '2',
        restaurant: 'Gogobop',
    },
    {
        id: '3',
        restaurant: 'Cava',
    },
    {
        id: '4',
        restaurant: 'Dennys',
    },
];

const list_data = [
    {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "First Item",
    },
    {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        title: "Second Item",
    },
    {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        title: "Third Item",
    },
];

const Item = ({ title, navigation }) => (
    <View style={styles.restaurantContainer}>
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("Restaurant");
            }}
            style={styles.restaurant}>
            <Text style={{ ...styles.restaurantTitle, ...styles.white }}>
                Republique
            </Text>
            <View style={styles.topRowContainer}>
                <Text style={{ ...styles.light_gray, ...styles.location }}>
                    Los Angeles, Westwood • April 18
                </Text>
                <View style={styles.ratingContainer}>
                    <FontAwesome5 name="star" color={primary} size={12} solid />
                    <Text style={styles.ratingText}>4.8</Text>
                </View>
            </View>
        </TouchableOpacity>
        <View style={{ width: 400, height: 300 }}>
            <Image
                source={require("../../assets/download.jpeg")}
                style={styles.image}
            />
        </View>
        <View style={styles.bottomContainer}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Profile");
                }}
                style={styles.accountContainer}>
                <ProfilePicture />
                <View style={styles.nameContainer}>
                    <View>
                        <Text style={styles.white}>Hello</Text>
                        <StarRating style={styles.ratingBar} />
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Entry");
                }}>
                <Text style={styles.white}>
                    Yo mama fat Yo mama fat Yo mama fat Yo mama fat Yo mama fat
                    Yo mama fat Yo mama fat
                </Text>
                <Text style={styles.comment}>Add a comment...</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const Feed = ({ navigation }) => {
    return (
        <View style={styles.mainContainer}>
            <ScrollView style={styles.subContainer}>
                <Text style={{ ...styles.cravingText, ...styles.white }}>
                    What your friends have been craving
                </Text>
                <FlatList
                    data={craving_data}
                    renderItem={({ item }) => <CravingItem restaurant={item.restaurant} />}
                    keyExtractor={(item) => item.id}
                    horizontal={true}
                    style={styles.cravingContainer}
                />
                <FlatList
                    data={list_data}
                    renderItem={({ item }) => <Item title={item.title} navigation={navigation} />}
                    keyExtractor={(item) => item.id}
                />
                <View style={{ width: '100%', height: 150 }} />
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
        marginRight: 15,
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
        fontFamily: 'Lora_600SemiBold',
        fontSize: 18,
        marginTop: 20,
    },
    cravingContainer: {
        marginTop: 15,
        height: 180,
    },
});

export default Feed;
