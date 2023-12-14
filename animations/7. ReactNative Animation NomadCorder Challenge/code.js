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
    const leftX = -SCREEN_WIDTH * 0.5 + 100;
    const rightX = SCREEN_WIDTH * 0.5 - 100;
    const topY = -SCREEN_HEIGHT * 0.5 + 100;
    const bottomY = SCREEN_HEIGHT * 0.5 - 100;
    const totalHeight = bottomY - topY;
    const yStack = totalHeight / 3.5;

    const POSITION = useRef(
        new Animated.ValueXY({
            x: 0,
            y: bottomY,
        }),
    ).current;

    const left1 = Animated.timing(POSITION, {
        toValue: {
            x: leftX,
            y: bottomY - yStack,
        },
        duration: 400,
        useNativeDriver: true,
    });

    const left2 = Animated.timing(POSITION, {
        toValue: {
            x: leftX,
            y: bottomY - yStack * 2,
        },
        duration: 400,
        useNativeDriver: true,
    });

    const left3 = Animated.timing(POSITION, {
        toValue: {
            x: leftX,
            y: bottomY - yStack * 3,
        },
        duration: 400,
        useNativeDriver: true,
    });

    const right1 = Animated.timing(POSITION, {
        toValue: {
            x: rightX,
            y: bottomY - yStack,
        },
        duration: 400,
        useNativeDriver: true,
    });

    const right2 = Animated.timing(POSITION, {
        toValue: {
            x: rightX,
            y: bottomY - yStack * 2,
        },
        duration: 400,
        useNativeDriver: true,
    });

    const right3 = Animated.timing(POSITION, {
        toValue: {
            x: rightX,
            y: bottomY - yStack * 3,
        },
        duration: 400,
        useNativeDriver: true,
    });

    const topLeft = Animated.timing(POSITION, {
        toValue: {
            x: leftX,
            y: topY,
        },
        duration: 400,
        useNativeDriver: true,
    });

    const topRight = Animated.timing(POSITION, {
        toValue: {
            x: rightX,
            y: topY,
        },
        duration: 400,
        useNativeDriver: true,
    });

    const bottomRight = Animated.timing(POSITION, {
        toValue: {
            x: rightX,
            y: bottomY,
        },
        duration: 400,
        useNativeDriver: true,
    });

    const bottomLeft = Animated.timing(POSITION, {
        toValue: {
            x: leftX,
            y: bottomY,
        },
        duration: 400,
        useNativeDriver: true,
    });

    const initPosition = Animated.timing(POSITION, {
        toValue: {
            x: 0,
            y: bottomY,
        },
        duration: 400,
        useNativeDriver: true,
    });

    function moveUp() {
        Animated.loop(
            Animated.sequence([
                left1,
                right2,
                left3,
                topRight,
                left3,
                right2,
                left1,
                bottomRight,
                left1,
                right2,
                left3,
                topRight,
                left3,
                right2,
                left1,
                // initPosition,
                bottomRight,
                initPosition,
            ]),
        ).start();
    }

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
