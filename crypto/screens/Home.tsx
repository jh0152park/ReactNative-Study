import React, {useEffect, useState} from "react";
import {ActivityIndicator, Dimensions, FlatList} from "react-native";
import styled from "styled-components/native";
import auth from "@react-native-firebase/auth";
import {useQuery} from "react-query";
import {ICoin, getCoins} from "../api";
import {Black} from "../colors";

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get("window");

const Container = styled.View`
    flex: 1;
    background-color: ${Black};
    padding: ${SCREEN_HEIGHT * 0.1}px ${SCREEN_WIDTH * 0.05}px;
`;

const Loader = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${Black};
`;

const Coin = styled.View`
    align-items: center;
`;

const CoinName = styled.Text`
    color: whitesmoke;
`;

const CoinSymbol = styled.Text`
    color: whitesmoke;
`;

export default function Home() {
    const {isLoading, data} = useQuery<ICoin[]>("coins", getCoins);
    const [cleanData, setClearnData] = useState<ICoin[]>([]);

    async function logout() {
        await auth().signOut();
    }

    useEffect(() => {
        if (data) {
            setClearnData(
                data?.filter(
                    coin => coin.rank != 0 && coin.is_active && !coin.is_new,
                ),
            );
        }
    }, [data]);

    if (isLoading) {
        return (
            <Loader>
                <ActivityIndicator color="white" size="large" />
            </Loader>
        );
    }

    return (
        <Container>
            <FlatList
                data={cleanData}
                renderItem={({item}) => (
                    <Coin>
                        <CoinName>{item.name}</CoinName>
                        <CoinSymbol>{item.symbol}</CoinSymbol>
                    </Coin>
                )}
                numColumns={5}
                keyExtractor={item => item.id}
            />
        </Container>
    );
}
