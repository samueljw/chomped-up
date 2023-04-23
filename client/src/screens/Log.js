import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    Platform,
    KeyboardAvoidingView,
} from 'react-native';
import { useState, useContext, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import 'react-native-get-random-values';
import { v4 } from 'uuid';
import ApiCaller from '../api/ApiCaller';

import {
    background,
    black,
    gray,
    gray_text,
    light_gray,
    pure_white,
    white,
} from '../../assets/colors';
import ProfilePicture from '../components/ProfilePicture';
import CustomButton from '../components/CustomButton';
import BackButton from '../components/BackButton';
import StarRatingInput from '../components/StarRatingInput';
import UserContext from '../contexts/UserContext';

const Log = ({ navigation, route }) => {
    const [imageData, setImageData] = useState('');
    const [localUri, setLocalUri] = useState('');
    const [rating, setRating] = useState(0);
    const [caption, setCaption] = useState('');
    const [uploading, setUploading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const { restaurant } = route.params;
    const token = useContext(UserContext);

    useEffect(() => {
        if (localUri !== '' && rating !== 0 && caption !== '') {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [localUri, rating, caption]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        setLocalUri(result.uri);
        setImageData(result);
    };

    const handleImagePicked = async (pickerResult) => {
        try {
            setUploading(true);

            if (!pickerResult.cancelled) {
                const uploadUrl = await uploadImageAsync(pickerResult.uri);
                const reqBody = {
                    photo: uploadUrl,
                    caption: caption,
                    title: '',
                    rating: rating,
                    RestoId: restaurant.id,
                };

                try {
                    await ApiCaller('/postPosts', token, reqBody);
                    navigation.navigate('Profile');
                } catch (e) {
                    console.log('ERROR', e);
                }
            }
        } catch (e) {
            console.log(e);
            alert('Upload failed, sorry :(');
        } finally {
            setUploading(false);
        }
    };

    const uploadImageAsync = async (uri) => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
        });
        const uuId = v4();
        const fileRef = ref(getStorage(), uuId);
        const result = await uploadBytes(fileRef, blob);

        blob.close();

        return await getDownloadURL(fileRef);
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.backContainer}>
                    <BackButton navigation={navigation} marginLeft={30} />
                </View>
                <View style={styles.subContainer}>
                    <View style={styles.topRowContainer}>
                        <ProfilePicture width={80} height={80} />
                        <View style={styles.nameContainer}>
                            <View style={styles.topRowName}>
                                <Text style={styles.name}>janedoe</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.restaurantName}>{restaurant?.title}</Text>
                        <Text style={styles.light_gray}>{restaurant?.location}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={pickImage} style={styles.buttonStyle}>
                            {localUri ? (
                                <Image source={{ uri: localUri }} style={styles.image} />
                            ) : (
                                <>
                                    <FontAwesome5
                                        name="camera"
                                        color={gray}
                                        size={50}
                                        solid
                                        style={{ marginBottom: 10 }}
                                    />
                                    <Text style={styles.gray_text}>
                                        Please upload or take a picture
                                    </Text>
                                    <Text style={styles.gray_text}>of the good stuff</Text>
                                </>
                            )}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.starContainer}>
                        <StarRatingInput rating={rating} setRating={setRating} />
                    </View>
                    <View style={styles.inputContainerStyle}>
                        <TextInput
                            style={{ ...styles.white, ...styles.input }}
                            editable
                            multiline
                            maxLength={150}
                            value={caption}
                            onChangeText={setCaption}
                        />
                    </View>
                    <CustomButton
                        text="Log Entry"
                        disabled={buttonDisabled}
                        onPress={() => handleImagePicked(imageData)}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: '100%',
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
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
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    topRowName: {
        marginBottom: 12,
    },
    topRowText: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    bold: {
        fontWeight: 'bold',
    },
    light_gray: {
        color: light_gray,
    },
    inputContainerStyle: {
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: black,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: gray,
        color: pure_white,
        borderRadius: 10,
        height: 120,
    },
    input: {
        width: '100%',
        height: '100%',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        marginLeft: 5,
        color: pure_white,
    },
    profileImage: {
        width: 45,
        height: 45,
        borderRadius: 999,
        resizeMode: 'cover',
    },
    bottomContainer: {
        margin: 20,
    },
    accountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    starContainer: { margin: 20, alignSelf: 'center' },
    nameContainer: {
        marginLeft: 20,
    },
    name: {
        color: pure_white,
        fontSize: 22,
        fontFamily: 'Lora_600SemiBold',
    },
    text: {
        color: pure_white,
        marginRight: 30,
    },
    restaurantName: {
        color: pure_white,
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 5,
    },
    iconStyle: {
        marginBottom: 15,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 20,
    },
});

export default Log;
