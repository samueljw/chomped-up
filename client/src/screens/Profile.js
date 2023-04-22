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
    gray_text,
    light_gray,
    primary,
    pure_white,
    white,
} from "../../assets/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import SearchBar from "../components/SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";
import StarRating from "../components/StarRating";
import Line from "../components/Line";
import ProfilePicture from "../components/ProfilePicture";

const dummy_data = [
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

const Item = ({ navigation }) => (
    <TouchableOpacity
        onPress={() => {
            navigation.navigate("Restaurant");
        }}
        style={styles.restaurantContainer}>
        <Image
            source={require("../../assets/download.jpeg")}
            style={styles.image}
        />
        <View style={styles.imageText}>
            <Text>Sun Nong Dan</Text>
            <StarRating />
        </View>
    </TouchableOpacity>
);

const Profile = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.topRowContainer}>
                <ProfilePicture width={80} height={80} />
                <View style={styles.nameContainer}>
                    <View style={styles.topRowName}>
                        <Text style={styles.name}>Jane Doe</Text>
                    </View>
                    <View style={styles.topRowText}>
                        <Text style={styles.text}>
                            <Text style={styles.bold}>15 </Text>mutual friends
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.bold}>32 </Text>restaurant
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
                        <Text style={styles.light_gray}>Description</Text>
                    </View>
                </View>
            </View>
            <Line />
            <ScrollView>
                <View style={styles.subContainer}>
                    <Text style={styles.heading}>
                        Recent restaurant entries
                    </Text>
                    <FlatList
                        horizontal
                        data={dummy_data}
                        renderItem={({ item }) => (
                            <Item title={item.title} navigation={navigation} />
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </View>
                <View style={styles.subContainer}>
                    <Text style={styles.heading}>Restaurant wishlist</Text>
                    <FlatList
                        horizontal
                        data={dummy_data}
                        renderItem={({ item }) => (
                            <Item title={item.title} navigation={navigation} />
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
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
        marginLeft: 15,
        marginBottom: 15,
    },
    subContainer: {
        marginTop: 30,
    },
    restaurantContainer: {
        marginLeft: 15,
    },
    restaurant: {
        padding: 15,
    },
    topRowContainer: {
        flexDirection: "row",
        marginLeft: 20,
        marginBottom: 20,
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
    nameContainer: {
        marginLeft: 20,
    },
    name: {
        color: pure_white,
        fontSize: 25,
    },
    text: {
        color: pure_white,
        marginRight: 15,
    },
});

export default Profile;
