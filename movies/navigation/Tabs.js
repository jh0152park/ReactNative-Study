import react from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import TV from "../screens/TV";
import Search from "../screens/Search";
import { useColorScheme } from "react-native";
import { COLOR } from "../colors";
import { Ionicons } from "@expo/vector-icons";
import { darkMode, lightMode } from "../Styled";

const Tab = createBottomTabNavigator();

export default function Tabs() {
    const isDarkMode = useColorScheme() === "dark";

    return (
        <Tab.Navigator
            // screenOptions={{
            //     tabBarStyle: {
            //         backgroundColor: darkMode ? COLOR.BLACK : COLOR.WHITE,
            //     },
            //     tabBarActiveTintColor: darkMode ? COLOR.WHITE : COLOR.BLACK,
            //     tabBarInactiveTintColor: darkMode ? COLOR.GRAY : COLOR.GRAY,
            //     headerStyle: {
            //         backgroundColor: darkMode ? COLOR.BLACK : COLOR.WHITE,
            //     },
            //     headerTitleStyle: {
            //         color: darkMode ? COLOR.WHITE : COLOR.BLACK,
            //     },
            // }}
            sceneContainerStyle={{
                backgroundColor: isDarkMode ? darkMode : lightMode,
            }}
            screenOptions={{
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "bold",
                },
                // headerShown: false,
            }}
        >
            <Tab.Screen
                name="Movies"
                component={Movies}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                            <Ionicons
                                name="film-outline"
                                color={color}
                                size={size}
                            />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="TV"
                component={TV}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                            <Ionicons
                                name="tv-outline"
                                color={color}
                                size={size}
                            />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                            <Ionicons name="search" color={color} size={size} />
                        );
                    },
                }}
            />
        </Tab.Navigator>
    );
}
