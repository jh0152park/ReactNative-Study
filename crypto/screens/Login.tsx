import React from "react";
import styled from "styled-components/native";

const Container = styled.View``;

const Text = styled.Text``;

const ButtonText = styled.Text``;

const Button = styled.TouchableOpacity``;

export default function Login({navigation: {navigate}}: any) {
    return (
        <Container>
            <Text>
                Don't have an account?{" "}
                <Button onPress={() => navigate("Join")}>
                    <ButtonText>Join Us!</ButtonText>
                </Button>
            </Text>
        </Container>
    );
}
