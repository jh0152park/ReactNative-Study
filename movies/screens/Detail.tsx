import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import styled from "styled-components/native";
import Poster from "../components/Poster";
import { Dimensions, StyleSheet } from "react-native";
import { createImagePath, getMovieDetail, getTVDetail } from "../api";
import { LinearGradient } from "expo-linear-gradient";
import { useQuery } from "react-query";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.ScrollView`
    background-color: ${(props) => props.theme.mainBackgroundColor};
`;

const Header = styled.View`
    height: ${SCREEN_HEIGHT * 0.25}px;
    justify-content: flex-end;
    padding: 0px 20px;
`;

const Background = styled.Image``;

const Column = styled.View`
    flex-direction: row;
    width: 80%;
`;

const Title = styled.Text`
    color: ${(props) => props.theme.textColor};
    font-size: 30px;
    align-self: flex-end;
    margin-left: 15px;
    font-weight: bold;
`;

const Overview = styled.Text`
    color: ${(props) => props.theme.textColor};
    margin-top: 20px;
    padding: 0px 20px;
`;

export default function Detail({
    navigation: { setOptions },
    route: { params },
}: any) {
    const title = params.original_title ?? params.original_name;
    const { isLoading: movieDetailLoading, data: movieDetailData } = useQuery(
        ["movies", params.id],
        () => getMovieDetail(params.id),
        {
            enabled: "original_title" in params,
        }
    );
    const { isLoading: tvDetailLoading, data: tvDetailData } = useQuery(
        ["tv", params.id],
        () => getTVDetail(params.id),
        {
            enabled: "original_name" in params,
        }
    );

    useEffect(() => {
        setOptions({
            title: "original_title" in params ? "Movie" : "TV Show",
        });
    }, []);

    return (
        <Container>
            <Header>
                <Background
                    style={StyleSheet.absoluteFill}
                    source={{
                        uri: createImagePath(params.backdrop_path || ""),
                    }}
                />

                <Column>
                    <Poster poster_path={params.poster_path || ""} />
                    <Title>{title}</Title>
                </Column>
            </Header>
            <Overview>{params.overview}</Overview>
        </Container>
    );
}
