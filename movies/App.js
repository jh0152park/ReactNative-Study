import React, { useCallback, useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import { Text, View } from "react-native";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";

import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);

    async function startLoading() {
        try {
            await Font.loadAsync(Ionicons.font);
            await Asset.loadAsync(require("./smile.jpg"));
        } catch (e) {
            console.log(`occurred some error: ${e}`);
        } finally {
            setAppIsReady(true);
        }
    }

    useEffect(() => {
        startLoading();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) await SplashScreen.hideAsync();
    }, [appIsReady]);

    if (!appIsReady) return null;

    return (
        <View onLayout={onLayoutRootView}>
            <Text>Loading Done</Text>
        </View>
    );
}
