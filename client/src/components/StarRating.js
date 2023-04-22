import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { white } from '../../assets/colors';

const StarRating = ({ size = 12, rating = 5, style }) => {
    const halfStar = rating % 1 === 0.5;
    const fullStars = halfStar ? rating - 0.5 : rating;

    return (
        <View style={{ ...styles.star, ...style }}>
            {[...Array(fullStars).keys()].map(() => {
                return <FontAwesome5 name="star" color={white} size={size} solid />;
            })}
            {halfStar && <FontAwesome5 name="star-half" color={white} size={size} solid />}
        </View>
    );
};

const styles = StyleSheet.create({
    star: {
        flexDirection: 'row',
    },
});

export default StarRating;
