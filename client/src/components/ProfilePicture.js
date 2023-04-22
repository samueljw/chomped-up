import { Image } from "react-native-elements";

const ProfilePicture = ({ width = 45, height = 45 }) => {
    return (
        <Image
            source={require("../../assets/download.jpeg")}
            style={{
                width: width,
                height: height,
                borderRadius: 999,
                resizeMode: "cover",
            }}
        />
    );
};

export default ProfilePicture;
