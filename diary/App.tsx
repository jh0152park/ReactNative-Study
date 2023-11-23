import Navigator from "./navigator";
import Realm from "realm";
import React, {useCallback, useEffect, useState} from "react";
import {View} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {DBContext} from "./context";
import * as SplashScreen from "expo-splash-screen";

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
    const [realm, setRealm] = useState<any>();

    async function startLaoding() {
        const db = await Realm.open({
            path: "diaryDB",
            schema: [FeelingSchema],
        });
        setRealm(db);
        setReady(true);
    }

    useEffect(() => {
        startLaoding();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (ready) await SplashScreen.hideAsync();
    }, [ready]);

    if (!ready) return null;

    return (
        <DBContext.Provider value={realm}>
            <NavigationContainer>
                <View onLayout={onLayoutRootView}>
                    <Navigator />
                </View>
            </NavigationContainer>
        </DBContext.Provider>
    );
}

export default App;
