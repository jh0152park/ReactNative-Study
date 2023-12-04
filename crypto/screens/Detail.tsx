import React, {useEffect, useState} from "react";
import {ActivityIndicator, Text} from "react-native";
import styled from "styled-components/native";
import {Icon} from "../components/Coin";
import {useQuery} from "react-query";
import {ICoinPrice, coinInfo, coinPrices} from "../api";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {Black} from "../colors";
import {
    VictoryBar,
    VictoryChart,
    VictoryLine,
    VictoryScatter,
    VictoryTheme,
} from "victory-native";

type NaviProps = NativeStackScreenProps<any, "Detail">;

const Container = styled.View`
    flex: 1;
    background-color: ${Black};
    justify-content: center;
    align-items: center;
`;

export default function Detail({navigation, route}: NaviProps) {
    const coinId = route.params?.item.id;
    const symbol = route.params?.item.symbol;
    const {isLoading: infoLoading, data: infoData} = useQuery(
        ["coin_info", coinId],
        () => coinInfo(coinId),
    );
    const {isLoading: priceLoading, data: priceData} = useQuery<ICoinPrice[]>(
        ["coin_price", coinId],
        () => coinPrices(coinId),
    );
    const [vData, setVData] = useState<any>([]);

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

    useEffect(() => {
        if (priceData) {
            setVData(
                priceData.map(price => ({
                    x: new Date(price.timestamp).getTime(),
                    y: price.price,
                })),
            );
        }
    }, [priceData]);

    return (
        <Container>
            {vData ? (
                <VictoryChart height={360}>
                    <VictoryLine
                        data={vData}
                        style={{data: {stroke: "#1abc9c"}}}
                        interpolation="monotoneX"
                    />
                    <VictoryScatter
                        data={vData}
                        style={{data: {fill: "#1abc9c"}}}
                    />
                </VictoryChart>
            ) : (
                <ActivityIndicator color="white" />
            )}
        </Container>
    );
}
