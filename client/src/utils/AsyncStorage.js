import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getFromLocal(key) {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value) {
            return JSON.parse(value);
        }
        return null;
    } catch (error) {
        return null;
    }
}

export async function setToLocal(key, value) {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        return false;
    }
}

export function clearStorage() {
    AsyncStorage.clear();
}
