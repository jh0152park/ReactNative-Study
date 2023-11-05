import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, TouchableOpacity } from "react-native";

const NativeStack = createNativeStackNavigator();

function ScreenOne({ navigation: { navigate } }) {
    return (
        <TouchableOpacity
            onPress={() => {
                navigate("Two");
            }}
        >
            <View>
                <Text>Screen One</Text>
            </View>
        </TouchableOpacity>
    );
}
function ScreenTwo({ navigation: { navigate } }) {
    return (
        <TouchableOpacity
            onPress={() => {
                navigate("Three");
            }}
        >
            <View>
                <Text>Screen Two</Text>
            </View>
        </TouchableOpacity>
    );
}
function ScreenThree({ navigation: { goBack } }) {
    return (
        <TouchableOpacity
            onPress={() => {
                goBack("Two");
            }}
        >
            <View>
                <Text>Screen Three</Text>
            </View>
        </TouchableOpacity>
    );
}

export default function Stack() {
    return (
        <NativeStack.Navigator>
            <NativeStack.Screen name="One" component={ScreenOne} />
            <NativeStack.Screen name="Two" component={ScreenTwo} />
            <NativeStack.Screen name="Three" component={ScreenThree} />
        </NativeStack.Navigator>
    );
}
