import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Detail from "../screens/Detail";
import {Black} from "../colors";

const Nav = createNativeStackNavigator();

export default function InNav() {
    return (
        <Nav.Navigator
            screenOptions={{
                // headerShown: false,
                presentation: "modal",
                headerTintColor: "white",
                headerStyle: {
                    backgroundColor: Black,
                },
            }}>
            <Nav.Screen name="Coins" component={Home}></Nav.Screen>
            <Nav.Screen name="Detail" component={Detail}></Nav.Screen>
        </Nav.Navigator>
    );
}
