import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from "../screens/Home";

const Nav = createNativeStackNavigator();

export default function InNav() {
    return (
        <Nav.Navigator>
            <Nav.Screen name="Home" component={Home}></Nav.Screen>
        </Nav.Navigator>
    );
}