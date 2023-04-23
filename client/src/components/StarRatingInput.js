import { View, StyleSheet } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { icon_unselected, primary } from '../../assets/colors';

const StarRatingInput = ({ rating, setRating }) => {
    return (
        <View style={{ alignItems: 'center' }}>
            <StarRating
                rating={rating}
                onChange={setRating}
                starSize={40}
                color={primary}
                emptyColor={icon_unselected}
                enableHalfStar={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    star: {
        flexDirection: 'row',
    },
});

export default StarRatingInput;
