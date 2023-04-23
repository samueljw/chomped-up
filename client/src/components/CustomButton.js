import { Button } from 'react-native-elements';
import { gray, gray_text, bright_yellow, black } from '../../assets/colors';

const CustomButton = ({ text, disabled, onPress }) => {
    return (
        <Button
            disabled={disabled}
            title={text}
            titleStyle={{ color: disabled ? gray_text : black, fontFamily: 'Lora_600SemiBold' }}
            buttonStyle={{
                height: 40,
                marginTop: 20,
                borderRadius: 10,
                backgroundColor: disabled ? gray : bright_yellow,
            }}
            onPress={onPress}
        />
    );
};

export default CustomButton;
