import React, {useRef, useState} from "react";
import styled from "styled-components/native";
import {Black} from "../colors";
import {Dimensions} from "react-native";
import {Email, Password} from "../components/Buttons";

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get("window");

const Container = styled.View`
    flex: 1;
    background-color: ${Black};
    padding: ${SCREEN_HEIGHT * 0.1}px ${SCREEN_WIDTH * 0.05}px;
    align-items: center;
`;

const Text = styled.Text`
    color: whitesmoke;
`;

const ButtonText = styled.Text`
    color: "rgb(145, 152, 229)";
    font-weight: bold;
`;

const Button = styled.TouchableOpacity``;

const Header = styled.Text`
    font-size: 48px;
    font-weight: bold;
    color: "rgb(145, 152, 229)";
    margin-bottom: 50px;
`;

const Wrapper = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export default function Login({navigation: {navigate}}: any) {
    const passwordInput = useRef<any>();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function setPasswordFoucs() {
        passwordInput.current.focus();
    }

    return (
        <Container>
            <Header>Log in</Header>
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
            />
            <Wrapper>
                <Text>Don't have an account yet? </Text>
                <Button onPress={() => navigate("Join")}>
                    <ButtonText>Join us</ButtonText>
                </Button>
            </Wrapper>
        </Container>
    );
}
