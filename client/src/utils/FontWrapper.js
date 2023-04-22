import {
    useFonts,
    Lora_400Regular,
    Lora_500Medium,
    Lora_600SemiBold,
    Lora_700Bold,
} from '@expo-google-fonts/lora';
import {
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
} from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';

const FontWrapper = ({ children }) => {
    let [fontsLoaded] = useFonts({
        Lora_400Regular,
        Lora_500Medium,
        Lora_600SemiBold,
        Lora_700Bold,
        Inter_100Thin,
        Inter_200ExtraLight,
        Inter_300Light,
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        Inter_700Bold,
        Inter_800ExtraBold,
        Inter_900Black,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return <>{children}</>;
};

export default FontWrapper;
