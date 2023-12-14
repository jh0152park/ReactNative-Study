import {Animated, PanResponder} from "react-native";
import styled from "styled-components/native";
import {Ionicons} from "@expo/vector-icons";
import {useRef} from "react";

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #00a8ff;
`;

const Card = styled.View`
    background-color: white;
    width: 300px;
    height: 300px;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
    position: absolute;
`;
const AnimatedCard = Animated.createAnimatedComponent(Card);
const CardContainer = styled.View`
    flex: 3;
    justify-content: center;
    align-items: center;
`;

const Button = styled.TouchableOpacity``;

const ButtonContainer = styled.View`
    flex-direction: row;
    gap: 20px;
    flex: 1;
`;

export default function App() {
    const scale = useRef(new Animated.Value(1)).current;
    const position = useRef(new Animated.Value(0)).current;
    const rotation = position.interpolate({
        inputRange: [-250, 250],
        outputRange: ["-30deg", "30deg"],
        extrapolate: "clamp",
    });
    const secondScale = position.interpolate({
        inputRange: [-300, 0, 300],
        outputRange: [1, 0.5, 1],
        extrapolate: "clamp",
    });

    const onPressDownCard = Animated.spring(scale, {
        toValue: 0.85,
        useNativeDriver: true,
    });

    const onPressUpCard = Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
    });

    const goCenter = Animated.spring(position, {
        toValue: 0,
        useNativeDriver: true,
    });

    const goLeft = Animated.spring(position, {
        toValue: -500,
        tension: 10,
        useNativeDriver: true,
    });

    const goRight = Animated.spring(position, {
        toValue: 500,
        tension: 10,
        useNativeDriver: true,
    });

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                onPressDownCard.start();
            },
            onPanResponderRelease: (e, {dx, dy}) => {
                if (dx < -230) {
                    goLeft.start();
                } else if (dx > 230) {
                    goRight.start();
                } else {
                    Animated.parallel([onPressUpCard, goCenter]).start();
                }
            },
            onPanResponderMove(e, {dx, dy}) {
                position.setValue(dx);
            },
        }),
    ).current;

    return (
        <Container>
            <CardContainer>
                <AnimatedCard
                    style={{
                        transform: [{scale: secondScale}],
                    }}>
                    <Ionicons name="fast-food" color="#192a56" size={98} />
                </AnimatedCard>

                <AnimatedCard
                    {...panResponder.panHandlers}
                    style={{
                        transform: [
                            {scale: scale},
                            {translateX: position},
                            {rotateZ: rotation},
                        ],
                    }}>
                    <Ionicons name="pizza" color="#192a56" size={98} />
                </AnimatedCard>
            </CardContainer>

            <ButtonContainer>
                <Button
                    onPress={() => {
                        goLeft.start();
                    }}>
                    <Ionicons
                        name="close-circle-outline"
                        size={50}
                        color={"white"}
                    />
                </Button>
                <Button
                    onPress={() => {
                        goRight.start();
                    }}>
                    <Ionicons
                        name="checkmark-circle-outline"
                        size={50}
                        color={"white"}
                    />
                </Button>
            </ButtonContainer>
        </Container>
    );
}
