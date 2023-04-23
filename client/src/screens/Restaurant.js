import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Image,
} from 'react-native';
import { useState, useContext, useEffect, useCallback } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
    pure_white,
    bright_yellow,
    input_background,
    light_gray,
    black,
    icon_unselected,
} from '../../assets/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ApiCaller from '../api/ApiCaller';
import UserContext from '../contexts/UserContext';

const ProfileElem = ({ profilePicture, rating }) => {
    const halfStar = rating % 1 === 0.5;
    const fullStars = halfStar ? rating - 0.5 : rating;

    return (
        <View style={styles.hasEatenElementWrapper}>
            <Image style={styles.hasEatenPicture} source={require('../../assets/download.jpeg')} />
            {rating && (
                <View style={styles.hasEatenStars}>
                    {[...Array(fullStars).keys()].map(() => {
                        return <Icon name="star" color={pure_white} size={12} />;
                    })}
                    {halfStar && <Icon name="star-half" color={pure_white} size={12} />}
                </View>
            )}
        </View>
    );
};

const Restaurant = ({ navigation, route }) => {
    const token = useContext(UserContext);
    const [interact, setInteract] = useState(false);
    const [friendsRatings, setFriendsRatings] = useState([]);
    const [friendsWishlist, setFriendsWishlist] = useState([]);
    const { restaurant: restoData } = route.params;

    useEffect(async () => {
        const fetchFriendsRatings = async () => {
            try {
                const reqBody = { RestoId: restoData.id };
                const { data } = await ApiCaller('/ratingOfAResto', token, reqBody);
                setFriendsRatings(data);
                return;
            } catch (e) {
                console.log('ERROR', e);
            }
        };
        const fetchFriendsWishlist = async () => {
            try {
                const reqBody = { RestoId: restoData.id };
                const { data } = await ApiCaller('/getWishListByResto', token, reqBody);
                setFriendsWishlist(data);
                return;
            } catch (e) {
                console.log('ERROR', e);
            }
        };
        fetchFriendsRatings();
        fetchFriendsWishlist();
    }, []);

    const onInteractButtonToggle = () => {
        setInteract(!interact);
    };

    const computeAverageRating = () => {
        let totalRatings = 0;
        friendsRatings.forEach((item) => {
            totalRatings += item.rating;
        });
        return totalRatings / friendsRatings.length;
    };

    const onWishlistButtonPress = async () => {
        try {
            const reqBody = { RestoId: restoData.id };
            const { data } = await ApiCaller('/postWishlist', token, reqBody);
            setFriendsRatings(data);
            return;
        } catch (e) {
            console.log('ERROR', e);
        }
    };

    const onCravingButtonPress = async () => {
        try {
            const reqBody = { RestoId: restoData.id };
            const { data } = await ApiCaller('/postCraving', token, reqBody);
            setFriendsRatings(data);
            return;
        } catch (e) {
            console.log('ERROR', e);
        }
    };

    return (
        <>
            {interact && (
                <TouchableOpacity
                    style={{ ...styles.interactPage }}
                    onPress={() => onInteractButtonToggle()}
                >
                    <View style={styles.interactButtonsWrapper}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('Log');
                            }}
                            style={styles.interactButtonContainer}
                        >
                            <FontAwesome5 name="plus" color={bright_yellow} size={24} />
                            <Text
                                style={{
                                    ...styles.interactButtonTitle,
                                    ...styles.yellow,
                                }}
                            >
                                Log Entry
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.interactButtonContainer}
                            onPress={() => onWishlistButtonPress()}
                        >
                            <Icon name="bookmark" color={bright_yellow} size={24} />
                            <Text
                                style={{
                                    ...styles.interactButtonTitle,
                                    ...styles.yellow,
                                }}
                            >
                                Add to Wishlist
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.interactButtonContainer}
                            onPress={() => onCravingButtonPress()}
                        >
                            <FontAwesome5
                                name="grin-tongue"
                                color={bright_yellow}
                                size={24}
                                solid
                            />
                            <Text
                                style={{
                                    ...styles.interactButtonTitle,
                                    ...styles.yellow,
                                }}
                            >
                                Set as Craving
                            </Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            )}
            <View style={styles.mainContainer}>
                <ScrollView style={styles.outerWrapper} bounces={true}>
                    <View style={styles.backdropWrapper}>
                        <Image source={{ uri: restoData?.photo }} style={styles.backdropImage} />
                        <LinearGradient
                            colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
                            style={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                width: '100%',
                                height: '100%',
                            }}
                        />
                    </View>
                    <View
                        style={{
                            ...styles.contentContainer,
                            ...styles.inputBackground,
                        }}
                    >
                        <Text style={{ ...styles.contentTitle, ...styles.white }}>
                            {restoData?.title}
                        </Text>
                        <Text
                            style={{
                                ...styles.contentTitleLocation,
                                ...styles.lightGray,
                            }}
                        >
                            {restoData?.location}
                        </Text>
                        <View style={styles.contentRatings}>
                            <View style={styles.contentRatingBox}>
                                <Icon name="star" color={bright_yellow} size={30} />
                                <Image style={styles.contentRatingIcon} />
                                <View style={styles.contentRatingText}>
                                    <Text
                                        style={{
                                            ...styles.contentRatingSubtitle,
                                            ...styles.white,
                                        }}
                                    >
                                        average rating
                                    </Text>
                                    <Text
                                        style={{
                                            ...styles.contentRatingValue,
                                            ...styles.white,
                                        }}
                                    >
                                        {computeAverageRating()}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.contentRatingBox}>
                                <FontAwesome5 name="eye" color={bright_yellow} size={30} solid />
                                <Image style={styles.contentRatingIcon} />
                                <View style={styles.contentRatingText}>
                                    <Text
                                        style={{
                                            ...styles.contentRatingSubtitle,
                                            ...styles.white,
                                        }}
                                    >
                                        visit count
                                    </Text>
                                    <Text
                                        style={{
                                            ...styles.contentRatingValue,
                                            ...styles.white,
                                        }}
                                    >
                                        {friendsRatings.length}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.divider}></View>
                        <View style={styles.hasEatenContainer}>
                            <Text
                                style={{
                                    ...styles.white,
                                    ...styles.hasEatenTitle,
                                }}
                            >
                                Has eaten here
                            </Text>
                            <FlatList
                                data={friendsRatings}
                                renderItem={({ item }) => <ProfileElem rating={item.rating} />}
                                keyExtractor={(item) => item.id}
                                horizontal={true}
                                style={styles.hasEatenElements}
                            />
                        </View>
                        <View style={styles.divider}></View>
                        <View style={styles.hasEatenContainer}>
                            <Text
                                style={{
                                    ...styles.white,
                                    ...styles.hasEatenTitle,
                                }}
                            >
                                Wants to eat
                            </Text>
                            <FlatList
                                data={friendsWishlist}
                                renderItem={({ item }) => <ProfileElem />}
                                keyExtractor={(item) => item.id}
                                horizontal={true}
                                style={styles.hasEatenElements}
                            />
                        </View>
                        <View style={styles.whitespace}></View>
                    </View>
                </ScrollView>
                <TouchableOpacity
                    style={styles.interactButton}
                    onPress={() => onInteractButtonToggle()}
                >
                    <FontAwesome5 name="plus" color={bright_yellow} size={24} />
                    <Text
                        style={{
                            ...styles.interactButtonTitle,
                            ...styles.yellow,
                        }}
                    >
                        Log, add to wishlist, crave
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    mainWrapper: {
        position: 'relative',
    },
    outerWrapper: {
        width: '100%',
        flex: 1,
    },
    mainContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: input_background,
        flex: 1,
    },
    white: {
        color: pure_white,
    },
    yellow: {
        color: bright_yellow,
    },
    lightGray: {
        color: light_gray,
    },
    inputBackground: {
        color: input_background,
    },
    backdropWrapper: {
        position: 'relative',
        width: '100%',
        height: 300,
    },
    backdropImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    contentContainer: {
        width: '100%',
        flex: 1,
        backgroundColor: input_background,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        paddingTop: 40,
        paddingHorizontal: 25,
        top: -50,
    },
    contentTitle: {
        fontFamily: 'Lora_600SemiBold',
        fontSize: 32,
    },
    contentTitleLocation: {
        marginTop: 10,
    },
    contentRatings: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        marginTop: 20,
        width: '100%',
    },
    contentRatingBox: {
        minHeight: 40,
        width: '48%',
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: black,
        borderRadius: 15,
        borderColor: icon_unselected,
        borderWidth: 1,
    },
    contentRatingIcon: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
    },
    contentRatingText: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    contentRatingSubtitle: {
        fontFamily: 'Lora_600SemiBold',
        fontSize: 12,
    },
    contentRatingValue: {
        fontFamily: 'Inter_700Bold',
        fontSize: 18,
        marginTop: 5,
    },
    divider: {
        height: 1,
        width: '100%',
        backgroundColor: icon_unselected,
        marginTop: 20,
    },
    hasEatenContainer: {
        width: '100%',
        marginTop: 20,
    },
    hasEatenTitle: {
        fontFamily: 'Lora_600SemiBold',
        fontSize: 24,
    },
    hasEatenElements: {
        marginTop: 15,
        width: '100%',
    },
    hasEatenElementWrapper: {
        alignItems: 'center',
        marginRight: 15,
    },
    hasEatenPicture: {
        width: 60,
        height: 60,
        resizeMode: 'cover',
        borderRadius: 100 / 2,
        borderWidth: 1,
        borderColor: icon_unselected,
    },
    hasEatenStars: {
        flexDirection: 'row',
        marginTop: 5,
        columnGap: 1,
    },
    whitespace: {
        width: '100%',
        height: 120,
        backgroundColor: input_background,
    },
    interactButton: {
        width: 280,
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 25,
        backgroundColor: black,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        top: -120,
        shadowColor: black,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.4,
        shadowRadius: 5,
    },
    interactPage: {
        width: '100%',
        height: '100%',
        backgroundColor: '#00000090',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    interactButtonsWrapper: {
        backgroundColor: input_background,
        width: 340,
        minHeight: 250,
        borderRadius: 30,
        padding: 30,
        alignItems: 'stretch',
        justifyContent: 'space-between',
    },
    interactButtonContainer: {
        backgroundColor: black,
        width: '100%',
        height: 55,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        shadowColor: black,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.4,
        shadowRadius: 5,
    },
    interactButtonTitle: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 14,
        marginLeft: 15,
    },
});

export default Restaurant;
