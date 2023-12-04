import React, {useEffect} from "react";
import {Text} from "react-native";
import styled from "styled-components/native";
import {Icon} from "../components/Coin";
import {useQuery} from "react-query";
import {coinInfo, coinPrices} from "../api";

const Container = styled.View``;

export default function Detail({navigation, route}: any) {
    const coinId = route.params.item.id;
    const symbol = route.params.item.symbol;
    const {isLoading: infoLoading, data: infoData} = useQuery(
        ["coin_info", coinId],
        () => coinInfo(coinId),
    );
    const {isLoading: priceLoading, data: priceData} = useQuery(
        ["coin_price", coinId],
        () => coinPrices(coinId),
    );

    console.log(priceData);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Icon
                    source={{
                        uri: `https://coinicons-api.vercel.app/api/icon/${symbol.toLowerCase()}`,
                    }}
                />
            ),
        });
    }, []);

    return (
        <Container>
            <Text>DETAIL</Text>
        </Container>
    );
}
