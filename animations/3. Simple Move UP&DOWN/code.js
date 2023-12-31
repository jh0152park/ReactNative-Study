import React, {useRef, useState} from "react";
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
    const [up, setUp] = useState(false);
    const Y = useRef(new Animated.Value(0)).current;

    function moveUp() {
        Animated.timing(Y, {
            toValue: up ? 200 : -200,
            useNativeDriver: true,
        }).start(toggleUp);
    }

    function toggleUp() {
        setUp(prev => !prev);
    }

    return (
        <Container>
            <TouchableOpacity onPress={moveUp}>
                <AnimatedBox style={{transform: [{translateY: Y}]}} />
            </TouchableOpacity>
        </Container>
    );
}

export default App;
