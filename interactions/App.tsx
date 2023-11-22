import {styled} from "styled-components/native";
import {Ionicons} from "@expo/vector-icons";
import {useRef, useState} from "react";
import {Animated, Easing, PanResponder, View} from "react-native";
import icons from "./icons";

const BLACK = "#1e272e";
const GREY = "#485460";
const GREEN = "#2ecc71";
const RED = "#e74c3c";

const Container = styled.View`
    flex: 1;
    background-color: ${BLACK};
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

const Word = styled.Text`
    font-size: 38px;
    font-weight: bold;
`;

const WordContainer = styled(Animated.createAnimatedComponent(View))`
    background-color: ${GREY};
    width: 100px;
    height: 100px;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
`;

const IconCard = styled(Animated.createAnimatedComponent(View))`
    background-color: white;
    padding: 5px 10px;
    border-radius: 10px;
    z-index: 10;
`;

function App() {
    const [index, setIndex] = useState(0);

    const scale = useRef(new Animated.Value(1)).current;

    const position = useRef(
        new Animated.ValueXY({
            x: 0,
            y: 0,
        }),
    ).current;

    const opacity = useRef(new Animated.Value(1)).current;

    const onPressIn = Animated.spring(scale, {
        toValue: 0.8,
        useNativeDriver: true,
    });

    const onPressOut = Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
    });

    const backToInit = Animated.spring(position, {
        toValue: {
            x: 0,
            y: 0,
        },
        useNativeDriver: true,
    });

    const backToHome = Animated.timing(position, {
        toValue: {
            x: 0,
            y: 0,
        },
        easing: Easing.linear,
        duration: 100,
        useNativeDriver: true,
    });

    const upWordScale = position.y.interpolate({
        inputRange: [-300, -80],
        outputRange: [2, 1],
        extrapolate: "clamp",
    });

    const downWordScale = position.y.interpolate({
        inputRange: [80, 300],
        outputRange: [1, 2],
        extrapolate: "clamp",
    });

    const onDropScale = Animated.timing(scale, {
        toValue: 0,
        useNativeDriver: true,
        easing: Easing.linear,
        duration: 100,
    });

    const onDropOpacity = Animated.timing(opacity, {
        toValue: 0,
        useNativeDriver: true,
        easing: Easing.linear,
        duration: 100,
    });

    const restoreScale = Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
    });

    const restoreOpacity = Animated.spring(opacity, {
        toValue: 1,
        useNativeDriver: true,
    });

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,

            onPanResponderGrant: (e, gestureState) => {
                onPressIn.start();
            },

            onPanResponderRelease: (_, {dy}) => {
                if (Math.abs(dy) >= 250) {
                    Animated.sequence([
                        Animated.parallel([onDropScale, onDropOpacity]),
                        backToHome,
                    ]).start(nextIcon);
                } else {
                    Animated.parallel([onPressOut, backToInit]).start();
                }
            },

            onPanResponderMove: (e, gestureState) => {
                const dx = gestureState.dx;
                const dy = gestureState.dy;
                position.setValue({
                    x: dx,
                    y: dy,
                });
            },
        }),
    ).current;

    function nextIcon() {
        setIndex(prev => prev + 1);
        Animated.parallel([restoreOpacity, restoreScale]).start();
    }

    return (
        <Container>
            <Edge>
                <WordContainer
                    style={{
                        transform: [
                            {
                                scale: upWordScale,
                            },
                        ],
                    }}>
                    <Word style={{color: GREEN}}>알아</Word>
                </WordContainer>
            </Edge>
            <Center>
                <IconCard
                    {...panResponder.panHandlers}
                    style={{
                        opacity: opacity,
                        transform: [
                            ...position.getTranslateTransform(),
                            {
                                scale: scale,
                            },
                        ],
                    }}>
                    <Ionicons name={icons[index]} color={GREY} size={76} />
                </IconCard>
            </Center>
            <Edge>
                <WordContainer
                    style={{
                        transform: [{scale: downWordScale}],
                    }}>
                    <Word style={{color: RED}}>몰라</Word>
                </WordContainer>
            </Edge>
        </Container>
    );
}

export default App;
