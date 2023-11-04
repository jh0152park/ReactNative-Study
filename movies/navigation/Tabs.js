import react from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import TV from "../screens/TV";
import Search from "../screens/Search";
import { useColorScheme } from "react-native";
import { COLOR } from "../colors";

const Tab = createBottomTabNavigator();

export default function Tabs() {
    //  const darkMode = useColorScheme() === "dark";

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
        >
            <Tab.Screen name="Movies" component={Movies} />
            <Tab.Screen name="TV" component={TV} />
            <Tab.Screen name="Search" component={Search} />
        </Tab.Navigator>
    );
}
