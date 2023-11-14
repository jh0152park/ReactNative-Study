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
import { useQuery } from "react-query";
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
    width: 30px;
`;

type MoviesProps = NativeStackScreenProps<any, "Movies">;

export default function Movies({ navigation }: MoviesProps) {
    const [refreshing, setRefresing] = useState(false);
    const {
        isLoading: nowPlayingLoading,
        data: nowPlayingData,
        refetch: nowPlayingRefetch,
    } = useQuery(["nowPlaying"], () => getNowPlayingMovieList(1));
    const {
        isLoading: upComingLoading,
        data: upComingData,
        refetch: upCommingRefetch,
    } = useQuery(["upComming"], () => getUpComingMovieList(1));
    const {
        isLoading: popularLoading,
        data: popularData,
        refetch: popularRefetch,
    } = useQuery(["popular"], () => getPopularMovieList(1));

    function onRefresh() {
        console.log("onRefresh");
        setRefresing(true);
        nowPlayingRefetch();
        upCommingRefetch();
        popularRefetch();
        setRefresing(false);
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

    return nowPlayingLoading || upComingLoading || popularLoading ? (
        <Loading>
            <ActivityIndicator />
        </Loading>
    ) : (
        <FlatList
            onRefresh={onRefresh}
            refreshing={refreshing}
            data={popularData?.results}
            keyExtractor={movieKeyExtractor}
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
                            data={upComingData?.results}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{
                                paddingHorizontal: 30,
                            }}
                            ItemSeparatorComponent={HSeparator}
                            keyExtractor={movieKeyExtractor}
                            renderItem={renderHList}
                        />
                    </ListContainer>

                    <ListTitle>Popular Movies</ListTitle>
                </>
            }
        />
    );
}
