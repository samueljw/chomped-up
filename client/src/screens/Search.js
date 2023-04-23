import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ScrollView,
    TextInput,
} from 'react-native';
import { Image } from 'react-native-elements';
import {
    background,
    black,
    gray_text,
    light_gray,
    primary,
    pure_white,
    white,
} from '../../assets/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchBar from '../components/SearchBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserContext from '../contexts/UserContext';
import { useContext, useEffect, useRef, useState } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Location from 'expo-location';
import { link } from '../api/link';
import Overlay from '../components/Overlay';

const NearRestaurant = ({ navigation, restaurant }) => (
    <TouchableOpacity
        // onPress={() => {
        //     navigation.navigate("Restaurant", { restaurant: { id: 1 } });
        // }}
        style={styles.restaurantContainer}
    >
        <Image source={{ uri: restaurant?.['Photo-URL'] }} style={styles.image} />
        <Overlay bottom={true} borderRadius={20} alpha={0.9} />
        <View style={styles.imageText}>
            <Text style={styles.nameText}>{restaurant?.Restaurant}</Text>
            {/* <Text
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}>
                <FontAwesome5 name="star" color={primary} size={12} solid />
                <Text
                    style={{
                        marginLeft: 10,
                        fontWeight: "600",
                        color: pure_white,
                    }}>
                    {restaurant?.rating}
                </Text>
            </Text> */}
            {/* <Text style={styles.white}>15 friends ate here</Text> */}
        </View>
    </TouchableOpacity>
);

const SearchRestaurant = ({ navigation, restaurant }) => (
    <TouchableOpacity
        onPress={() => {
            navigation.navigate('Restaurant', { restaurant });
        }}
        style={styles.restaurantContainer}
    >
        <Image source={{ uri: restaurant?.photo }} style={styles.image} />
        <Overlay bottom={true} borderRadius={20} alpha={0.9} />
        <View style={styles.imageText}>
            <Text style={styles.nameText}>{restaurant?.title}</Text>
            {/* <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 5,
                }}
            >
                <FontAwesome5 name="star" color={primary} size={12} solid />
                <Text
                    style={{
                        marginLeft: 10,
                        fontWeight: '600',
                        color: pure_white,
                    }}
                >
                    {restaurant?.rating}
                </Text>
            </View> */}
            {/* <Text style={styles.white}>15 friends ate here</Text> */}
        </View>
    </TouchableOpacity>
);

const RecommendedRestaurant = ({ navigation, restaurant }) => (
    <TouchableOpacity
        onPress={() => {
            navigation.navigate('Restaurant', { restaurant });
        }}
        style={styles.restaurantContainer}
    >
        <Image source={{ uri: restaurant?.Restaurant?.photo }} style={styles.image} />
        <Overlay bottom={true} borderRadius={20} alpha={0.9} />
        <View style={styles.imageText}>
            <Text style={styles.nameText}>{restaurant?.Restaurant?.title}</Text>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                    marginTop: 5,
                }}
            >
                <FontAwesome5 name="star" color={primary} size={12} solid />
                <Text
                    style={{
                        marginLeft: 5,
                        fontWeight: '600',
                        color: pure_white,
                    }}
                >
                    {restaurant?.rating}
                </Text>
            </View>
            {/* <Text style={styles.white}>15 friends ate here</Text> */}
        </View>
    </TouchableOpacity>
);

const Search = ({ navigation }) => {
    const contextValue = useContext(UserContext);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    const [restoNearMe, setRestoNearMe] = useState({});
    const [restoRec, setRestoRec] = useState({});

    const [isFocused, setIsFocused] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const searchInputRef = useRef(null);
    const token = useContext(UserContext);

    const handleSearch = async () => {
        try {
            const response = await fetch(`${link}/getAllResto`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    access_token: token,
                },
            });
            const data = await response.json();
            if (data.statusCode !== 200) {
                throw { name: data };
            } else {
                setSearchResults(data.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleIconPress = () => {
        searchInputRef.current.focus();
    };

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLatitude(location.coords.latitude);
            setLongitude(location.coords.longitude);
        })();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${link}/getRestoAround`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        access_token: contextValue,
                    },
                    body: JSON.stringify({
                        latitude: latitude,
                        longitude: longitude,
                    }),
                });
                const data = await response.json();
                if (data.statusCode !== 200) {
                    throw { name: data };
                } else {
                    setRestoNearMe(data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [contextValue, latitude, longitude]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${link}/getRecommendation`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        access_token: contextValue,
                    },
                });
                const data = await response.json();
                if (data.statusCode !== 200) {
                    throw { name: data };
                } else {
                    setRestoRec(data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [contextValue]);

    return (
        <View style={styles.mainContainer}>
            <ScrollView>
                <View style={{ margin: 20 }}>
                    <View style={styles.container}>
                        <TextInput
                            ref={searchInputRef}
                            style={[
                                styles.input,
                                isFocused && styles.inputFocused, // Apply inputFocused style when isFocused is true
                            ]}
                            placeholder="Search restaurant"
                            placeholderTextColor={gray_text}
                            onChangeText={setSearchText}
                            value={searchText}
                            onSubmitEditing={handleSearch}
                            onFocus={() => setIsFocused(true)} // Set isFocused to true when input is focused
                            onBlur={() => setIsFocused(false)} // Set isFocused to false when input is blurred
                        />
                        <TouchableOpacity style={styles.icon} onPress={handleIconPress}>
                            <Icon
                                name="search"
                                type="evilicon"
                                color={isFocused ? primary : gray_text}
                                size={23}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                {searchResults.length > 0 ? (
                    <View style={styles.subContainer}>
                        <Text style={styles.heading}>Search Restaurants</Text>
                        <FlatList
                            horizontal
                            data={searchResults}
                            renderItem={({ item }) => (
                                <SearchRestaurant navigation={navigation} restaurant={item} />
                            )}
                            keyExtractor={(item) => item.id}
                        />
                    </View>
                ) : (
                    <></>
                )}
                <View style={styles.subContainer}>
                    <Text style={styles.heading}>Recommendations For You</Text>
                    <FlatList
                        horizontal
                        data={restoRec?.data}
                        renderItem={({ item }) => (
                            <RecommendedRestaurant navigation={navigation} restaurant={item} />
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </View>
                <View style={styles.subContainer}>
                    <Text style={styles.heading}>Restaurants near me</Text>
                    <FlatList
                        horizontal
                        data={restoNearMe?.data}
                        renderItem={({ item }) => (
                            <NearRestaurant navigation={navigation} restaurant={item} />
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: background,
        flex: 1,
    },
    white: {
        color: pure_white,
    },
    light_gray: {
        color: light_gray,
    },
    gray_text: {
        color: gray_text,
    },
    heading: {
        color: pure_white,
        fontSize: 20,
        marginLeft: 15,
        marginBottom: 15,
        fontFamily: 'Lora_600SemiBold',
    },
    subContainer: {
        marginTop: 20,
    },
    restaurantContainer: {
        marginLeft: 15,
    },
    restaurant: {
        padding: 15,
    },
    topRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        marginLeft: 5,
        color: pure_white,
    },
    image: {
        width: 142,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 20,
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
    starContainer: {
        flexDirection: 'row',
    },
    star: {
        flexDirection: 'row',
    },
    nameContainer: {
        marginLeft: 15,
    },
    comment: {
        marginTop: 5,
    },
    imageText: {
        position: 'absolute',
        margin: 10,
        bottom: 0,
    },
    nameText: {
        color: pure_white,
        fontSize: 16,
        fontFamily: 'Lora_700Bold',
    },
    container: {
        position: 'relative',
        backgroundColor: 'transparent',
    },
    input: {
        height: 50,
        borderRadius: 8,
        backgroundColor: black,
        paddingHorizontal: 16,
        color: pure_white,
        borderWidth: 1, // Add border width
        borderColor: black, // Set initial border color
    },
    icon: {
        position: 'absolute',
        top: 14,
        right: 18,
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    inputFocused: {
        borderColor: primary, // Set border color to primary color when focused
    },
    // image: {
    //     width: "100%",
    //     height: 200,
    //     resizeMode: "cover",
    //     borderRadius: 20,
    // },
    // restaurantContainer: {
    //     justifyContent: "center",
    //     alignItems: "center",
    // },
    // imageText: {
    //     position: "absolute",
    //     margin: 10,
    //     bottom: 0,
    //     backgroundColor: "rgba(0, 0, 0, 0.5)",
    // },
    // names: {
    //     color: "#fff",
    // },
});

export default Search;
