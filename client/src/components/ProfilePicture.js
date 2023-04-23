import { Image } from "react-native-elements";

const ProfilePicture = ({ source, width = 45, height = 45 }) => {
    return (
        <Image
            source={{
                uri: source,
            }}
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
