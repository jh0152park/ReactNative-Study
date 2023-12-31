import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./Tabs";
import Stack from "./Stack";

const Nav = createNativeStackNavigator();

export default function RootNavigation() {
    return (
        <Nav.Navigator
            screenOptions={{
                headerShown: false,
                presentation: "modal",
            }}
        >
            <Nav.Screen name="Tabs" component={Tabs} />
            <Nav.Screen name="Stack" component={Stack} />
        </Nav.Navigator>
    );
}
