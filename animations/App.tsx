import React, {useRef, useState} from "react";
import {
    Animated,
    Dimensions,
    PanResponder,
    Pressable,
    TouchableOpacity,
    View,
} from "react-native";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/FontAwesome5";

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #00a8ff;
`;

const Card = styled.View``;

const AnimatedCard = Animated.createAnimatedComponent(Card);

function App() {
    return (
        <Container>
            <AnimatedCard></AnimatedCard>
        </Container>
    );
}

export default App;
