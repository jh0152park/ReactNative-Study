import { View, Text, ScrollView, FlatList } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { getAiringTodayTV, getPopularTV, getTopRatedTV } from "../api";
import Loader from "../components/Loader";
import Title from "../components/Title";
import HList from "../components/HList";
import { RefreshControl } from "react-native";
import { useState } from "react";

export default function TV() {
    const queryClient = useQueryClient();
    const {
        isLoading: aringLaoding,
        data: aringData,
        isRefetching: todayRefreshing,
    } = useQuery(["tv", "today"], () => getAiringTodayTV(1));
    const {
        isLoading: topLaoding,
        data: topData,
        isRefetching: topRefreshing,
    } = useQuery(["tv", "top"], () => getTopRatedTV(1));
    const {
        isLoading: popularLaoding,
        data: popularData,
        isRefetching: popularRefreshing,
    } = useQuery(["tv", "popular"], () => getPopularTV(1));

    const isLoading = aringLaoding || topLaoding || popularLaoding;
    const isRefresing = todayRefreshing || topRefreshing || popularRefreshing;

    console.log(isRefresing);

    function onRefresh() {
        queryClient.refetchQueries(["tv"]);
    }

    if (isLoading) {
        return <Loader />;
    }

    return (
        <ScrollView
            contentContainerStyle={{
                paddingBottom: 30,
            }}
            refreshControl={
                <RefreshControl
                    refreshing={isRefresing}
                    onRefresh={onRefresh}
                />
            }
        >
            <HList title={"Aring Today"} data={aringData.results} />
            <HList title={"Popular TV"} data={popularData.results} />
            <HList title={"Top Rated TV"} data={topData.results} />
        </ScrollView>
    );
}
