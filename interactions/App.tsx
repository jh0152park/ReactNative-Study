import {styled} from "styled-components/native";
import {Ionicons} from "@expo/vector-icons";
import {Animated, PanResponder, View} from "react-native";
import {useRef} from "react";

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #00a8ff;
`;

const Card = styled(Animated.createAnimatedComponent(View))`
    background-color: white;
    width: 300px;
    height: 300px;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
    position: absolute;
`;

const CardContainer = styled.View`
    flex: 3;
    justify-content: center;
    align-items: center;
`;

const Button = styled.TouchableOpacity`
    margin: 0px 10px;
`;

const ButtonContainer = styled.View`
    flex-direction: row;
    flex: 1;

    /* margin-top: 50px; */
`;

function App() {
    const scale = useRef(new Animated.Value(1)).current;

    const position = useRef(new Animated.Value(0)).current;

    const rotation = position.interpolate({
        inputRange: [-250, 250],
        outputRange: ["-30deg", "30deg"],
        extrapolate: "extend",
    });

    const backCardScale = position.interpolate({
        inputRange: [-300, 0, 300],
        outputRange: [1, 0.5, 1],
        extrapolate: "clamp",
    });

    const onPressOut = Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
    });

    const onPressIn = Animated.spring(scale, {
        toValue: 0.95,
        useNativeDriver: true,
    });

    const goCenter = Animated.spring(position, {
        toValue: 0,
        useNativeDriver: true,
    });

    const disappearLeft = Animated.spring(position, {
        toValue: -500,
        tension: 10,
        useNativeDriver: true,
    });

    const disappearRight = Animated.spring(position, {
        toValue: 500,
        tension: 10,
        useNativeDriver: true,
    });

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,

            onPanResponderGrant: () => onPressIn.start(),

            onPanResponderRelease: (_, {dx, dy}) => {
                if (Math.abs(dx) >= 250) {
                    dx > 0 ? disappearRight.start() : disappearLeft.start();
                } else {
                    Animated.parallel([onPressOut, goCenter]).start();
                }
            },

            onPanResponderMove: (_, {dx, dy}) => {
                position.setValue(dx);
            },
        }),
    ).current;

    function closePress() {
        disappearLeft.start();
    }

    function checkPreess() {
        disappearRight.start();
    }

    return (
        <Container>
            <CardContainer>
                <Card
                    style={{
                        transform: [
                            {
                                scale: backCardScale,
                            },
                        ],
                    }}>
                    <Ionicons name="beer" color={"#192a56"} size={98} />
                </Card>
                <Card
                    {...panResponder.panHandlers}
                    style={{
                        transform: [
                            {scale: scale},
                            {translateX: position},
                            {rotateZ: rotation},
                        ],
                    }}>
                    <Ionicons name="pizza" color={"#192a56"} size={98} />
                </Card>
            </CardContainer>

            <ButtonContainer>
                <Button onPress={closePress}>
                    <Ionicons name="close-circle" color="white" size={58} />
                </Button>
                <Button onPress={checkPreess}>
                    <Ionicons name="checkmark-circle" color="white" size={58} />
                </Button>
            </ButtonContainer>
        </Container>
    );
}

export default App;
