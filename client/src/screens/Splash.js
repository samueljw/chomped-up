import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useContext, useEffect } from 'react';

import { background, pure_white } from '../../assets/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserContext from '../contexts/UserContext';
import { clearStorage } from '../utils/AsyncStorage';

const Splash = ({ navigation }) => {
    const token = useContext(UserContext);

    useEffect(() => {
        clearStorage();
        setTimeout(() => {
            if (!token) {
                navigation.navigate('Welcome');
            } else {
                navigation.navigate('Tab');
            }
        }, 1500);
    }, []);

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Text style={styles.text}>Chomped Up</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: background,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: pure_white,
        fontFamily: 'Lora_700Bold',
        fontSize: 50,
    },
});

export default Splash;
