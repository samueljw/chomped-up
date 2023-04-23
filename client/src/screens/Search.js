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
import UserContext from "../contexts/UserContext";
import { useContext, useRef } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

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
            navigation.navigate("Restaurant", { restaurant: { id: 1 } });
        }}
        style={styles.restaurantContainer}>
        <Image
            source={require("../../assets/download.jpeg")}
            style={styles.image}
        />
        <View style={styles.imageText}>
            <Text style={styles.nameText}>Sun Nong Dan</Text>
            <Text
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}>
                <FontAwesome5 name="star" color={primary} size={12} solid />
                <Text style={{ marginLeft: 10, fontWeight: "600" }}>4.3</Text>
            </Text>
            <Text style={styles.white}>15 friends ate here</Text>
        </View>
    </TouchableOpacity>
);

const Search = ({ navigation }) => {
    return (
        <View style={styles.mainContainer}>
            <ScrollView>
                <View style={{ margin: 20 }}>
                    <SearchBar />
                </View>
                <View style={styles.subContainer}>
                    <Text style={styles.heading}>Popular among friends</Text>
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
                    <Text style={styles.heading}>Restaurants near me</Text>
                    <FlatList
                        horizontal
                        data={dummy_data}
                        renderItem={({ item }) => <Item title={item.title} />}
                        keyExtractor={(item) => item.id}
                    />
                </View>
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
        marginLeft: 15,
        marginBottom: 15,
        fontFamily: "Lora_600SemiBold",
    },
    subContainer: {
        marginTop: 20,
    },
    restaurantContainer: {
        marginLeft: 15,
    },
    restaurant: {
        padding: 15,
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
    nameContainer: {
        marginLeft: 15,
    },
    comment: {
        marginTop: 5,
    },
    imageText: {
        position: "absolute",
        margin: 10,
        bottom: 0,
    },
    nameText: {
        color: pure_white,
        fontSize: 16,
        fontFamily: "Lora_600SemiBold",
    },
});

export default Search;
