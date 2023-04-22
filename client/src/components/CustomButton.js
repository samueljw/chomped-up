import { Button } from "react-native-elements";

const CustomButton = ({ text, text_color, button_color }) => {
    return (
        <Button
            title={text}
            titleStyle={{ color: text_color }}
            buttonStyle={{
                height: 40,
                marginTop: 20,
                borderRadius: 10,
                backgroundColor: button_color,
            }}
        />
    );
};

export default CustomButton;
