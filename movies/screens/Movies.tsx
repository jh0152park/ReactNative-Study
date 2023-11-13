import react, { useState } from "react";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import { ActivityIndicator, Dimensions, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "react-query";
import {
    getNowPlayingMovieList,
    getPopularMovieList,
    getUpComingMovieList,
} from "../api";
import { BlurView } from "expo-blur";
import Slide from "../components/Slide";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ScrollContainer = styled.ScrollView`
    background-color: ${(props) => props.theme.mainBackgroundColor};
`;

const Loading = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    /* background-color: ${(props) => props.theme.mainBackgroundColor}; */
`;

type MoviesProps = NativeStackScreenProps<any, "Movies">;

export default function Movies({ navigation }: MoviesProps) {
    const { isLoading: nowPlayingLoading, data: nowPlayingData } = useQuery(
        ["nowPlaying"],
        () => getNowPlayingMovieList(1)
    );
    const { isLoading: upComingLoading, data: upComingData } = useQuery(
        ["nowPlaying"],
        () => getUpComingMovieList(1)
    );
    const { isLoading: pipularLoading, data: popularData } = useQuery(
        ["nowPlaying"],
        () => getPopularMovieList(1)
    );

    return nowPlayingLoading ? (
        <Loading>
            <ActivityIndicator />
        </Loading>
    ) : (
        <ScrollContainer>
            <Swiper
                horizontal
                loop
                autoplay
                autoplayTimeout={5}
                showsButtons={false}
                showsPagination={false}
                containerStyle={{
                    width: "100%",
                    height: SCREEN_HEIGHT * 0.25,
                }}
            >
                {nowPlayingData?.results.map((movie: any) => (
                    <Slide
                        key={movie.id}
                        backdrop_path={movie.backdrop_path}
                        poster_path={movie.poster_path}
                        original_title={movie.original_title}
                        overview={movie.overview}
                        vote_average={movie.vote_average}
                    />
                ))}
            </Swiper>
        </ScrollContainer>
    );
}
