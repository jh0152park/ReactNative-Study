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
        try {
            const db = await Realm.open({
                path: "diaryDB",
                schema: [FeelingSchema],
            });
            setRealm(db);
        } finally {
            setReady(true);
        }
        // console.log("start Loading");
    }

    useEffect(() => {
        startLaoding();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (ready) {
            await SplashScreen.hideAsync();
            console.log("hide async");
        }
    }, [ready]);

    if (!ready) return null;

    return (
        <View style={{flex: 1}} onLayout={onLayoutRootView}>
            <DBContext.Provider value={realm}>
                <NavigationContainer>
                    <Navigator />
                </NavigationContainer>
            </DBContext.Provider>
        </View>
    );
}

export default App;
