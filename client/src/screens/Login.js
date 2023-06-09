import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Alert,

} from 'react-native';
import { useContext } from 'react';
import { Image } from 'react-native-elements';
import { pure_white, bright_yellow, input_background, gray, gray_text } from '../../assets/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomInput from '../components/CustomInput';
import { useState } from 'react';
import { setToLocal, getFromLocal } from '../utils/AsyncStorage';
import UserContext from '../contexts/UserContext';
import { link } from '../api/link';

const Login = ({ navigation }) => {
    const token = useContext(UserContext);
    const [userData, setUserData] = useState({
        password: '',
        username: '',
    });

    useEffect(() => {
        console.log(userData);
    }, [userData]);

    const updateUserName = (newUserName) => {
        setUserData({
            ...userData,
            username: newUserName,
        });
    };

    const updatePassword = (newPassword) => {
        setUserData({
            ...userData,
            password: newPassword,
        });
    };

    return (
        <View style={styles.outerWrapper}>
            <View style={styles.backdropWrapper}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../../assets/login-bg.png')}
                        style={styles.backdropImage}
                    />
                </View>
            </View>
            <SafeAreaView style={styles.mainContainer}>
                <View style={styles.subContainer}>
                    <Text style={{ ...styles.welcomeTitle, ...styles.white }}>
                        Welcome
                        <Text
                            style={{
                                ...styles.yellow,
                                ...styles.welcomeTitleSpan,
                            }}
                        >
                            {` Back!`}
                        </Text>
                    </Text>
                    <CustomInput
                        text="Username"
                        data={userData.username}
                        setData={updateUserName}
                    />
                    <CustomInput
                        text="Password"
                        data={userData.password}
                        setData={updatePassword}
                        password
                    />
                    <TouchableOpacity
                        style={styles.mainButton}
                        onPress={async () => {
                            try {
                                const response = await fetch(`${link}/login`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(userData),
                                });
                                const data = await response.json();
                                console.log("LOGIN", data);

                                if (data.statusCode !== 200) {
                                    throw { name: data };
                                } else {
                                    setToLocal('TOKEN', data.data.accessToken);
                                    setUserData({
                                        password: '',
                                        username: '',
                                    });
                                    navigation.navigate('Tab');
                                }
                            } catch (error) {
                                Alert.alert(
                                    'Alert',
                                    error.name.error.message,
                                    [
                                        {
                                            text: 'Close Alert',
                                            onPress: () => console.log('OK Pressed'),
                                        },
                                    ],
                                    { cancelable: false }
                                );
                                setUserData({
                                    ...userData,
                                    password: '',
                                });
                            }
                        }}
                    >
                        <Text style={styles.mainButtonText}>Log in</Text>
                    </TouchableOpacity>
                    <View style={styles.loginContainer}>
                        <Text
                            style={{
                                ...styles.loginText,
                                ...styles.white,
                            }}
                        >
                            {`First time here? `}
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('Register');
                            }}
                        >
                            <Text
                                style={{
                                    ...styles.loginButton,
                                    ...styles.yellow,
                                }}
                            >
                                Register your account
                            </Text>
                        </TouchableOpacity>
                        <Text
                            style={{
                                ...styles.loginText,
                                ...styles.white,
                            }}
                        >
                            {' '}
                            here
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    outerWrapper: {
        width: '100%',
        flex: 1,
    },
    mainContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
        flex: 1,
    },
    white: {
        color: pure_white,
    },
    yellow: {
        color: bright_yellow,
    },
    subContainer: {
        marginLeft: 30,
        marginRight: 30,
        flex: 1,
        top: -125,
    },
    backdropWrapper: {
        position: 'relative',
        width: '100%',
        height: 590,
    },
    imageContainer: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    backdropImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    welcomeTitle: {
        fontFamily: 'Lora_500Medium',
        fontSize: 36,
        textAlign: 'center',
    },
    welcomeTitleSpan: {
        fontFamily: 'Lora_600SemiBold',
    },
    taglines: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 24,
        marginTop: 30,
    },
    mainButton: {
        backgroundColor: bright_yellow,
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        marginTop: 30,
    },
    mainButtonText: {
        fontFamily: 'Lora_700Bold',
        fontSize: 18,
    },
    loginText: {
        fontFamily: 'Lora_400Regular',
        fontSize: 14,
        marginTop: 15,
    },
    loginButton: {
        fontFamily: 'Lora_600SemiBold',
        textDecorationLine: 'underline',
        marginTop: 15,
    },
    loginContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Login;
