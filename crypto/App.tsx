import * as React from "react";
import {Text} from "react-native";
import auth from "@react-native-firebase/auth";

function App() {
    const user = auth().currentUser;

    React.useEffect(() => {
        console.log(auth().currentUser);
    }, []);

    if (!user) {
        return <Text>Please login</Text>;
    }

    return <Text>Welcome {user.email}</Text>;
}

export default App;
