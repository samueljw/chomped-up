import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Overlay = ({ bottom, borderRadius, alpha }) => {
    return (
        <LinearGradient
            colors={
                bottom
                    ? ['transparent', `rgba(0, 0, 0, ${alpha})`]
                    : [`rgba(0, 0, 0, ${alpha})`, 'transparent']
            }
            style={{
                ...styles.wrapper,
                ...{
                    borderBottomLeftRadius: bottom ? borderRadius : 0,
                    borderBottomRightRadius: bottom ? borderRadius : 0,
                    borderTopLeftRadius: bottom ? 0 : borderRadius,
                    borderTopRightRadius: bottom ? 0 : borderRadius,
                },
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
