import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Image } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    background,
    gray_text,
    light_gray,
    primary,
    pure_white,
    white,
    gray,
    black,
} from "../../assets/colors";
import BackButton from "../components/BackButton";
import CustomButton from "../components/CustomButton";
import ProfilePicture from "../components/ProfilePicture";
import SearchBar from "../components/SearchBar";

const AcceptFriends = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.backContainer}>
                <BackButton navigation={navigation} marginLeft={30} />
            </View>
            <View style={styles.subContainer}>
                <Text style={styles.marginContainer}>
                    Connect with Your Peers
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 20,
                    }}>
                    <ProfilePicture />
                    <View
                        style={{
                            width: "80%",
                            flexDirection: "row",
                            marginLeft: 10,
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}>
                        <Text style={styles.name}>otheruser</Text>
                        <TouchableOpacity style={styles.accept}>
                            <Text style={styles.yellow}>Connected</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 20,
                    }}>
                    <ProfilePicture />
                    <View
                        style={{
                            width: "80%",
                            flexDirection: "row",
                            marginLeft: 10,
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}>
                        <Text style={styles.name}>otheruser</Text>
                        <TouchableOpacity style={styles.accept}>
                            <Text style={styles.yellow}>Connected</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 20,
                    }}>
                    <ProfilePicture />
                    <View
                        style={{
                            width: "80%",
                            flexDirection: "row",
                            marginLeft: 10,
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}>
                        <Text style={styles.name}>otheruser</Text>
                        <TouchableOpacity style={styles.accept}>
                            <Text style={styles.yellow}>Connected</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    subContainer: {
        margin: 30,
    },
    yellow: {
        color: primary,
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
    marginContainer: {
        fontSize: 24,
        color: pure_white,
    },
    name: {
        color: pure_white,
        fontSize: 16,
    },
    accept: {
        borderWidth: 1,
        borderColor: primary,
        width: 110,
        paddingVertical: 5,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    entries: {
        color: pure_white,
        fontSize: 12,
    },
    mainButton: {
        backgroundColor: primary,
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 30,
        marginRight: 30,
        borderRadius: 10,
    },
    mainButtonText: {
        fontFamily: "Lora_700Bold",
        fontSize: 14,
    },
});

export default AcceptFriends;
