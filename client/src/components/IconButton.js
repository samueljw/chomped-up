import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { input_background, gray_text } from "../../assets/colors";

const IconButton = ({ icon_name, screen, navigation }) => {
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate(screen);
            }}
            style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: input_background,
                width: 30,
                height: 30,
                borderRadius: 10,
                marginLeft: 10,
            }}>
            <Icon name={icon_name} color={gray_text} size={15} />
        </TouchableOpacity>
    );
};

export default IconButton;
