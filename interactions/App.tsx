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
`;
const AnimatedCard = Animated.createAnimatedComponent(Card);

const Button = styled.TouchableOpacity``;

const ButtonContainer = styled.View`
    flex-direction: row;
    margin-top: 70px;
    gap: 20px;
`;

export default function App() {
    const scale = useRef(new Animated.Value(1)).current;
    const position = useRef(new Animated.Value(0)).current;
    const rotation = position.interpolate({
        inputRange: [-250, 250],
        outputRange: ["-30deg", "30deg"],
        extrapolate: "clamp",
    });

    const onPressDownCard = Animated.spring(scale, {
        toValue: 0.8,
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
