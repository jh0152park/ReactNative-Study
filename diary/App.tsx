import {NavigationContainer} from "@react-navigation/native";
import Navigator from "./navigator";
import Realm from "realm";
import AppLoading from "expo-app-loading";
import {useState} from "react";

const FeelingSchema = {
    name: "Feeling",
    properties: {
        _id: "int",
        message: "string",
    },
    primaryKey: "_id",
};

function App() {
    const [ready, setReady] = useState(false);

    async function startLaoding() {
        const realm = await Realm.open({
            path: "diaryDB",
            schema: [FeelingSchema],
        });
    }

    if (!ready) {
        return (
            <AppLoading
                startAsync={startLaoding}
                onFinish={() => setReady(true)}
                onError={console.error}
            />
        );
    }

    return (
        <NavigationContainer>
            <Navigator />
        </NavigationContainer>
    );
}

export default App;
