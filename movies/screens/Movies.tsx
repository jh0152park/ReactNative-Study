import react, { useState } from "react";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery, useQueryClient } from "react-query";
import {
    getNowPlayingMovieList,
    getPopularMovieList,
    getUpComingMovieList,
} from "../api";
import { BlurView } from "expo-blur";
import Slide from "../components/Slide";
import Poster from "../components/Poster";
import Vote from "../components/Vote";
import HList from "../components/HList";
import VList from "../components/VList";
import { IData, IResult } from "../types";

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
    margin-bottom: 20px;
`;

const HolizontalScroll = styled.FlatList`
    /* margin-top: 20px; */
`;

const ListContainer = styled.View`
    margin-bottom: 40px;
`;

const VSeparator = styled.View`
    width: 30px;
`;

const HSeparator = styled.View`
    height: 30px;
`;

type MoviesProps = NativeStackScreenProps<any, "Movies">;

export default function Movies({ navigation }: MoviesProps) {
    const queryClient = useQueryClient();
    const {
        isLoading: nowPlayingLoading,
        data: nowPlayingData,
        isRefetching: isRefetchingNowPlaying,
    } = useQuery<IData>(["movies", "nowPlaying"], () =>
        getNowPlayingMovieList(1)
    );
    const {
        isLoading: upComingLoading,
        data: upComingData,
        isRefetching: isRefetchingUpComing,
    } = useQuery<IData>(["movies", "upComming"], () => getUpComingMovieList(1));
    const {
        isLoading: popularLoading,
        data: popularData,
        isRefetching: isRefetchingPopular,
    } = useQuery<IData>(["movies", "popular"], () => getPopularMovieList(1));

    function onRefresh() {
        console.log("onRefresh");
        queryClient.refetchQueries(["movies"]);
        console.log("done");
    }

    function renderHList({ item }: any) {
        return (
            <HList
                poster_path={item.poster_path}
                original_title={item.original_title}
                vote_average={item.vote_average}
            />
        );
    }

    function renderVList({ item }: any) {
        return (
            <VList
                key={item.id}
                poster_path={item.poster_path}
                original_title={item.original_title}
                overview={item.overview}
            />
        );
    }

    function movieKeyExtractor(item: any) {
        return item.id + "";
    }

    const isLoading = nowPlayingLoading || upComingLoading || popularLoading;
    const isRefreshing =
        isRefetchingNowPlaying || isRefetchingUpComing || isRefetchingPopular;

    return isLoading ? (
        <Loading>
            <ActivityIndicator />
        </Loading>
    ) : (
        <FlatList
            onRefresh={onRefresh}
            refreshing={isRefreshing}
            data={popularData?.results}
            keyExtractor={(item) => item.id + ""}
            ItemSeparatorComponent={HSeparator}
            renderItem={renderVList}
            ListHeaderComponent={
                <>
                    <Swiper
                        loop
                        horizontal
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
                        {upComingData ? (
                            <HolizontalScroll
                                horizontal
                                data={upComingData.results}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
                                    paddingHorizontal: 30,
                                }}
                                ItemSeparatorComponent={VSeparator}
                                keyExtractor={(item: any) => item.id + ""}
                                renderItem={renderHList}
                            />
                        ) : null}
                    </ListContainer>

                    <ListTitle>Popular Movies</ListTitle>
                </>
            }
        />
    );
}
