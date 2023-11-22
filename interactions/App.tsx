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
`;

function App() {
    const scale = useRef(new Animated.Value(1)).current;

    const position = useRef(new Animated.Value(0)).current;

    const rotation = position.interpolate({
        inputRange: [-250, 0, 250],
        outputRange: ["-30deg", "0deg", "30deg"],
        extrapolate: "extend",
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

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,

            onPanResponderGrant: () => onPressIn.start(),

            onPanResponderRelease: (_, {dx, dy}) => {
                if (Math.abs(dx) >= 300) {
                    Animated.spring(position, {
                        toValue: dx > 0 ? 500 : -500,
                        useNativeDriver: true,
                    }).start();
                } else {
                    Animated.parallel([onPressOut, goCenter]).start();
                }
            },

            onPanResponderMove: (_, {dx, dy}) => {
                position.setValue(dx);
            },
        }),
    ).current;

    return (
        <Container>
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
        </Container>
    );
}

export default App;
