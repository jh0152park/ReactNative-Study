import React from "react";
import {TouchableOpacity} from "react-native";
import styled from "styled-components/native";
import auth from "@react-native-firebase/auth";

const Container = styled.View``;

const Text = styled.Text``;

export default function Home() {
    async function logout() {
        await auth().signOut();
    }

    return (
        <Container>
            <Text>Home sweet home</Text>

            <TouchableOpacity onPress={logout}>
                <Text>LOG OUT</Text>
            </TouchableOpacity>
        </Container>
    );
}
