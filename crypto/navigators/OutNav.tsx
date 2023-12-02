import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Join from "../screens/Join";

const Nav = createNativeStackNavigator();

export default function OutNav() {
    return (
        <Nav.Navigator
            screenOptions={{
                presentation: "modal",
                headerTintColor: "white",
                headerStyle: {
                    backgroundColor: "#1e272e",
                },
            }}>
            <Nav.Screen name="Login" component={Login}></Nav.Screen>
            <Nav.Screen name="Join" component={Join}></Nav.Screen>
        </Nav.Navigator>
    );
}
