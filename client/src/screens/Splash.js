import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useContext, useEffect } from 'react';
import { background } from '../../assets/colors';

import { Link } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserContext from '../contexts/UserContext';

const Splash = ({ navigation }) => {
    const contextValue = useContext(UserContext);



    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.subContainer}>
                <Text style={styles.text}>THIS IS SPLASH SCREEN</Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Welcome');
                    }}
                >
                    <Text>Go to Welcome Screen</Text>
                </TouchableOpacity>
            </View>
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
    subContainer: {
        marginLeft: 15,
        marginRight: 15,
    },
    text: {
        color: '#ffffff',
    },
});

export default Splash;
