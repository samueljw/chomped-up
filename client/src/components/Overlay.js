import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Overlay = ({ bottom, borderRadius }) => {
    return (
        <LinearGradient
            colors={['transparent', 'rgba(0, 0, 0, 0.9)']}
            style={{
                ...styles.wrapper
            }}
        />
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
    },
});

export default Overlay;
