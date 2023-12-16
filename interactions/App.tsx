import {useRef} from "react";
import {Animated, PanResponder, Pressable} from "react-native";
import {get} from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import styled from "styled-components/native";

const BLACK = "#1e272e";
const GREY = "#485460";
const GREEN = "#2ecc71";
const RED = "#e74c3c";

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${BLACK};
    padding-top: 50px;
    padding-bottom: 50px;
`;

const Edge = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Center = styled.View`
    flex: 3;
    justify-content: center;
    align-items: center;
    z-index: 10;
`;

const Button = styled.View`
    width: 100px;
    height: 100px;
    border-radius: 50px;
    justify-content: center;
    align-items: center;
    background-color: ${GREY};
`;
const AnimatedButton = Animated.createAnimatedComponent(Button);

const Text = styled.Text<{color: string}>`
    font-size: 38px;
    font-weight: bold;
    color: ${props => props.color};
`;

const Coin = styled.View`
    width: 150px;
    height: 150px;
    border-radius: 75px;
    justify-content: center;
    align-items: center;
    background-color: ${GREEN};
    z-index: 10;
`;
const AnimatedCoin = Animated.createAnimatedComponent(Coin);

export default function App() {
    const SCALE = useRef(new Animated.Value(1)).current;
    const OPACITY = useRef(new Animated.Value(1)).current;
    const POSITION = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,

            onPanResponderGrant(e, gestureState) {
                onPressDown.start();
            },

            onPanResponderMove(e, gestureState) {
                POSITION.setValue({
                    x: gestureState.dx,
                    y: gestureState.dy,
                });
            },

            onPanResponderRelease(e, gestureState) {
                if (Math.abs(gestureState.dy) >= 210) {
                    Animated.sequence([
                        Animated.parallel([scaleZero, opacityZero]),
                        initCoin,
                    ]).start(restoreCoin);
                } else {
                    onPressUp.start();
                    backToInit.start();
                }
                // Eating TH is 210
            },
        }),
    ).current;

    const upButtonScale = POSITION.y.interpolate({
        inputRange: [-300, 0],
        outputRange: [2, 1],
        extrapolate: "clamp",
    });

    const downButtonScale = POSITION.y.interpolate({
        inputRange: [0, 300],
        outputRange: [1, 2],
        extrapolate: "clamp",
    });

    const onPressDown = Animated.spring(SCALE, {
        toValue: 0.8,
        useNativeDriver: true,
    });

    const onPressUp = Animated.spring(SCALE, {
        toValue: 1,
        useNativeDriver: true,
    });

    const backToInit = Animated.spring(POSITION, {
        toValue: {
            x: 0,
            y: 0,
        },
        useNativeDriver: true,
    });

    const scaleZero = Animated.timing(SCALE, {
        toValue: 0,
        useNativeDriver: true,
        duration: 100,
    });

    const opacityZero = Animated.timing(OPACITY, {
        toValue: 0,
        useNativeDriver: true,
        duration: 100,
    });

    const scaleEnable = Animated.timing(SCALE, {
        toValue: 1,
        useNativeDriver: true,
        duration: 100,
    });

    const opacityEnable = Animated.timing(OPACITY, {
        toValue: 1,
        useNativeDriver: true,
        duration: 100,
    });

    const initCoin = Animated.timing(POSITION, {
        toValue: {
            x: 0,
            y: 0,
        },
        useNativeDriver: true,
        duration: 100,
    });

    function restoreCoin() {
        Animated.parallel([scaleEnable, opacityEnable]).start();
    }

    return (
        <Container>
            <Edge>
                <AnimatedButton
                    style={{
                        transform: [{scale: upButtonScale}],
                    }}>
                    <Text color={GREEN}>사다</Text>
                </AnimatedButton>
            </Edge>
            <Center>
                <Pressable>
                    <AnimatedCoin
                        {...panResponder.panHandlers}
                        style={{
                            opacity: OPACITY,
                            transform: [
                                ...POSITION.getTranslateTransform(),
                                {scale: SCALE},
                            ],
                        }}
                    />
                </Pressable>
            </Center>
            <Edge>
                <AnimatedButton
                    style={{
                        transform: [{scale: downButtonScale}],
                    }}>
                    <Text color={RED}>팔다</Text>
                </AnimatedButton>
            </Edge>
        </Container>
    );
}
