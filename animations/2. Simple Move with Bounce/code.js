import React from "react";
import {Animated, TouchableOpacity} from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Box = styled.View`
    background-color: tomato;
    width: 200px;
    height: 200px;
`;

const AnimatedBox = Animated.createAnimatedComponent(Box);

function App() {
    const Y = new Animated.Value(0);

    function moveUp() {
        Animated.spring(Y, {
            toValue: -200,
            bounciness: 500,
            useNativeDriver: true,
        }).start();
    }

    Y.addListener(() => {
        console.log(Y);
    });

    return (
        <Container>
            <TouchableOpacity onPress={moveUp}>
                <AnimatedBox style={{transform: [{translateY: Y}]}} />
            </TouchableOpacity>
        </Container>
    );
}

export default App;
