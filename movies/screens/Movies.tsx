import react, { useState } from "react";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import { ActivityIndicator, Dimensions, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "react-query";
import { createImagePath, getNowPlayingMovieList } from "../api";
import { BlurView } from "expo-blur";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ScrollContainer = styled.ScrollView`
    background-color: ${(props) => props.theme.mainBackgroundColor};
`;

const View = styled.View`
    flex: 1;
`;

const Loading = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    /* background-color: ${(props) => props.theme.mainBackgroundColor}; */
`;

const Image = styled.Image`
    width: 100%;
    height: 100%;
    position: absolute;
`;

const Poster = styled.Image`
    width: 100px;
    height: 160px;
    border-radius: 5px;
`;

const Title = styled.Text`
    color: ${(props) => props.theme.textColor};
    font-size: 16px;
    font-weight: 600;
`;

const Wrapper = styled.View`
    flex-direction: row;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const Column = styled.View`
    width: 50%;
    margin-left: 15px;
`;

const Overview = styled.Text`
    color: rgba(255, 255, 255, 0.5);
    margin-top: 10px;
`;

const Vote = styled(Overview)`
    margin-top: 5px;
    font-size: 13px;
`;

type MoviesProps = NativeStackScreenProps<any, "Movies">;

export default function Movies({ navigation }: MoviesProps) {
    const { isLoading, data } = useQuery(["nowPlaying"], () =>
        getNowPlayingMovieList(1)
    );

    // console.log(createImagePath(data?.results[0].backdrop_path, 500));
    // console.log(data);

    return isLoading ? (
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
                {data?.results.map((movie: any) => (
                    <View key={movie.id}>
                        <Image
                            source={{
                                uri: createImagePath(movie.backdrop_path, 500),
                            }}
                            // blurRadius={1.1}
                        />
                        <BlurView style={StyleSheet.absoluteFill}>
                            <Wrapper>
                                <Poster
                                    source={{
                                        uri: createImagePath(movie.poster_path),
                                    }}
                                />
                                <Column>
                                    <Title>{movie.original_title}</Title>
                                    {movie.vote_average > 0 ? (
                                        <Vote>
                                            ⭐️ {movie.vote_average.toFixed(1)}{" "}
                                            / 10
                                        </Vote>
                                    ) : null}
                                    <Overview>
                                        {movie.overview.slice(0, 100) + "..."}
                                    </Overview>
                                </Column>
                            </Wrapper>
                        </BlurView>
                    </View>
                ))}
            </Swiper>
        </ScrollContainer>
    );
}
