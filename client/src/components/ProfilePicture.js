import { Image } from "react-native-elements";

const ProfilePicture = ({
    source = "https://firebasestorage.googleapis.com/v0/b/chomped-up.appspot.com/o/profilepictures%2Fperson13.jpg?alt=media&token=c00c2851-c7f9-4ecb-bacf-9675cd69483c",
    width = 45,
    height = 45,
}) => {
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
