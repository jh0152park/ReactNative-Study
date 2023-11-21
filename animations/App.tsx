import React, {useEffect, useRef, useState} from "react";
import {Animated, Dimensions, Pressable, TouchableOpacity} from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Box = styled.View`
    background-color: teal;
    width: 200px;
    height: 200px;
`;

const AnimatedBox = Animated.createAnimatedComponent(Box);

function App() {
    const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
        Dimensions.get("window");

    const POSITION = useRef(
        new Animated.ValueXY({
            x: -SCREEN_WIDTH / 2 + 100,
            y: -SCREEN_HEIGHT / 2 + 100,
        }),
    ).current;

    const rotation = POSITION.y.interpolate({
        inputRange: [-250, 250],
        outputRange: ["-360deg", "360deg"],
    });

    const BGColor = POSITION.y.interpolate({
        inputRange: [-250, 250],
        outputRange: ["rgb(246, 250, 45)", "rgb(83, 255, 71)"],
    });

    const topLeft = Animated.timing(POSITION, {
        toValue: {
            x: -SCREEN_WIDTH / 2 + 100,
            y: -SCREEN_HEIGHT / 2 + 100,
        },
        useNativeDriver: false,
    });

    const bottomLeft = Animated.timing(POSITION, {
        toValue: {
            x: -SCREEN_WIDTH / 2 + 100,
            y: SCREEN_HEIGHT / 2 - 100,
        },
        useNativeDriver: false,
    });

    const bottomRight = Animated.timing(POSITION, {
        toValue: {
            x: SCREEN_WIDTH / 2 - 100,
            y: SCREEN_HEIGHT / 2 - 100,
        },
        useNativeDriver: false,
    });

    const topRight = Animated.timing(POSITION, {
        toValue: {
            x: SCREEN_WIDTH / 2 - 100,
            y: -SCREEN_HEIGHT / 2 + 100,
        },
        useNativeDriver: false,
    });

    function moveUp() {
        Animated.loop(
            Animated.sequence([bottomLeft, bottomRight, topRight, topLeft]),
        ).start();
    }

    return (
        <Container>
            <Pressable onPress={moveUp}>
                <AnimatedBox
                    style={{
                        backgroundColor: BGColor,
                        transform: [...POSITION.getTranslateTransform()],
                    }}
                />
            </Pressable>
        </Container>
    );
}

export default App;
