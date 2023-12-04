import styled from "styled-components/native";
import {ICoin} from "../api";
import {useEffect, useRef} from "react";
import {Animated, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";

const Container = styled(Animated.createAnimatedComponent(View))`
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    padding: 20px;
`;

const CoinName = styled.Text`
    color: whitesmoke;
    font-weight: bold;
`;

export const Icon = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin-bottom: 20px;
`;

export default function Coin({item, index}: {item: ICoin; index: number}) {
    const navigation = useNavigation<any>();
    const opacity = useRef(new Animated.Value(0)).current;
    const scale = opacity.interpolate({
        inputRange: [0, 1],
        outputRange: [0.7, 1],
    });

    useEffect(() => {
        Animated.spring(opacity, {
            toValue: 1,
            useNativeDriver: true,
            delay: index * 200,
        }).start();
    }, []);

    return (
        <TouchableOpacity
            style={{flex: 0.3}}
            onPress={() => navigation.navigate("Detail", {item})}>
            <Container
                style={{
                    opacity: opacity,
                    transform: [{scale: scale}],
                }}>
                <Icon
                    source={{
                        uri: `https://coinicons-api.vercel.app/api/icon/${item.symbol.toLowerCase()}`,
                    }}
                />
                <CoinName>{item.symbol}</CoinName>
            </Container>
        </TouchableOpacity>
    );
}
