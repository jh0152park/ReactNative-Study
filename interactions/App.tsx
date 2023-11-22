import {styled} from "styled-components/native";
import {Ionicons} from "@expo/vector-icons";
import {useRef} from "react";
import {Animated, PanResponder, View} from "react-native";

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
`;

function App() {
    const scale = useRef(new Animated.Value(1)).current;

    const position = useRef(
        new Animated.ValueXY({
            x: 0,
            y: 0,
        }),
    ).current;

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

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,

            onPanResponderGrant: (e, gestureState) => {
                onPressIn.start();
            },

            onPanResponderRelease: () => {
                Animated.parallel([onPressOut, backToInit]).start();
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

    return (
        <Container>
            <Edge>
                <WordContainer>
                    <Word style={{color: GREEN}}>알아</Word>
                </WordContainer>
            </Edge>
            <Center>
                <IconCard
                    {...panResponder.panHandlers}
                    style={{
                        transform: [
                            {
                                scale: scale,
                            },
                            ...position.getTranslateTransform(),
                        ],
                    }}>
                    <Ionicons name="beer" color={GREY} size={76} />
                </IconCard>
            </Center>
            <Edge>
                <WordContainer>
                    <Word style={{color: RED}}>몰라</Word>
                </WordContainer>
            </Edge>
        </Container>
    );
}

export default App;
