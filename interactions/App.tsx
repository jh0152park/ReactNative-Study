import {useRef} from "react";
import {Animated, PanResponder, Pressable} from "react-native";
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
`;
const AnimatedCoin = Animated.createAnimatedComponent(Coin);

export default function App() {
    const SCALE = useRef(new Animated.Value(1)).current;
    const POSITION = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,

            onPanResponderGrant(e, gestureState) {
                onPressDown.start();
            },

            onPanResponderRelease(e, gestureState) {
                onPressUp.start();
            },
        }),
    ).current;

    const onPressDown = Animated.spring(SCALE, {
        toValue: 0.8,
        useNativeDriver: true,
    });

    const onPressUp = Animated.spring(SCALE, {
        toValue: 1,
        useNativeDriver: true,
    });

    return (
        <Container>
            <Edge>
                <AnimatedButton>
                    <Text color={GREEN}>사다</Text>
                </AnimatedButton>
            </Edge>
            <Center>
                <Pressable>
                    <AnimatedCoin
                        {...panResponder.panHandlers}
                        style={{
                            transform: [
                                ...POSITION.getTranslateTransform(),
                                {scale: SCALE},
                            ],
                        }}
                    />
                </Pressable>
            </Center>
            <Edge>
                <AnimatedButton>
                    <Text color={RED}>팔다</Text>
                </AnimatedButton>
            </Edge>
        </Container>
    );
}
