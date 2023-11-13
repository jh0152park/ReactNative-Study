import react, { useState } from "react";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import {
    ActivityIndicator,
    Dimensions,
    ScrollView,
    StyleSheet,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "react-query";
import {
    getNowPlayingMovieList,
    getPopularMovieList,
    getUpComingMovieList,
} from "../api";
import { BlurView } from "expo-blur";
import Slide from "../components/Slide";
import Poster from "../components/Poster";

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

const ListTitle = styled.Text`
    color: ${(props) => props.theme.textColor};
    font-size: 18px;
    font-weight: bold;
    margin-left: 30px;
`;

const Movie = styled.View`
    margin-right: 20px;
    align-items: center;
`;

const HolizontalScroll = styled.ScrollView`
    margin-top: 20px;
`;

const Title = styled.Text`
    margin-top: 10px;
    margin-bottom: 5px;
    color: ${(props) => props.theme.textColor};
    font-weight: bold;
`;

const Vote = styled.Text`
    color: ${(props) => props.theme.textColor};
`;

const ListContainer = styled.View`
    margin-bottom: 40px;
`;

const HMovie = styled.View`
    padding: 0px 30px;
    flex-direction: row;
    margin-top: 50px;
`;

const HColumn = styled.View`
    margin-top: -10px;
    margin-left: 15px;
    width: 80%;
`;

const Overview = styled.Text`
    color: ${(props) => props.theme.textColor};
    width: 80%;
    font-size: 13px;
    margin-top: 20px;
`;

type MoviesProps = NativeStackScreenProps<any, "Movies">;

export default function Movies({ navigation }: MoviesProps) {
    const { isLoading: nowPlayingLoading, data: nowPlayingData } = useQuery(
        ["nowPlaying"],
        () => getNowPlayingMovieList(1)
    );
    const { isLoading: upComingLoading, data: upComingData } = useQuery(
        ["upComming"],
        () => getUpComingMovieList(1)
    );
    const { isLoading: pipularLoading, data: popularData } = useQuery(
        ["popular"],
        () => getPopularMovieList(1)
    );

    return nowPlayingLoading || upComingLoading || pipularLoading ? (
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
                    marginBottom: 30,
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

            <ListContainer>
                <ListTitle>Up Comming Movies</ListTitle>
                <HolizontalScroll
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingLeft: 30,
                    }}
                >
                    {upComingData?.results.map((movie: any) => (
                        <Movie key={movie.id}>
                            <Poster poster_path={movie.poster_path} />
                            <Title>
                                {movie.original_title.slice(0, 13)}
                                {movie.original_title.length > 13
                                    ? "..."
                                    : null}
                            </Title>

                            <Vote>
                                {movie.vote_average > 0
                                    ? `⭐️ ${movie.vote_average.toFixed(1)}`
                                    : "Comming soon"}
                            </Vote>
                        </Movie>
                    ))}
                </HolizontalScroll>
            </ListContainer>

            <ListTitle>Popular Movies</ListTitle>
            {popularData?.results.map((movie: any) => (
                <HMovie key={movie.id}>
                    <Poster poster_path={movie.poster_path} />
                    <HColumn>
                        <Title>{movie.original_title}</Title>
                        <Overview>
                            {movie.overview.slice(0, 150)}
                            {movie.overview.length > 150
                                ? "..."
                                : movie.overview.length === 0
                                ? "-"
                                : ""}
                        </Overview>
                    </HColumn>
                </HMovie>
            ))}
        </ScrollContainer>
    );
}
