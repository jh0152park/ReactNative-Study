import {Text} from "react-native";
import auth from "@react-native-firebase/auth";
import {NavigationContainer} from "@react-navigation/native";
import {useEffect, useState} from "react";
import InNav from "./navigators/InNav";
import OutNav from "./navigators/OutNav";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        auth().onAuthStateChanged(user => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });
    }, []);

    return (
        <NavigationContainer>
            {isLoggedIn ? <InNav /> : <OutNav />}
        </NavigationContainer>
    );
}

export default App;
