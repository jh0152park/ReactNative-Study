import React from "react";
import { useColorScheme } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { darkMode, lightMode } from "../Styled";
import Detail from "../screens/Detail";

const NativeStack = createNativeStackNavigator();

export default function Stack() {
    const isDarkMode = useColorScheme() === "dark";

    return (
        <NativeStack.Navigator
            screenOptions={{
                headerBackTitleVisible: false,
                presentation: "modal",
            }}
            // sceneContainerStyle={{
            //     backgroundColor: isDarkMode ? darkMode : lightMode,
            // }}
        >
            <NativeStack.Screen name="Detail" component={Detail} />
        </NativeStack.Navigator>
    );
}
