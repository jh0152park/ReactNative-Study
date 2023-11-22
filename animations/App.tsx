import React, {useEffect, useRef, useState} from "react";
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
    background-color: teal;
    width: 200px;
    height: 200px;
`;

const AnimatedBox = Animated.createAnimatedComponent(Box);

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
            onPanResponderGrant: () => {
                POSITION.setOffset({
                    x: POSITION.x._value,
                    y: POSITION.y._value,
                });
            },
            onPanResponderMove: (_, {dx, dy}) => {
                POSITION.setValue({
                    x: dx,
                    y: dy,
                });
            },
            onPanResponderRelease: () => {
                POSITION.flattenOffset();
            },
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

    function moveUp() {}

    return (
        <Container>
            <Pressable onPress={moveUp}>
                <AnimatedBox
                    {...panResponder.panHandlers}
                    style={{
                        backgroundColor: BGColor,
                        transform: POSITION.getTranslateTransform(),
                    }}
                />
            </Pressable>
        </Container>
    );
}

export default App;
