import React, {useRef, useState} from "react";
import {Animated, Pressable, TouchableOpacity} from "react-native";
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
    const Y_POSITION = useRef(new Animated.ValueXY({x: 0, y: 250})).current;

    function moveUp() {
        Animated.timing(Y_POSITION, {
            toValue: up ? 250 : -250,
            duration: 1000,
            useNativeDriver: true,
        }).start(toggleUp);
    }

    function toggleUp() {
        setUp(prev => !prev);
    }

    const opacityValue = Y_POSITION.y.interpolate({
        inputRange: [-250, -100, 100, 250],
        outputRange: [1, 0.3, 0.3, 1],
    });

    const borderRadius = Y_POSITION.y.interpolate({
        inputRange: [-250, 250],
        outputRange: [100, 0],
    });

    const rotation = Y_POSITION.y.interpolate({
        inputRange: [-250, 250],
        outputRange: ["-360deg", "360deg"],
    });

    const backgroundColor = Y_POSITION.y.interpolate({
        inputRange: [-250, 250],
        outputRange: ["rgb(230, 255, 1)", "rgb(131, 203, 255)"],
    });

    return (
        <Container>
            <Pressable onPress={moveUp}>
                <AnimatedBox
                    style={{
                        borderRadius: borderRadius,
                        opacity: opacityValue,
                        backgroundColor: backgroundColor,
                        transform: [
                            {translateY: Y_POSITION.y},
                            {rotateY: rotation},
                        ],
                    }}
                />
            </Pressable>
        </Container>
    );
}

export default App;
