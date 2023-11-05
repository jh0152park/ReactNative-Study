import react from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function Movies({ navigation: { navigate } }) {
    return (
        <TouchableOpacity
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
            onPress={() => {
                navigate("Stack", { screen: "Three" });
            }}
        >
            <Text>Movies</Text>
        </TouchableOpacity>
    );
}
