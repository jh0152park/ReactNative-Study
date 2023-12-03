import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Join from "../screens/Join";
import {Black} from "../colors";

const Nav = createNativeStackNavigator();

export default function OutNav() {
    return (
        <Nav.Navigator
            screenOptions={{
                headerShown: false,
                presentation: "modal",
                headerTintColor: "white",
                headerStyle: {
                    backgroundColor: Black,
                },
            }}>
            <Nav.Screen name="Log In" component={Login}></Nav.Screen>
            <Nav.Screen name="Join" component={Join}></Nav.Screen>
        </Nav.Navigator>
    );
}
