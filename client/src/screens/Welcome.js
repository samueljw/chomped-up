import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { Image } from 'react-native-elements';
import { ref, getDownloadURL } from 'firebase/storage';

import FirebaseStorageContext from '../contexts/FireStorageContext';
import { pure_white, bright_yellow } from '../../assets/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const Welcome = ({ navigation }) => {
    const [url, setUrl] = useState('');
    const value = useContext(FirebaseStorageContext);
    const listRef = ref(value, 'images');

    useEffect(() => {
        getDownloadURL(listRef).then((res) => {
            setUrl(res);
        });
    }, []);

    return (
        <View style={styles.outerWrapper}>
            <View style={styles.backdropWrapper}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../../assets/welcome-bg.png')}
                        style={styles.backdropImage}
                    />
                </View>
            </View>
            <SafeAreaView style={styles.mainContainer}>
                <View style={styles.subContainer}>
                    <Text style={{ ...styles.welcomeTitle, ...styles.white }}>
                        One step closer{' '}
                        <Text
                            style={{
                                ...styles.yellow,
                                ...styles.welcomeTitleSpan,
                            }}
                        >
                            {`\t\t\tto happy tummy!`}
                        </Text>
                    </Text>
                    <Text style={{ ...styles.taglines, ...styles.white }}>
                        <Text>{`Track your eating outs\n`}</Text>
                        <Text>{`See where your friends have been eating\n`}</Text>
                        <Text>{`Curate delicious wishlists`}</Text>
                    </Text>
                    <TouchableOpacity
                        style={styles.mainButton}
                        onPress={() => {
                            navigation.navigate('Register');
                        }}
                    >
                        <Text style={styles.mainButtonText}>Get Started!</Text>
                    </TouchableOpacity>
                    <View style={styles.loginContainer}>
                        <Text
                            style={{
                                ...styles.loginText,
                                ...styles.white,
                            }}
                        >
                            {`Have an account already? `}
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('Login');
                            }}
                        >
                            <Text
                                style={{
                                    ...styles.loginButton,
                                    ...styles.yellow,
                                }}
                            >
                                Log In
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
        top: -170,
        alignItems: 'center',
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
    },
});

export default Welcome;
