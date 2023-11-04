import React, { useCallback, useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import { Text, View, Image } from "react-native";
import { Asset, useAssets } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";

import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

function loadFonts(fonts) {
    return fonts.map((font) => Font.loadAsync(font));
}

function loadAssets(assets) {
    return assets.map((asset) => {
        if (typeof asset === "string") {
            return Image.prefetch(asset);
        } else {
            return Asset.loadAsync(asset);
        }
    });
}

export default function App() {
    const [assets] = useAssets([require("./smile.jpg")]);
    const [fonts] = Font.useFonts(Ionicons.font);

    if (!assets || !fonts) {
        SplashScreen.preventAutoHideAsync();
    } else {
        SplashScreen.hideAsync();
    }

    return (
        <View>
            <Text>Loading done</Text>
        </View>
    );
    // const [appIsReady, setAppIsReady] = useState(false);

    // async function startLoading() {
    //     try {
    //         const fonts = loadFonts([Ionicons.font]);
    //         const assets = loadAssets([
    //             require("./smile.jpg"),
    //             "https://images.unsplash.com/photo-1640007689209-3ccc3f59c6a1?auto=format&fit=crop&q=80&w=1396&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //         ]);
    //         await Promise.all([...fonts, ...assets]);
    //         // await Font.loadAsync(Ionicons.font);
    //         // await Asset.loadAsync(require("./smile.jpg"));
    //     } catch (e) {
    //         console.log(`occurred some error: ${e}`);
    //     } finally {
    //         setAppIsReady(true);
    //     }
    // }

    // useEffect(() => {
    //     startLoading();
    // }, []);

    // const onLayoutRootView = useCallback(async () => {
    //     if (appIsReady) await SplashScreen.hideAsync();
    // }, [appIsReady]);

    // if (!appIsReady) return null;

    // return (
    //     <View onLayout={onLayoutRootView}>
    //         <Text>Loading Done</Text>
    //     </View>
    // );
}
