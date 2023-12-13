import React, {useRef, useState} from "react";
import {Animated, Dimensions, Pressable, TouchableOpacity} from "react-native";
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

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get("window");

function App() {
    const POSITION = useRef(
        new Animated.ValueXY({
            x: -SCREEN_WIDTH * 0.5 + 100,
            y: -SCREEN_HEIGHT * 0.5 + 100,
        }),
    ).current;

    const toTopLeft = Animated.timing(POSITION, {
        toValue: {
            x: -SCREEN_WIDTH * 0.5 + 100,
            y: -SCREEN_HEIGHT * 0.5 + 100,
        },
        useNativeDriver: true,
    });

    const toTopright = Animated.timing(POSITION, {
        toValue: {
            x: SCREEN_WIDTH * 0.5 - 100,
            y: -SCREEN_HEIGHT * 0.5 + 100,
        },
        useNativeDriver: true,
    });

    const toBottomLeft = Animated.timing(POSITION, {
        toValue: {
            x: -SCREEN_WIDTH * 0.5 + 100,
            y: SCREEN_HEIGHT * 0.5 - 100,
        },
        useNativeDriver: true,
    });

    const toBottomRight = Animated.timing(POSITION, {
        toValue: {
            x: SCREEN_WIDTH * 0.5 - 100,
            y: SCREEN_HEIGHT * 0.5 - 100,
        },
        useNativeDriver: true,
    });

    function moveUp() {
        Animated.loop(
            Animated.sequence([
                toBottomLeft,
                toBottomRight,
                toTopright,
                toTopLeft,
            ]),
        ).start();
    }

    const opacityValue = POSITION.y.interpolate({
        inputRange: [-250, -100, 100, 250],
        outputRange: [1, 0.3, 0.3, 1],
    });

    const borderRadius = POSITION.y.interpolate({
        inputRange: [-250, 250],
        outputRange: [100, 0],
    });

    const rotation = POSITION.y.interpolate({
        inputRange: [-250, 250],
        outputRange: ["-360deg", "360deg"],
    });

    const backgroundColor = POSITION.y.interpolate({
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
                        transform: [...POSITION.getTranslateTransform()],
                    }}
                />
            </Pressable>
        </Container>
    );
}

export default App;
