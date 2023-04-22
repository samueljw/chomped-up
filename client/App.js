import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { useState, useEffect } from 'react';
import {
    API_KEY,
    AUTH_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID,
} from '@env';

import UserContext from './src/contexts/UserContext';
import FirebaseStorageContext from './src/contexts/FireStorageContext';
import TabScreen from './src/screens/TabScreens';
import FontWrapper from './src/utils/FontWrapper';
import { getFromLocal } from './src/utils/AsyncStorage';

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default function App() {
    const [token, setToken] = useState('');

    useEffect(async () => {
        const tokenFromStorage = await getFromLocal('TOKEN');
        setToken(tokenFromStorage);
    }, []);

    return (
        <UserContext.Provider value={token}>
            <FirebaseStorageContext.Provider value={storage}>
                <FontWrapper>
                    <TabScreen></TabScreen>
                </FontWrapper>
            </FirebaseStorageContext.Provider>
        </UserContext.Provider>
    );
}
