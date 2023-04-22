import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem("jesse", jsonValue);
    } catch (e) {
        // saving error
    }
};

export const getData = () => {
    AsyncStorage.getItem("jesse")
        .then((jsonValue) => {
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        })
        .catch((e) => e);
};
