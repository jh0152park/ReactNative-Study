import React, { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import { Text } from "react-native";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";

import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function delay_splash() {
        await SplashScreen.preventAutoHideAsync();
        await sleep(3000);
        await SplashScreen.hideAsync();
    }

    async function startLoading() {
        await Font.loadAsync(Ionicons.font);
        await Asset.loadAsync(require("./smile.jpg"));
    }

    useEffect(() => {
        startLoading();
        delay_splash();
    }, []);

    // return <WebView source={{ uri: "https://www.naver.com" }} />;
    return <Text>Loading Done</Text>;
}
