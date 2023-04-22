import UserContext from './src/contexts/UserContext';
import FontWrapper from './src/utils/FontWrapper';

export default function App() {
    const value = 'hello';

    return (
        <UserContext.Provider value={value}>
            <FontWrapper></FontWrapper>
        </UserContext.Provider>
    );
}
