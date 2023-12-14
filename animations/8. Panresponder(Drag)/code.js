import React, {useRef, useState} from "react";
import {
    Animated,
    Dimensions,
    PanResponder,
    Pressable,
    TouchableOpacity,
} from "react-native";
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
            x: 0,
            y: 0,
        }),
    ).current;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (e, gestureState) => {
                // gestureState.dy: delta y position
                // gestureState.dx: delta x position
                POSITION.setValue({
                    x: gestureState.dx,
                    y: gestureState.dy,
                });
            },
        }),
    ).current;

    function moveUp() {}

    const borderRadius = POSITION.x.interpolate({
        inputRange: [-SCREEN_WIDTH * 0.5 + 100, SCREEN_WIDTH * 0.5 - 100],
        outputRange: [100, 10],
    });

    const backgroundColor = POSITION.y.interpolate({
        inputRange: [-250, 250],
        outputRange: ["rgb(230, 255, 1)", "rgb(131, 203, 255)"],
    });

    return (
        <Container>
            <Pressable onPress={moveUp}>
                <AnimatedBox
                    {...panResponder.panHandlers}
                    style={{
                        borderRadius: borderRadius,
                        backgroundColor: backgroundColor,
                        transform: [...POSITION.getTranslateTransform()],
                    }}
                />
            </Pressable>
        </Container>
    );
}

export default App;
