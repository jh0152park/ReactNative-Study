import React, {useRef, useState} from "react";
import {ActivityIndicator, Alert, Dimensions, TextInput} from "react-native";
import styled from "styled-components/native";
import {Black} from "../colors";
import {CreateAccount, Email, Password} from "../components/Buttons";
import auth from "@react-native-firebase/auth";

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get("window");

const Container = styled.View`
    flex: 1;
    background-color: ${Black};
    padding: ${SCREEN_HEIGHT * 0.1}px ${SCREEN_WIDTH * 0.05}px;
    align-items: center;
`;

const Header = styled.Text`
    font-size: 38px;
    font-weight: bold;
    color: "rgb(145, 152, 229)";
    margin-bottom: 50px;
`;

const Text = styled.Text`
    color: white;
    font-size: 15px;
    font-weight: bold;
`;

export default function Join() {
    const passwordInput = useRef<any>();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    function setPasswordFoucs() {
        passwordInput.current?.focus();
    }

    async function createAccount() {
        if (email === "" || password === "") {
            Alert.alert("Please enter email and password");
            return;
        }

        if (loading) {
            return;
        }

        setLoading(true);
        try {
            await auth().createUserWithEmailAndPassword(email, password);
        } catch (e: any) {
            console.log(e.code);
            switch (e.code) {
                case "auth/weak-password": {
                    Alert.alert("Write a strong password!");
                }
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container>
            <Header>Create Account</Header>
            <Email
                placeholder="Email"
                placeholderTextColor="white"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                value={email}
                onChangeText={text => setEmail(text)}
                onSubmitEditing={setPasswordFoucs}
            />
            <Password
                ref={passwordInput}
                placeholder="Password"
                placeholderTextColor="white"
                secureTextEntry
                returnKeyType="done"
                value={password}
                onChangeText={text => setPassword(text)}
                onSubmitEditing={createAccount}
            />

            <CreateAccount onPress={createAccount}>
                {!loading ? (
                    <Text>Create</Text>
                ) : (
                    <ActivityIndicator color="white" />
                )}
            </CreateAccount>
        </Container>
    );
}
