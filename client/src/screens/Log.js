import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ScrollView,
    TextInput,
} from "react-native";
import { Button, Image, Input } from "react-native-elements";
import {
    background,
    black,
    gray,
    gray_text,
    light_gray,
    primary,
    pure_white,
    white,
} from "../../assets/colors";
import SearchBar from "../components/SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";
import StarRating from "../components/StarRating";
import Line from "../components/Line";
import ProfilePicture from "../components/ProfilePicture";
import * as ImagePicker from "expo-image-picker";
import CustomButton from "../components/CustomButton";
import BackButton from "../components/BackButton";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const Log = ({ navigation }) => {
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setImageUri(result.uri);
        }
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.backContainer}>
                <BackButton navigation={navigation} marginLeft={30} />
            </View>
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
                    <Text style={styles.restaurantName}>Republique</Text>
                    <Text style={styles.light_gray}>
                        Los Angeles, Westwood • April 18
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={pickImage}
                        style={styles.buttonStyle}>
                        <FontAwesome5
                            name="camera"
                            color={white}
                            size={50}
                            solid
                            style={{ marginBottom: 10 }}
                        />
                        <Text style={styles.gray_text}>
                            Please upload or take a picture
                        </Text>
                        <Text style={styles.gray_text}>of the good stuff</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.starContainer}>
                    <StarRating size={30} />
                </View>
                <View style={styles.inputContainerStyle}>
                    <TextInput style={styles.white} editable multiline />
                </View>
                <CustomButton
                    text="Log Entry"
                    text_color={gray_text}
                    button_color={gray}
                />
            </View>
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
    backContainer: {
        marginLeft: 20,
        marginBottom: 10,
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
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: 260,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: gray,
        backgroundColor: black,
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
    starContainer: { margin: 20, alignSelf: "center" },
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

export default Log;
