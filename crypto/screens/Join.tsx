import React, {useRef, useState} from "react";
import {TextInput} from "react-native";
import styled from "styled-components/native";

const Container = styled.View``;

const Text = styled.Text``;

export default function Join() {
    const passwordInput = useRef<any>();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function onSubmitEditing() {
        if (passwordInput) {
            passwordInput.current.focus();
        }
    }

    return (
        <Container>
            <TextInput
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                returnKeyType="next"
                onChangeText={text => setEmail(text)}
                onSubmitEditing={onSubmitEditing}
            />
            <TextInput
                ref={passwordInput}
                placeholder="Password"
                secureTextEntry
                value={password}
                returnKeyType="done"
                onChangeText={text => setPassword(text)}
            />
        </Container>
    );
}
