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
    TouchableOpacity,
    View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import {
    getNowPlayingMovieList,
    getPopularMovieList,
    getUpComingMovieList,
} from "../api";
import { BlurView } from "expo-blur";
import Slide from "../components/Slide";
import VList from "../components/VList";
import { IData, IResult } from "../types";
import Loader from "../components/Loader";
import Title from "../components/Title";
import HList from "../components/HList";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const VSeparator = styled.View`
    height: 30px;
`;

type MoviesProps = NativeStackScreenProps<any, "Movies">;

export default function Movies({ navigation }: MoviesProps) {
    const queryClient = useQueryClient();
    const [isRefreshing, setIsRefreshing] = useState(false);

    function goToDetail(fullData: any) {
        navigation.navigate("Stack", {
            screen: "Detail",
            params: {
                ...fullData,
            },
        });
    }

    const { isLoading: nowPlayingLoading, data: nowPlayingData } =
        useQuery<IData>(["movies", "nowPlaying"], () =>
            getNowPlayingMovieList(1)
        );
    const { isLoading: upComingLoading, data: upComingData } = useQuery<IData>(
        ["movies", "upComming"],
        () => getUpComingMovieList(1)
    );
    const { isLoading: popularLoading, data: popularData } =
        useInfiniteQuery<IData>(["movies", "popular"], () =>
            getPopularMovieList(1)
        );

    function onRefresh() {
        console.log("onRefresh");
        setIsRefreshing(true);
        queryClient.refetchQueries(["movies"]);
        console.log("done");
        setIsRefreshing(false);
    }

    function renderVList({ item }: any) {
        return (
            <TouchableOpacity onPress={() => goToDetail(item)}>
                <VList
                    key={item.id}
                    poster_path={item.poster_path}
                    original_title={item.original_title}
                    overview={item.overview}
                />
            </TouchableOpacity>
        );
    }

    function loadMore() {
        alert("load more");
    }

    const isLoading = nowPlayingLoading || upComingLoading || popularLoading;

    return isLoading ? (
        <Loader />
    ) : (
        <FlatList
            onEndReached={loadMore}
            onEndReachedThreshold={0.4}
            onRefresh={onRefresh}
            refreshing={isRefreshing}
            data={popularData?.pages.map((page) => page.results).flat()}
            keyExtractor={(item) => item.id + ""}
            ItemSeparatorComponent={VSeparator}
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
                                fullData={movie}
                            />
                        ))}
                    </Swiper>

                    {upComingData ? (
                        <HList
                            title={"Upcoming Movies"}
                            data={upComingData.results}
                        />
                    ) : null}

                    <Title title={"Popular Movies"} />
                </>
            }
        />
    );
}
