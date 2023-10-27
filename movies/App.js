import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { WebView } from "react-native-webview";
import { Text } from "react-native";

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function delay_splash() {
    await SplashScreen.preventAutoHideAsync();
    await sleep(3000);
    await SplashScreen.hideAsync();
}

export default function App() {
    useEffect(() => {
        delay_splash();
    }, []);

    // return <WebView source={{ uri: "https://www.naver.com" }} />;
    return <Text>Loading Done</Text>;
}
