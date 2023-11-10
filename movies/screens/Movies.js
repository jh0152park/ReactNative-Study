import react from "react";
import styled from "styled-components/native";
import { View, Text, TouchableOpacity } from "react-native";

const Button = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.mainBackgroundColor};
`;

const Title = styled.Text`
    color: ${(props) => props.theme.textColor};
`;

export default function Movies({ navigation: { navigate } }) {
    return (
        <Button
            onPress={() => {
                navigate("Stack", { screen: "Three" });
            }}
        >
            <Title>Movies</Title>
        </Button>
    );
}
