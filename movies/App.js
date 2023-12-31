import React, { useCallback, useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import { Text, View, Image, useColorScheme } from "react-native";
import { Asset, useAssets } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";

import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
    NavigationContainer,
    DarkTheme,
    DefaultTheme,
} from "@react-navigation/native";
import Tabs from "./navigation/Tabs";
import Stack from "./navigation/Stack";
import RootNavigation from "./navigation/Root";
import { ThemeProvider } from "styled-components/native";
import { darkMode, lightMode } from "./Styled";
import { QueryClient, QueryClientProvider } from "react-query";

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

const queryClient = new QueryClient();

export default function App() {
    const isDarkMode = useColorScheme() === "dark";
    const [appIsReady, setAppIsReady] = useState(false);

    async function startLoading() {
        try {
            const fonts = loadFonts([Ionicons.font]);
            const assets = loadAssets([
                require("./smile.jpg"),
                "https://images.unsplash.com/photo-1640007689209-3ccc3f59c6a1?auto=format&fit=crop&q=80&w=1396&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            ]);
            await Promise.all([...fonts, ...assets]);
            // await Font.loadAsync(Ionicons.font);
            // await Asset.loadAsync(require("./smile.jpg"));
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
        <ThemeProvider theme={isDarkMode ? darkMode : lightMode}>
            <QueryClientProvider client={queryClient}>
                <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
                    <NavigationContainer
                        theme={isDarkMode ? DarkTheme : DefaultTheme}
                    >
                        <RootNavigation />
                    </NavigationContainer>
                </View>
            </QueryClientProvider>
        </ThemeProvider>
    );
}
