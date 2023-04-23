import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { input_background, gray_text } from '../../assets/colors';

const BackButton = ({ navigation }) => {
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.goBack();
            }}
            style={{
                backgroundColor: input_background,
                width: 30,
                borderRadius: 10,
            }}
        >
            <Icon name="chevron-left" type="evilicon" color={gray_text} size={30} />
        </TouchableOpacity>
    );
};

export default BackButton;
